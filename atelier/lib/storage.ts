import { env } from '@/lib/vercel-runtime';
import { createSeed, migrateWorkspace, deadlineEvents, type Snapshot, type Workspace } from './studio';
function database() { if(!env.DB) throw new Error('La sauvegarde est indisponible.'); return env.DB; }
type Row={content:string;revision:number;updated_at:string};
function indexStatements(userId:string,w:Workspace,column:'revision'|'write_token',value:number|string){
  const db=database();
  const guard=`EXISTS (SELECT 1 FROM studio_workspaces WHERE user_id = ? AND ${column} = ?)`;
  return [db.prepare(`DELETE FROM studio_deadline_index WHERE user_id = ? AND ${guard}`).bind(userId,userId,value),...deadlineEvents(w).map(e=>db.prepare(`INSERT OR REPLACE INTO studio_deadline_index (id,user_id,project_id,title,project_title,due_date,reminder_days,demo) SELECT ?,?,?,?,?,?,?,? WHERE ${guard}`).bind(userId+'::'+e.id,userId,e.projectId,e.title,e.projectTitle,e.date,e.reminderDays,e.demo?1:0,userId,value))];
}
export async function loadWorkspace(userId:string):Promise<Snapshot>{
  const db=database();let row=await db.prepare('SELECT content, revision, updated_at FROM studio_workspaces WHERE user_id = ?').bind(userId).first<Row>();
  if(!row){const updatedAt=new Date().toISOString();await db.prepare('INSERT OR IGNORE INTO studio_workspaces (user_id,content,revision,updated_at) VALUES (?,?,0,?)').bind(userId,JSON.stringify(createSeed()),updatedAt).run();row=await db.prepare('SELECT content, revision, updated_at FROM studio_workspaces WHERE user_id = ?').bind(userId).first<Row>();}
  if(!row)throw new Error('Impossible de charger ton studio.');
  const workspace=migrateWorkspace(JSON.parse(row.content));
  await db.batch(indexStatements(userId,workspace,'revision',row.revision));
  return {workspace,revision:row.revision,updatedAt:row.updated_at};
}
export async function saveWorkspace(userId:string,workspace:Workspace,revision:number){
  const db=database();const updatedAt=new Date().toISOString();const token=crypto.randomUUID();
  const results=await db.batch([db.prepare('UPDATE studio_workspaces SET content = ?, revision = revision + 1, updated_at = ?, write_token = ? WHERE user_id = ? AND revision = ?').bind(JSON.stringify(workspace),updatedAt,token,userId,revision),...indexStatements(userId,workspace,'write_token',token)]);
  return results[0].meta.changes===1?{revision:revision+1,updatedAt}:null;
}

import { z } from 'zod';
import {briefDocumentSchema} from './brief-types.ts';
import { mcskyzSchema, budgetDocumentSchema, templateSchema, invoiceDraftSchema, issuerSchema, issuerProfileSchema,clientProfileSchema,blankIssuer } from './workspace-extras.ts';
import { defaultProfiles, profileSchema, serviceIds, SERVICES, serviceLabel, stepSchema, unitIds, unitLabels, workflowSchema, type Profile, type ProductionStep, type Workflow } from './production.ts';
export { defaultProfiles, SERVICES, serviceLabel, unitLabels, type Profile, type ProductionStep, type Workflow } from './production.ts';

export const people = ['louis', 'vincent', 'legacy-provider', ''] as const;
export const statuses = ['todo', 'doing', 'review', 'done', 'blocked'] as const;
export const statusLabels: Record<string, string> = { todo: 'À faire', doing: 'En cours', review: 'À valider', done: 'Terminé', blocked: 'Bloqué' };
export const projectStateLabels = {active:'En cours',paused:'En pause',delivered:'Terminée'} as const;
export const taskTypes = ['Décor', 'Animation', 'Personnage', 'Lighting', 'Postproduction', 'Livraison', 'Montage', 'Dérush', 'FX', 'SFX', 'Motion design', 'Étalonnage', 'Sous-titres'] as const;
export const colors = ['lime', 'violet', 'blue', 'peach'] as const;
const n = z.number().finite().min(0).max(10000000);
const short = z.string().trim().min(1).max(180);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => !Number.isNaN(Date.parse(v + 'T12:00:00Z')) && new Date(v + 'T12:00:00Z').toISOString().slice(0,10) === v, 'Date invalide');
export const taskSchema = z.object({
  id: short, title: short, scene: z.string().max(80), type: z.string().trim().min(1).max(80), assignee: z.string().max(180), coAssignees:z.array(z.string().min(1).max(180)).max(79).default([]),
  status: z.enum(statuses), estimate: n.max(10000), actual: n.max(10000), blocker: z.string().max(3000),
  description:z.string().max(6000).default(''),notes: z.string().max(6000), assetId: z.string().max(180),
  service:z.enum(serviceIds).default('3d'), unit:z.enum(unitIds).default('scene'), quantity:z.number().int().min(1).max(1000).default(1), indication:z.string().max(4000).default(''), deadline:z.union([date,z.literal('')]).default(''), priority:z.enum(['normal','high','urgent']).default('normal'), originKey:z.string().max(180).default(''), steps:z.array(stepSchema).max(30).default([]),
});
export const projectSchema = z.object({
  id: short, title: short, client: short, kind: z.string().min(1).max(100),
  briefs:z.array(briefDocumentSchema).max(20).default([]),leadIds:z.array(z.string().min(1).max(180)).max(80).default([]),mcskyz:mcskyzSchema.optional(), budgetDocument:budgetDocumentSchema.optional(),
  workflows:z.array(workflowSchema).max(5).default([]), reminderDays:z.number().int().min(0).max(30).default(3),
  color: z.enum(colors), billable: z.boolean().default(true), budget: n, externalCosts: n, received: n, deadline: date,
  status: z.enum(['active', 'paused', 'delivered']), orderValidated:z.boolean().default(false), notes: z.string().max(10000),
  link: z.string().max(2000).refine(v => !v || /^https?:\/\//i.test(v), 'Lien http(s) attendu'),
  demo: z.boolean(), tasks: z.array(taskSchema).max(400),
});
export const assetSchema = z.object({
  id: short, title: short, type: z.enum(['Décor', 'Personnage', 'Véhicule', 'Prop', 'Animation', 'Matériau']),
  reference: z.string().max(2000), notes: z.string().max(4000), tags: z.string().max(400), demo: z.boolean(),
});
export const bibleEntrySchema=z.object({id:short,title:short,category:z.enum(['Direction artistique','3D','Animation','Montage','Livraison','Ressources']),projectId:z.string().max(180).default(''),content:z.string().trim().min(1).max(20000),links:z.array(z.object({label:z.string().trim().min(1).max(120),url:z.string().url().max(2000).refine(v=>/^https?:\/\//i.test(v))})).max(20).default([]),updatedAt:z.string().max(50)});
export type BibleEntry=z.infer<typeof bibleEntrySchema>;
export const workspaceSchema = z.object({
  version: z.literal(7),bible:z.array(bibleEntrySchema).max(200).default([]),issuerProfiles:z.array(issuerProfileSchema).max(80).default([]),clientProfiles:z.array(clientProfileSchema).max(200).default([]),defaultIssuerId:z.string().max(180).default(''),templates:z.array(templateSchema).max(40).default([]), invoices:z.array(invoiceDraftSchema).max(200).default([]), issuer:issuerSchema.default(blankIssuer), serviceVotes:z.array(z.number().int().min(1).max(10)).max(10).default([]), profiles:z.array(profileSchema).min(1).max(80), ideaVotes:z.array(z.number().int().min(1).max(10)).max(10).default([]), projects: z.array(projectSchema).max(100), assets: z.array(assetSchema).max(1000),
  settings: z.object({ dayHours: z.number().min(1).max(16), targetDay: z.number().min(1).max(10000), louisCapacity: n.max(112), vincentCapacity: n.max(112) }),
}).superRefine((w, ctx) => {
  if(w.projects.reduce((n,p)=>n+1+p.tasks.filter(t=>t.deadline).length,0)>500)ctx.addIssue({code:'custom',message:'500 échéances maximum dans cet espace'});
  const ids = [...w.profiles.map(p=>p.id), ...w.projects.map(p=>p.id), ...w.assets.map(a=>a.id), ...w.projects.flatMap(p=>p.tasks.map(t=>t.id))];
  if(new Set(ids).size !== ids.length) ctx.addIssue({code:'custom', message:'Identifiants dupliqués'});
  const profileIds=new Set(w.profiles.map(p=>p.id));
  if(new Set(w.issuerProfiles.map(p=>p.id)).size!==w.issuerProfiles.length||new Set(w.clientProfiles.map(p=>p.id)).size!==w.clientProfiles.length)ctx.addIssue({code:'custom',message:'Presets dupliqués'});
  if(w.defaultIssuerId&&!w.issuerProfiles.some(p=>p.id===w.defaultIssuerId))ctx.addIssue({code:'custom',message:'Émetteur par défaut introuvable'});
  w.projects.forEach((p,pi)=>{const taskIds=new Set(p.tasks.map(t=>t.id));const moduleIds=p.briefs.flatMap(d=>d.modules.map(m=>m.id));if(new Set(p.briefs.map(d=>d.id)).size!==p.briefs.length||new Set(moduleIds).size!==moduleIds.length)ctx.addIssue({code:'custom',message:'Identifiants de briefs dupliqués'});if(p.briefs.some(d=>d.modules.some(m=>m.taskId&&!taskIds.has(m.taskId))))ctx.addIssue({code:'custom',message:'Scène liée au brief introuvable'});if(new Set(p.leadIds).size!==p.leadIds.length||p.leadIds.some(id=>!profileIds.has(id)))ctx.addIssue({code:'custom',message:'Responsables du projet invalides'});if(new Set(p.workflows.map(c=>c.service)).size!==p.workflows.length)ctx.addIssue({code:'custom',message:'Un métier apparaît deux fois',path:['projects',pi,'workflows']}); p.tasks.forEach((t,ti)=>{
    if(t.status==='done'&&t.steps.some(s=>!s.done))ctx.addIssue({code:'custom',message:'Toutes les étapes doivent être validées pour terminer un élément'});
    if(t.assignee&&!profileIds.has(t.assignee))ctx.addIssue({code:'custom',message:'Profil responsable introuvable',path:['projects',pi,'tasks',ti,'assignee']});if(new Set(t.coAssignees).size!==t.coAssignees.length||t.coAssignees.includes(t.assignee)||t.coAssignees.some(id=>!profileIds.has(id)))ctx.addIssue({code:'custom',message:'Collaborateurs de la tâche invalides'});
    if(new Set(t.steps.map(s=>s.id)).size!==t.steps.length)ctx.addIssue({code:'custom',message:'Étapes dupliquées'});
    t.steps.forEach(s=>{if(s.assignee&&!profileIds.has(s.assignee))ctx.addIssue({code:'custom',message:'Profil d’étape introuvable'});});
  });});
});
export type Task = z.infer<typeof taskSchema>;
export type Project = z.infer<typeof projectSchema>;
export const taskAssignees=(t:Task)=>[...new Set([t.assignee,...t.coAssignees].filter(Boolean))];
export type Asset = z.infer<typeof assetSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export type Snapshot = { workspace: Workspace; revision: number; updatedAt: string };
export type TaskWithProject = { task: Task; project: Project };
export const uid = () => crypto.randomUUID();
export const money = (v: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);
export const hours = (v: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(v) + ' h';
export const remaining = (t: Task) => t.status === 'done' ? 0 : Math.max(0, t.estimate - t.actual);
export function today() { return new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()); }
export function plusDays(date: string, days: number) { const d = new Date(date+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+days); return d.toISOString().slice(0,10); }
export function daysUntil(date: string, from = today()) { return Math.round((Date.parse(date+'T12:00:00Z')-Date.parse(from+'T12:00:00Z'))/86400000); }
export function dateLabel(date: string) { return new Date(date+'T12:00:00Z').toLocaleDateString('fr-FR', {day:'numeric',month:'short', timeZone:'Europe/Paris'}); }
export function stats(project: Project, settings: Workspace['settings'], profiles:Profile[]=defaultProfiles()) {
  const tasks = project.tasks;
  const internal = tasks.filter(t=>t.assignee!=='Prestataire'&&profiles.find(p=>p.id===t.assignee)?.scope!=='external');
  const actual = internal.reduce((s,t)=>s+t.actual,0);
  const left = internal.reduce((s,t)=>s+remaining(t),0);
  const unlogged = internal.filter(t=>t.status==='done'&&t.actual===0&&t.estimate>0);
  const projected = actual+left+unlogged.reduce((s,t)=>s+t.estimate,0);
  const personDays = projected/settings.dayHours;
  const dayRate = personDays > 0 ? (project.budget-project.externalCosts)/personDays : null;
  const timeValue = personDays*settings.targetDay;
  return {
    actual, left, projected, personDays, dayRate, timeValue, unlogged:unlogged.length,
    balance: project.budget-project.externalCosts-timeValue,
    done: tasks.filter(t=>t.status==='done').length,
    total: tasks.length,
    progress: tasks.length ? Math.round(tasks.reduce((n,t)=>n+taskProgress(t),0)/tasks.length) : 0,
    stepDone:tasks.reduce((n,t)=>n+t.steps.filter(s=>s.done).length,0), stepTotal:tasks.reduce((n,t)=>n+t.steps.length,0),
    units:tasks.reduce((n,t)=>n+t.quantity,0), unitsLeft:tasks.filter(t=>t.status!=='done').reduce((n,t)=>n+t.quantity,0),
    blocked: tasks.filter(t=>t.status==='blocked').length,
    unestimated: tasks.filter(t=>t.estimate===0&&t.status!=='done').length,
    scenes: new Set(tasks.map(t=>t.scene).filter(Boolean)).size,
  };
}
export function allTasks(w: Workspace, activeOnly = true): TaskWithProject[] { return w.projects.filter(p=>!activeOnly||p.status==='active').flatMap(project=>project.tasks.map(task=>({project,task}))); }
export function priorities(w: Workspace, from=today()) {
  return allTasks(w).filter(({task})=>task.status!=='done').sort((a,b)=>{
    const score = (x:TaskWithProject) => (x.task.priority==='urgent'?80:x.task.priority==='high'?30:0)+ (x.task.status==='blocked'?100:0)+(x.task.status==='review'?50:0)+Math.max(-30,30-daysUntil(x.project.deadline,from))*2+(x.task.status==='doing'?10:0);
    return score(b)-score(a);
  });
}
export const profileName=(profiles:Profile[],id:string)=>profiles.find(p=>p.id===id)?.name||(id==='Prestataire'?'Profil à compléter':id==='Louis'||id==='Vincent'?id:'À attribuer');
export function taskProgress(t:Task){return t.steps.length?Math.round(t.steps.filter(s=>s.done).length/t.steps.length*100):t.status==='done'?100:0;}
export function workRemaining(t:Task){return t.status==='done'?0:(t.steps.length?t.steps.filter(s=>!s.done).length:1)*t.quantity;}
export function withStatus(t:Task,status:Task['status']):Task{
  const now=new Date().toISOString();
  let steps=t.steps.map(s=>status==='done'?{...s,done:true,doneAt:s.doneAt||now}:s);
  if(status!=='done'&&steps.length&&steps.every(s=>s.done)){steps=steps.map((s,i)=>i===steps.length-1?{...s,done:false,doneAt:''}:s);}
  return {...t,status,steps};
}
export function toggleStep(t:Task,id:string):Task{
  const steps=t.steps.map(s=>s.id===id?{...s,done:!s.done,doneAt:s.done?'':new Date().toISOString()}:s);
  const all=steps.length>0&&steps.every(s=>s.done);const any=steps.some(s=>s.done);
  return {...t,steps,status:all?'done':t.status==='blocked'?'blocked':any?'doing':t.status==='done'?'todo':t.status};
}
export function newWorkflow(service:Workflow['service']):Workflow{
  const s=SERVICES.find(s=>s.id===service)!;
  const defaults:Record<string,string[]>={'3d':['decor','anim','light','render','validation'],montage:['derush','montage','export','validation'],motion:['design','anim','render','validation'],sfx:['bruitage','design','mix','export'],post:['qc','delivery']};
  return {service,mode:s.modes[0],count:1,steps:defaults[service],assignee:'',assignments:{}};
}
export function configureProject(project:Project,workflows:Workflow[]):Project{
  const tasks=structuredClone(project.tasks);
  for(const flow of workflows){
    const catalog=SERVICES.find(s=>s.id===flow.service)!;
    for(let i=0;i<flow.count;i++){
      const originKey=`${flow.service}:${flow.mode}:${i+1}`;
      const existing=tasks.find(t=>t.originKey===originKey);
      const steps=flow.steps.map(key=>{const old=existing?.steps.find(s=>s.key===key);return old??{id:uid(),key,label:catalog.steps.find(s=>s.key===key)?.label??key,done:false,assignee:flow.assignments[key]||flow.assignee,indication:'',doneAt:''};});
      if(existing){existing.steps=[...steps,...existing.steps.filter(s=>!steps.some(v=>v.key===s.key))];if(existing.steps.some(s=>!s.done)&&existing.status==='done')existing.status='doing';continue;}
      const prefix=flow.mode==='scene'?'SC.':flow.mode==='fx'?'FX.':flow.mode==='sequence'?'SEQ.':flow.mode==='video'?'VID.':flow.mode==='asset'?'ASSET.':'LIV.';
      const ref=prefix+String(i+1).padStart(2,'0');
      tasks.push(taskSchema.parse({id:uid(),title:(unitLabels[flow.mode]??'Élément').replace(/^./,c=>c.toUpperCase())+' '+String(i+1).padStart(2,'0')+' — '+catalog.short,scene:ref,type:catalog.short,service:flow.service,unit:flow.mode,quantity:1,assignee:flow.assignee,status:'todo',estimate:0,actual:0,blocker:'',notes:'',assetId:'',steps,originKey,indication:''}));
    }
  }
  return {...project,workflows,tasks};
}
export function rebalance(w:Workspace):Workspace{
  const next=structuredClone(w);const eligible=next.profiles.filter(p=>p.active&&p.scope==='internal'&&p.capacity>0);
  if(!eligible.length)return next;
  const loads:Record<string,number>=Object.fromEntries(eligible.map(p=>[p.id,0]));const pool:TaskWithProject[]=[];const mcskyzIds=new Set(next.projects.flatMap(p=>p.mcskyz?.scenes.map(s=>s.id)||[]));
  allTasks(next).forEach(({task,project})=>{const owner=next.profiles.find(p=>p.id===task.assignee);if(project.leadIds.some(id=>id in loads)&&!task.coAssignees.length&&!mcskyzIds.has(task.id)&&task.status==='todo'&&(!owner||owner.scope==='internal'))pool.push({task,project});else{const people=taskAssignees(task);people.forEach(id=>{if(id in loads)loads[id]+=workRemaining(task)/people.length;});}});
  pool.sort((a,b)=>workRemaining(b.task)-workRemaining(a.task)).forEach(({task:t,project})=>{const person=eligible.filter(p=>project.leadIds.includes(p.id)).sort((a,b)=>loads[a.id]/a.capacity-loads[b.id]/b.capacity)[0];const previous=t.assignee;t.assignee=person.id;t.steps=t.steps.map(s=>!s.done&&(!s.assignee||s.assignee===previous)?{...s,assignee:person.id}:s);loads[person.id]+=workRemaining(t);});
  return next;
}
export function migrateWorkspace(input:unknown):Workspace{
  const raw=structuredClone(input) as any;
  if(raw.version===2||raw.version===3||raw.version===4||raw.version===5||raw.version===6||raw.version===7){
    const issuerProfiles=raw.issuerProfiles??((raw.issuer?.name||raw.issuer?.siret)?[{id:'issuer-legacy',label:(raw.issuer.name||'Émetteur actuel').slice(0,80),issuer:raw.issuer}]:[]);
    return workspaceSchema.parse({...raw,version:7,projects:raw.projects.map((p:any)=>({...p,leadIds:p.leadIds??(p.leadId?[p.leadId]:[...new Set(p.tasks.flatMap((t:any)=>[t.assignee,...(t.coAssignees??[]),...(t.steps??[]).map((s:any)=>s.assignee)]).filter(Boolean))]),tasks:p.tasks.map((t:any)=>({...t,description:t.description??p.mcskyz?.scenes?.find((s:any)=>s.id===t.id)?.action??''}))})),issuerProfiles,defaultIssuerId:raw.defaultIssuerId??issuerProfiles[0]?.id??''});
  }
  if(raw.version!==1)throw new Error('Version de sauvegarde inconnue');
  const profiles:Profile[]=defaultProfiles();
  const map=new Map<string,string>([['Louis','louis'],['Vincent','vincent'],['À attribuer',''],['','']]);
  const assign=(name:string)=>{if(map.has(name))return map.get(name)!;const id=name==='Prestataire'?'legacy-provider':'profile-'+profiles.length;profiles.push({id,name:name==='Prestataire'?'Profil à compléter':name,role:name==='Prestataire'?'Modélisation 3D':'Collaboration',color:'#76b3d6',scope:'external',capacity:10,active:true});map.set(name,id);return id;};
  const projects=raw.projects.map((p:any)=>{
    const service:Workflow['service']=p.kind==='Montage'?'montage':p.kind==='Motion design'?'motion':'3d';
    const tasks=p.tasks.map((t:any)=>{const assignee=assign(t.assignee);return taskSchema.parse({...t,assignee,service,unit:t.scene?'scene':service==='3d'?'asset':'livrable',indication:t.notes||'',steps:[{id:t.id+'-step',key:'legacy',label:t.type,done:t.status==='done',assignee,indication:'',doneAt:''}]});});
    const flow=newWorkflow(service);flow.count=0;
    return {...p,leadIds:p.leadIds??(p.leadId?[assign(p.leadId)]:[...new Set(tasks.flatMap((t:Task)=>[...taskAssignees(t),...t.steps.map(s=>s.assignee)]).filter(Boolean))]),workflows:[flow],reminderDays:3,tasks};
  });
  return workspaceSchema.parse({...raw,version:7,profiles,ideaVotes:[],projects});
}
export type DeadlineEvent={id:string;projectId:string;taskId:string;title:string;projectTitle:string;date:string;reminderDays:number;assignees:string[];color:string;demo:boolean;};
export function deadlineEvents(w:Workspace):DeadlineEvent[]{return w.projects.filter(p=>p.status==='active').flatMap(p=>{const assignees=[...new Set(p.tasks.filter(t=>t.status!=='done').flatMap(t=>[...taskAssignees(t),...t.steps.filter(s=>!s.done).map(s=>s.assignee)]).filter(Boolean))];return [{id:p.id,projectId:p.id,taskId:'',title:p.title,projectTitle:p.client,date:p.deadline,reminderDays:p.reminderDays,assignees,color:w.profiles.find(v=>v.id===assignees[0])?.color??'#a7c96b',demo:p.demo},...p.tasks.filter(t=>t.deadline&&t.status!=='done').map(t=>({id:t.id,projectId:p.id,taskId:t.id,title:t.title,projectTitle:p.title,date:t.deadline,reminderDays:p.reminderDays,assignees:[...new Set([...taskAssignees(t),...t.steps.filter(s=>!s.done).map(s=>s.assignee)].filter(Boolean))],color:w.profiles.find(v=>v.id===t.assignee)?.color??'#a7c96b',demo:p.demo}))];});}
export function upcomingDeadlines(w:Workspace,from=today()){return deadlineEvents(w).filter(e=>daysUntil(e.date,from)<=e.reminderDays).sort((a,b)=>a.date.localeCompare(b.date));}
export function calendarICS(w:Workspace){
  const esc=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\r\n|\n|\r/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Explicit Crea//Atelier//FR','CALSCALE:GREGORIAN',...deadlineEvents(w).flatMap(e=>['BEGIN:VEVENT','UID:'+e.id+'@atelier.explicitcrea','DTSTAMP:'+stamp,'DTSTART;VALUE=DATE:'+e.date.replace(/-/g,''),'DTEND;VALUE=DATE:'+plusDays(e.date,1).replace(/-/g,''),'SUMMARY:'+esc(e.title),'DESCRIPTION:'+esc(e.projectTitle+' · Atelier / Explicit Crea'),'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+esc('Échéance : '+e.title),'TRIGGER:-P'+e.reminderDays+'D','END:VALARM','END:VEVENT']),'END:VCALENDAR'];
  const folded=lines.flatMap(line=>{const parts:string[]=[];let part='';let bytes=0;for(const char of line){const size=new TextEncoder().encode(char).length;if(bytes+size>75){parts.push(part);part=' ';bytes=1;}part+=char;bytes+=size;}parts.push(part);return parts;});
  return folded.join('\r\n')+'\r\n';
}
export type ParsedScene = { scene: string; location: string; action: string; complex: boolean; };
const norm = (v:string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export function parseBrief(text: string): ParsedScene[] {
  const lines=text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  const scenes:ParsedScene[]=[];
  const seen=new Set<string>();
  for(const line of lines) {
    const match=line.match(/^(?:sc[eè]ne\s*|sc\.?\s*)?(\d{1,3})\s*(?:[|:.)–—-]|$)\s*(.*)$/i);
    if(!match) continue;
    const scene='SC.'+String(Number(match[1])).padStart(2,'0');
    if(seen.has(scene)) continue;
    seen.add(scene);
    const parts=match[2].split('|').map(v=>v.trim());
    const location=parts.length>=2?parts[0]:'Décor à préciser';
    const action=(parts.length>=2?parts[1]:parts[0])||'Action à préciser';
    const hint=norm(parts.slice(2).join(' '));
    const complex=hint.includes('complexe')||(!hint.includes('simple')&&/course|foule|combat|vehicule|poursuite|explosion/.test(norm(action)));
    scenes.push({scene,location:location.slice(0,140),action:action.slice(0,170),complex});
  }
  return scenes.slice(0,100);
}
export function tasksFromBrief(scenes:ParsedScene[], assets:Asset[]=[], outsource=true):Task[] {
  const tasks:Task[]=[];
  const sets=new Map<string,string>();
  const loads={Louis:0,Vincent:0};
  const add=(title:string,type:Task['type'],estimate:number,scene='',assetId='',assignee?:Task['assignee'])=>{
    const person=assignee??(loads.Louis<=loads.Vincent?'louis':'vincent');
    if(person==='louis'||person==='vincent')loads[person==='louis'?'Louis':'Vincent']+=estimate;
    tasks.push(taskSchema.parse({id:uid(),title,type,estimate,scene,assetId,assignee:person,unit:scene?'scene':type==='Livraison'?'livrable':'asset',status:'todo',actual:0,notes:'Découpage à vérifier avant production.',blocker:'',indication:'À préciser : cadrage, références, livrable.',steps:[{id:uid(),key:'brief',label:type,done:false,assignee:person,indication:'',doneAt:''}]}));
  };
  scenes.forEach(s=>{
    const key=norm(s.location);
    const match=assets.find(a=>a.type==='Décor'&&norm(a.title)===key);
    if(!sets.has(key)){
      const assetId=match?.id??'';
      sets.set(key,assetId);
      add((match?'Adapter : ':'Préparer : ')+s.location,'Décor',match?2:6,'',assetId,outsource?'legacy-provider':undefined);
    }
    add(s.action,'Animation',s.complex?6:3,s.scene,sets.get(key)??'');
    add('Lighting & rendu — '+s.location,'Lighting',1.5,s.scene,sets.get(key)??'');
  });
  if(scenes.length)add('Contrôle image, nomenclature & livraison','Livraison',1.5);
  return tasks;
}
export const briefExample='Scène 01 | Couloir hôtel | Un agent marche vers la porte | simple\nScène 02 | Couloir hôtel | Deux agents courent dans le couloir | complexe\nScène 03 | Chambre hôtel | Inspection de la pièce | simple';
export function projectCSV(project:Project,profiles:Profile[]=defaultProfiles()) {
  const cell=(v:unknown)=>'"'+String(v??'').replace(/"/g,'""').replace(/^[=+@\-\t\r]/,"'$&")+'"';
  const rows=[['Projet','Référence','Élément','Description','Métier','Responsable','Statut','Étapes validées','Étapes totales','Indications','Échéance','Blocage'],...project.tasks.map(t=>[project.title,t.scene,t.title,t.description,serviceLabel(t.service),taskAssignees(t).map(id=>profileName(profiles,id)).join(' · '),statusLabels[t.status],t.steps.filter(s=>s.done).length,t.steps.length,t.indication,t.deadline,t.blocker])];
  return '\uFEFF'+rows.map(r=>r.map(cell).join(';')).join('\r\n');
}
export function handoff(project:Project,person:string,w:Workspace) {
  const tasks=project.tasks.filter(t=>(taskAssignees(t).includes(person)||t.steps.some(s=>s.assignee===person&&!s.done))&&t.status!=='done');
  return `# ${project.title}\nClient : ${project.client}\nLot : ${profileName(w.profiles,person)}\nÉchéance projet : ${dateLabel(project.deadline)}\n${project.link?'Référence : '+project.link+'\n':''}\n## Éléments\n${tasks.map(t=>`- [ ] ${t.scene?t.scene+' · ':''}${t.title}${t.description?'\n  Description : '+t.description:''}${t.indication?'\n  Indications : '+t.indication:''}${t.blocker?'\n  À débloquer : '+t.blocker:''}${t.notes?'\n  Note : '+t.notes:''}\n${t.steps.filter(s=>!s.done&&(!s.assignee||s.assignee===person||(taskAssignees(t).includes(person)&&s.assignee===t.assignee))).map(s=>'  - [ ] '+s.label+(s.indication?' — '+s.indication:'')).join('\n')}${t.assetId?'\n  Asset : '+(w.assets.find(a=>a.id===t.assetId)?.reference||w.assets.find(a=>a.id===t.assetId)?.title||'à confirmer'):''}`).join('\n')}\n\n## Convention proposée\n${norm(project.title).replace(/ /g,'_').toUpperCase()}_SCXX_PLANXX_V001\n\n## Contrôle avant livraison\n- Nommage et version vérifiés\n- Sources / textures présentes\n- Échelle, axes et unités vérifiés\n- Rendu de contrôle et retours intégrés\n\n${project.notes?'## Notes du projet\n'+project.notes:''}`;
}
function createLegacySeed() {
  const base=today();
  const task=(id:string,title:string,type:Task['type'],assignee:Task['assignee'],status:Task['status'],estimate:number,actual=0,scene='',assetId='',blocker='')=>({id,title,type,assignee,status,estimate,actual,scene,assetId,blocker,notes:''});
  return {
    version:1,settings:{dayHours:7,targetDay:300,louisCapacity:30,vincentCapacity:30},
    assets:[
      {id:'asset-couloir',title:'Couloir hôtel',type:'Décor',reference:'PROJETS/LAS_VEGAS/ASSETS/Couloir_Hotel_v03.blend',tags:'modulaire, intérieur, hôtel',notes:'Exemple de fiche : vérifier les droits et les fichiers avant réutilisation.',demo:true},
      {id:'asset-porte',title:'Porte d’hôtel blanche',type:'Prop',reference:'PROJETS/LAS_VEGAS/ASSETS/Porte_Hotel_v02.fbx',tags:'hôtel, bois, variantes',notes:'Prévoir une variante intacte et une variante avec impacts.',demo:true},
      {id:'asset-taxi',title:'Habitacle du taxi',type:'Décor',reference:'PROJETS/AN21EX/ASSETS/Taxi_Interior_v01.blend',tags:'AN21EX, véhicule, stylisé',notes:'Référence fictive pour illustrer la bibliothèque.',demo:true},
      {id:'asset-foule',title:'Festivalier — poses variées',type:'Personnage',reference:'PROJETS/LAS_VEGAS/ASSETS/Crowd/',tags:'foule, marche, course',notes:'Bibliothèque de poses indépendantes ; contrôler silhouettes et répétitions.',demo:true},
    ],
    projects:[
      {id:'project-vegas',title:'Las Vegas',client:'McSkyz · exemple',kind:'3D documentaire',color:'lime',billable:true,budget:5500,externalCosts:800,received:2750,deadline:plusDays(base,5),status:'active',notes:'Projet de démonstration inspiré de ton activité. Budgets, tâches et échéances sont fictifs.',link:'',demo:true,tasks:[
        task('v1','Couloir modulaire & porte','Décor','Prestataire','done',10,9,'','asset-couloir'),
        task('v2','Marche des agents dans le couloir','Animation','Louis','done',5,4.5,'SC.04','asset-couloir'),
        task('v3','Variante de la porte avec impacts','Décor','Prestataire','blocked',4,1,'','asset-porte','Attendre la validation du cadrage avant de finaliser les impacts.'),
        task('v4','Course des festivaliers','Animation','Vincent','doing',9,3,'SC.06','asset-foule'),
        task('v5','Éclairage du couloir','Lighting','Louis','doing',6,2,'SC.04','asset-couloir'),
        task('v6','Inspection de la chambre','Animation','Louis','todo',7,0,'SC.08'),
        task('v7','Déplacement des infirmiers','Animation','Vincent','todo',6,0,'SC.10'),
        task('v8','Rendu et compositing de nuit','Postproduction','Louis','todo',10,0,'SC.06'),
        task('v9','Vérification des exports','Livraison','Vincent','todo',3),
      ]},
      {id:'project-an21ex',title:'AN21EX',client:'Création personnelle · exemple',kind:'Animation',color:'violet',billable:false,budget:1800,externalCosts:150,received:0,deadline:plusDays(base,12),status:'active',notes:'Enveloppe de temps valorisé pour un projet personnel : ce montant n’est pas un revenu réel.',link:'',demo:true,tasks:[
        task('a1','Lookdev du taxi','Décor','Louis','done',8,9,'','asset-taxi'),
        task('a2','Jeu de Micha — séquence taxi','Personnage','Louis','doing',12,3,'SC.01','asset-taxi'),
        task('a3','Caméras & intentions de jeu','Animation','Louis','review',6,5,'SC.01','asset-taxi'),
        task('a4','Lumière froide & compositing','Lighting','Vincent','todo',10,0,'SC.01','asset-taxi'),
        task('a5','Assemblage du pilote','Postproduction','Louis','todo',7),
      ]},
      {id:'project-motion',title:'Identité en mouvement',client:'Client studio · exemple',kind:'Motion design',color:'blue',billable:true,budget:1500,externalCosts:80,received:750,deadline:plusDays(base,8),status:'active',notes:'Exemple de projet court, à remplacer par ton prochain brief.',link:'',demo:true,tasks:[
        task('m1','Recherche graphique','Postproduction','Louis','done',5,4),
        task('m2','Animation du logo','Animation','Vincent','review',7,6),
        task('m3','Déclinaisons verticales','Postproduction','Vincent','todo',6),
        task('m4','Contrôle et livraison','Livraison','Louis','todo',2),
      ]},
    ],
  };
}

export function createSeed():Workspace{return migrateWorkspace(createLegacySeed());}

import { env } from '@/lib/vercel-runtime';
import { workspaceSchema, migrateWorkspace } from './studio';
import { blankIssuer } from './workspace-extras';
import type { ChatGPTUser } from '../app/chatgpt-auth';
export type AgencyRole='owner'|'editor'|'viewer';
export type AgencyAccess={id:string;name:string;workspace_key:string;owner_id:string;role:AgencyRole};
export type AccountContext={userId:string;email:string;name:string;function:string;profileId:string;agency:AgencyAccess;agencies:AgencyAccess[]};
export class AccessError extends Error{constructor(message:string,public status=403){super(message);}}
const db=()=>{if(!env.DB)throw new Error('Base indisponible');return env.DB;};
export function emptyWorkspace(name:string){return workspaceSchema.parse({version:7,profiles:[{id:crypto.randomUUID(),name:name||'Mon profil',role:'Création & production',color:'#aa8cdb',scope:'internal',capacity:10,active:true}],projects:[],assets:[],issuer:blankIssuer(),settings:{dayHours:7,targetDay:300,louisCapacity:30,vincentCapacity:30}});}
export async function ensureAccount(user:ChatGPTUser):Promise<void>{
  const existing=await db().prepare('SELECT user_id FROM atelier_accounts WHERE user_id=?').bind(user.userId).first();if(existing)return;
  const legacy=await db().prepare('SELECT user_id FROM studio_workspaces WHERE user_id=?').bind(user.userId).first();
  if(!legacy)throw new AccessError('Atelier est accessible sur invitation. Demande un lien au responsable de ton agence.');
  const id='agency-'+user.userId;const now=new Date().toISOString();const name=(user.fullName|| (legacy?'Louis':user.email.split('@')[0])||'Mon profil').slice(0,80);
  await db().batch([
    db().prepare('INSERT OR IGNORE INTO atelier_accounts (user_id,email,name,function,active_agency,created_at) VALUES (?,?,?,?,?,?)').bind(user.userId,user.email,name,legacy?'Direction & création':'Création & production',id,now),
    db().prepare('INSERT OR IGNORE INTO atelier_agencies (id,name,workspace_key,owner_id,created_at) VALUES (?,?,?,?,?)').bind(id,legacy?'Explicit Crea':'Mon agence',user.userId,user.userId,now),
    db().prepare('INSERT OR IGNORE INTO atelier_memberships (id,agency_id,user_id,role,joined_at) VALUES (?,?,?,?,?)').bind(id+'::'+user.userId,id,user.userId,'owner',now),
    db().prepare('INSERT OR IGNORE INTO studio_workspaces (user_id,content,revision,updated_at) VALUES (?,?,0,?)').bind(user.userId,JSON.stringify(emptyWorkspace(name)),now),
  ]);
}
export async function accountContext(user:ChatGPTUser,requested?:string|null):Promise<AccountContext>{
  await ensureAccount(user);
  const account=await db().prepare('SELECT name,function,active_agency FROM atelier_accounts WHERE user_id=?').bind(user.userId).first<{name:string;function:string;active_agency:string}>();
  const result=await db().prepare('SELECT a.id,a.name,a.workspace_key,a.owner_id,m.role FROM atelier_agencies a JOIN atelier_memberships m ON m.agency_id=a.id WHERE m.user_id=? ORDER BY a.created_at').bind(user.userId).all<AgencyAccess>();
  const list=result.results;const id=requested||account?.active_agency;const agency=list.find(a=>a.id===id)||(!requested?list[0]:undefined);
  if(!agency)throw new AccessError('Tu n’as pas accès à cette agence.');
  const profileId=await ensureProductionProfile(user,agency,account?.name||user.fullName||user.email.split('@')[0],account?.function||'Création & production');
  return {profileId,userId:user.userId,email:user.email,name:account?.name||'',function:account?.function||'',agency,agencies:list};
}
export function requireEditor(ctx:AccountContext){if(ctx.agency.role==='viewer')throw new AccessError('Cet accès permet la lecture. Demande un accès éditeur au propriétaire.');}
export function requireOwner(ctx:AccountContext){if(ctx.agency.role!=='owner')throw new AccessError('Seul le propriétaire peut gérer les accès et émettre les factures.');}
export async function updateAccount(user:ChatGPTUser,name:string,fn:string){await ensureAccount(user);await db().prepare('UPDATE atelier_accounts SET name=?,function=?,email=? WHERE user_id=?').bind(name,fn,user.email,user.userId).run();}
export async function selectAgency(user:ChatGPTUser,id:string){await accountContext(user,id);await db().prepare('UPDATE atelier_accounts SET active_agency=? WHERE user_id=?').bind(id,user.userId).run();}
export async function createAgency(user:ChatGPTUser,name:string){await ensureAccount(user);const id=crypto.randomUUID(),key='workspace-'+id,now=new Date().toISOString();const ctx=await accountContext(user);await db().batch([
  db().prepare('INSERT INTO atelier_agencies (id,name,workspace_key,owner_id,created_at) VALUES (?,?,?,?,?)').bind(id,name,key,user.userId,now),
  db().prepare('INSERT INTO atelier_memberships (id,agency_id,user_id,role,joined_at) VALUES (?,?,?,?,?)').bind(id+'::'+user.userId,id,user.userId,'owner',now),
  db().prepare('INSERT INTO studio_workspaces (user_id,content,revision,updated_at) VALUES (?,?,0,?)').bind(key,JSON.stringify(emptyWorkspace(ctx.name)),now),
  db().prepare('UPDATE atelier_accounts SET active_agency=? WHERE user_id=?').bind(id,user.userId),
]);return id;}
export async function listMembers(ctx:AccountContext){const result=await db().prepare('SELECT m.user_id,m.role,m.joined_at,m.profile_id,a.name,a.function,a.email FROM atelier_memberships m JOIN atelier_accounts a ON a.user_id=m.user_id WHERE m.agency_id=? ORDER BY m.joined_at').bind(ctx.agency.id).all();return result.results;}
const hash=async(value:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(v=>v.toString(16).padStart(2,'0')).join('');
export async function createInvite(ctx:AccountContext,role:'editor'|'viewer',email:string,profileId=''){requireOwner(ctx);if(profileId)await validateProfileLink(ctx,profileId); const token=crypto.randomUUID()+crypto.randomUUID();const now=new Date(),expires=new Date(now.getTime()+7*86400000).toISOString();const tokenHash=await hash(token);await db().prepare('INSERT INTO atelier_invitations (token_hash,agency_id,email,role,expires_at,created_by,created_at,profile_id) VALUES (?,?,?,?,?,?,?,?)').bind(tokenHash,ctx.agency.id,email.toLowerCase(),role,expires,ctx.userId,now.toISOString(),profileId||null).run();return {token,expires,tokenHash};}
export async function previewInvite(token:string){const row=await db().prepare('SELECT i.agency_id,a.name,i.role,i.email,i.expires_at,i.used_by,i.revoked FROM atelier_invitations i JOIN atelier_agencies a ON a.id=i.agency_id WHERE i.token_hash=?').bind(await hash(token)).first<{agency_id:string;name:string;role:string;email:string;expires_at:string;used_by:string|null;revoked:number;profile_id:string|null}>();if(!row||row.used_by||row.revoked||row.expires_at<=new Date().toISOString())throw new AccessError('Ce lien a expiré, a déjà été utilisé ou a été révoqué.',410);return {name:row.name,role:row.role,restricted:!!row.email,expires:row.expires_at};}
export async function acceptInvite(user:ChatGPTUser,token:string){const tokenHash=await hash(token),now=new Date().toISOString();const row=await db().prepare('SELECT agency_id,email,role,expires_at,used_by,revoked,profile_id FROM atelier_invitations WHERE token_hash=?').bind(tokenHash).first<{agency_id:string;email:string;role:string;expires_at:string;used_by:string|null;revoked:number;profile_id:string|null}>();if(!row||row.used_by||row.revoked||row.expires_at<=now)throw new AccessError('Ce lien n’est plus disponible.',410);if(row.email&&row.email.toLowerCase()!==user.email.toLowerCase())throw new AccessError('Cette invitation est réservée à une autre adresse de connexion.');
  if(row.profile_id){const used=await db().prepare('SELECT user_id FROM atelier_memberships WHERE agency_id=? AND profile_id=? AND user_id<>?').bind(row.agency_id,row.profile_id,user.userId).first();if(used)throw new AccessError('Ce profil a déjà été relié à un autre compte. Demande une nouvelle invitation.',409);}
  const result=await db().batch([
    db().prepare('INSERT OR IGNORE INTO atelier_accounts (user_id,email,name,function,active_agency,created_at) VALUES (?,?,?,?,?,?)').bind(user.userId,user.email,(user.fullName||user.email.split('@')[0]).slice(0,80),'Création & production',row.agency_id,now),
    db().prepare('UPDATE atelier_invitations SET used_by=? WHERE token_hash=? AND used_by IS NULL AND revoked=0 AND expires_at>?').bind(user.userId,tokenHash,now),
    db().prepare('INSERT OR IGNORE INTO atelier_memberships (id,agency_id,user_id,role,joined_at,profile_id) SELECT ?,agency_id,?,role,?,profile_id FROM atelier_invitations WHERE token_hash=? AND used_by=?').bind(row.agency_id+'::'+user.userId,user.userId,now,tokenHash,user.userId),
  ]);if(result[1].meta.changes!==1)throw new AccessError('Cette invitation vient d’être utilisée.',409);await selectAgency(user,row.agency_id);return row.agency_id;
}
export async function invitationList(ctx:AccountContext){requireOwner(ctx);const result=await db().prepare('SELECT token_hash,email,role,expires_at,used_by,revoked FROM atelier_invitations WHERE agency_id=? ORDER BY created_at DESC LIMIT 50').bind(ctx.agency.id).all();return result.results;}
export async function revokeInvite(ctx:AccountContext,hash:string){requireOwner(ctx);await db().prepare('UPDATE atelier_invitations SET revoked=1 WHERE token_hash=? AND agency_id=?').bind(hash,ctx.agency.id).run();}
export async function changeMember(ctx:AccountContext,userId:string,role:'editor'|'viewer'|'remove'){requireOwner(ctx);if(userId===ctx.agency.owner_id)throw new AccessError('Le propriétaire doit conserver son accès.');if(role==='remove')await db().prepare('DELETE FROM atelier_memberships WHERE agency_id=? AND user_id=? AND role<>?').bind(ctx.agency.id,userId,'owner').run();else await db().prepare('UPDATE atelier_memberships SET role=? WHERE agency_id=? AND user_id=? AND role<>?').bind(role,ctx.agency.id,userId,'owner').run();}

async function ensureProductionProfile(user:ChatGPTUser,agency:AgencyAccess,name:string,fn:string){
 const binding=await db().prepare('SELECT profile_id FROM atelier_memberships WHERE agency_id=? AND user_id=?').bind(agency.id,user.userId).first<{profile_id:string|null}>();
 const id=binding?.profile_id||'member-'+await hash(user.userId);
 const bind=async(profileId:string)=>{await db().prepare('UPDATE atelier_memberships SET profile_id=? WHERE agency_id=? AND user_id=?').bind(profileId,agency.id,user.userId).run();return profileId;};
 for(let attempt=0;attempt<4;attempt++){
  const row=await db().prepare('SELECT content,revision FROM studio_workspaces WHERE user_id=?').bind(agency.workspace_key).first<{content:string;revision:number}>();
  if(!row)throw new AccessError('L’espace de cette agence est indisponible.',503);
  const workspace=migrateWorkspace(JSON.parse(row.content));
  if(binding?.profile_id&&workspace.profiles.some(p=>p.id===id))return id;
  if(agency.owner_id===user.userId)return bind(workspace.profiles[0].id);
  if(workspace.profiles.some(p=>p.id===id))return bind(id);
  if(workspace.profiles.length>=80)throw new AccessError('L’agence a atteint 80 profils. Le responsable doit libérer un profil avant cette connexion.',409);
  workspace.profiles.push({id,name,role:fn||'Création & production',color:'#aa8cdb',scope:'internal',capacity:10,active:true});
  const result=await db().prepare('UPDATE studio_workspaces SET content=?,revision=revision+1,updated_at=? WHERE user_id=? AND revision=?').bind(JSON.stringify(workspace),new Date().toISOString(),agency.workspace_key,row.revision).run();
  if(result.meta.changes===1)return bind(id);
 }
 throw new AccessError('L’agence est en cours de modification. Réessaie la connexion.',409);
}

async function validateProfileLink(ctx:AccountContext,profileId:string,userId=''){
 const row=await db().prepare('SELECT content FROM studio_workspaces WHERE user_id=?').bind(ctx.agency.workspace_key).first<{content:string}>();
 if(!row||!migrateWorkspace(JSON.parse(row.content)).profiles.some(p=>p.id===profileId))throw new AccessError('Profil introuvable dans cette agence.',400);
 const used=await db().prepare('SELECT user_id FROM atelier_memberships WHERE agency_id=? AND profile_id=? AND user_id<>?').bind(ctx.agency.id,profileId,userId).first();
 if(used)throw new AccessError('Ce profil est déjà lié à un autre compte.',409);
}
export async function linkMemberProfile(ctx:AccountContext,userId:string,profileId:string){requireOwner(ctx);await validateProfileLink(ctx,profileId,userId);await db().prepare('UPDATE atelier_memberships SET profile_id=? WHERE agency_id=? AND user_id=?').bind(profileId,ctx.agency.id,userId).run();}

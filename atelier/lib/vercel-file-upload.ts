import {get,del} from '@vercel/blob';
import {accountContext,requireEditor,AccessError} from './agencies';
import {apiUser,jsonBody} from './api';
import {env} from './vercel-runtime';
import {boundedBody,validateFileBytes} from './project-files';
export async function finalizeUpload(request:Request){const user=await apiUser(request,true),q=new URL(request.url).searchParams,ctx=await accountContext(user,q.get('agency'));requireEditor(ctx);const b=await jsonBody(request,4000),project=q.get('project')||'';const row=await env.DB.prepare('SELECT content FROM studio_workspaces WHERE user_id=?').bind(ctx.agency.workspace_key).first<{content:string}>();if(!row||!JSON.parse(row.content).projects.some((p:any)=>p.id===project))throw new AccessError('Projet indisponible.',404);
 if(typeof b.id!=='string'||!(/^[0-9a-f-]{36}$/.test(b.id))||!['pdf','image','page'].includes(b.kind))throw new AccessError('Fichier invalide.',400);const key='briefs/'+ctx.agency.id+'/'+project+'/'+b.id;
 const existing=await env.DB.prepare('SELECT id FROM atelier_project_files WHERE id=? AND agency_id=? AND project_id=?').bind(b.id,ctx.agency.id,project).first();if(existing)throw new AccessError('Ce fichier est déjà enregistré.',409);
 const f=await get(key,{access:'private',useCache:false});if(!f||f.statusCode!==200)throw new AccessError('Envoi incomplet. Réessaie.',404);
 const bytes=await boundedBody(new Request('https://files.local',{method:'POST',body:f.stream,duplex:'half'} as RequestInit),b.kind==='pdf'?25*1024*1024:2*1024*1024);const mime=f.blob.contentType;validateFileBytes(bytes,mime,b.kind);
 const width=Number(b.width||0),height=Number(b.height||0),page=Number(b.page||0);if(![width,height,page].every(Number.isInteger)||b.kind!=='pdf'&&(width<1||height<1||width>4096||height>4096||page<1||page>120))throw new AccessError('Dimensions invalides.',400);const name=String(b.name||'Brief.pdf').replace(/[\x00-\x1f\x7f]/g,'').slice(0,250);
 try{await env.DB.prepare('INSERT INTO atelier_project_files (id,agency_id,project_id,object_key,name,mime,kind,size_bytes,width,height,page_number,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(b.id,ctx.agency.id,project,key,name,mime,b.kind,bytes.length,width,height,page,new Date().toISOString()).run();}catch(e){await del(key);throw e;}return {id:b.id,name,mime,kind:b.kind,size:bytes.length,width,height,page};}

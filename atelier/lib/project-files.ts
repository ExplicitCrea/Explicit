import {env} from '@/lib/vercel-runtime';
import {AccessError,requireEditor,type AccountContext} from './agencies';
import {type ProjectFile} from './brief-types';
const db=()=>{if(!env.DB)throw new Error('Base indisponible');return env.DB;};
const bucket=()=>{if(!env.BUCKET)throw new AccessError('Le stockage des fichiers est temporairement indisponible.',503);return env.BUCKET;};
type FileRow={id:string;agency_id:string;project_id:string;object_key:string;name:string;mime:string;kind:ProjectFile['kind'];size_bytes:number;width:number;height:number;page_number:number};
const present=(r:FileRow):ProjectFile=>({id:r.id,name:r.name,mime:r.mime,kind:r.kind,size:r.size_bytes,width:r.width,height:r.height,page:r.page_number});
async function workspace(ctx:AccountContext){const row=await db().prepare('SELECT content FROM studio_workspaces WHERE user_id=?').bind(ctx.agency.workspace_key).first<{content:string}>();return row?JSON.parse(row.content):{projects:[]};}
async function rowFor(ctx:AccountContext,id:string){const row=await db().prepare('SELECT * FROM atelier_project_files WHERE id=? AND agency_id=?').bind(id,ctx.agency.id).first<FileRow>();if(!row)throw new AccessError('Fichier introuvable dans cette agence.',404);return row;}
export async function boundedBody(request:Request,max:number){const declared=Number(request.headers.get('content-length'));if(declared>max)throw new AccessError('Fichier trop volumineux.',413);if(!request.body)throw new AccessError('Fichier vide.',400);const reader=request.body.getReader();const chunks:Uint8Array[]=[];let length=0;try{for(;;){const {value,done}=await reader.read();if(done)break;length+=value.byteLength;if(length>max){await reader.cancel();throw new AccessError('Fichier trop volumineux.',413);}chunks.push(value);}}finally{reader.releaseLock();}if(!length)throw new AccessError('Fichier vide.',400);const bytes=new Uint8Array(length);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}return bytes;}
export function validateFileBytes(bytes:Uint8Array,mime:string,kind:ProjectFile['kind']){
 if(kind==='pdf'){if(mime!=='application/pdf'||!new TextDecoder().decode(bytes.slice(0,1024)).includes('%PDF-'))throw new AccessError('Le fichier n’est pas un PDF valide.',400);return;}
 const png=[137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n),jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255,webp=new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
 if(!(mime==='image/png'&&png||mime==='image/jpeg'&&jpg||mime==='image/webp'&&webp))throw new AccessError('Image non prise en charge.',400);
}
export async function uploadProjectFile(ctx:AccountContext,projectId:string,kind:ProjectFile['kind'],request:Request):Promise<ProjectFile>{
 requireEditor(ctx);if(!(await workspace(ctx)).projects?.some((p:{id:string})=>p.id===projectId))throw new AccessError('Enregistre ce projet avant d’ajouter un PDF.',404);
 const mime=(request.headers.get('content-type')||'').split(';')[0];const bytes=await boundedBody(request,kind==='pdf'?25*1024*1024:2*1024*1024);validateFileBytes(bytes,mime,kind);
 let name=kind==='pdf'?'Brief.pdf':'Visuel.webp';try{name=decodeURIComponent(request.headers.get('x-file-name')||name).replace(/[\x00-\x1f\x7f]/g,'').slice(0,250).replace(/[\uD800-\uDBFF]$/,'')||name;}catch{}
 const width=Number(request.headers.get('x-image-width')||0),height=Number(request.headers.get('x-image-height')||0),page=Number(request.headers.get('x-page-number')||0);
 if(![width,height,page].every(Number.isInteger)||kind!=='pdf'&&(width<1||height<1||width>4096||height>4096||page<1||page>120))throw new AccessError('Dimensions du visuel invalides.',400);
 const id=crypto.randomUUID(),key='briefs/'+ctx.agency.id+'/'+projectId+'/'+id;
 await bucket().put(key,bytes,{httpMetadata:{contentType:mime}});
 try{await db().prepare('INSERT INTO atelier_project_files (id,agency_id,project_id,object_key,name,mime,kind,size_bytes,width,height,page_number,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,ctx.agency.id,projectId,key,name,mime,kind,bytes.length,width,height,page,new Date().toISOString()).run();}catch(e){await bucket().delete(key);throw e;}
 return {id,name,mime,kind,size:bytes.length,width,height,page};
}
export async function readProjectFile(ctx:AccountContext,id:string,download=false){const file=await rowFor(ctx,id);const object=await bucket().get(file.object_key);if(!object)throw new AccessError('Ce fichier n’est plus disponible.',404);const attachment=download||file.kind==='pdf';return new Response(object.body,{headers:{'Content-Type':file.mime,'Content-Length':String(file.size_bytes),'Content-Disposition':(attachment?'attachment':'inline')+`; filename*=UTF-8''`+encodeURIComponent(file.name),'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Cross-Origin-Resource-Policy':'same-origin'}});}
export async function deleteProjectFile(ctx:AccountContext,id:string){requireEditor(ctx);const file=await rowFor(ctx,id);const w=await workspace(ctx);const used=w.projects?.some((p:any)=>p.briefs?.some((d:any)=>d.fileId===id||d.modules?.some((m:any)=>m.images?.some((im:any)=>im.fileId===id))));if(used)throw new AccessError('Ce fichier est encore utilisé par un brief. Enregistre son retrait avant de le supprimer.',409);await bucket().delete(file.object_key);await db().prepare('DELETE FROM atelier_project_files WHERE id=? AND agency_id=?').bind(id,ctx.agency.id).run();}

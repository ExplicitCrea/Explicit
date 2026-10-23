import {finalizeUpload} from '../../../lib/vercel-file-upload';
import {apiUser,apiFailure,noStore} from '../../../lib/api';
import {accountContext,AccessError} from '../../../lib/agencies';
import {readProjectFile,uploadProjectFile,deleteProjectFile} from '../../../lib/project-files';
export const dynamic='force-dynamic';
const identifier=(v:string|null)=>{if(!v||v.length>180)throw new AccessError('Référence de fichier invalide.',400);return v;};
export async function GET(request:Request){try{const user=await apiUser(request);const q=new URL(request.url).searchParams;return await readProjectFile(await accountContext(user,q.get('agency')),identifier(q.get('id')),q.get('download')==='1');}catch(e){return apiFailure(e);}}
export async function POST(request:Request){try{if(request.headers.get('content-type')?.startsWith('application/json'))return Response.json(await finalizeUpload(request),{headers:noStore});const user=await apiUser(request,true);const q=new URL(request.url).searchParams,kind=q.get('kind');if(kind!=='pdf'&&kind!=='image'&&kind!=='page')throw new AccessError('Type de fichier invalide.',400);const ctx=await accountContext(user,q.get('agency'));return Response.json(await uploadProjectFile(ctx,identifier(q.get('project')),kind,request),{headers:noStore});}catch(e){return apiFailure(e);}}
export async function DELETE(request:Request){try{const user=await apiUser(request,true);const q=new URL(request.url).searchParams;await deleteProjectFile(await accountContext(user,q.get('agency')),identifier(q.get('id')));return Response.json({ok:true},{headers:noStore});}catch(e){return apiFailure(e);}}

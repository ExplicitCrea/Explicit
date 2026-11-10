import {apiUser,apiFailure,noStore} from '../../../../../lib/api';
import {accountContext,AccessError} from '../../../../../lib/agencies';
import {radarUiFile,radarHtml} from '../../../../../lib/radar/ui';
export const dynamic='force-dynamic';
export async function GET(request:Request,{params}:{params:Promise<{asset:string}>}){
 try{
  const user=await apiUser(request),url=new URL(request.url),ctx=await accountContext(user,url.searchParams.get('agency'));
  const {asset}=await params,file=await radarUiFile(asset);if(!file)throw new AccessError('Page Radar introuvable.',404);
  if(!asset.endsWith('.html'))return new Response(new Uint8Array(file.bytes),{headers:{...noStore,'Content-Type':file.type,'X-Content-Type-Options':'nosniff'}});
  const result=radarHtml(file.bytes.toString('utf8'),{agencyId:ctx.agency.id,readOnly:ctx.agency.role==='viewer',theme:url.searchParams.get('theme')==='light'?'light':'dark',view:['map','list','jobs','audit','engine'].includes(url.searchParams.get('view')||'')?url.searchParams.get('view')!:'map'});
  return new Response(result.html,{headers:{...noStore,'Content-Type':'text/html; charset=utf-8','X-Frame-Options':'SAMEORIGIN','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'none'; script-src 'self' 'nonce-"+result.nonce+"'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data: blob:; font-src 'self'; base-uri 'self'; frame-ancestors 'self'; form-action 'none';"}});
 }catch(e){return apiFailure(e);}
}

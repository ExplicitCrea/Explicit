import {apiUser,apiFailure,jsonBody,noStore} from '../../../../lib/api';
import {accountContext,requireEditor,AccessError} from '../../../../lib/agencies';
import {radarDatabase,syncLegacyRadar} from '../../../../lib/radar/service';
import {loadRadarState,saveRadarState,scanSnapshot,networkSnapshot,runRadarScan} from '../../../../lib/radar/store';
import {radarStateSchema} from '../../../../lib/radar/types';
export const dynamic='force-dynamic';
export const maxDuration=120;
type Context={params:Promise<{action:string}>};
async function context(request:Request,write=false){const user=await apiUser(request,write);const ctx=await accountContext(user,new URL(request.url).searchParams.get('agency'));if(write)requireEditor(ctx);return ctx;}
export async function GET(request:Request,{params}:Context){
 try{
  const ctx=await context(request),{action}=await params,db=await radarDatabase();
  if(action==='state')return Response.json({...await loadRadarState(db,ctx.agency.id),readOnly:ctx.agency.role==='viewer'},{headers:noStore});
  if(action!=='scanner'&&action!=='network')throw new AccessError('Service Radar introuvable.',404);
  const notice=await syncLegacyRadar(db,ctx.agency),snapshot=await scanSnapshot(db,ctx.agency.id);snapshot.notice=notice;snapshot.readOnly=ctx.agency.role==='viewer';
  return Response.json(action==='network'?networkSnapshot(snapshot):snapshot,{headers:noStore});
 }catch(e){return apiFailure(e);}
}
export async function PUT(request:Request,{params}:Context){
 try{
  const ctx=await context(request,true);if((await params).action!=='state')throw new AccessError('Service Radar introuvable.',404);
  const body=await jsonBody(request,2000000),state=radarStateSchema.safeParse(body.state);
  if(!state.success||!Number.isSafeInteger(body.revision)||body.revision<0)throw new AccessError('Sauvegarde Radar invalide.',400);
  const saved=await saveRadarState(await radarDatabase(),ctx.agency.id,state.data,body.revision);
  if(!saved)throw new AccessError('Le suivi a été modifié par un collaborateur. Recharge les données avant de réessayer.',409);
  return Response.json(saved,{headers:noStore});
 }catch(e){return apiFailure(e);}
}
export async function POST(request:Request,{params}:Context){
 try{
  const ctx=await context(request,true);if((await params).action!=='scans')throw new AccessError('Service Radar introuvable.',404);
  const db=await radarDatabase();await syncLegacyRadar(db,ctx.agency);
  return Response.json(await runRadarScan(db,ctx.agency.id),{headers:noStore});
 }catch(e){return apiFailure(e);}
}

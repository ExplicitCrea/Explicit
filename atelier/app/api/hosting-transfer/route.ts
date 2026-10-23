import {isAtelierRequestOrigin} from '../../../lib/public-origin';
import {transferStatus,transferStep} from '../../../lib/hosting-transfer';
export const dynamic='force-dynamic';export const maxDuration=300;
export async function GET(){try{return Response.json(await transferStatus(),{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'Accès réservé au propriétaire vérifié.'},{status:403});}}
export async function POST(request:Request){if(!isAtelierRequestOrigin(request,true))return Response.json({error:'Origine refusée.'},{status:403});try{return Response.json(await transferStep(),{headers:{'Cache-Control':'no-store'}});}catch(e){return Response.json({error:e instanceof Error?e.message:'Transfert indisponible.'},{status:503,headers:{'Cache-Control':'no-store'}});}}

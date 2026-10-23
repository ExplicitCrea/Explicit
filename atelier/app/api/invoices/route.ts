import { z } from 'zod';
import { apiUser,jsonBody,apiFailure,noStore } from '../../../lib/api';
import { accountContext,AccessError } from '../../../lib/agencies';
import { invoiceLedger,configureSequence,issueInvoice } from '../../../lib/invoice-storage';
import { invoiceDraftSchema } from '../../../lib/workspace-extras';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{const user=await apiUser(request);const ctx=await accountContext(user,new URL(request.url).searchParams.get('agency'));return Response.json(await invoiceLedger(ctx),{headers:noStore});}catch(e){return apiFailure(e);}}
export async function POST(request:Request){try{const user=await apiUser(request,true);const body=await jsonBody(request,200000);const ctx=await accountContext(user,body.agency);
  if(body.action==='configure'){const p=z.object({year:z.number().int().min(2020).max(2100),prefix:z.string().regex(/^[A-Za-z0-9-]{1,30}$/),next:z.number().int().min(1).max(999999),siret:z.string().regex(/^\d{14}$/)}).parse(body);await configureSequence(ctx,p.year,p.prefix,p.next,p.siret);return Response.json({ok:true},{headers:noStore});}
  if(body.action==='issue')return Response.json(await issueInvoice(ctx,invoiceDraftSchema.parse(body.draft)),{headers:noStore});
  throw new AccessError('Action inconnue.',400);
}catch(e){if(e instanceof z.ZodError)return Response.json({error:'Vérifie les informations de facturation.'},{status:400,headers:noStore});return apiFailure(e);}}

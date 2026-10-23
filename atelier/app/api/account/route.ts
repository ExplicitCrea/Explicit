import { z } from 'zod';
import { apiUser,jsonBody,apiFailure,noStore } from '../../../lib/api';
import { accountContext,updateAccount,createAgency,selectAgency,listMembers,createInvite,acceptInvite,previewInvite,invitationList,revokeInvite,changeMember,requireOwner,linkMemberProfile,AccessError } from '../../../lib/agencies';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{const user=await apiUser(request);const params=new URL(request.url).searchParams;if(params.get('invite'))return Response.json(await previewInvite(params.get('invite')!),{headers:noStore});const ctx=await accountContext(user,params.get('agency'));return Response.json({context:ctx,members:await listMembers(ctx),invitations:ctx.agency.role==='owner'?await invitationList(ctx):[]},{headers:noStore});}catch(e){return apiFailure(e);}}
export async function POST(request:Request){try{const user=await apiUser(request,true);const body=await jsonBody(request);const action=z.enum(['profile','create','switch','invite','accept','revoke','member','rename','link']).safeParse(body.action);if(!action.success)throw new AccessError('Action inconnue.',400);
  if(action.data==='profile'){const p=z.object({name:z.string().trim().min(1).max(80),function:z.string().trim().max(140)}).parse(body);await updateAccount(user,p.name,p.function);}
  if(action.data==='create'){const name=z.string().trim().min(1).max(100).parse(body.name);const id=await createAgency(user,name);return Response.json({agencyId:id},{headers:noStore});}
  if(action.data==='switch'){await selectAgency(user,z.string().min(1).max(180).parse(body.agency));}
  if(action.data==='accept'){const id=await acceptInvite(user,z.string().min(40).max(200).parse(body.token));return Response.json({agencyId:id},{headers:noStore});}
  if(['invite','revoke','member','rename','link'].includes(action.data)){const ctx=await accountContext(user,body.agency);requireOwner(ctx);
    if(action.data==='invite'){const p=z.object({role:z.enum(['editor','viewer']),email:z.union([z.string().email().max(180),z.literal('')])}).parse(body);return Response.json(await createInvite(ctx,p.role,p.email,z.string().max(180).optional().parse(body.profileId)||''),{headers:noStore});}
    if(action.data==='revoke')await revokeInvite(ctx,z.string().length(64).parse(body.tokenHash));
    if(action.data==='member'){const p=z.object({userId:z.string().max(180),role:z.enum(['editor','viewer','remove'])}).parse(body);await changeMember(ctx,p.userId,p.role);}
    if(action.data==='link')await linkMemberProfile(ctx,z.string().min(1).max(180).parse(body.userId),z.string().min(1).max(180).parse(body.profileId));
    if(action.data==='rename'){const {env}=await import('@/lib/vercel-runtime');await env.DB!.prepare('UPDATE atelier_agencies SET name=? WHERE id=?').bind(z.string().trim().min(1).max(100).parse(body.name),ctx.agency.id).run();}
  }
  return Response.json({ok:true},{headers:noStore});
}catch(e){if(e instanceof z.ZodError)return Response.json({error:'Vérifie les informations saisies.'},{status:400,headers:noStore});return apiFailure(e);}}

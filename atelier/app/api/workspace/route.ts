import { getChatGPTUser } from '../../chatgpt-auth';
import { loadWorkspace, saveWorkspace } from '../../../lib/storage';
import { workspaceSchema } from '../../../lib/studio';
import { accountContext, requireEditor, AccessError } from '../../../lib/agencies';
export const dynamic='force-dynamic';
const noStore={'Cache-Control':'no-store'};
export async function GET(request?:Request) {
  const user=await getChatGPTUser();
  if(!user) return Response.json({error:'Connecte-toi pour retrouver ton studio.'},{status:401,headers:noStore});
  try { const context=await accountContext(user,request?new URL(request.url).searchParams.get('agency'):null);return Response.json({...await loadWorkspace(context.agency.workspace_key),context},{headers:noStore}); }
  catch(e) { return Response.json({error:e instanceof AccessError?e.message:'Impossible de charger la sauvegarde. Réessaie dans un instant.'},{status:e instanceof AccessError?e.status:503,headers:noStore}); }
}
export async function PUT(request:Request) {
  const user=await getChatGPTUser();
  if(!user) return Response.json({error:'Ta session a expiré. Reconnecte-toi.'},{status:401,headers:noStore});
  const origin=request.headers.get('origin');
  if(origin&&origin!==new URL(request.url).origin) return Response.json({error:'Origine refusée.'},{status:403,headers:noStore});
  try {
    const context=await accountContext(user,new URL(request.url).searchParams.get('agency'));requireEditor(context);
    const body=await request.text();
    if(body.length>6000000) return Response.json({error:'Ton studio dépasse la taille autorisée.'},{status:413,headers:noStore});
    const data=JSON.parse(body);
    if([1,2,3,4,5,6].includes(data.workspace?.version))return Response.json({error:'Atelier a évolué. Exporte tes changements locaux, puis actualise la page pour charger la nouvelle version.'},{status:409,headers:noStore});
    const parsed=workspaceSchema.safeParse(data.workspace);
    if(!parsed.success||!Number.isInteger(data.revision)||data.revision<0) return Response.json({error:'Données invalides. Exporte une copie puis vérifie les champs saisis.'},{status:400,headers:noStore});
    const saved=await saveWorkspace(context.agency.workspace_key,parsed.data,data.revision);
    if(!saved) return Response.json({error:'Ce studio a été modifié dans une autre fenêtre. Exporte ta copie avant de charger la version enregistrée.'},{status:409,headers:noStore});
    return Response.json(saved,{headers:noStore});
  } catch(e) { return Response.json({error:e instanceof AccessError?e.message:'La sauvegarde n’a pas abouti. Garde cette page ouverte et réessaie.'},{status:e instanceof AccessError?e.status:503,headers:noStore}); }
}

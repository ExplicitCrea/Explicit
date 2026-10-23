import {isAtelierRequestOrigin} from './public-origin';
import { getChatGPTUser } from '../app/chatgpt-auth';
import { AccessError } from './agencies';
export const noStore={'Cache-Control':'no-store'};
export async function apiUser(request:Request,write=false){const user=await getChatGPTUser();if(!user)throw new AccessError('Connecte-toi pour retrouver Atelier.',401);if(write){if(!isAtelierRequestOrigin(request))throw new AccessError('Origine refusée.');}return user;}
export async function jsonBody(request:Request,max=150000){const body=await request.text();if(body.length>max)throw new AccessError('Données trop volumineuses.',413);try{return JSON.parse(body);}catch{throw new AccessError('Données invalides.',400);}}
export function apiFailure(error:unknown){return Response.json({error:error instanceof AccessError?error.message:'Le service est temporairement indisponible. Réessaie dans un instant.'},{status:error instanceof AccessError?error.status:503,headers:noStore});}

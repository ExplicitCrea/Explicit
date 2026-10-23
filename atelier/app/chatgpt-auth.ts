import 'server-only';
import {currentUser} from '@clerk/nextjs/server';
import {redirect} from 'next/navigation';
import {ensureSchema,sql} from '../lib/vercel-runtime';
export type ChatGPTUser={userId:string;displayName:string;email:string;fullName:string|null};
export async function verifiedIdentity(){const u=await currentUser();if(!u)return null;const email=u.emailAddresses.find(e=>e.id===u.primaryEmailAddressId&&e.verification?.status==='verified')?.emailAddress.toLowerCase();if(!email)return null;return {subject:u.id,email,fullName:u.fullName};}
export async function getChatGPTUser():Promise<ChatGPTUser|null>{
 const u=await verifiedIdentity();if(!u)return null;await ensureSchema();const db=sql();
 const identity=await db.query('SELECT user_id FROM atelier_auth_identities WHERE subject=$1',[u.subject]);let id=identity[0]?.user_id as string|undefined;
 if(!id){const accounts=await db.query('SELECT user_id FROM atelier_accounts WHERE lower(email)=$1',[u.email]);if(accounts.length===1){await db.query('INSERT INTO atelier_auth_identities (subject,user_id,email,created_at) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING',[u.subject,accounts[0].user_id,u.email,new Date().toISOString()]);const rows=await db.query('SELECT user_id FROM atelier_auth_identities WHERE subject=$1',[u.subject]);id=rows[0]?.user_id as string|undefined;}}
 return {userId:id||'clerk:'+u.subject,email:u.email,fullName:u.fullName,displayName:u.fullName||u.email};
}
export function chatGPTSignInPath(returnTo:string){const safe=returnTo.startsWith('/')&&!returnTo.startsWith('//')?returnTo:'/';const path=safe.startsWith('/atelier')?safe:'/atelier'+safe;return '/atelier/sign-in?redirect_url='+encodeURIComponent(path);}
export function chatGPTSignOutPath(){return '/atelier/sign-out';}
export async function requireChatGPTUser(returnTo:string){const u=await getChatGPTUser();if(u)return u;redirect(chatGPTSignInPath(returnTo));}

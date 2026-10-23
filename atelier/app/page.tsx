import {HostingTransfer} from './hosting-transfer';
import {verifiedIdentity} from './chatgpt-auth';
import {ensureSchema,sql} from '../lib/vercel-runtime';
import Studio from './studio';
import { getChatGPTUser,chatGPTSignInPath } from './chatgpt-auth';
import {accountContext,AccessError} from '../lib/agencies';
import {InviteEntry} from './invite-entry';
import {BrandLockup} from './identity';
import {LockKeyhole} from './icons';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<{invite?:string}>}) {
 const params=await searchParams;const token=typeof params.invite==='string'&&params.invite.length>=40&&params.invite.length<=200?params.invite:'';
 const identity=await verifiedIdentity();if(identity&&process.env.ATELIER_OWNER_EMAIL&&identity.email===process.env.ATELIER_OWNER_EMAIL.toLowerCase()){await ensureSchema();const rows=await sql().query('SELECT id FROM atelier_agencies LIMIT 1');if(!rows.length)return <HostingTransfer/>;}
 const user=await getChatGPTUser();
 if(user&&token)return <InviteEntry token={token}/>;
 let denied=false;
 if(user){try{await accountContext(user);return <Studio userKey={user.userId}/>;}catch(e){if(!(e instanceof AccessError)||e.status!==403)throw e;denied=true;}}
 return <main className="access-page"><div className="access-card"><BrandLockup/><span className="access-lock"><LockKeyhole size={28}/></span><span className="eyebrow">EXPLICIT CREA · ESPACE ÉQUIPE</span><h1>{token?'Tu es invité.':'La création commence ici.'}</h1><p>{denied?'Ton compte n’a pas d’accès à une agence. Demande un lien d’invitation à son responsable.':token?'Connecte-toi pour vérifier ton invitation et rejoindre ton équipe.':'Un espace privé pour vos briefs, vos scènes et votre studio. L’accès se fait sur invitation.'}</p>{!denied&&<a className="button primary" href={chatGPTSignInPath(token?'/?invite='+encodeURIComponent(token):'/')} target="_top">{token?'Se connecter':'Déjà membre · se connecter'}</a>}{denied&&<a className="button secondary" href="/atelier/signout-with-chatgpt?return_to=%2F" target="_top">Changer de compte</a>}<small>Crafted with passion &amp; aesthetic</small></div></main>;
}

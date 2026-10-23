 'use client';
import {AcceptInvitation} from './agency-settings';
import {BrandLockup} from './identity';
export function InviteEntry({token}:{token:string}){return <main className="access-page"><BrandLockup/><AcceptInvitation token={token} onDone={async()=>{window.location.replace('/atelier/');}} onClose={()=>window.location.assign('/atelier/')} toast={()=>{}}/></main>;}

'use client';
import {useClerk} from '@clerk/nextjs';
export default function Page(){const {signOut}=useClerk();return <main className="access-page"><button className="button primary" onClick={()=>void signOut({redirectUrl:'/atelier/'})}>Confirmer la déconnexion</button></main>;}

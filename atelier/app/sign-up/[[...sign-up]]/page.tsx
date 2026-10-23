import {SignUp} from '@clerk/nextjs';
export default function Page(){return <main className="access-page"><SignUp routing="path" path="/atelier/sign-up" signInUrl="/atelier/sign-in" fallbackRedirectUrl="/atelier/"/></main>;}

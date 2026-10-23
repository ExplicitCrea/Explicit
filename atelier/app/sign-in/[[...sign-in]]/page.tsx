import {SignIn} from '@clerk/nextjs';
export default function Page(){return <main className="access-page"><SignIn routing="path" path="/atelier/sign-in" signUpUrl="/atelier/sign-up" fallbackRedirectUrl="/atelier/"/></main>;}

import {clerkMiddleware} from '@clerk/nextjs/server';
export default clerkMiddleware();
// Next.js prepends basePath. The explicit root matcher also covers bare /atelier.
export const config={matcher:['/','/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']};

import {clerkMiddleware} from '@clerk/nextjs/server';
import type {NextRequest, NextFetchEvent} from 'next/server';
import {atelierRequestUrl} from './lib/public-origin';

const authenticate = clerkMiddleware();
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const url = atelierRequestUrl(request.url);
  if (url.origin !== new URL(request.url).origin) {
    // Clerk uses forwarded headers for browser-facing redirects. Keep request.url
    // and Host unchanged: Clerk also uses them for its internal Next.js rewrite.
    request.headers.set('x-forwarded-host', url.host);
    request.headers.set('x-forwarded-proto', url.protocol.slice(0, -1));
  }
  return authenticate(request, event);
}
// Next.js prepends basePath. Cover both bare /atelier and all application/API paths.
export const config={matcher:['/','/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']};

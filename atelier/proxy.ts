import {clerkMiddleware} from '@clerk/nextjs/server';
import {NextRequest, type NextFetchEvent} from 'next/server';
import {atelierRequestUrl} from './lib/public-origin';

const authenticate = clerkMiddleware();
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const url = atelierRequestUrl(request.url);
  if (url.origin === new URL(request.url).origin) return authenticate(request, event);
  // Clerk builds its session handshake return URL from the request and forwarded host.
  // Normalize both so sign-in and cookies stay on the public www origin.
  const forwarded = new NextRequest(url, {
    ...request,
    method: request.method,
    headers: request.headers,
    body: request.body,
    nextConfig: {basePath: '/atelier'},
  });
  forwarded.headers.set('host', url.host);
  forwarded.headers.set('x-forwarded-host', url.host);
  forwarded.headers.set('x-forwarded-proto', url.protocol.slice(0, -1));
  return authenticate(forwarded, event);
}
// Next.js prepends basePath. Cover both bare /atelier and all application/API paths.
export const config={matcher:['/','/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']};

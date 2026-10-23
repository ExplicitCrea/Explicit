// The custom subdomain is a transport origin, never the browser-facing app origin.
// Only this exact, owned origin is mapped; do not trust arbitrary forwarded headers.
export const atelierPublicOrigin = 'https://www.explicitcrea.com';
export function atelierRequestUrl(input: string): URL {
  const url = new URL(input);
  if (url.origin === 'https://atelier.explicitcrea.com') {
    url.host = 'www.explicitcrea.com';
    url.protocol = 'https:';
  }
  return url;
}
export function isAtelierRequestOrigin(request: Request, requireOrigin = false): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return !requireOrigin;
  return origin === atelierRequestUrl(request.url).origin;
}

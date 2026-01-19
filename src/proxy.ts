import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_COUNTRIES } from './lib/constants';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Basic check to see if the first segment is a country code
  // We exclude /api, /_next, static files, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') || 
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  const EXCLUDED_ROUTES = ['about', 'privacy', 'terms', 'term'];
  const supportedCountryCodes = Object.values(SUPPORTED_COUNTRIES);

  // If the first segment is an excluded route, don't redirect
  if (firstSegment && EXCLUDED_ROUTES.includes(firstSegment)) {
    return NextResponse.next();
  }

  // If the first segment is NOT a supported country, we assume it's root or another page
  // We need to redirect to /[country]/...
  if (!firstSegment || !supportedCountryCodes.includes(firstSegment)) {
    // Detect country from Cloudflare header or default to 'us'
    const country = (request.headers.get('cf-ipcountry') || 'US').toLowerCase();
    const targetCountry = supportedCountryCodes.includes(country) ? country : 'us';

    const url = request.nextUrl.clone();
    url.pathname = `/${targetCountry}${pathname}`; // Prefix with country
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

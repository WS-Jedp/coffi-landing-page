import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle root path specifically for SEO - always rewrite, never redirect
  if (pathname === '/') {
    // Check if user has a language preference cookie
    const cookies = request.cookies;
    const preferredLocaleCookie = cookies.get('NEXT_LOCALE')?.value;
    
    let preferredLocale = 'en'; // Default to English
    
    // If user has explicitly set a language preference, use that
    if (preferredLocaleCookie && ['en', 'es'].includes(preferredLocaleCookie)) {
      preferredLocale = preferredLocaleCookie;
    } else {
      // Otherwise, use browser language detection for better UX
      const acceptLanguage = request.headers.get('accept-language') || '';
      preferredLocale = acceptLanguage.toLowerCase().includes('es') ? 'es' : 'en';
    }
    
    // Always rewrite to the appropriate locale internally, keeping URL as /
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}`;
    
    // Set a custom header to help the app know which locale was detected
    const response = NextResponse.rewrite(url);
    response.headers.set('x-detected-locale', preferredLocale);
    
    return response;
  }
  
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except API routes and static files
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
};
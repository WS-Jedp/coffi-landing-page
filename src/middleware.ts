import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle root path specifically for SEO
  if (pathname === '/') {
    // Accept language detection for better UX
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = acceptLanguage.toLowerCase().includes('es') ? 'es' : 'en';
    
    // For default locale (en), serve content directly without redirect
    if (preferredLocale === 'en') {
      // Rewrite to /en internally but keep URL as /
      const url = request.nextUrl.clone();
      url.pathname = '/en';
      return NextResponse.rewrite(url);
    } else {
      // For non-default locale, redirect to /es
      const url = request.nextUrl.clone();
      url.pathname = '/es';
      return NextResponse.redirect(url);
    }
  }
  
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except API routes and static files
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
};
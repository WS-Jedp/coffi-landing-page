import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Use 'as-needed' to avoid adding /en prefix for default locale
  localePrefix: 'as-needed',

  // hreflang comes from the page metadata (real slugs per language). The generated
  // `Link` header would repeat it with wrong URLs for posts whose slug differs per language.
  alternateLinks: false
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
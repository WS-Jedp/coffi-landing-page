import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co'

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/en/',
        '/es/',
        '/about-us',
        '/contact-us',
        '/for-places',
        '/faqs',
        '/privacy-policy',
        '/terms-of-service',
        '/wanderlust',
        '/subscription',
        '/subscribe-nomad-plan',
        '/blog',
      ],
      disallow: [
        '/api/',
        '/_next/',
        '/payment-status', // Private user pages
        '/*.json$',
        '/*?*', // Query parameters
      ],
    },
    sitemap: `${baseUrl}/sitemap/sitemap.xml`,
    host: baseUrl,
  }
}

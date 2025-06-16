import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co'
  const currentDate = new Date()
  
  // Core pages in both languages
  const corePages = [
    '', // Home page
    '/about-us',
    '/contact-us', 
    '/for-places',
    '/faqs',
    '/privacy-policy',
    '/terms-of-service',
    '/wanderlust',
    '/subscription',
    '/subscribe-nomad-plan',
    '/payment-status',
  ]
  
  // Future SEO-friendly pages for better targeting
  // Uncomment these when you create the pages:
  // '/medellin-coworking-spaces',
  // '/digital-nomad-medellin', 
  // '/el-poblado-work-cafes',
  // '/laureles-coworking',
  // '/coffee-shops-medellin',
  
  const locales = ['en', 'es']
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add root page
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  })
  
  // Add localized pages
  locales.forEach(locale => {
    corePages.forEach(page => {
      const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page}`
      
      let priority = 0.8
      let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly'
      
      // Set higher priority for important pages
      if (page === '' || page === '/about-us' || page === '/for-places') {
        priority = 0.9
        changeFrequency = 'daily'
      }
      
      // Higher priority for subscription-related pages (business critical)
      if (page === '/subscription' || page === '/subscribe-nomad-plan') {
        priority = 0.85
        changeFrequency = 'weekly'
      }
      
      // Lower priority for legal and status pages
      if (page.includes('privacy') || page.includes('terms') || page === '/payment-status') {
        priority = 0.4
        changeFrequency = 'monthly'
      }
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency,
        priority,
      })
    })
  })
  
  return sitemapEntries
}

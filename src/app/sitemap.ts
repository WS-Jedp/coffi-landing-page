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
    '/blog', // Blog index
  ]
  
  // Blog posts for SEO
  const blogPosts = [
    {
      en: '/blog/about-work-friendly-spaces',
      es: '/blog/sobre-espacios-de-trabajo-amigables'
    },
    {
      en: '/blog/best-cafes-and-workfriendly-spaces-in-medellin',
      es: '/blog/los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin'
    }
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
      
      // Blog pages get good priority for SEO
      if (page === '/blog') {
        priority = 0.8
        changeFrequency = 'weekly'
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
  
  // Add blog posts with different URLs per language
  blogPosts.forEach(post => {
    locales.forEach(locale => {
      const blogUrl = locale === 'en' ? post.en : post.es
      const url = `${baseUrl}/${locale}${blogUrl}`
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7, // Good priority for blog content
      })
    })
  })
  
  return sitemapEntries
}

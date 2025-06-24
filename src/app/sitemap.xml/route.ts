import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co'
  const currentDate = new Date().toISOString()
  
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
  
  const locales = ['en', 'es']
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

  // Add root page with alternates
  sitemap += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>
`

  // Add localized pages
  corePages.forEach(page => {
    locales.forEach(locale => {
      const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page}`
      
      let priority = 0.8
      let changeFrequency = 'weekly'
      
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

      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>`

      // Add alternates for non-home pages
      if (page !== '') {
        sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page}"/>`
      }

      sitemap += `
  </url>
`
    })
  })
  
  // Add blog posts
  blogPosts.forEach(post => {
    locales.forEach(locale => {
      const blogUrl = locale === 'en' ? post.en : post.es
      const url = `${baseUrl}/${locale}${blogUrl}`
      
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${post.en}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${post.es}"/>
  </url>
`
    })
  })
  
  sitemap += `</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}

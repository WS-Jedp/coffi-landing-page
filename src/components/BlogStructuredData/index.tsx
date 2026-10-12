import Script from 'next/script';
import { generateBlogStructuredData, type BlogPostData } from '@/lib/blog-seo';
import { absoluteUrl, blogPostUrl, findBlogPostBySlug, toSiteLocale } from '@/lib/seo/routes';

interface BlogStructuredDataProps {
  blogData: BlogPostData;
  locale: string;
  faq?: { question: string; answer: string }[];
}

export default function BlogStructuredData({ blogData, locale, faq }: BlogStructuredDataProps) {
  const structuredData = generateBlogStructuredData(blogData, locale);
  const siteLocale = toSiteLocale(locale);
  const post = findBlogPostBySlug(blogData.slug);
  
  // FAQPage JSON-LD is only valid for Q&As that are visible on the page: the caller passes
  // the same strings it renders. Posts without a visible FAQ get none.
  const faqStructuredData = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  } : null;

  // Local Business structured data for featured cafes (only for cafe blog posts)
  const localBusinessData = blogData.slug.includes('cafes') ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "LocalBusiness",
        "name": "General Bar Café",
        "description": locale === 'es' 
          ? "Café artístico y relajado en El Poblado con asientos acogedores, buen café y ambiente pacífico para trabajar."
          : "Artsy, relaxed café in El Poblado with cozy seating, good coffee, and peaceful work atmosphere.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Medellín",
          "addressRegion": "El Poblado",
          "addressCountry": "Colombia"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "6.2088",
          "longitude": "-75.5673"
        },
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "WiFi",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification", 
            "name": "Power Outlets",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Laptop Friendly",
            "value": true
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Mil Nueve 32",
        "description": locale === 'es'
          ? "Una joya escondida en Manila con ambiente íntimo, servicio fantástico y Wi-Fi confiable."
          : "A hidden gem in Manila with intimate ambiance, fantastic service, and reliable Wi-Fi.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Medellín",
          "addressRegion": "Manila",
          "addressCountry": "Colombia"
        },
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "WiFi",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Indoor Seating",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Outdoor Seating", 
            "value": true
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Café Dragón",
        "description": locale === 'es'
          ? "Perfectamente equilibrado entre relajado y energizante, favorito entre freelancers y creativos en El Poblado."
          : "Perfectly balanced between chill and energizing, favorite among freelancers and creatives in El Poblado.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Medellín", 
          "addressRegion": "El Poblado",
          "addressCountry": "Colombia"
        },
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "WiFi",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Espresso",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Open Space",
            "value": true
          }
        ]
      }
    ]
  } : null;

  // Breadcrumb structured data for blog posts
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": absoluteUrl(siteLocale, '/')
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": absoluteUrl(siteLocale, '/blog')
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": locale === 'es' ? blogData.title.es : blogData.title.en,
        "item": post ? blogPostUrl(post, siteLocale) : absoluteUrl(siteLocale, `/blog/${blogData.slug}`)
      }
    ]
  };

  return (
    <>
      <Script
        id="blog-post-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {faqStructuredData && (
        <Script
          id="blog-faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      )}
      <Script
        id="blog-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      {localBusinessData && (
        <Script
          id="blog-local-business-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessData),
          }}
        />
      )}
    </>
  );
}
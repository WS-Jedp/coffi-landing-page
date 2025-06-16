import Script from 'next/script'

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Coffi",
    "alternateName": "Coffi App",
    "description": "Platform connecting digital nomads with perfect coworking spaces and work-friendly cafés in Medellín, Colombia",
    "url": "https://coffi.com.co",
    "logo": "https://coffi.com.co/assets/images/coffi-logo.svg",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Organization",
        "name": "J-Studio"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Medellín",
      "addressRegion": "Antioquia", 
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "6.2442",
      "longitude": "-75.5812"
    },
    "areaServed": {
      "@type": "City",
      "name": "Medellín",
      "addressRegion": "Antioquia",
      "addressCountry": "Colombia"
    },
    "sameAs": [
      "https://twitter.com/coffiapp",
      "https://instagram.com/coffiapp", 
      "https://linkedin.com/company/coffiapp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://coffi.com.co/contact-us"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Coffi - Coworking Spaces Medellín",
    "alternateName": "Coffi App",
    "description": "Find coworking spaces, work-friendly cafés, and productivity hubs in Medellín, Colombia with real-time insights",
    "url": "https://coffi.com.co",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://app.coffi.com.co/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en", "es"],
    "about": {
      "@type": "Thing",
      "name": "Coworking Spaces",
      "sameAs": "https://en.wikipedia.org/wiki/Coworking"
    }
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Coffi",
    "description": "Platform for finding coworking spaces and work-friendly cafés in Medellín with real-time community insights",
    "url": "https://coffi.com.co",
    "downloadUrl": "https://app.coffi.com.co",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Productivity",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time workspace insights",
      "Community-driven reviews",
      "Wifi speed monitoring", 
      "Noise level tracking",
      "Workspace filtering",
      "Digital nomad community"
    ],
    "screenshot": [
      "https://coffi.com.co/assets/images/screenshots/desktop/coffi-landing-screenshot-1.jpeg",
      "https://coffi.com.co/assets/images/screenshots/mobile/mobile-home-search-en.jpeg"
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Coffi - Coworking Platform Medellín",
    "description": "Digital platform connecting remote workers with coworking spaces and work-friendly cafés in Medellín, Colombia",
    "url": "https://coffi.com.co",
    "telephone": "+57-xxx-xxx-xxxx", // Replace with actual phone
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address", // Replace with actual address
      "addressLocality": "Medellín",
      "addressRegion": "Antioquia",
      "postalCode": "050001", // Replace with actual postal code
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates", 
      "latitude": "6.2442",
      "longitude": "-75.5812"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "Free",
    "paymentAccepted": "Credit Card, Debit Card",
    "currenciesAccepted": "COP, USD"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://coffi.com.co"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Coworking Spaces Medellín",
        "item": "https://coffi.com.co/en"
      }
    ]
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}

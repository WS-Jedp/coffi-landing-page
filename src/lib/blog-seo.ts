import type { Metadata } from "next";

export interface BlogPostData {
  slug: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  keywords: {
    en: string[];
    es: string[];
  };
  publishDate: string;
  lastModified: string;
  readingTime: string;
  category: string;
  author: {
    name: string;
    url: string;
  };
  image?: string;
  tags?: string[];
}

export function generateBlogMetadata(
  blogData: BlogPostData, 
  locale: string
): Metadata {
  const isSpanish = locale === 'es';
  const currentTitle = isSpanish ? blogData.title.es : blogData.title.en;
  const currentDescription = isSpanish ? blogData.description.es : blogData.description.en;
  const currentKeywords = isSpanish ? blogData.keywords.es : blogData.keywords.en;
  
  // Enhanced title with brand and SEO optimization
  const seoTitle = `${currentTitle} | Coffi Blog - Coworking Medellín`;
  
  // Get base URL and current page URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co';
  const currentUrl = `${baseUrl}/${locale}/blog/${blogData.slug}`;
  
  // Default blog image or specific post image
  const defaultImage = "/assets/images/blog/work-friendly-spaces-hero.jpg";
  const ogImage = blogData.image || defaultImage;
  
  // Comprehensive keywords combining blog-specific and general brand keywords
  const enhancedKeywords = [
    ...currentKeywords,
    // Core brand keywords
    "Coffi", "Coffi blog", "Be where you thrive",
    // Location-specific
    "Medellín", "Colombia", "Antioquia",
    // Content type
    "blog", "workspace guide", "digital nomad tips",
    // Related to workspace discovery
    "workspace finder", "coworking community", "remote work tips"
  ];

  return {
    title: seoTitle,
    description: currentDescription,
    keywords: enhancedKeywords,
    
    // Article-specific metadata
    authors: [{ name: blogData.author.name, url: blogData.author.url }],
    creator: blogData.author.name,
    publisher: "Coffi",
    
    // URLs and canonicals
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en/blog/${blogData.slug}`,
        'es': `${baseUrl}/es/blog/${blogData.slug}`,
      },
    },
    
    // Enhanced Open Graph for social sharing
    openGraph: {
      title: currentTitle,
      description: currentDescription,
      url: currentUrl,
      siteName: "Coffi Blog - Coworking Spaces Medellín",
      type: "article",
      locale: isSpanish ? 'es_CO' : 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: currentTitle,
        },
        {
          url: "/assets/images/screenshots/desktop/coffi-landing-screenshot-1.jpeg",
          width: 1200,
          height: 630,
          alt: "Coffi - Coworking spaces platform in Medellín",
        }
      ],
      publishedTime: blogData.publishDate,
      modifiedTime: blogData.lastModified,
      section: blogData.category,
      tags: blogData.tags || currentKeywords.slice(0, 5),
      authors: [blogData.author.name],
    },
    
    // Enhanced Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: `${currentTitle} | Coffi Blog`,
      description: currentDescription,
      images: [ogImage],
      creator: "@coffiapp",
      site: "@coffiapp",
    },
    
    // Article-specific structured data will be handled by JSON-LD
    other: {
      // Article metadata
      "article:published_time": blogData.publishDate,
      "article:modified_time": blogData.lastModified,
      "article:author": blogData.author.name,
      "article:section": blogData.category,
      "article:tag": currentKeywords.slice(0, 5).join(", "),
      
      // Reading time and content info
      "reading-time": blogData.readingTime,
      "content-language": locale,
      
      // Geographic metadata
      "geo.region": "CO-ANT",
      "geo.placename": "Medellín, Colombia",
      "geo.position": "6.2442;-75.5812",
      "ICBM": "6.2442, -75.5812",
      
      // Content classification
      "content-type": "blog-post",
      "content-category": blogData.category.toLowerCase().replace(/\s+/g, '-'),
    },
    
    // Enhanced robots configuration for blog content
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Utility function to generate blog list page metadata
export function generateBlogListMetadata(locale: string): Metadata {
  const isSpanish = locale === 'es';
  
  const title = isSpanish 
    ? "Blog Coffi - Guías de Espacios de Trabajo y Coworking en Medellín"
    : "Coffi Blog - Workspace Guides & Coworking Tips for Medellín";
    
  const description = isSpanish
    ? "Descubre guías completas sobre espacios de trabajo, coworking y cafés para trabajar en Medellín. Tips para nómadas digitales, reseñas de espacios y consejos de productividad."
    : "Discover comprehensive guides about workspaces, coworking, and work-friendly cafés in Medellín. Digital nomad tips, space reviews, and productivity advice.";
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co';
  const currentUrl = `${baseUrl}/${locale}/blog`;
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en/blog`,
        'es': `${baseUrl}/es/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "Coffi Blog",
      type: "website",
      images: [
        {
          url: "/assets/images/blog/blog-hero.jpg",
          width: 1200,
          height: 630,
          alt: "Coffi Blog - Workspace guides for Medellín",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/images/blog/blog-hero.jpg"],
    },
  };
}

// Generate structured data for blog posts
export function generateBlogStructuredData(blogData: BlogPostData, locale: string) {
  const isSpanish = locale === 'es';
  const currentTitle = isSpanish ? blogData.title.es : blogData.title.en;
  const currentDescription = isSpanish ? blogData.description.es : blogData.description.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co';
  const currentUrl = `${baseUrl}/${locale}/blog/${blogData.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": currentTitle,
    "description": currentDescription,
    "image": blogData.image || "/assets/images/blog/work-friendly-spaces-hero.jpg",
    "author": {
      "@type": "Organization",
      "name": blogData.author.name,
      "url": blogData.author.url
    },
    "publisher": {
      "@type": "Organization",
      "name": "Coffi",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/images/coffi-logo.svg`
      }
    },
    "datePublished": blogData.publishDate,
    "dateModified": blogData.lastModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "url": currentUrl,
    "isPartOf": {
      "@type": "Blog",
      "name": "Coffi Blog",
      "url": `${baseUrl}/${locale}/blog`
    },
    "inLanguage": locale,
    "keywords": isSpanish ? blogData.keywords.es.join(", ") : blogData.keywords.en.join(", "),
    "articleSection": blogData.category,
    "about": [
      {
        "@type": "Thing",
        "name": "Coworking Spaces",
        "sameAs": "https://en.wikipedia.org/wiki/Coworking"
      },
      {
        "@type": "Place",
        "name": "Medellín",
        "sameAs": "https://en.wikipedia.org/wiki/Medell%C3%ADn"
      }
    ],
    "mentions": [
      {
        "@type": "Organization",
        "name": "Coffi",
        "url": baseUrl
      }
    ]
  };
}

// Enhanced keyword generation for local SEO
export function generateLocationKeywords(locale: string, includeNeighborhoods: boolean = true): string[] {
  const neighborhoods = [
    "El Poblado", "Laureles", "Manila", "Las Lomas", "Santa Elena", 
    "Envigado", "Sabaneta", "Centro", "La Macarena", "Buenos Aires"
  ];
  
  const baseKeywords = locale === 'es' ? [
    "Medellín",
    "Colombia",
    "Antioquia",
    "nómadas digitales",
    "trabajo remoto",
    "espacios de trabajo",
    "coworking",
    "cafés para trabajar",
    "wifi gratis",
    "laptop friendly",
    "espacios tranquilos",
    "freelancers",
    "emprendedores",
    "oficina temporal"
  ] : [
    "Medellín",
    "Colombia", 
    "Antioquia",
    "digital nomads",
    "remote work",
    "workspaces",
    "coworking",
    "work cafes",
    "free wifi",
    "laptop friendly",
    "quiet spaces",
    "freelancers",
    "entrepreneurs",
    "temporary office"
  ];

  if (!includeNeighborhoods) return baseKeywords;

  const locationSpecific = neighborhoods.flatMap(neighborhood => 
    locale === 'es' ? [
      `${neighborhood} Medellín`,
      `coworking ${neighborhood}`,
      `cafés ${neighborhood}`,
      `trabajo remoto ${neighborhood}`,
      `espacios ${neighborhood}`
    ] : [
      `${neighborhood} Medellín`,
      `coworking ${neighborhood}`,
      `cafes ${neighborhood}`,
      `remote work ${neighborhood}`,
      `workspace ${neighborhood}`
    ]
  );

  return [...baseKeywords, ...locationSpecific];
}

// Long-tail keyword variations for better SEO
export function generateLongTailKeywords(locale: string, topic: 'cafes' | 'coworking' | 'general'): string[] {
  if (locale === 'es') {
    const basePhrases = {
      cafes: [
        "mejores cafés para trabajar en",
        "dónde trabajar con laptop en",
        "cafés con wifi en",
        "lugares tranquilos para trabajar en",
        "cafeterías laptop friendly en",
        "espacios de café para freelancers en"
      ],
      coworking: [
        "mejores espacios de coworking en",
        "coworking barato en",
        "espacios de trabajo compartido en",
        "oficinas temporales en",
        "coworking 24 horas en",
        "salas de reuniones en"
      ],
      general: [
        "dónde trabajar remotamente en",
        "espacios para nómadas digitales en",
        "mejores lugares para trabajar en",
        "espacios productivos en",
        "oficinas flexibles en",
        "ambientes de trabajo en"
      ]
    };

    return basePhrases[topic].flatMap(phrase => [
      `${phrase} Medellín`,
      `${phrase} El Poblado`,
      `${phrase} Laureles`,
      `${phrase} Colombia`
    ]);
  } else {
    const basePhrases = {
      cafes: [
        "best cafes to work from in",
        "where to work with laptop in",
        "cafes with wifi in",
        "quiet places to work in",
        "laptop friendly cafes in",
        "coffee spaces for freelancers in"
      ],
      coworking: [
        "best coworking spaces in",
        "cheap coworking in",
        "shared workspaces in",
        "temporary offices in",
        "24 hour coworking in",
        "meeting rooms in"
      ],
      general: [
        "where to work remotely in",
        "spaces for digital nomads in",
        "best places to work in",
        "productive environments in",
        "flexible offices in",
        "work environments in"
      ]
    };

    return basePhrases[topic].flatMap(phrase => [
      `${phrase} Medellín`,
      `${phrase} El Poblado`,
      `${phrase} Laureles`,
      `${phrase} Colombia`
    ]);
  }
}

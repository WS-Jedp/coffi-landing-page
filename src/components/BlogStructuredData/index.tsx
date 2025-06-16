import Script from 'next/script';
import { generateBlogStructuredData, type BlogPostData } from '@/lib/blog-seo';

interface BlogStructuredDataProps {
  blogData: BlogPostData;
  locale: string;
}

export default function BlogStructuredData({ blogData, locale }: BlogStructuredDataProps) {
  const structuredData = generateBlogStructuredData(blogData, locale);
  
  // Additional FAQ structured data for blog posts (cafe-specific)
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blogData.slug.includes('cafes') ? [
      {
        "@type": "Question",
        "name": locale === 'es' 
          ? "¿Cuál es el mejor café para trabajar en El Poblado, Medellín?"
          : "What's the best cafe to work from in El Poblado, Medellín?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'es'
            ? "General Bar Café y Café Dragón en El Poblado son excelentes opciones para trabajar, con wifi estable, asientos cómodos y ambiente tranquilo para la productividad."
            : "General Bar Café and Café Dragón in El Poblado are excellent options for working, with stable wifi, comfortable seating, and a peaceful atmosphere for productivity."
        }
      },
      {
        "@type": "Question", 
        "name": locale === 'es'
          ? "¿Hay espacios de trabajo 24 horas en Medellín?"
          : "Are there 24-hour workspaces in Medellín?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'es'
            ? "Mientras que la mayoría de cafés cierran en la noche, Coffi te ayuda a encontrar espacios de coworking con horarios extendidos y opciones de trabajo nocturno en diferentes barrios de Medellín."
            : "While most cafes close at night, Coffi helps you find coworking spaces with extended hours and night work options in different neighborhoods of Medellín."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'es'
          ? "¿Qué barrios de Medellín son mejores para nómadas digitales?"
          : "Which Medellín neighborhoods are best for digital nomads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'es'
            ? "El Poblado, Laureles, Manila y Las Lomas ofrecen la mejor concentración de cafés y espacios de trabajo amigables, con buena conectividad y ambiente seguro para nómadas digitales."
            : "El Poblado, Laureles, Manila, and Las Lomas offer the best concentration of work-friendly cafes and spaces, with good connectivity and a safe environment for digital nomads."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'es'
          ? "¿Cómo funciona Coffi para encontrar espacios de trabajo?"
          : "How does Coffi work to find workspaces?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'es'
            ? "Coffi proporciona datos en tiempo real sobre nivel de ruido, disponibilidad de asientos, calidad del wifi y ambiente de trabajo en cientos de cafés y espacios de coworking en Medellín."
            : "Coffi provides real-time data on noise levels, seat availability, wifi quality, and work atmosphere in hundreds of cafes and coworking spaces in Medellín."
        }
      }
    ] : [
      {
        "@type": "Question",
        "name": locale === 'es' 
          ? "¿Qué hace que un espacio sea amigable para el trabajo?"
          : "What makes a space work-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'es'
            ? "Un espacio amigable para el trabajo debe tener wifi confiable, asientos cómodos, ambiente apropiado para la concentración, y políticas que permitan trabajar con laptop por períodos extendidos."
            : "A work-friendly space should have reliable wifi, comfortable seating, an environment conducive to concentration, and policies that allow laptop work for extended periods."
        }
      },
      {
        "@type": "Question", 
        "name": locale === 'es'
          ? "¿Cuáles son los mejores barrios para encontrar espacios de trabajo en Medellín?"
          : "What are the best neighborhoods to find workspace in Medellín?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'es'
            ? "El Poblado, Laureles, y Envigado son los barrios más populares para nómadas digitales, con gran variedad de cafés, coworkings y espacios de trabajo amigables."
            : "El Poblado, Laureles, and Envigado are the most popular neighborhoods for digital nomads, with a great variety of cafés, coworking spaces, and work-friendly environments."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'es'
          ? "¿Cómo evalúa Coffi la calidad de los espacios de trabajo?"
          : "How does Coffi evaluate workspace quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'es'
            ? "Coffi utiliza datos en tiempo real de la comunidad de nómadas digitales para evaluar velocidad de wifi, nivel de ruido, comodidad, y otros factores importantes para la productividad."
            : "Coffi uses real-time data from the digital nomad community to evaluate wifi speed, noise levels, comfort, and other factors important for productivity."
        }
      }
    ]
  };

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
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co'}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co'}/${locale}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": locale === 'es' ? blogData.title.es : blogData.title.en,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://coffi.com.co'}/${locale}/blog/${blogData.slug}`
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
      <Script
        id="blog-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
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
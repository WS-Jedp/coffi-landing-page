import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-seo";

export async function generateMetadata({ params }: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const blogData = {
    slug: "los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin",
    title: {
      en: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)",
      es: "Los Mejores Cafés y Espacios de Trabajo Amigables en Medellín (Guía 2025)"
    },
    description: {
      en: "Discover the best work-friendly cafes and spaces in Medellín for digital nomads. From cozy cafes in Poblado to mountain workspaces in Santa Elena - find your perfect productive spot.",
      es: "Descubre los mejores cafés y espacios de trabajo amigables en Medellín para nómadas digitales. Desde cafés acogedores en Poblado hasta espacios en las montañas de Santa Elena - encuentra tu lugar productivo perfecto."
    },
    keywords: {
      en: [
        "best cafes Medellín",
        "work-friendly spaces Medellín",
        "digital nomad Medellín",
        "coworking Medellín",
        "remote work Medellín",
        "cafes with wifi Medellín",
        "El Poblado cafes",
        "Laureles coworking",
        "Manila workspace",
        "Santa Elena work spots",
        "General Bar Café",
        "Mil Nueve 32",
        "Café Dragón",
        "Bukz library",
        "Monteluna workspace",
        "laptop-friendly cafes",
        "coffee shops for work",
        "productive environments",
        "Colombia digital nomads",
        "Coffi workspace finder",
        "quiet work spaces",
        "freelancer spaces Medellín",
        "best wifi cafes",
        "work from cafe tips",
        "nomad lifestyle Medellín"
      ],
      es: [
        "mejores cafés Medellín",
        "espacios de trabajo amigables Medellín",
        "nómada digital Medellín",
        "coworking Medellín",
        "trabajo remoto Medellín",
        "cafés con wifi Medellín",
        "cafés El Poblado",
        "coworking Laureles",
        "workspace Manila",
        "espacios trabajo Santa Elena",
        "General Bar Café Medellín",
        "Mil Nueve 32 Manila",
        "Café Dragón Poblado",
        "biblioteca Bukz Las Lomas",
        "espacio Monteluna Santa Elena",
        "cafés laptop-friendly",
        "cafeterías para trabajar",
        "ambientes productivos",
        "nómadas digitales Colombia",
        "Coffi buscador espacios",
        "espacios silenciosos trabajo",
        "espacios freelancers Medellín",
        "mejores cafés wifi",
        "consejos trabajar café",
        "estilo vida nómada Medellín",
        "dónde trabajar Medellín",
        "cafés tranquilos Medellín",
        "espacios creativos Medellín"
      ]
    },
    publishDate: "2025-06-16",
    lastModified: "2025-06-16",
    readingTime: "6 min lectura",
    category: "Guía de Ciudad",
    author: {
      name: "Equipo Coffi",
      url: "https://coffi.com.co/about-us"
    },
    image: "/assets/images/blog/mejores-cafes-medellin-hero.jpg",
    tags: ["cafés", "coworking", "nómada digital", "Medellín", "productividad"]
  };

  return generateBlogMetadata(blogData, locale);
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

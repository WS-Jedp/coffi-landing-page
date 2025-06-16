import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-seo";

export async function generateMetadata({ params }: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const blogData = {
    slug: "best-cafes-and-workfriendly-spaces-in-medellin",
    title: {
      en: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)",
      es: "Mejores Cafés y Espacios de Trabajo en Medellín (Guía Nómada Digital 2025)"
    },
    description: {
      en: "Discover the best work-friendly cafes and spaces in Medellín for digital nomads. From cozy cafes in Poblado to mountain workspaces in Santa Elena - find your perfect productive spot.",
      es: "Descubre los mejores cafés y espacios de trabajo en Medellín para nómadas digitales. Desde cafés acogedores en Poblado hasta espacios en las montañas de Santa Elena - encuentra tu lugar productivo perfecto."
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
        "espacios de trabajo Medellín",
        "nómada digital Medellín",
        "coworking Medellín",
        "trabajo remoto Medellín",
        "cafés con wifi Medellín",
        "cafés El Poblado",
        "coworking Laureles",
        "workspace Manila",
        "espacios trabajo Santa Elena",
        "General Bar Café",
        "Mil Nueve 32",
        "Café Dragón",
        "biblioteca Bukz",
        "espacio Monteluna",
        "cafés laptop-friendly",
        "cafeterías para trabajar",
        "ambientes productivos",
        "nómadas digitales Colombia",
        "Coffi buscador espacios",
        "espacios silenciosos trabajo",
        "espacios freelancers Medellín",
        "mejores cafés wifi",
        "consejos trabajar café",
        "estilo vida nómada Medellín"
      ]
    },
    publishDate: "2025-06-16",
    lastModified: "2025-06-16",
    readingTime: "6 min read",
    category: "City Guide",
    author: {
      name: "Coffi Team",
      url: "https://coffi.com.co/about-us"
    },
    image: "/assets/images/blog/best-cafes-medellin-hero.jpg",
    tags: ["cafes", "coworking", "digital nomad", "Medellín", "productivity"]
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

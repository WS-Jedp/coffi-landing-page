import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-seo";

export async function generateMetadata({ params }: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const blogData = {
    slug: "about-work-friendly-spaces",
    title: {
      en: "Understanding Work-Friendly Spaces: The Future of Productive Environments",
      es: "Entendiendo los Espacios de Trabajo Amigables: El Futuro de los Ambientes Productivos"
    },
    description: {
      en: "Discover what makes a space truly work-friendly. Learn about the evolution from traditional coworking to flexible, productive environments in Medellín's digital nomad community.",
      es: "Descubre qué hace que un espacio sea verdaderamente amigable para el trabajo. Aprende sobre la evolución del coworking tradicional a ambientes productivos flexibles en la comunidad de nómadas digitales de Medellín."
    },
    keywords: {
      en: [
        "work-friendly spaces",
        "coworking spaces Medellín",
        "digital nomad workspace",
        "productive environments",
        "remote work Medellín",
        "work cafés",
        "laptop-friendly cafés",
        "El Poblado coworking",
        "Laureles workspace",
        "Colombia digital nomads",
        "workspace with wifi",
        "quiet work spaces",
        "coffee shops for work",
        "best coworking Medellín",
        "freelancer spaces"
      ],
      es: [
        "espacios de trabajo amigables",
        "coworking Medellín",
        "espacios nómadas digitales",
        "ambientes productivos",
        "trabajo remoto Medellín",
        "cafés de trabajo",
        "cafés laptop-friendly",
        "coworking El Poblado",
        "workspace Laureles",
        "nómadas digitales Colombia",
        "espacios con wifi",
        "espacios silenciosos trabajo",
        "cafeterías para trabajar",
        "mejor coworking Medellín",
        "espacios freelancers"
      ]
    },
    publishDate: "2024-12-16",
    lastModified: "2024-12-16",
    readingTime: "8 min read",
    category: "Workspace Guide",
    author: {
      name: "Coffi Team",
      url: "https://coffi.com.co/about-us"
    }
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

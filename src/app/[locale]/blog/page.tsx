import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

// Blog posts data - this could be moved to a separate file or CMS
const blogPosts = [
  {
    slug: "about-work-friendly-spaces",
    slugEs: "sobre-espacios-de-trabajo-amigables",
    title: {
      en: "Understanding Work-Friendly Spaces: The Future of Productive Environments",
      es: "Entendiendo los Espacios de Trabajo Amigables: El Futuro de los Ambientes Productivos"
    },
    excerpt: {
      en: "Discover what makes a space truly work-friendly and how the concept has evolved beyond traditional coworking.",
      es: "Descubre qué hace que un espacio sea verdaderamente amigable para el trabajo y cómo el concepto ha evolucionado más allá del coworking tradicional."
    },
    publishDate: "2025-06-20",
    readingTime: "8 min",
    category: {
      en: "Workspace Guide",
      es: "Guía de Espacios"
    },
    featured: true
  },
  {
    slug: "best-cafes-and-workfriendly-spaces-in-medellin",
    slugEs: "los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin",
    title: {
      en: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)",
      es: "Los Mejores Cafés y Espacios de Trabajo Amigables en Medellín (Guía 2025)"
    },
    excerpt: {
      en: "Discover the best work-friendly cafes and spaces in Medellín for digital nomads. From cozy cafes in Poblado to mountain workspaces in Santa Elena.",
      es: "Descubre los mejores cafés y espacios de trabajo amigables en Medellín para nómadas digitales. Desde cafés acogedores en Poblado hasta espacios en las montañas de Santa Elena."
    },
    publishDate: "2025-06-20",
    readingTime: "6 min",
    category: {
      en: "City Guide",
      es: "Guía de Ciudad"
    },
    featured: false
  },
  // Add more blog posts here as you create them
];

export default function BlogPage() {
  const locale = useLocale();
  const isSpanish = locale === 'es';

  return (
    <div className="min-h-screen bg-coffi-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-coffi-blue/5 via-white to-coffi-purple/5 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-6">
              {isSpanish ? "Blog Coffi" : "Coffi Blog"}
            </h1>
            <p className="text-xl md:text-2xl text-j-deep-black/80 leading-relaxed max-w-3xl mx-auto">
              {isSpanish 
                ? "Descubre guías completas sobre espacios de trabajo, coworking y cafés para trabajar en Medellín. Tips para nómadas digitales y consejos de productividad."
                : "Discover comprehensive guides about workspaces, coworking, and work-friendly cafés in Medellín. Digital nomad tips and productivity advice."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const postSlug = isSpanish ? post.slugEs : post.slug;
              const postTitle = isSpanish ? post.title.es : post.title.en;
              const postExcerpt = isSpanish ? post.excerpt.es : post.excerpt.en;
              const postCategory = isSpanish ? post.category.es : post.category.en;

              return (
                <article 
                  key={post.slug}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                    post.featured ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  {/* Header with Category */}
                  <div className="bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 p-6 pb-4">
                    <div className="mb-4">
                      <span className="bg-coffi-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                        {postCategory}
                      </span>
                    </div>
                    
                    <h2 className={`font-bold text-j-deep-black mb-3 group-hover:text-coffi-purple transition-colors leading-tight ${
                      post.featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                    }`}>
                      {postTitle}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.publishDate).toLocaleDateString(locale)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readingTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>Coffi Team</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {postExcerpt}
                    </p>

                    <Link
                      href={`/${locale}/blog/${postSlug}`}
                      className="inline-flex items-center gap-2 text-coffi-purple font-medium hover:text-coffi-blue transition-colors group"
                    >
                      {isSpanish ? "Leer más" : "Read more"}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty State when no posts */}
          {blogPosts.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-2xl font-medium text-j-deep-black mb-4">
                {isSpanish ? "Próximamente..." : "Coming Soon..."}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {isSpanish 
                  ? "Estamos trabajando en contenido increíble para ayudarte a encontrar los mejores espacios de trabajo en Medellín."
                  : "We're working on amazing content to help you find the best workspaces in Medellín."
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-coffi-purple to-coffi-blue py-24">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isSpanish 
              ? "¿Listo para encontrar tu espacio perfecto?"
              : "Ready to find your perfect workspace?"
            }
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isSpanish
              ? "Explora cientos de espacios de trabajo y cafés en Medellín con datos en tiempo real de nuestra comunidad."
              : "Explore hundreds of workspaces and cafés in Medellín with real-time data from our community."
            }
          </p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-white text-coffi-purple px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            {isSpanish ? "Explorar Espacios" : "Explore Spaces"}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://coffi.com.co";

export type SiteLocale = "en" | "es";

export const SITE_LOCALES: SiteLocale[] = ["en", "es"];

// next-intl runs with `localePrefix: "as-needed"` (src/i18n/routing.ts): English is
// served without a prefix and `/en/...` only answers with a redirect. Every canonical,
// hreflang and sitemap URL must use the form that returns 200.
export function localizedPath(locale: SiteLocale, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean || "/";
  return `/es${clean}`;
}

// The English home is the bare origin, without a trailing slash: that is the form Next
// prints in <link rel="canonical"> / hreflang, so the sitemap <loc> matches it exactly.
export function absoluteUrl(locale: SiteLocale, path: string): string {
  const localized = localizedPath(locale, path);
  return localized === "/" ? SITE_URL : `${SITE_URL}${localized}`;
}

// Static, indexable pages. Left out on purpose: /subscription (no page),
// /payment-status and /subscribe-nomad-plan (checkout flow, noindex),
// /subscription/nomad/* (post-payment).
// No lastModified here: only use a date when a real one is known.
export const STATIC_ROUTES = [
  "/",
  "/about-us",
  "/contact-us",
  "/for-places",
  "/faqs",
  "/privacy-policy",
  "/terms-of-service",
  "/wanderlust",
  "/blog",
] as const;

interface Localized {
  en: string;
  es: string;
}

export interface BlogPostEntry {
  id: string;
  slugs: Localized;
  // Date shown on the blog index.
  publishDate: string;
  // Real last change of the post. Feeds the sitemap and the article metadata.
  lastModified: string;
  // Blog index card.
  title: Localized;
  excerpt: Localized;
  readingTime: string;
  category: Localized;
  featured: boolean;
}

// Single source of truth for blog posts: one EN/ES slug pair per entry (newest first).
// To publish a post, add it here (see BLOG_TEMPLATE.md).
export const BLOG_POSTS: BlogPostEntry[] = [
  {
    id: "you-only-get-2-3-hours-of-real-focus-a-day",
    slugs: {
      en: "you-only-get-2-3-hours-of-real-focus-a-day",
      es: "solo-tienes-2-3-horas-de-foco-real-al-dia",
    },
    publishDate: "2026-10-21",
    lastModified: "2026-10-21",
    title: {
      en: "You only get 2–3 hours of real focus a day. The environment decides if you use them or lose them",
      es: "Solo tienes 2-3 horas de foco real al día. El ambiente decide si las usas o las pierdes"
    },
    excerpt: {
      en: "2026 data shows the average worker gets only 2–3 hours of deep focus. It’s not discipline—it’s context. Learn how to choose the space that protects your energy so you can thrive.",
      es: "Datos de 2026 muestran que el trabajador promedio solo logra 2-3 horas de deep focus. No es disciplina: es contexto. Aprende a elegir el espacio que protege tu energía y te deja thrivar."
    },
    readingTime: "4 min",
    category: {
      en: "Workspace Guide",
      es: "Guía de Espacios"
    },
    featured: false
  },
  {
    id: "500-contacts-and-no-one-to-call",
    slugs: {
      en: "500-contacts-and-no-one-to-call",
      es: "500-contactos-y-nadie-a-quien-llamar",
    },
    publishDate: "2026-10-19",
    lastModified: "2026-10-19",
    title: {
      en: "500 contacts and no one to call: why the nomad community in Medellín stays on the surface",
      es: "500 contactos y nadie a quien llamar: por qué la comunidad de nomads en Medellín se queda en la superficie"
    },
    excerpt: {
      en: "You meet people all week in Laureles or El Poblado and still feel alone. Why nomad friendships stay shallow and how to create real moments in Medellín.",
      es: "Conoces gente toda la semana en Laureles o El Poblado y aún te sientes solo. Por qué las amistades nomad se quedan superficiales y cómo crear momentos reales en Medellín."
    },
    readingTime: "5 min",
    category: {
      en: "Workspace Guide",
      es: "Guía de Espacios"
    },
    featured: false
  },
  {
    id: "medellin-2026-where-your-rhythm-finds-its-place",
    slugs: {
      en: "medellin-2026-where-your-rhythm-finds-its-place",
      es: "medellin-2026-donde-tu-ritmo-encuentra-su-lugar",
    },
    publishDate: "2026-10-17",
    lastModified: "2026-10-17",
    title: {
      en: "Medellín in 2026 is no longer “cheap”: it’s where your rhythm finds its place",
      es: "Medellín en 2026 ya no es “barato”: es donde tu ritmo encuentra su lugar"
    },
    excerpt: {
      en: "Medellín is still in the global top 30 for digital nomads. But the game changed: Laureles won, a comfortable month is $1,200–1,800, and what matters is the context of your day. Here’s how to choose for real.",
      es: "Medellín sigue en el top 30 mundial de nómadas digitales. Pero el juego cambió: Laureles ganó, el costo real está entre $1.200–1.800, y lo que importa es el contexto de tu día. Aquí está cómo elegir de verdad."
    },
    readingTime: "3 min",
    category: {
      en: "City Guide",
      es: "Guía de Ciudad"
    },
    featured: false
  },
  {
    id: "the-space-you-choose-today",
    slugs: {
      en: "the-space-you-choose-today",
      es: "el-espacio-que-eliges-hoy",
    },
    publishDate: "2026-10-14",
    lastModified: "2026-10-14",
    title: {
      en: "The space you choose today decides your rhythm (and it's not just the Wi-Fi)",
      es: "El espacio que eliges hoy decide tu ritmo (y no es solo el Wi-Fi)"
    },
    excerpt: {
      en: "In Medellín, the noise, the people, and the vibe of a café change hour by hour. Science shows how the environment affects your focus. Here's why real-time context matters more than static lists.",
      es: "En Medellín, el ruido, la gente y el vibe de un café cambian hora a hora. La ciencia muestra cómo el ambiente afecta tu foco. Aquí está por qué el contexto real importa más que las listas estáticas."
    },
    readingTime: "5 min",
    category: {
      en: "Workspace Guide",
      es: "Guía de Espacios"
    },
    featured: false
  },
  {
    id: "remote-work-and-loneliness",
    slugs: {
      en: "remote-work-and-loneliness",
      es: "trabajo-remoto-y-soledad",
    },
    publishDate: "2026-10-12",
    lastModified: "2026-10-12",
    title: {
      en: "Remote work gave you freedom. Science says it also left you more alone.",
      es: "Remote work te dio libertad. La ciencia dice que también te dejó más solo."
    },
    excerpt: {
      en: "Science study of over 588,000 people: remote work increases time alone and distress, especially if you live alone. Freedom doesn’t have to cost you connection.",
      es: "Science, más de 588.000 personas: el trabajo remoto aumenta tiempo solo y malestar, sobre todo si vives solo. La libertad no tiene por qué costarte la conexión."
    },
    readingTime: "4 min",
    category: {
      en: "Workspace Guide",
      es: "Guía de Espacios"
    },
    featured: false
  },
  {
    id: "the-right-cafe-for-today",
    slugs: {
      en: "the-right-cafe-for-today",
      es: "el-cafe-correcto-para-hoy",
    },
    publishDate: "2026-10-10",
    lastModified: "2026-10-10",
    title: {
      en: "The perfect café doesn’t exist. The right café for today does",
      es: "El café perfecto no existe. Existe el café correcto para hoy"
    },
    excerpt: {
      en: "In Medellín, “best cafés for remote work” lists fall short. Conditions change by the hour. Here’s how to find the space that actually works for you today.",
      es: "En Medellín las listas de “mejores cafés para trabajar” se quedan cortas. El ambiente cambia cada hora. Cómo encontrar el espacio que realmente te sirve hoy."
    },
    readingTime: "5 min",
    category: {
      en: "Workspace Guide",
      es: "Guía de Espacios"
    },
    featured: false
  },
  {
    id: "about-work-friendly-spaces",
    slugs: {
      en: "about-work-friendly-spaces",
      es: "sobre-espacios-de-trabajo-amigables",
    },
    publishDate: "2025-06-20",
    // Date of the last git commit touching the post's files.
    lastModified: "2026-10-10",
    title: {
      en: "Understanding Work-Friendly Spaces: The Future of Productive Environments",
      es: "Entendiendo los Espacios de Trabajo Amigables: El Futuro de los Ambientes Productivos"
    },
    excerpt: {
      en: "Discover what makes a space truly work-friendly and how the concept has evolved beyond traditional coworking.",
      es: "Descubre qué hace que un espacio sea verdaderamente amigable para el trabajo y cómo el concepto ha evolucionado más allá del coworking tradicional."
    },
    readingTime: "8 min",
    category: {
      en: "Workspace Guide",
      es: "Guía de Espacios"
    },
    featured: true
  },
  {
    id: "best-cafes-and-workfriendly-spaces-in-medellin",
    slugs: {
      en: "best-cafes-and-workfriendly-spaces-in-medellin",
      es: "los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin",
    },
    publishDate: "2025-06-20",
    // Date of the last git commit touching the post's files.
    lastModified: "2026-10-10",
    title: {
      en: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)",
      es: "Los Mejores Cafés y Espacios de Trabajo Amigables en Medellín (Guía 2025)"
    },
    excerpt: {
      en: "Discover the best work-friendly cafes and spaces in Medellín for digital nomads. From cozy cafes in Poblado to mountain workspaces in Santa Elena.",
      es: "Descubre los mejores cafés y espacios de trabajo amigables en Medellín para nómadas digitales. Desde cafés acogedores en Poblado hasta espacios en las montañas de Santa Elena."
    },
    readingTime: "6 min",
    category: {
      en: "City Guide",
      es: "Guía de Ciudad"
    },
    featured: false
  },
];

export function getBlogPost(id: string): BlogPostEntry {
  const post = BLOG_POSTS.find((p) => p.id === id);
  if (!post) throw new Error(`Unknown blog post: ${id}`);
  return post;
}

// Finds a post by the slug of either language.
export function findBlogPostBySlug(slug: string): BlogPostEntry | undefined {
  return BLOG_POSTS.find((p) => p.slugs.en === slug || p.slugs.es === slug);
}

export function blogPostPath(post: BlogPostEntry, locale: SiteLocale): string {
  return localizedPath(locale, `/blog/${post.slugs[locale]}`);
}

export function blogPostUrl(post: BlogPostEntry, locale: SiteLocale): string {
  return `${SITE_URL}${blogPostPath(post, locale)}`;
}

type Alternates = NonNullable<Metadata["alternates"]>;

// `alternates` for a static page: self-referencing canonical + en / es / x-default.
export function pageAlternates(locale: SiteLocale, path: string): Alternates {
  return {
    canonical: absoluteUrl(locale, path),
    languages: {
      en: absoluteUrl("en", path),
      es: absoluteUrl("es", path),
      "x-default": absoluteUrl("en", path),
    },
  };
}

// `alternates` for a blog post: EN and ES live under different slugs, so each hreflang
// points at its own real URL.
export function postAlternates(post: BlogPostEntry, locale: SiteLocale): Alternates {
  return {
    canonical: blogPostUrl(post, locale),
    languages: {
      en: blogPostUrl(post, "en"),
      es: blogPostUrl(post, "es"),
      "x-default": blogPostUrl(post, "en"),
    },
  };
}

export function toSiteLocale(locale: string): SiteLocale {
  return locale === "es" ? "es" : "en";
}

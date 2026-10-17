import type { BlogPostData } from "@/lib/blog-seo";
import { SITE_URL, getBlogPost } from "@/lib/seo/routes";

// Shared data for the EN/ES pair:
// /blog/medellin-2026-where-your-rhythm-finds-its-place  <->  /es/blog/medellin-2026-donde-tu-ritmo-encuentra-su-lugar
// Body copy is verbatim from the approved post. Only the visual layout is ours.

export type MedellinLang = "en" | "es";

const POST_ID = "medellin-2026-where-your-rhythm-finds-its-place";

export const MEDELLIN_SLUGS: Record<MedellinLang, string> = getBlogPost(POST_ID).slugs;

export const MEDELLIN_BASE_URL = SITE_URL;

// next-intl uses localePrefix "as-needed": English is served without /en.
export function medellinLocalePrefix(lang: MedellinLang) {
  return lang === "en" ? "" : "/es";
}

export function medellinPath(lang: MedellinLang) {
  return `${medellinLocalePrefix(lang)}/blog/${MEDELLIN_SLUGS[lang]}`;
}

export function medellinUrl(lang: MedellinLang) {
  return `${MEDELLIN_BASE_URL}${medellinPath(lang)}`;
}

// Meta titles are the approved ones, kept whole (they are longer than 60 chars on purpose).
export const MEDELLIN_META_TITLE: Record<MedellinLang, string> = {
  en: "Medellín 2026: It’s no longer just cheap — it’s where your rhythm finds its place",
  es: "Medellín 2026: Ya no es solo barato — es donde tu ritmo encuentra su lugar",
};

const IMG_DIR = "/assets/images/blog/medellin-2026-rhythm";
export const MEDELLIN_IMAGES = {
  hero: { src: `${IMG_DIR}/desk-terrace-medellin-dusk-hero.webp`, width: 1168, height: 784 },
  og: { src: `${IMG_DIR}/desk-terrace-medellin-dusk-og.jpg`, width: 1200, height: 630 },
};

const shared = {
  title: {
    en: "Medellín in 2026 is no longer “cheap”: it’s where your rhythm finds its place",
    es: "Medellín en 2026 ya no es “barato”: es donde tu ritmo encuentra su lugar",
  },
  description: {
    en: "Medellín is still in the global top 30 for digital nomads. But the game changed: Laureles won, a comfortable month is $1,200–1,800, and what matters is the context of your day. Here’s how to choose for real.",
    es: "Medellín sigue en el top 30 mundial de nómadas digitales. Pero el juego cambió: Laureles ganó, el costo real está entre $1.200–1.800, y lo que importa es el contexto de tu día. Aquí está cómo elegir de verdad.",
  },
  keywords: {
    en: [
      "Medellín 2026 digital nomads",
      "Medellín cost of living 2026",
      "Laureles vs El Poblado",
      "best neighborhood Medellín remote work",
      "Envigado",
      "digital nomad ranking Medellín",
      "remote work Medellín",
      "coworking Medellín",
      "work environment productivity",
      "real-time workspace context",
      "Coffi",
    ],
    es: [
      "Medellín 2026 nómadas digitales",
      "costo de vida Medellín 2026",
      "Laureles vs El Poblado",
      "mejor barrio Medellín trabajo remoto",
      "Envigado",
      "ranking nómadas digitales Medellín",
      "trabajo remoto Medellín",
      "coworking Medellín",
      "ambiente de trabajo productividad",
      "contexto en tiempo real espacios de trabajo",
      "Coffi",
    ],
  },
  publishDate: getBlogPost(POST_ID).publishDate,
  lastModified: getBlogPost(POST_ID).lastModified,
  category: "City Guide",
  author: { name: "Coffi Team", url: "https://coffi.com.co/about-us" },
  image: `${MEDELLIN_BASE_URL}${MEDELLIN_IMAGES.og.src}`,
};

export function medellinBlogData(lang: MedellinLang): BlogPostData {
  return {
    ...shared,
    slug: MEDELLIN_SLUGS[lang],
    readingTime: lang === "es" ? "3 min de lectura" : "3 min read",
  };
}

// Rich text segment: plain string, or a styled/linked fragment.
export type Seg = string | { t: string; href?: string; em?: boolean; strong?: boolean };
export type Rich = Seg[];

export interface MedellinCopy {
  h1: string;
  // First paragraph of the body, shown as the hero lead (not repeated below).
  lead: string;
  dateLabel: string;
  readingTimeLabel: string;
  alt: { hero: string };
  intro: { p1: string; p2: string };
  game: { h2: string; p1: Rich; p2: Rich; p3: Rich };
  laureles: { h2: string; p1: string; p2: Rich; p3: string; p4: string };
  environment: { h2: string; p1: string; p2: Rich; p3: Rich; p4: Rich };
  choose: { h2: string; lead: string; items: { lead: string; rest: string }[]; p1: string; p2: Rich };
  thrive: { h2: string; p1: string; p2: Rich };
  signoff: string;
  sources: string;
  related: { label: string; posts: { title: string; href: string }[] };
}

const SPACE_ES = "/es/blog/el-espacio-que-eliges-hoy";
const SPACE_EN = "/blog/the-space-you-choose-today";
const CAFE_ES = "/es/blog/el-cafe-correcto-para-hoy";
const CAFE_EN = "/blog/the-right-cafe-for-today";
const BEST_ES = "/es/blog/los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin";
const BEST_EN = "/blog/best-cafes-and-workfriendly-spaces-in-medellin";
export const COFFI_APP_URL = "https://app.coffi.com.co";

export const MEDELLIN_COPY: Record<MedellinLang, MedellinCopy> = {
  es: {
    h1: shared.title.es,
    lead: "Hay una broma que se repite en los cafés de Laureles: “Vine por un mes… hace tres años”.",
    dateLabel: "17 de octubre de 2026",
    readingTimeLabel: "3 min",
    alt: {
      hero: "Escritorio con laptop, taza de café y cuaderno en una terraza con vista a la ciudad de Medellín y las montañas al atardecer, bajo un cielo morado",
    },
    intro: {
      p1: "Medellín sigue siendo una de las ciudades más elegidas del planeta para remote workers. En 2026 ocupó el puesto 23 en el ranking global de Nomads (la única ciudad colombiana en el top 30), por encima de Roma, Viena o Seúl. El clima eterno (18–27 °C todo el año), la zona horaria alineada con Estados Unidos, la fibra rápida y una comunidad real son reales.",
      p2: "Pero el relato de “es barato” ya no alcanza.",
    },
    game: {
      h2: "El juego cambió",
      p1: [
        "En 2026 la pregunta no es “¿puedo vivir aquí con poco?”. La pregunta es: ",
        { t: "¿puedo construir un ritmo que me haga thrivar — trabajo y vida — de verdad?", strong: true },
      ],
      p2: [
        "Los números de un mes cómodo para una persona sola suelen estar entre ",
        { t: "USD 1.200 y 1.800", strong: true },
        ". Un presupuesto lean puede bajar a 900–1.200; uno más holgado sube a 2.000–2.500. El coworking opcional ronda los 100–150 dólares. El internet residencial de fibra es estándar en los barrios nómadas.",
      ],
      p3: [
        "El costo ya no es el diferenciador principal. El diferenciador es el ",
        { t: "contexto", strong: true },
        ".",
      ],
    },
    laureles: {
      h2: "Laureles ganó (y por qué)",
      p1: "El Poblado sigue siendo la landing pad perfecta: coworkings, specialty coffee, eventos y todo en inglés. Es útil la primera semana. Después, las colinas, los precios turísticos y la burbuja empiezan a pesar.",
      p2: [
        "Laureles es donde se quedan los que ya probaron ambos. Es plano, caminable, lleno de árboles y de cafés. Rents 20–40 % más bajos que El Poblado para calidad similar. Hay comunidad internacional, pero también vida local real. La 70 tiene energía; Primer Parque concentra los cafés. Es el barrio que permite vivir ",
        { t: "en", em: true },
        " Medellín, no solo ",
        { t: "desde", em: true },
        " Medellín.",
      ],
      p3: "Envigado aparece como la tercera opción: más residencial, más calmada, bien conectada por metro.",
      p4: "El patrón que se repite: aterrizas en El Poblado, te mudas a Laureles (o Envigado) cuando decides quedarte.",
    },
    environment: {
      h2: "El ambiente decide más que el barrio",
      p1: "Elegir el barrio correcto es solo el primer filtro. Dentro de él, el espacio del día importa más.",
      p2: [
        { t: "La ciencia es clara", href: SPACE_ES },
        ": el ruido, la densidad, la luz y el vibe cambian el foco, la creatividad y la energía. El ruido de conversación inteligible es especialmente distractor. Un ambiente moderado (~70 dB, tipo café) puede ayudar a la creatividad; el silencio o el ruido controlado es mejor para trabajo profundo. La temperatura ideal ronda los 21–22 °C. La luz natural mejora el estado de ánimo y la alerta.",
      ],
      p3: [
        "En Medellín tienes opciones reales todos los días: ",
        { t: "un café tranquilo de Laureles", href: BEST_ES },
        " para deep work, un rooftop de El Poblado para brainstorming, un coworking con salas de reunión para llamadas, o incluso un espacio al aire libre cuando el clima eterno te lo permite.",
      ],
      p4: [
        "El problema no es la oferta. El problema es la fricción de elegir bien ",
        { t: "hoy", em: true },
        ".",
      ],
    },
    choose: {
      h2: "Cómo elegir de verdad (sin trial and error)",
      lead: "Tres preguntas simples que cambian el día:",
      items: [
        { lead: "¿Qué necesitas hacer hoy?", rest: " Deep focus, llamadas, brainstorm creativo o solo estar en flujo." },
        { lead: "¿Cómo está tu energía?", rest: " Alta, media o necesitas un lugar que te recargue." },
        { lead: "¿Qué contexto buscas?", rest: " Silencio relativo, gente alrededor, luz natural, comunidad cercana." },
      ],
      p1: "La ciudad tiene la infraestructura. Lo que falta es la inteligencia que conecta tu contexto del momento con el espacio correcto.",
      p2: [
        "Eso es exactamente lo que ",
        { t: "Coffi", href: COFFI_APP_URL },
        " hace: un match en tiempo real según tu intención del día, no un directorio estático. No te dice “estos son los mejores cafés de Medellín”. Te dice “este lugar, ahora, encaja con lo que necesitas”.",
      ],
    },
    thrive: {
      h2: "De aterrizar a thrivar",
      p1: "Medellín en 2026 ya no se vende solo por precio. Se vende porque puedes construir un ritmo real: trabajar bien, desconectar bien, conocer gente, y sentir que el lugar responde a ti.",
      p2: [
        "Si llegas por un mes o te quedas por años, el secreto es el mismo: ",
        { t: "sé intencional con el lugar", strong: true },
        ". El clima eterno y la comunidad están ahí. El contexto correcto depende de ti — y de las herramientas que te ayudan a verlo claro.",
      ],
    },
    signoff: "Be where you thrive.",
    sources:
      "Fuentes clave: Rankings Nomads 2026 (puesto 23), guías de costos y barrios 2026 (MOVE, Nomada, Digital Nomads Magazine), investigación de psicología ambiental sobre ruido, temperatura y productividad.",
    related: {
      label: "Blog Coffi",
      posts: [
        { title: "El espacio que eliges hoy decide tu ritmo (y no es solo el Wi-Fi)", href: SPACE_ES },
        { title: "El café perfecto no existe. Existe el café correcto para hoy", href: CAFE_ES },
        { title: "Los Mejores Cafés y Espacios de Trabajo Amigables en Medellín (Guía 2025)", href: BEST_ES },
      ],
    },
  },
  en: {
    h1: shared.title.en,
    lead: "There’s a joke that keeps circulating in the cafés of Laureles: “I came for a month… three years ago.”",
    dateLabel: "October 17, 2026",
    readingTimeLabel: "3 min",
    alt: {
      hero: "Desk with a laptop, a cup of coffee and a notebook on a terrace overlooking the city of Medellín and the mountains at dusk, under a purple sky",
    },
    intro: {
      p1: "Medellín remains one of the most chosen cities on the planet for remote workers. In 2026 it ranked 23rd in the global Nomads ranking (the only Colombian city in the top 30), above Rome, Vienna or Seoul. The eternal spring climate (18–27 °C year-round), the time zone aligned with the US, reliable fiber, and a real community are real.",
      p2: "But the “it’s cheap” story is no longer enough.",
    },
    game: {
      h2: "The game changed",
      p1: [
        "In 2026 the question is no longer “Can I live here for little?”. The question is: ",
        { t: "Can I build a rhythm that lets me thrive — at work and in life — for real?", strong: true },
      ],
      p2: [
        "A comfortable month for one person usually lands between ",
        { t: "USD 1,200 and 1,800", strong: true },
        ". A leaner budget can drop to 900–1,200; a more generous one rises to 2,000–2,500. Optional coworking sits around 100–150 dollars. Residential fiber internet is standard in the nomad neighborhoods.",
      ],
      p3: [
        "Cost is no longer the main differentiator. The differentiator is ",
        { t: "context", strong: true },
        ".",
      ],
    },
    laureles: {
      h2: "Laureles won (and why)",
      p1: "El Poblado is still the perfect landing pad: coworkings, specialty coffee, events, and everything in English. It’s useful for the first week. After that, the hills, tourist pricing, and the bubble start to weigh.",
      p2: [
        "Laureles is where people stay once they’ve tried both. It’s flat, walkable, full of trees and cafés. Rents run 20–40 % lower than El Poblado for similar quality. There’s an international community, but also real local life. La 70 has energy; Primer Parque concentrates the cafés. It’s the neighborhood that lets you live ",
        { t: "in", em: true },
        " Medellín, not just ",
        { t: "from", em: true },
        " Medellín.",
      ],
      p3: "Envigado appears as the third option: more residential, calmer, still well connected by metro.",
      p4: "The pattern that repeats: you land in El Poblado, then move to Laureles (or Envigado) when you decide to stay.",
    },
    environment: {
      h2: "The environment decides more than the neighborhood",
      p1: "Choosing the right neighborhood is only the first filter. Inside it, the space of the day matters more.",
      p2: [
        { t: "The science is clear", href: SPACE_EN },
        ": noise, density, light, and vibe change focus, creativity, and energy. Intelligible conversation noise is especially distracting. Moderate ambient noise (~70 dB, café-like) can help creativity; silence or controlled noise is better for deep work. Ideal temperature sits around 21–22 °C. Natural light improves mood and alertness.",
      ],
      p3: [
        "In Medellín you have real options every day: ",
        { t: "a quiet Laureles café", href: BEST_EN },
        " for deep work, an El Poblado rooftop for brainstorming, a coworking with meeting rooms for calls, or even an outdoor spot when the eternal climate allows it.",
      ],
      p4: [
        "The problem isn’t the offer. The problem is the friction of choosing well ",
        { t: "today", em: true },
        ".",
      ],
    },
    choose: {
      h2: "How to choose for real (without trial and error)",
      lead: "Three simple questions that change the day:",
      items: [
        { lead: "What do you need to do today?", rest: " Deep focus, calls, creative brainstorm, or just being in flow." },
        { lead: "How is your energy?", rest: " High, medium, or do you need a place that recharges you." },
        { lead: "What context are you looking for?", rest: " Relative silence, people around, natural light, nearby community." },
      ],
      p1: "The city has the infrastructure. What’s missing is the intelligence that connects your moment’s context with the right space.",
      p2: [
        "That’s exactly what ",
        { t: "Coffi", href: COFFI_APP_URL },
        " does: a real-time match based on your daily intent, not a static directory. It doesn’t say “these are the best cafés in Medellín.” It says “this place, right now, fits what you need.”",
      ],
    },
    thrive: {
      h2: "From landing to thriving",
      p1: "Medellín in 2026 is no longer sold only on price. It’s sold because you can build a real rhythm: work well, disconnect well, meet people, and feel that the place responds to you.",
      p2: [
        "Whether you arrive for a month or stay for years, the secret is the same: ",
        { t: "be intentional with the place", strong: true },
        ". The eternal climate and the community are there. The right context depends on you — and on the tools that help you see it clearly.",
      ],
    },
    signoff: "Be where you thrive.",
    sources:
      "Key sources: Nomads 2026 rankings (rank 23), 2026 cost and neighborhood guides (MOVE, Nomada, Digital Nomads Magazine), environmental psychology research on noise, temperature, and productivity.",
    related: {
      label: "Coffi Blog",
      posts: [
        { title: "The space you choose today decides your rhythm (and it's not just the Wi-Fi)", href: SPACE_EN },
        { title: "The perfect café doesn’t exist. The right café for today does", href: CAFE_EN },
        { title: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)", href: BEST_EN },
      ],
    },
  },
};

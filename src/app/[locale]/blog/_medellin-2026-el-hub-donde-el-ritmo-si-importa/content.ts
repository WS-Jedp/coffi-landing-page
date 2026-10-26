import type { BlogPostData } from "@/lib/blog-seo";
import { SITE_URL, getBlogPost } from "@/lib/seo/routes";

// Shared data for the EN/ES pair:
// /blog/medellin-2026-the-hub-where-rhythm-actually-matters  <->  /es/blog/medellin-2026-el-hub-donde-el-ritmo-si-importa
// Body copy is verbatim from the approved post. Only the visual layout is ours.

export type MedellinHubLang = "en" | "es";

const POST_ID = "medellin-2026-the-hub-where-rhythm-actually-matters";

export const MEDELLIN_HUB_SLUGS: Record<MedellinHubLang, string> = getBlogPost(POST_ID).slugs;

export const MEDELLIN_HUB_BASE_URL = SITE_URL;

// next-intl uses localePrefix "as-needed": English is served without /en.
export function medellinHubLocalePrefix(lang: MedellinHubLang) {
  return lang === "en" ? "" : "/es";
}

export function medellinHubPath(lang: MedellinHubLang) {
  return `${medellinHubLocalePrefix(lang)}/blog/${MEDELLIN_HUB_SLUGS[lang]}`;
}

export function medellinHubUrl(lang: MedellinHubLang) {
  return `${MEDELLIN_HUB_BASE_URL}${medellinHubPath(lang)}`;
}

// Meta titles are the approved ones, kept whole verbatim.
export const MEDELLIN_HUB_META_TITLE: Record<MedellinHubLang, string> = {
  en: "Medellín 2026: The Hub Where Rhythm Actually Matters (and How to Thrive in It)",
  es: "Medellín 2026: el hub donde el ritmo sí importa (y cómo prosperar en él)",
};

const MEDELLIN_HUB_TITLE: Record<MedellinHubLang, string> = {
  en: "Medellín 2026: The Hub Where Rhythm Actually Matters",
  es: "Medellín 2026: el hub donde el ritmo sí importa",
};

const IMG_DIR = "/assets/images/blog/medellin-2026-hub-rhythm";
export const MEDELLIN_HUB_IMAGES = {
  hero: { src: `${IMG_DIR}/medellin-aerial-sunset.webp`, width: 1168, height: 784 },
  og: { src: `${IMG_DIR}/medellin-aerial-sunset-og.jpg`, width: 1200, height: 630 },
};

const shared = {
  title: MEDELLIN_HUB_TITLE,
  description: {
    en: "Medellín is no longer just coffee and views. It’s a growing tech ecosystem and a city with multiple rhythms. Here’s how to choose the right place for what you need today — without improvising every morning.",
    es: "Medellín ya no es solo café y vista. Es un ecosistema tech en auge y una ciudad con ritmos distintos. Aquí va cómo elegir el lugar correcto según lo que necesitas hoy — sin improvisar.",
  },
  keywords: {
    en: [
      "Medellín 2026 tech hub",
      "Ruta N startups Medellín",
      "Laureles vs El Poblado coworking",
      "digital nomads Medellín 2026",
      "remote work Medellín",
      "coworking Medellín",
      "work environment productivity",
      "Coffi Nights",
      "Coffi",
    ],
    es: [
      "Medellín 2026 hub tecnológico",
      "Ruta N startups Medellín",
      "Laureles vs El Poblado coworking",
      "nómadas digitales Medellín 2026",
      "trabajo remoto Medellín",
      "coworking Medellín",
      "ambiente de trabajo productividad",
      "Coffi Nights",
      "Coffi",
    ],
  },
  publishDate: getBlogPost(POST_ID).publishDate,
  lastModified: getBlogPost(POST_ID).lastModified,
  category: "City Guide",
  author: { name: "Coffi Team", url: "https://coffi.com.co/about-us" },
  image: `${MEDELLIN_HUB_BASE_URL}${MEDELLIN_HUB_IMAGES.og.src}`,
};

export function medellinHubBlogData(lang: MedellinHubLang): BlogPostData {
  return {
    ...shared,
    slug: MEDELLIN_HUB_SLUGS[lang],
    // ~810 words at 200 wpm (~4 min). Same value as the registry card.
    readingTime: lang === "es" ? "4 min de lectura" : "4 min read",
  };
}

// Rich text segment: plain string, or a styled/linked fragment.
export type Seg = string | { t: string; href?: string; em?: boolean; strong?: boolean };
export type Rich = Seg[];

export interface MedellinHubCopy {
  h1: string;
  // First paragraph of the body, shown as the hero lead (not repeated below).
  lead: string;
  dateLabel: string;
  readingTimeLabel: string;
  alt: { hero: string };
  intro: { p1: string; p2: string; p3: string; p4: string };
  rhythms: {
    h2: string;
    p1: Rich;
    p2: Rich;
    p3: string;
    items: Rich[];
    p4: string;
  };
  environment: { h2: string; p1: Rich; p2: string; p3: string };
  thrive: { h2: string; p1: string; p2: string; items: string[]; p3: string };
  coffi: { h2: string; p1: Rich; p2: string; p3: string };
  signoff: string;
  footnotes: string[];
  related: { label: string; ids: string[] };
}

export const COFFI_APP_URL = "https://app.coffi.com.co";

const RHYTHM_ES = "/es/blog/medellin-2026-donde-tu-ritmo-encuentra-su-lugar";
const RHYTHM_EN = "/blog/medellin-2026-where-your-rhythm-finds-its-place";
const BEST_ES = "/es/blog/los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin";
const BEST_EN = "/blog/best-cafes-and-workfriendly-spaces-in-medellin";
const SPACE_ES = "/es/blog/el-espacio-que-eliges-hoy";
const SPACE_EN = "/blog/the-space-you-choose-today";

export const MEDELLIN_HUB_RELATED_IDS = [
  "medellin-2026-where-your-rhythm-finds-its-place",
  "you-only-get-2-3-hours-of-real-focus-a-day",
  "the-space-you-choose-today",
];

export const MEDELLIN_HUB_COPY: Record<MedellinHubLang, MedellinHubCopy> = {
  es: {
    h1: shared.title.es,
    lead: "Llegas a Medellín con la maleta y la laptop. En dos días ya tienes tres cafés “recomendados”, un WeWork en la lista y la sensación de que todo el mundo sabe exactamente dónde ir menos tú.",
    dateLabel: "26 de octubre de 2026",
    readingTimeLabel: "4 min",
    alt: {
      hero: "Vista aérea de la densa ciudad de Medellín y sus colinas al atardecer bajo una luz dorada",
    },
    intro: {
      p1: "No es que falten opciones. Es que la ciudad tiene varios ritmos al mismo tiempo, y el tuyo cambia según el día.",
      p2: "Medellín en 2026 no es el mismo destino nómada de hace cinco años. Es un hub tecnológico real. Según datos de Ruta N, la ciudad tiene más de 740 startups activas que generan más de 17.000 empleos directos. En lo que va de 2026 han captado alrededor de 216 millones de dólares en inversión — un 38 % más que todo 2025. Concentra el 24 % de las startups DeepTech de Colombia y una parte importante del talento en software, energía y fintech.",
      p3: "Eso cambia el tipo de gente que está aquí. No solo nómadas de paso. También founders locales, diseñadores que se quedaron, ingenieros que llegan por un proyecto y terminan quedándose meses.",
      p4: "Y eso, a su vez, cambia cómo se siente la ciudad cuando abres el mapa y buscas dónde trabajar hoy.",
    },
    rhythms: {
      h2: "Dos ritmos principales (y varios matices)",
      p1: [
        { t: "El Poblado sigue siendo el aterrizaje fácil", href: RHYTHM_ES },
        ". Provenza y Manila tienen densidad de coworkings, cafés con buen wifi y gente que habla inglés. Es cómodo cuando llegas y no quieres pensar. Pero también es más caro, más empinado y a veces más ruidoso de lo que necesitas.",
      ],
      p2: [
        "Laureles es el otro polo. Plano, caminable, con una mezcla más local-expat y precios más amables. La gente que se queda más de un mes suele terminar aquí o en zonas cercanas. Los coworkings son más pequeños, la vida de barrio se nota más y el ritmo es menos “hub internacional” y más “ciudad real”.",
      ],
      p3: "Ninguno de los dos es mejor en abstracto. Depende de lo que traigas hoy:",
      items: [
        [
          "Si necesitas foco profundo y silencio relativo, un coworking pequeño en Laureles o un ",
          { t: "café tranquilo en la zona", href: BEST_ES },
          " suele ganar.",
        ],
        ["Si llegaste ayer y quieres cruzarte con gente que también está empezando, el Poblado acelera el proceso."],
        ["Si tu energía está baja y quieres algo que no te demande socializar, el contexto cambia otra vez."],
      ],
      p4: "La diferencia no está en “el mejor barrio”. Está en saber cuál de esos ritmos se parece más a lo que necesitas ahora mismo.",
    },
    environment: {
      h2: "El ambiente sigue decidiendo el día",
      p1: [
        "Los datos de productividad de 2026 siguen apuntando en la misma dirección: el trabajo remoto e híbrido puede ser más productivo, pero ",
        { t: "el entorno real importa", href: SPACE_ES },
        ". Ruido, densidad de gente, calidad de wifi en el momento y vibe general no son detalles. Son el filtro que hace que las horas rindan o se diluyan.",
      ],
      p2: "En Medellín eso se nota con claridad. Un día de deep work en un espacio con gente hablando fuerte y entregas constantes de comida es diferente a uno en un lugar donde el nivel de ruido es bajo y la gente está en modo similar al tuyo. Lo mismo aplica si lo que necesitas es brainstorm o una llamada importante.",
      p3: "Google Maps te dice que hay un café cerca. No te dice si hoy está lleno de conversaciones altas o si el wifi está saturado. Tampoco te dice quién más está trabajando allí en ese momento.",
    },
    thrive: {
      h2: "Cómo prosperar en la ciudad (sin improvisar cada mañana)",
      p1: "La forma más simple de no perder el día es tratar a Medellín como lo que es: una ciudad con varios contextos simultáneos, no un solo “lugar para nómadas”.",
      p2: "Algunas prácticas que funcionan:",
      items: [
        "Define el intent del día antes de salir (foco, llamada, exploración ligera, social).",
        "Elige barrio y tipo de espacio según ese intent, no según lo que usaste ayer.",
        "Rota entre 2-3 lugares conocidos en lugar de buscar “el sitio perfecto” cada vez.",
        "Presta atención a las horas: muchos espacios cambian de energía entre la mañana y la tarde.",
      ],
      p3: "Cuando el día termina, el ritmo también cambia. Coffi Nights existe precisamente para eso: ayudarte a desconectar sin perder el contacto con lo que pasa en la ciudad. Trabajo y vida no tienen que competir si el entorno te acompaña en ambos.",
    },
    coffi: {
      h2: "Coffi en este contexto",
      p1: [
        { t: "Coffi", href: COFFI_APP_URL },
        " no es un directorio de coworkings. Es la capa que conecta tu contexto del momento (qué necesitas hacer, cómo estás, qué tipo de ambiente te sirve) con los espacios que realmente están funcionando así ahora mismo.",
      ],
      p2: "En una ciudad como Medellín, donde hay muchas opciones y varios ritmos conviviendo, esa diferencia se nota. Te ahorra el trial-and-error de las primeras semanas y te deja más energía para lo que realmente viniste a hacer — o para lo que quieres vivir después de las 6.",
      p3: "La ciudad está viva. El ecosistema tech crece. La comunidad de remote workers también. Lo que falta no es más lugares. Es saber, con claridad, dónde prosperar hoy.",
    },
    signoff: "Be where you thrive.",
    footnotes: [
      "Fuentes clave: El Espectador (25 oct 2026), Forbes Colombia / Ruta N (Pulso CTI), TravelDojo (guías Medellín digital nomads).",
    ],
    related: { label: "Blog Coffi", ids: MEDELLIN_HUB_RELATED_IDS },
  },
  en: {
    h1: shared.title.en,
    lead: "You land in Medellín with your bag and laptop. Within two days you have three “recommended” cafés, a WeWork on your list, and the feeling that everyone else knows exactly where to go except you.",
    dateLabel: "October 26, 2026",
    readingTimeLabel: "4 min",
    alt: {
      hero: "Aerial view of Medellín's dense city and hills at sunset under golden light",
    },
    intro: {
      p1: "It’s not that there aren’t enough options. It’s that the city has several rhythms running at the same time — and yours changes depending on the day.",
      p2: "Medellín in 2026 is not the same nomad destination it was five years ago. It’s a real tech hub. According to Ruta N data, the city has more than 740 active startups generating over 17,000 direct jobs. In 2026 so far, they’ve raised around $216 million in investment — 38% more than all of 2025. It concentrates 24% of Colombia’s DeepTech startups and a significant share of talent in software, energy, and fintech.",
      p3: "That changes the kind of people who are here. Not just passing nomads. Local founders, designers who stayed, engineers who arrived for a project and ended up staying for months.",
      p4: "And that, in turn, changes how the city feels when you open the map and look for where to work today.",
    },
    rhythms: {
      h2: "Two main rhythms (and several nuances)",
      p1: [
        { t: "El Poblado is still the easy landing", href: RHYTHM_EN },
        ". Provenza and Manila have a high density of coworking spaces, cafés with decent wifi, and people who speak English. It’s comfortable when you first arrive and don’t want to think. But it’s also more expensive, steeper, and sometimes noisier than you need.",
      ],
      p2: [
        "Laureles is the other pole. Flat, walkable, with a more local-expat mix and friendlier prices. People who stay longer than a month often end up here or nearby. Coworking spaces are smaller, neighborhood life is more present, and the rhythm is less “international hub” and more “real city.”",
      ],
      p3: "Neither is better in the abstract. It depends on what you’re bringing today:",
      items: [
        [
          "If you need deep focus and relative quiet, a small coworking space in Laureles or a ",
          { t: "calm café in the area", href: BEST_EN },
          " usually wins.",
        ],
        ["If you arrived yesterday and want to cross paths with people who are also just starting out, Poblado speeds things up."],
        ["If your energy is low and you want something that doesn’t demand socializing, the context changes again."],
      ],
      p4: "The difference isn’t in “the best neighborhood.” It’s in knowing which of those rhythms matches what you need right now.",
    },
    environment: {
      h2: "The environment still decides the day",
      p1: [
        "2026 productivity data keeps pointing in the same direction: remote and hybrid work can be more productive, but ",
        { t: "the real environment matters", href: SPACE_EN },
        ". Noise, density of people, wifi quality in the moment, and overall vibe aren’t details. They’re the filter that makes hours count or dissolve.",
      ],
      p2: "In Medellín this is especially clear. A deep-work day in a place with loud conversations and constant food deliveries is different from one where the noise level is low and the people around you are in a similar mode. The same applies if what you need is brainstorming or an important call.",
      p3: "Google Maps tells you there’s a café nearby. It doesn’t tell you if it’s full of loud conversations today or if the wifi is saturated. It also doesn’t tell you who else is working there right now.",
    },
    thrive: {
      h2: "How to thrive in the city (without improvising every morning)",
      p1: "The simplest way not to waste the day is to treat Medellín as what it is: a city with several simultaneous contexts, not a single “place for nomads.”",
      p2: "A few practices that work:",
      items: [
        "Define the intent of the day before you leave (focus, call, light exploration, social).",
        "Choose neighborhood and type of space based on that intent, not on what you used yesterday.",
        "Rotate between 2–3 known places instead of searching for “the perfect spot” every time.",
        "Pay attention to the hours: many spaces change energy between morning and afternoon.",
      ],
      p3: "When the day ends, the rhythm changes too. Coffi Nights exists precisely for that: helping you disconnect without losing contact with what’s happening in the city. Work and life don’t have to compete if the environment supports you in both.",
    },
    coffi: {
      h2: "Coffi in this context",
      p1: [
        { t: "Coffi", href: COFFI_APP_URL },
        " isn’t a coworking directory. It’s the layer that connects your context of the moment (what you need to do, how you feel, what kind of environment serves you) with the spaces that are actually functioning that way right now.",
      ],
      p2: "In a city like Medellín, where there are many options and several rhythms coexisting, that difference is noticeable. It saves you the trial-and-error of the first weeks and leaves you with more energy for what you actually came to do — or for what you want to live after 6 pm.",
      p3: "The city is alive. The tech ecosystem is growing. The remote worker community is too. What’s missing isn’t more places. It’s knowing, with clarity, where to thrive today.",
    },
    signoff: "Be where you thrive.",
    footnotes: [
      "Key sources: El Espectador (Oct 25, 2026), Forbes Colombia / Ruta N (Pulso CTI), TravelDojo (Medellín digital nomad guides).",
    ],
    related: { label: "Coffi Blog", ids: MEDELLIN_HUB_RELATED_IDS },
  },
};

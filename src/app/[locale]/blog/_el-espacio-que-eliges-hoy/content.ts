import type { BlogPostData } from "@/lib/blog-seo";
import { SITE_URL, getBlogPost } from "@/lib/seo/routes";

// Shared data for the EN/ES pair:
// /blog/the-space-you-choose-today  <->  /es/blog/el-espacio-que-eliges-hoy
// Body copy is verbatim from the approved post. Only the visual layout is ours.

export type EspacioLang = "en" | "es";

export const ESPACIO_SLUGS: Record<EspacioLang, string> = getBlogPost("the-space-you-choose-today").slugs;

export const ESPACIO_BASE_URL = SITE_URL;

// next-intl uses localePrefix "as-needed": English is served without /en.
export function espacioLocalePrefix(lang: EspacioLang) {
  return lang === "en" ? "" : "/es";
}

export function espacioPath(lang: EspacioLang) {
  return `${espacioLocalePrefix(lang)}/blog/${ESPACIO_SLUGS[lang]}`;
}

export function espacioUrl(lang: EspacioLang) {
  return `${ESPACIO_BASE_URL}${espacioPath(lang)}`;
}

// Meta titles are the approved ones, kept whole (they are longer than 60 chars on purpose).
export const ESPACIO_META_TITLE: Record<EspacioLang, string> = {
  en: "The space you choose today decides your rhythm (and it's not just the Wi-Fi)",
  es: "El espacio que eliges hoy decide tu ritmo (y no es solo el Wi-Fi)",
};

const IMG_DIR = "/assets/images/blog/space-you-choose-today";
export const ESPACIO_IMAGES = {
  hero: { src: `${IMG_DIR}/calm-workspace-city-view-hero.webp`, width: 1168, height: 784 },
  og: { src: `${IMG_DIR}/calm-workspace-city-view-og.jpg`, width: 1200, height: 630 },
  splitAloneVsSocial: { src: `${IMG_DIR}/split-alone-vs-social.webp`, width: 1168, height: 784 },
  longTable: { src: `${IMG_DIR}/long-table-mountain-view.webp`, width: 1168, height: 784 },
};

const shared = {
  title: {
    en: "The space you choose today decides your rhythm (and it's not just the Wi-Fi)",
    es: "El espacio que eliges hoy decide tu ritmo (y no es solo el Wi-Fi)",
  },
  description: {
    en: "In Medellín, the noise, the people, and the vibe of a café change hour by hour. Science shows how the environment affects your focus. Here's why real-time context matters more than static lists.",
    es: "En Medellín, el ruido, la gente y el vibe de un café cambian hora a hora. La ciencia muestra cómo el ambiente afecta tu foco. Aquí está por qué el contexto real importa más que las listas estáticas.",
  },
  keywords: {
    en: [
      "best café to work from Medellín",
      "work-friendly cafés Medellín",
      "coworking Medellín",
      "remote work Medellín",
      "digital nomads Medellín",
      "noise and focus",
      "work environment productivity",
      "Laureles",
      "El Poblado",
      "real-time workspace context",
      "Coffi",
    ],
    es: [
      "mejor café para trabajar en Medellín",
      "cafés para trabajar Medellín",
      "coworking Medellín",
      "trabajo remoto Medellín",
      "nómadas digitales Medellín",
      "ruido y concentración",
      "ambiente de trabajo productividad",
      "Laureles",
      "El Poblado",
      "contexto en tiempo real espacios de trabajo",
      "Coffi",
    ],
  },
  publishDate: getBlogPost("the-space-you-choose-today").publishDate,
  lastModified: getBlogPost("the-space-you-choose-today").lastModified,
  category: "Workspace Guide",
  author: { name: "Coffi Team", url: "https://coffi.com.co/about-us" },
  image: `${ESPACIO_BASE_URL}${IMG_DIR}/calm-workspace-city-view-og.jpg`,
};

export function espacioBlogData(lang: EspacioLang): BlogPostData {
  return {
    ...shared,
    slug: ESPACIO_SLUGS[lang],
    readingTime: lang === "es" ? "5 min de lectura" : "5 min read",
  };
}

// Rich text segment: plain string, or a styled/linked fragment.
export type Seg = string | { t: string; href?: string; em?: boolean; strong?: boolean };
export type Rich = Seg[];

export interface EspacioCopy {
  h1: string;
  heroDescription: string;
  dateLabel: string;
  readingTimeLabel: string;
  alt: { hero: string; splitAloneVsSocial: string; longTable: string };
  intro: { p1: string; p2: Rich };
  environment: {
    h2: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    stats: { value: string; label: string }[];
  };
  realTime: { h2: string; p1: Rich; p2: string; p3: string; p4: Rich };
  trial: { h2: string; p1: string; p2: Rich; p3: string };
  choose: { h2: string; lead: string; items: { lead: string; rest: string }[]; close: string };
  context: { h2: string; p1: Rich; p2: string; p3: string };
  signoff: string;
  related: { label: string; posts: { title: string; href: string }[] };
}

const LONELINESS_ES = "/es/blog/trabajo-remoto-y-soledad";
const LONELINESS_EN = "/blog/remote-work-and-loneliness";
const CAFE_ES = "/es/blog/el-cafe-correcto-para-hoy";
const CAFE_EN = "/blog/the-right-cafe-for-today";
const BEST_ES = "/es/blog/los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin";
const BEST_EN = "/blog/best-cafes-and-workfriendly-spaces-in-medellin";
const ABOUT_ES = "/es/blog/sobre-espacios-de-trabajo-amigables";
const ABOUT_EN = "/blog/about-work-friendly-spaces";
export const COFFI_APP_URL = "https://app.coffi.com.co";

export const ESPACIO_COPY: Record<EspacioLang, EspacioCopy> = {
  es: {
    h1: "El espacio que eliges hoy decide tu ritmo (y no es solo el Wi-Fi)",
    heroDescription: shared.description.es,
    dateLabel: "14 de octubre de 2026",
    readingTimeLabel: "5 min",
    alt: {
      hero: "Hombre con audífonos trabajando en su laptop en una larga mesa de madera de un espacio de trabajo tranquilo, con plantas y ventanales con vista a la ciudad",
      splitAloneVsSocial:
        "Imagen dividida: a la izquierda, una mujer trabajando sola en su laptop junto a un ventanal con vista a las montañas de Medellín; a la derecha, el mismo espacio lleno de gente conversando en mesas, con luces moradas en el techo",
      longTable:
        "Hombre con audífonos trabajando en su laptop en una larga mesa de madera frente a un ventanal con vista a las montañas y la ciudad de Medellín, con plantas alrededor",
    },
    intro: {
      p1: "Llegas a Laureles a las 9:30. Abres el laptop en el café que todo el mundo recomienda. A las 10:15 ya hay tres mesas hablando fuerte, el Wi-Fi baja, y esa sensación de “aquí voy a fluir” se esfuma. No es que el lugar sea malo. Es que el lugar de las 9:30 no es el mismo de las 10:15.",
      p2: [
        "Eso pasa todos los días en Medellín. Hay decenas de cafés y ",
        { t: "coworkings", href: ABOUT_ES },
        " excelentes. El problema no es la oferta. Es que casi nadie tiene información real sobre cómo está el espacio ",
        { t: "ahora mismo", em: true },
        " — y eso cambia tus resultados más de lo que crees.",
      ],
    },
    environment: {
      h2: "El ambiente no es un detalle. Es el sistema operativo de tu día",
      p1: "La ciencia es clara en esto. El ruido, la densidad de gente, la luz y hasta la calidad del aire afectan atención, memoria y energía de forma medible.",
      p2: "Estudios sobre indoor environmental quality muestran que el ruido de conversaciones (lo que los investigadores llaman “irrelevant speech”) es uno de los mayores distractores. Subir el nivel de ruido de fondo apenas 12 decibeles puede empeorar el recuerdo de palabras y dejar a las personas más cansadas y menos motivadas. En entornos abiertos, el rendimiento cognitivo puede caer alrededor de un 14-17 % comparado con espacios más controlados.",
      p3: "No es solo volumen. Es predictibilidad. Un café con murmullo constante puede servir para trabajo creativo (hay investigación que sugiere que alrededor de 70 dB ayuda a la creatividad). Pero para trabajo analítico profundo, los niveles más bajos (40-50 dB) rinden mejor porque tu cerebro no tiene que filtrar constantemente.",
      p4: "Temperatura, ventilación y luz también importan. Rangos cómodos (alrededor de 22-26 °C) y buena ventilación correlacionan con mejor desempeño cognitivo. La luz adecuada mejora atención y percepción visual. Cuando estas variables se salen del rango, no solo te sientes incómodo: pierdes foco real.",
      p5: "En la práctica, esto significa que dos personas pueden estar en el mismo café de Medellín y tener experiencias completamente diferentes según la hora, el día de la semana y lo que necesiten hacer ese momento.",
      stats: [
        { value: "12 dB", label: "más de ruido de fondo puede empeorar el recuerdo de palabras" },
        { value: "14-17 %", label: "puede caer el rendimiento cognitivo en entornos abiertos" },
        { value: "40-50 dB", label: "rinden mejor para trabajo analítico profundo" },
        { value: "22-26 °C", label: "rango cómodo que correlaciona con mejor desempeño cognitivo" },
      ],
    },
    realTime: {
      h2: "Medellín tiene espacios excelentes. Lo que falta es contexto en tiempo real",
      p1: [
        "Pergamino, Café Revolución, Semilla, Naturalia, Velvet… los nombres se repiten en ",
        { t: "las guías", href: BEST_ES },
        ". Y con razón: muchos tienen buen café, Wi-Fi usable y personal que entiende que la gente llega con laptop.",
      ],
      p2: "El detalle es que las listas son estáticas. No te dicen que en El Poblado, entre las 2 y las 5 de la tarde, varios spots de Provenza se llenan de turistas y conversaciones. O que en Laureles, Café Revolución puede estar ideal a las 8:30 de la mañana y completamente distinto después del almuerzo ejecutivo.",
      p3: "Laureles se ha consolidado como la zona preferida por muchos remote workers para sesiones más largas y locales: más plano, más caminable, con cafés que toleran bien el trabajo. El Poblado sigue siendo el punto de aterrizaje con mayor densidad y opciones “listas”. Ambas funcionan. Ninguna es la misma a las 9 am que a las 3 pm.",
      p4: [
        "La mayoría de las guías te dicen ",
        { t: "dónde", em: true },
        " puedes trabajar. Casi ninguna te dice ",
        { t: "cómo está", em: true },
        " ese lugar en el momento en que lo necesitas.",
      ],
    },
    trial: {
      h2: "Por qué el trial-and-error te cuesta más de lo que parece",
      p1: "Cada vez que llegas a un lugar y a los 20 minutos te das cuenta de que no sirve para lo que tienes que hacer, pierdes más que tiempo de desplazamiento. Pierdes el momentum. El cerebro tarda en reentrar en foco profundo. Y si eso pasa dos o tres veces a la semana, se acumula en fatiga mental y días que se sienten menos productivos de lo que podrían haber sido.",
      p2: [
        "Esteban (el que llega a una ciudad nueva o busca el spot del día) lo siente como incertidumbre: “¿Este café va a funcionar o voy a perder la mañana?”. El que ya tiene raíces lo siente como fricción constante: sabe que hay mejores opciones, pero no tiene forma clara de elegir según ",
        { t: "lo que necesita hoy", href: CAFE_ES },
        " — deep focus, una llamada, o solo un cambio de escena.",
      ],
      p3: "En ambos casos, el problema de fondo es el mismo: la infraestructura actual te da mapas y reseñas, pero no te da contexto vivo.",
    },
    choose: {
      h2: "Cómo elegir mejor (sin depender de la suerte)",
      lead: "Mientras no exista una capa de información en tiempo real, algunas cosas ayudan:",
      items: [
        {
          lead: "Define el tipo de trabajo antes de salir.",
          rest: " Trabajo analítico profundo suele ir mejor en espacios más controlados y temprano. Trabajo creativo o de escritura puede tolerar más ambiente.",
        },
        {
          lead: "Horarios importan más que el nombre del lugar.",
          rest: " Los spots famosos de El Poblado y Laureles cambian radicalmente entre las 8-10 am y las 1-4 pm.",
        },
        {
          lead: "Rota con intención.",
          rest: " Tener 2-3 lugares de confianza por barrio y saber cuándo usar cada uno reduce el trial-and-error.",
        },
        {
          lead: "Observa el ambiente al entrar.",
          rest: " Si hay más de 3-4 conversaciones activas cerca de tu mesa, el costo de filtrar ruido ya está presente.",
        },
      ],
      close: "Estas tácticas ayudan, pero siguen siendo manuales. El verdadero salto ocurre cuando el espacio y tu contexto se pueden leer en el momento.",
    },
    context: {
      h2: "El contexto es la infraestructura que faltaba",
      p1: [
        { t: "Coffi", href: COFFI_APP_URL, strong: true },
        " existe precisamente por esto. No es otra lista de cafés. Es una red que te ayuda a hacer match con el espacio según lo que necesitas ",
        { t: "ahora", em: true },
        ": el nivel de ruido, la densidad, el vibe, y lo que tú estás tratando de lograr esa sesión.",
      ],
      p2: "Porque el ambiente no es un detalle secundario. Es lo que decide si tu energía se va en filtrar ruido o se queda disponible para el trabajo que realmente importa.",
      p3: "El lugar correcto a la hora correcta no es lujo. Es la diferencia entre un día que fluye y uno que se siente como resistencia constante.",
    },
    signoff: "Be where you thrive.",
    related: {
      label: "Blog Coffi",
      posts: [
        { title: "Remote work te dio libertad. La ciencia dice que también te dejó más solo.", href: LONELINESS_ES },
        { title: "El café perfecto no existe. Existe el café correcto para hoy", href: CAFE_ES },
        { title: "Los Mejores Cafés y Espacios de Trabajo Amigables en Medellín (Guía 2025)", href: BEST_ES },
      ],
    },
  },
  en: {
    h1: "The space you choose today decides your rhythm (and it's not just the Wi-Fi)",
    heroDescription: shared.description.en,
    dateLabel: "October 14, 2026",
    readingTimeLabel: "5 min",
    alt: {
      hero: "Man with headphones working on his laptop at a long wooden table in a calm workspace with plants and large windows overlooking the city",
      splitAloneVsSocial:
        "Split image: on the left, a woman working alone on her laptop beside a window with a view of Medellín's mountains; on the right, the same space full of people talking at tables under purple ceiling lights",
      longTable:
        "Man with headphones working on his laptop at a long wooden table in front of a large window overlooking the mountains and the city of Medellín, surrounded by plants",
    },
    intro: {
      p1: "You arrive in Laureles at 9:30. You open your laptop at the café everyone recommends. By 10:15 three tables are talking loudly, the Wi-Fi drops, and that feeling of “this is where I’ll flow” disappears. It’s not that the place is bad. It’s that the place at 9:30 is not the same place at 10:15.",
      p2: [
        "This happens every day in Medellín. There are dozens of excellent cafés and ",
        { t: "coworkings", href: ABOUT_EN },
        ". The problem isn’t the supply. It’s that almost no one has real information about how the space is ",
        { t: "right now", em: true },
        " — and that changes your results more than you think.",
      ],
    },
    environment: {
      h2: "The environment is not a detail. It’s the operating system of your day",
      p1: "The science is clear on this. Noise, crowd density, light, and even air quality affect attention, memory, and energy in measurable ways.",
      p2: "Studies on indoor environmental quality show that conversation noise (what researchers call “irrelevant speech”) is one of the biggest distractors. Raising background noise by just 12 decibels can worsen word recall and leave people more tired and less motivated. In open environments, cognitive performance can drop around 14-17% compared with more controlled spaces.",
      p3: "It’s not just volume. It’s predictability. A café with constant murmur can work for creative work (there’s research suggesting around 70 dB helps creativity). But for deep analytical work, lower levels (40-50 dB) perform better because your brain doesn’t have to filter constantly.",
      p4: "Temperature, ventilation, and light also matter. Comfortable ranges (around 22-26 °C) and good ventilation correlate with better cognitive performance. Adequate light improves attention and visual perception. When these variables go out of range, you don’t just feel uncomfortable: you lose real focus.",
      p5: "In practice, this means two people can be in the same café in Medellín and have completely different experiences depending on the time, the day of the week, and what they need to do in that moment.",
      stats: [
        { value: "12 dB", label: "more background noise can worsen word recall" },
        { value: "14-17%", label: "cognitive performance can drop in open environments" },
        { value: "40-50 dB", label: "perform better for deep analytical work" },
        { value: "22-26 °C", label: "comfortable range that correlates with better cognitive performance" },
      ],
    },
    realTime: {
      h2: "Medellín has excellent spaces. What’s missing is real-time context",
      p1: [
        "Pergamino, Café Revolución, Semilla, Naturalia, Velvet… the names repeat in ",
        { t: "the guides", href: BEST_EN },
        ". And for good reason: many have good coffee, usable Wi-Fi, and staff who understand that people arrive with laptops.",
      ],
      p2: "The detail is that the lists are static. They don’t tell you that in El Poblado, between 2 and 5 in the afternoon, several spots in Provenza fill up with tourists and conversations. Or that in Laureles, Café Revolución can be ideal at 8:30 in the morning and completely different after the executive lunch.",
      p3: "Laureles has established itself as the preferred area for many remote workers for longer, more local sessions: flatter, more walkable, with cafés that tolerate work well. El Poblado remains the landing point with higher density and “ready” options. Both work. Neither is the same at 9 am as at 3 pm.",
      p4: [
        "Most guides tell you ",
        { t: "where", em: true },
        " you can work. Almost none tell you ",
        { t: "how", em: true },
        " that place is in the moment you need it.",
      ],
    },
    trial: {
      h2: "Why trial-and-error costs more than it seems",
      p1: "Every time you arrive at a place and after 20 minutes realize it doesn’t work for what you need to do, you lose more than travel time. You lose momentum. The brain takes time to re-enter deep focus. And if that happens two or three times a week, it accumulates into mental fatigue and days that feel less productive than they could have been.",
      p2: [
        "Esteban (the one arriving in a new city or looking for the spot of the day) feels it as uncertainty: “Will this café work or am I going to lose the morning?” The one who already has roots feels it as constant friction: they know there are better options, but they don’t have a clear way to choose according to ",
        { t: "what they need today", href: CAFE_EN },
        " — deep focus, a call, or just a change of scene.",
      ],
      p3: "In both cases, the underlying problem is the same: the current infrastructure gives you maps and reviews, but it doesn’t give you living context.",
    },
    choose: {
      h2: "How to choose better (without depending on luck)",
      lead: "While a real-time information layer doesn’t exist, some things help:",
      items: [
        {
          lead: "Define the type of work before you leave.",
          rest: " Deep analytical work usually goes better in more controlled spaces and early. Creative or writing work can tolerate more atmosphere.",
        },
        {
          lead: "Hours matter more than the name of the place.",
          rest: " The famous spots in El Poblado and Laureles change radically between 8-10 am and 1-4 pm.",
        },
        {
          lead: "Rotate with intention.",
          rest: " Having 2-3 trusted places per neighborhood and knowing when to use each one reduces trial-and-error.",
        },
        {
          lead: "Observe the environment when you enter.",
          rest: " If there are more than 3-4 active conversations near your table, the cost of filtering noise is already present.",
        },
      ],
      close: "These tactics help, but they remain manual. The real leap happens when the space and your context can be read in the moment.",
    },
    context: {
      h2: "Context is the infrastructure that was missing",
      p1: [
        { t: "Coffi", href: COFFI_APP_URL, strong: true },
        " exists precisely for this. It’s not another list of cafés. It’s a network that helps you match with the space according to what you need ",
        { t: "right now", em: true },
        ": the noise level, the density, the vibe, and what you’re trying to achieve in that session.",
      ],
      p2: "Because the environment is not a secondary detail. It’s what decides whether your energy goes into filtering noise or stays available for the work that actually matters.",
      p3: "The right place at the right time is not a luxury. It’s the difference between a day that flows and one that feels like constant resistance.",
    },
    signoff: "Be where you thrive.",
    related: {
      label: "Coffi Blog",
      posts: [
        { title: "Remote work gave you freedom. Science says it also left you more alone.", href: LONELINESS_EN },
        { title: "The perfect café doesn’t exist. The right café for today does", href: CAFE_EN },
        { title: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)", href: BEST_EN },
      ],
    },
  },
};

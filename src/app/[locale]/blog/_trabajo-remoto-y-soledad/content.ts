import type { BlogPostData } from "@/lib/blog-seo";

// Shared data for the EN/ES pair:
// /blog/remote-work-and-loneliness  <->  /es/blog/trabajo-remoto-y-soledad
// Body copy is verbatim from the approved post. Only the visual layout is ours.

export type SoledadLang = "en" | "es";

export const SOLEDAD_SLUGS: Record<SoledadLang, string> = {
  en: "remote-work-and-loneliness",
  es: "trabajo-remoto-y-soledad",
};

export const SOLEDAD_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://coffi.com.co";

// next-intl uses localePrefix "as-needed": English is served without /en.
export function soledadLocalePrefix(lang: SoledadLang) {
  return lang === "en" ? "" : "/es";
}

export function soledadPath(lang: SoledadLang) {
  return `${soledadLocalePrefix(lang)}/blog/${SOLEDAD_SLUGS[lang]}`;
}

export function soledadUrl(lang: SoledadLang) {
  return `${SOLEDAD_BASE_URL}${soledadPath(lang)}`;
}

export const SOLEDAD_META_TITLE: Record<SoledadLang, string> = {
  en: "Remote Work and Loneliness: What the Science Says | Coffi",
  es: "Remote work y soledad: lo que dice la ciencia | Coffi",
};

const IMG_DIR = "/assets/images/blog/remote-work-loneliness";
export const SOLEDAD_IMAGES = {
  hero: { src: `${IMG_DIR}/cafe-city-view-hero.webp`, width: 1168, height: 784 },
  og: { src: `${IMG_DIR}/cafe-city-view-og.jpg`, width: 1200, height: 630 },
  homeVsLaureles: { src: `${IMG_DIR}/home-alone-vs-laureles-cafe.webp`, width: 1168, height: 784 },
  rooftop: { src: `${IMG_DIR}/medellin-rooftop-coworking-night.webp`, width: 1168, height: 784 },
};

const shared = {
  title: {
    en: "Remote work gave you freedom. Science says it also left you more alone.",
    es: "Remote work te dio libertad. La ciencia dice que también te dejó más solo.",
  },
  description: {
    en: "Science study of over 588,000 people: remote work increases time alone and distress, especially if you live alone. Freedom doesn’t have to cost you connection.",
    es: "Science, más de 588.000 personas: el trabajo remoto aumenta tiempo solo y malestar, sobre todo si vives solo. La libertad no tiene por qué costarte la conexión.",
  },
  keywords: {
    en: [
      "remote work loneliness",
      "remote work isolation",
      "digital nomads Medellín",
      "coworking Medellín",
      "remote work Medellín",
      "ambient presence",
      "Laureles",
      "El Poblado",
      "work-friendly cafés",
      "Coffi",
    ],
    es: [
      "trabajo remoto y soledad",
      "aislamiento remote work",
      "nómadas digitales Medellín",
      "coworking Medellín",
      "trabajo remoto Medellín",
      "presencia ambiental",
      "Laureles",
      "El Poblado",
      "cafés para trabajar",
      "Coffi",
    ],
  },
  publishDate: "2026-10-12",
  lastModified: "2026-10-12",
  category: "Workspace Guide",
  author: { name: "Coffi Team", url: "https://coffi.com.co/about-us" },
  image: `${SOLEDAD_BASE_URL}${IMG_DIR}/cafe-city-view-og.jpg`,
};

export function soledadBlogData(lang: SoledadLang): BlogPostData {
  return {
    ...shared,
    slug: SOLEDAD_SLUGS[lang],
    readingTime: lang === "es" ? "4 min de lectura" : "4 min read",
  };
}

// Rich text segment: plain string, or a styled/linked fragment.
export type Seg = string | { t: string; href?: string; em?: boolean; strong?: boolean };
export type Rich = Seg[];

export interface SoledadCopy {
  h1: string;
  heroDescription: string;
  dateLabel: string;
  readingTimeLabel: string;
  alt: { hero: string; homeVsLaureles: string; rooftop: string };
  intro: { p1: string; cost: string; study: Rich; effects: string; third: string; engagement: string };
  stats: { value: string; label: string }[];
  lost: { h2: string; p1: string; p2: string; quote: string };
  environment: { h2: string; p1: Rich; p2: string; p3: Rich };
  actions: { h2: string; lead: string; items: { lead: string; rest: Rich }[]; close: string };
  city: { h2: string; p1: string; coffi: Rich; closing: string };
  signoff: string;
  related: { label: string; posts: { title: string; href: string }[] };
}

const CAFE_ES = "/es/blog/el-cafe-correcto-para-hoy";
const CAFE_EN = "/blog/the-right-cafe-for-today";
const BEST_ES = "/es/blog/los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin";
const BEST_EN = "/blog/best-cafes-and-workfriendly-spaces-in-medellin";
const ABOUT_ES = "/es/blog/sobre-espacios-de-trabajo-amigables";
const ABOUT_EN = "/blog/about-work-friendly-spaces";
export const COFFI_APP_URL = "https://app.coffi.com.co";

export const SOLEDAD_COPY: Record<SoledadLang, SoledadCopy> = {
  es: {
    h1: "Remote work te dio libertad. La ciencia dice que también te dejó más solo.",
    heroDescription:
      "Un estudio de Science con más de 588.000 personas muestra que el trabajo remoto aumenta el tiempo solo y el malestar, sobre todo si vives solo. La libertad no tiene por qué costarte la conexión.",
    dateLabel: "12 de octubre de 2026",
    readingTimeLabel: "4 min",
    alt: {
      hero: "Hombre concentrado trabajando en su laptop en la mesa de un café con vista a la ciudad y luz morada suave",
      homeVsLaureles:
        "Imagen dividida: a la izquierda, un hombre cansado trabajando solo en casa de noche; a la derecha, el mismo hombre trabajando en un café de Laureles, Medellín, con otras personas alrededor",
      rooftop:
        "Rooftop en Medellín al anochecer con personas trabajando en sus laptops y conversando, con las luces de la ciudad de fondo",
    },
    intro: {
      p1: "El trabajo remoto prometió algo simple: trabajar desde donde quieras, sin perder las horas en un escritorio fijo. Y lo cumplió. La gente lo prefiere tanto que muchos aceptarían un recorte de sueldo para no volver a la oficina.",
      cost: "Pero hay un costo que no aparece en los rankings de productividad.",
      study: [
        "Un estudio publicado en ",
        { t: "Science", em: true },
        " en junio de 2026 analizó más de 588.000 trabajadores estadounidenses entre 2011 y 2024 (excluyendo los años más duros de la pandemia). Comparó a quienes tenían trabajos “remotables” (los que podían hacerse desde casa) con quienes no. El resultado es claro: el trabajo remoto aumenta el tiempo que pasas solo, empeora el bienestar mental y eleva el uso de servicios de salud mental y de medicación.",
      ],
      effects:
        "Los efectos se concentran en quienes viven solos. Para ellos, la probabilidad de pasar el día entero sin contacto social subió 7 puntos porcentuales —un aumento relativo del 83 %. En promedio, el 84 % de los remote workers pasa su jornada laboral completamente solo.",
      third:
        "El estudio estima que el auge del remote work explica alrededor de un tercio del aumento general de aislamiento y malestar mental en ese período.",
      engagement:
        "No es que la gente odie su trabajo. Al contrario: los remote workers suelen reportar mayor engagement. Es que el trabajo dejó de ser, de forma automática, un lugar donde cruzas a alguien.",
    },
    stats: [
      { value: "588.000", label: "trabajadores estadounidenses entre 2011 y 2024" },
      { value: "+7 pp", label: "probabilidad de pasar el día entero sin contacto social · un aumento relativo del 83 %" },
      { value: "84 %", label: "de los remote workers pasa su jornada laboral completamente solo" },
      { value: "~1/3", label: "del aumento general de aislamiento y malestar mental" },
    ],
    lost: {
      h2: "Lo que se perdió no fue la oficina. Fue la infraestructura social.",
      p1: "Antes, el espacio de trabajo te ponía cerca de otras personas sin que tuvieras que “hacer networking”. Un saludo en la cocina, una conversación de pasillo, el ruido de fondo de gente haciendo lo mismo que tú. No era profundo, pero era constante. Ese contacto de baja fricción desapareció para muchos.",
      p2: "Para digital nomads y remote workers que llegan a una ciudad nueva (o que viven solos en la suya), el vacío se siente más fuerte. Puedes estar rodeado de cafés llenos y aun así no cruzar palabra con nadie. Las conexiones de nomad suelen quedarse en la superficie: te cruzas una vez y no vuelves a ver a esa persona.",
      quote: "La libertad de elegir dónde trabajar no vino acompañada de una nueva forma de encontrarte con otros.",
    },
    environment: {
      h2: "El ambiente no solo afecta tu foco. También afecta si te sientes solo.",
      p1: [
        { t: "La ciencia del ambiente ya nos dice que el ruido, la densidad y la vibra cambian cómo trabajas.", href: CAFE_ES },
        " Ahora también vemos que la ausencia total de otros humanos tiene un costo medible en bienestar.",
      ],
      p2: "Trabajar desde casa todo el día no es lo mismo que trabajar en un espacio donde hay gente alrededor, aunque no hables con ellos. La presencia ambiental —saber que hay otras personas en el mismo lugar, con propósitos similares— reduce la sensación de aislamiento sin exigir una conversación forzada.",
      p3: [
        "En ciudades como Medellín, donde muchos remote workers y nomads se mueven entre ",
        { t: "Laureles, El Poblado y cafés locales", href: BEST_ES },
        ", esa presencia existe. El problema es que no está visible ni conectada a lo que realmente necesitas ese día.",
      ],
    },
    actions: {
      h2: "Qué puedes hacer hoy (sin “ir a un meetup genérico”)",
      lead: "No se trata de forzar socialización. Se trata de reconstruir, de forma intencional, algo de esa infraestructura que se perdió:",
      items: [
        {
          lead: "Elige espacios con gente real, no solo Wi-Fi.",
          rest: [
            " Un café o un ",
            { t: "coworking", href: ABOUT_ES },
            " donde haya otros remote workers te da presencia ambiental aunque no hables. Es el equivalente moderno del “ruido de oficina”.",
          ],
        },
        {
          lead: "Busca repetición, no eventos de una sola vez.",
          rest: [" Las conexiones profundas necesitan horas acumuladas. Volver al mismo lugar, a la misma hora, con el mismo tipo de personas, ayuda más que un meetup suelto."],
        },
        {
          lead: "Conecta con locales, no solo con otros nomads.",
          rest: [" Las amistades entre nomads tienen fecha de caducidad. Las locales no."],
        },
        {
          lead: "Señala tu intención.",
          rest: [" A veces solo falta permiso para que la conversación ocurra. Saber que alguien más está ahí para focus, para crear o para simplemente no estar solo cambia la dinámica."],
        },
      ],
      close:
        "El estudio no dice que debamos volver a la oficina. Dice que la libertad sola no es suficiente. Necesitamos nuevas formas de estar cerca de otros mientras hacemos nuestro trabajo.",
    },
    city: {
      h2: "La ciudad ya tiene los espacios. Falta el layer que los conecta con las personas.",
      p1: "En Medellín y en cualquier ciudad, hay cafés, rooftops y third spaces llenos de gente que trabaja como tú. La diferencia entre “estar solo en un lugar bonito” y “sentirte parte de algo” es saber quién más está ahí y por qué.",
      coffi: [
        "Eso es lo que ",
        { t: "Coffi", href: COFFI_APP_URL, strong: true },
        " busca: no otra app de productividad, sino la infraestructura que te ayuda a elegir el espacio correcto según tu contexto —y a encontrar a las personas que comparten ese momento, sin forzar nada.",
      ],
      closing: "La libertad de trabajar desde donde quieras no tiene por qué significar hacerlo solo.",
    },
    signoff: "Be where you thrive.",
    related: {
      label: "Blog Coffi",
      posts: [
        { title: "El café perfecto no existe. Existe el café correcto para hoy", href: CAFE_ES },
        { title: "Los Mejores Cafés y Espacios de Trabajo Amigables en Medellín (Guía 2025)", href: BEST_ES },
        { title: "Entendiendo los Espacios de Trabajo Amigables: El Futuro de los Ambientes Productivos", href: ABOUT_ES },
      ],
    },
  },
  en: {
    h1: "Remote work gave you freedom. Science says it also left you more alone.",
    heroDescription:
      "A Science study of over 588,000 people shows remote work increases time alone and distress, especially if you live alone. Freedom doesn’t have to cost you connection.",
    dateLabel: "October 12, 2026",
    readingTimeLabel: "4 min",
    alt: {
      hero: "Man focused on his laptop at a café table with a city view in soft purple light",
      homeVsLaureles:
        "Split image: on the left, a tired man working alone at home at night; on the right, the same man working in a café in Laureles, Medellín, with people around him",
      rooftop:
        "Rooftop in Medellín at dusk with people working on laptops and talking, city lights in the background",
    },
    intro: {
      p1: "Remote work promised something simple: work from wherever you want, without losing hours at a fixed desk. And it delivered. People prefer it so much that many would accept a pay cut to avoid going back to the office.",
      cost: "But there’s a cost that doesn’t show up in productivity rankings.",
      study: [
        "A study published in ",
        { t: "Science", em: true },
        " in June 2026 analyzed more than 588,000 American workers between 2011 and 2024 (excluding the hardest pandemic years). It compared people in “remotable” jobs (those that could be done from home) with those whose jobs weren’t. The result is clear: remote work increases the time you spend alone, worsens mental well-being, and raises the use of mental health services and medication.",
      ],
      effects:
        "The effects are concentrated among people who live alone. For them, the probability of spending the entire day without social contact rose by 7 percentage points — a relative increase of 83%. On average, 84% of remote workers spend their workday completely alone.",
      third:
        "The study estimates that the rise of remote work explains about one-third of the overall increase in isolation and mental distress during that period.",
      engagement:
        "It’s not that people hate their work. On the contrary: remote workers often report higher engagement. It’s that work stopped being, automatically, a place where you cross paths with someone.",
    },
    stats: [
      { value: "588,000", label: "American workers between 2011 and 2024" },
      { value: "+7 pp", label: "probability of spending the entire day without social contact · a relative increase of 83%" },
      { value: "84%", label: "of remote workers spend their workday completely alone" },
      { value: "~1/3", label: "of the overall increase in isolation and mental distress" },
    ],
    lost: {
      h2: "What was lost wasn’t the office. It was the social infrastructure.",
      p1: "Before, the workplace put you near other people without you having to “do networking.” A greeting in the kitchen, a hallway conversation, the background noise of people doing the same thing as you. It wasn’t deep, but it was constant. That low-friction contact disappeared for many.",
      p2: "For digital nomads and remote workers arriving in a new city (or living alone in their own), the void feels stronger. You can be surrounded by full cafés and still not exchange a word with anyone. Nomad connections often stay surface-level: you cross paths once and never see that person again.",
      quote: "The freedom to choose where to work didn’t come with a new way of finding others.",
    },
    environment: {
      h2: "The environment doesn’t only affect your focus. It also affects whether you feel alone.",
      p1: [
        { t: "Environmental science already tells us that noise, density, and vibe change how you work.", href: CAFE_EN },
        " Now we also see that the total absence of other humans has a measurable cost on well-being.",
      ],
      p2: "Working from home all day is not the same as working in a space where there are people around, even if you don’t talk to them. Ambient presence — knowing there are other people in the same place, with similar purposes — reduces the feeling of isolation without requiring a forced conversation.",
      p3: [
        "In cities like Medellín, where many remote workers and nomads move between ",
        { t: "Laureles, El Poblado, and local cafés", href: BEST_EN },
        ", that presence exists. The problem is that it isn’t visible or connected to what you actually need that day.",
      ],
    },
    actions: {
      h2: "What you can do today (without “going to a generic meetup”)",
      lead: "It’s not about forcing socialization. It’s about intentionally rebuilding some of that infrastructure that was lost:",
      items: [
        {
          lead: "Choose spaces with real people, not just Wi-Fi.",
          rest: [
            " A café or ",
            { t: "coworking", href: ABOUT_EN },
            " where there are other remote workers gives you ambient presence even if you don’t talk. It’s the modern equivalent of “office noise.”",
          ],
        },
        {
          lead: "Seek repetition, not one-off events.",
          rest: [" Deep connections need accumulated hours. Returning to the same place, at the same time, with the same kind of people, helps more than a loose meetup."],
        },
        {
          lead: "Connect with locals, not just other nomads.",
          rest: [" Friendships between nomads have an expiration date. Local ones don’t."],
        },
        {
          lead: "Signal your intention.",
          rest: [" Sometimes all that’s missing is permission for the conversation to happen. Knowing someone else is there for focus, for creating, or simply not to be alone changes the dynamic."],
        },
      ],
      close:
        "The study doesn’t say we should go back to the office. It says freedom alone isn’t enough. We need new ways of being near others while we do our work.",
    },
    city: {
      h2: "The city already has the spaces. What’s missing is the layer that connects them with people.",
      p1: "In Medellín and in any city, there are cafés, rooftops, and third spaces full of people working like you. The difference between “being alone in a pretty place” and “feeling part of something” is knowing who else is there and why.",
      coffi: [
        "That’s what ",
        { t: "Coffi", href: COFFI_APP_URL, strong: true },
        " seeks: not another productivity app, but the infrastructure that helps you choose the right space according to your context — and find the people who share that moment, without forcing anything.",
      ],
      closing: "The freedom to work from wherever you want doesn’t have to mean doing it alone.",
    },
    signoff: "Be where you thrive.",
    related: {
      label: "Coffi Blog",
      posts: [
        { title: "The perfect café doesn’t exist. The right café for today does", href: CAFE_EN },
        { title: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)", href: BEST_EN },
        { title: "Understanding Work-Friendly Spaces: The Future of Productive Environments", href: ABOUT_EN },
      ],
    },
  },
};

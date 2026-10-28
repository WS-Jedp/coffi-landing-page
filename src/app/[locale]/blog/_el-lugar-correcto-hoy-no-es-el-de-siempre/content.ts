import type { BlogPostData } from "@/lib/blog-seo";
import { SITE_URL, getBlogPost } from "@/lib/seo/routes";

// Shared data for the EN/ES pair:
// /blog/the-right-place-today-isnt-the-usual-one  <->  /es/blog/el-lugar-correcto-hoy-no-es-el-de-siempre
// Body copy is verbatim from the approved post. Only the visual layout is ours.

export type RightPlaceLang = "en" | "es";

const POST_ID = "the-right-place-today-isnt-the-usual-one";

export const RIGHT_PLACE_SLUGS: Record<RightPlaceLang, string> = getBlogPost(POST_ID).slugs;

export const RIGHT_PLACE_BASE_URL = SITE_URL;

// next-intl uses localePrefix "as-needed": English is served without /en.
export function rightPlaceLocalePrefix(lang: RightPlaceLang) {
  return lang === "en" ? "" : "/es";
}

export function rightPlacePath(lang: RightPlaceLang) {
  return `${rightPlaceLocalePrefix(lang)}/blog/${RIGHT_PLACE_SLUGS[lang]}`;
}

export function rightPlaceUrl(lang: RightPlaceLang) {
  return `${RIGHT_PLACE_BASE_URL}${rightPlacePath(lang)}`;
}

// Meta titles are the approved short ones, used whole verbatim.
export const RIGHT_PLACE_META_TITLE: Record<RightPlaceLang, string> = {
  en: "The Right Place Today Isn't the Usual One",
  es: "El lugar correcto hoy no es el de siempre",
};

const RIGHT_PLACE_TITLE: Record<RightPlaceLang, string> = {
  en: "The Right Place Today Isn't the Usual One",
  es: "El lugar correcto hoy no es el de siempre",
};

const RIGHT_PLACE_H1: Record<RightPlaceLang, string> = {
  en: "The Right Place Today Isn't the Usual One: How Environment Decides Your Day (and Why Google Maps Doesn't Know)",
  es: "El lugar correcto hoy no es el de siempre: cómo el ambiente decide tu día (y por qué Google Maps no lo sabe)",
};

const IMG_DIR = "/assets/images/blog/right-place-today-environment";
export const RIGHT_PLACE_IMAGES = {
  hero: { src: `${IMG_DIR}/cafe-purple-light-window.webp`, width: 1168, height: 784 },
  og: { src: `${IMG_DIR}/cafe-purple-light-window-og.jpg`, width: 1200, height: 630 },
};

const shared = {
  title: RIGHT_PLACE_TITLE,
  description: {
    en: "Your favorite café isn't always the best one today. Light, noise, air and energy decide more than location. Why static maps fail and how to choose a space by your real context in Medellín.",
    es: "Tu café favorito no siempre es el mejor hoy. Luz, ruido, aire y energía deciden más que la ubicación. Por qué los mapas estáticos fallan y cómo elegir tu espacio según tu contexto real en Medellín.",
  },
  keywords: {
    en: [
      "best place to work today Medellín",
      "work environment productivity",
      "indoor environmental quality",
      "attention restoration theory",
      "cafés to work Laureles",
      "remote work Medellín",
      "digital nomads Medellín",
      "real-time workspace context",
      "Coffi",
    ],
    es: [
      "mejor lugar para trabajar hoy Medellín",
      "ambiente de trabajo productividad",
      "calidad ambiental interior",
      "teoría de restauración de la atención",
      "cafés para trabajar Laureles",
      "trabajo remoto Medellín",
      "nómadas digitales Medellín",
      "contexto en tiempo real espacios de trabajo",
      "Coffi",
    ],
  },
  publishDate: getBlogPost(POST_ID).publishDate,
  lastModified: getBlogPost(POST_ID).lastModified,
  category: "Workspace Guide",
  author: { name: "Coffi Team", url: "https://coffi.com.co/about-us" },
  image: `${RIGHT_PLACE_BASE_URL}${RIGHT_PLACE_IMAGES.og.src}`,
};

export function rightPlaceBlogData(lang: RightPlaceLang): BlogPostData {
  return {
    ...shared,
    slug: RIGHT_PLACE_SLUGS[lang],
    // ~1,050 words at 200 wpm (~5 min). Same value as the registry card.
    readingTime: lang === "es" ? "5 min de lectura" : "5 min read",
  };
}

// Rich text segment: plain string, or a styled/linked fragment.
export type Seg = string | { t: string; href?: string; em?: boolean; strong?: boolean };
export type Rich = Seg[];

// A list item with a bold lead-in followed by the rest of the sentence.
export interface LeadItem {
  lead: string;
  body: Rich;
}

export interface RightPlaceCopy {
  h1: string;
  // First paragraph of the body, shown as the hero lead (not repeated below).
  lead: string;
  dateLabel: string;
  readingTimeLabel: string;
  alt: { hero: string };
  intro: { p1: string; p2: Rich };
  environment: { h2: string; p1: Rich; p2: string; p3: string; p4: Rich };
  usual: { h2: string; p1: string; items: LeadItem[]; p2: string };
  choose: { h2: string; p1: string; p2: string; items: LeadItem[]; p3: Rich };
  maps: { h2: string; p1: string; p2: string; p3: string; p4: string };
  right: { h2: string; p1: Rich; p2: string; p3: Rich; p4: string };
  signoff: string;
  cta: Rich;
  related: { label: string; ids: string[] };
}

export const COFFI_APP_URL = "https://app.coffi.com.co";

const RHYTHM_ES = "/es/blog/medellin-2026-donde-tu-ritmo-encuentra-su-lugar";
const RHYTHM_EN = "/blog/medellin-2026-where-your-rhythm-finds-its-place";
const SPACE_ES = "/es/blog/el-espacio-que-eliges-hoy";
const SPACE_EN = "/blog/the-space-you-choose-today";

export const RIGHT_PLACE_RELATED_IDS = [
  "the-space-you-choose-today",
  "you-only-get-2-3-hours-of-real-focus-a-day",
  "medellin-2026-the-hub-where-rhythm-actually-matters",
];

export const RIGHT_PLACE_COPY: Record<RightPlaceLang, RightPlaceCopy> = {
  es: {
    h1: RIGHT_PLACE_H1.es,
    lead: "Hay días en los que tu café de siempre se siente perfecto. El sol entra justo, la música está baja, hay un asiento junto a la ventana y tu cabeza funciona. Otros días, el mismo lugar se siente pesado: demasiado ruido, poca luz, el aire estancado, y a las dos horas ya estás mirando el reloj.",
    dateLabel: "28 de octubre de 2026",
    readingTimeLabel: "5 min",
    alt: {
      hero: "Café minimalista con luz morada suave, una persona trabajando en su laptop junto a un ventanal rodeada de plantas",
    },
    intro: {
      p1: "El lugar no cambió. Tú sí. Tu energía, tu intención, el clima de la ciudad, incluso lo que comiste. Y eso importa más de lo que pensamos.",
      p2: [
        "La mayoría de nosotros seguimos eligiendo espacios como si fueran fijos: el coworking de siempre, el café de la esquina, la mesa del apartamento. Google Maps te dice dónde está abierto y qué tan lejos queda. No te dice si ese lugar está alineado con lo que tu cerebro necesita ",
        { t: "hoy", em: true },
        ".",
      ],
    },
    environment: {
      h2: "El ambiente no es fondo. Es parte del trabajo",
      p1: [
        { t: "La investigación en calidad ambiental interior (IEQ)", href: SPACE_ES },
        " es clara: temperatura, ventilación, luz natural, ruido y presencia de elementos naturales no son detalles. Influyen directamente en atención, creatividad, fatiga y bienestar.",
      ],
      p2: "Estudios recientes muestran que temperaturas entre 22 y 26 °C se asocian con mejor desempeño cognitivo. Niveles altos de CO₂ reducen la atención y la memoria de trabajo. El ruido por encima de ~60 dBA empieza a afectar tareas que requieren concentración. La luz natural optimizada reduce fatiga visual de forma dramática y mejora la alerta.",
      p3: "No es solo comodidad. Es biología. Tu sistema nervioso responde al entorno de forma automática. Un espacio con buena luz y algo de verde te restaura; uno oscuro y ruidoso te drena, aunque no te des cuenta.",
      p4: [
        "En Medellín esto se siente especialmente. La ciudad de la eterna primavera (alrededor de 20–24 °C la mayor parte del año) hace que salir a trabajar sea fácil. Pero también hace que las diferencias entre barrios y entre un café y otro sean más sutiles y, a la vez, más importantes. ",
        { t: "Laureles puede sentirse más local y caminable", href: RHYTHM_ES },
        "; El Poblado más densamente conectado con otros nómadas. El mismo café puede ser ideal a las 9 a.m. y pesado a las 3 p.m. después de la lluvia de la tarde.",
      ],
    },
    usual: {
      h2: "Por qué “el lugar de siempre” deja de funcionar",
      p1: "Hay tres razones principales:",
      items: [
        {
          lead: "Tu estado cambia más rápido que el lugar.",
          body: [
            "Hay días de deep work y días de colaboración o de recuperación. Un espacio excelente para concentrarte puede ser el peor para una llamada o para simplemente no sentirte solo.",
          ],
        },
        {
          lead: "Los mapas estáticos no ven el contexto.",
          body: [
            "Saben la dirección, el horario y las reseñas promedio. No saben si hoy está lleno, si el aire acondicionado está fallando, si hay un grupo hablando fuerte o si la luz de la tarde entra perfecta. Tampoco saben cómo estás ",
            { t: "tú", em: true },
            ".",
          ],
        },
        {
          lead: "La restauración de la atención es real.",
          body: [
            "La Attention Restoration Theory muestra que entornos con “fascinación suave” —plantas, vistas, luz natural, cierto nivel de coherencia— ayudan a recuperar la atención dirigida. Un espacio que solo ofrece ruido y estímulos fuertes no restaura; agota.",
          ],
        },
      ],
      p2: "El resultado es familiar: eliges el lugar cómodo por costumbre y terminas con un día de productividad a medias, más fatiga de la necesaria y la sensación de que “hoy no rindió”.",
    },
    choose: {
      h2: "Cómo elegir según el día, no según el hábito",
      p1: "No se trata de cambiar de lugar todos los días por deporte. Se trata de tener información suficiente para decidir con claridad.",
      p2: "Algunas señales prácticas que la gente que trabaja desde distintos espacios aprende a leer:",
      items: [
        {
          lead: "Energía alta + necesidad de foco profundo:",
          body: [
            "Busca luz natural, poco ruido de conversación, buena ventilación. Un rincón con vista o un espacio más tranquilo. En Medellín, cafés como Naturalia o Zeppelin en Laureles suelen ofrecer ese perfil en las mañanas.",
          ],
        },
        {
          lead: "Necesitas colaboración o no quieres estar solo:",
          body: [
            "Lugares con más movimiento, mesas compartidas, o espacios donde ya hay gente trabajando (no solo turistas). Pergamino o Semilla funcionan bien para eso.",
          ],
        },
        {
          lead: "Estás bajo de energía o recuperándote:",
          body: [
            "Prioriza lugares con elementos naturales, luz suave, menos densidad. A veces un cambio de barrio o simplemente un café con plantas y menos gente cambia el resto del día.",
          ],
        },
        {
          lead: "Clima y hora del día:",
          body: [
            "En Medellín, las tardes lluviosas cambian la dinámica de muchos cafés. Un lugar que funciona perfecto en la mañana puede saturarse después del almuerzo.",
          ],
        },
      ],
      p3: [
        "El punto no es encontrar el “mejor” lugar de la ciudad. Es encontrar el lugar que encaja con tu intención y tu estado ",
        { t: "en este momento", em: true },
        ".",
      ],
    },
    maps: {
      h2: "Lo que los mapas no pueden ver (y la comunidad sí)",
      p1: "Google Maps es excelente para navegar. Es pésimo para esto. Porque el contexto real de un espacio —nivel de ruido en este momento, calidad de la luz, si hay gente trabajando o solo de paso, si el aire se siente fresco— cambia constantemente y no está en ningún listado estático.",
      p2: "Eso solo lo sabe quien está ahí, o quien acaba de estar.",
      p3: "Ahí es donde una red comunitaria cambia el juego. Cuando las personas reportan el estado real de un espacio (ruido, ocupación, energía, fotos recientes), el mapa deja de ser una lista de direcciones y se convierte en algo vivo. Puedes ver no solo “dónde hay cafés”, sino “dónde hay un espacio que probablemente encaje con lo que necesitas ahora”.",
      p4: "No es magia. Es información contextual puesta en manos de quien la necesita. Y en ciudades como Medellín, donde el clima invita a salir y hay una densidad real de cafés y espacios de trabajo, esa diferencia se nota en el día a día.",
    },
    right: {
      h2: "El lugar correcto es el que te permite prosperar hoy",
      p1: [
        "El lugar de siempre tiene su valor. La familiaridad reduce fricción. Pero cuando se convierte en la única opción, empiezas a trabajar ",
        { t: "a pesar", em: true },
        " del ambiente en lugar de ",
        { t: "con", em: true },
        " él.",
      ],
      p2: "La ciencia es consistente: el entorno modula tu atención, tu energía y tu capacidad de recuperarte. En un mundo donde muchos de nosotros podemos elegir dónde trabajar, ignorar eso es dejar rendimiento y bienestar sobre la mesa.",
      p3: [
        "El lugar correcto hoy puede no ser el de siempre. Y está bien. La pregunta no es “¿dónde suelo ir?”. Es “¿dónde puedo prosperar ",
        { t: "hoy", em: true },
        ", con la energía y la intención que tengo ahora?”.",
      ],
      p4: "Cuando tienes esa claridad, el día cambia. No porque el café sea mágico. Porque el ambiente dejó de ser un obstáculo invisible y se convirtió en una decisión consciente.",
    },
    signoff: "Be where you thrive.",
    cta: [
      "¿Quieres que Coffi te ayude a ver el contexto real de los espacios cerca de ti? ",
      { t: "Explora el mapa", href: COFFI_APP_URL },
      " y descubre qué está pasando ahora mismo.",
    ],
    related: { label: "Blog Coffi", ids: RIGHT_PLACE_RELATED_IDS },
  },
  en: {
    h1: RIGHT_PLACE_H1.en,
    lead: "There are days when your usual café feels perfect. The sun comes in just right, the music is low, there's a seat by the window, and your head works. Other days, the same place feels heavy: too much noise, too little light, stagnant air, and after two hours you're already checking the clock.",
    dateLabel: "October 28, 2026",
    readingTimeLabel: "5 min",
    alt: {
      hero: "Minimalist café with soft purple light, a person working on a laptop by a large window surrounded by plants",
    },
    intro: {
      p1: "The place didn't change. You did. Your energy, your intention, the city's weather, even what you ate. And that matters more than we think.",
      p2: [
        "Most of us keep choosing spaces as if they were fixed: the usual coworking, the corner café, the apartment table. Google Maps tells you where it's open and how far it is. It doesn't tell you if that place is aligned with what your brain needs ",
        { t: "today", em: true },
        ".",
      ],
    },
    environment: {
      h2: "The environment isn't background. It's part of the work",
      p1: [
        { t: "Indoor Environmental Quality (IEQ) research", href: SPACE_EN },
        " is clear: temperature, ventilation, natural light, noise, and the presence of natural elements are not details. They directly influence attention, creativity, fatigue, and wellbeing.",
      ],
      p2: "Recent studies show that temperatures between 22 and 26 °C are associated with better cognitive performance. High CO₂ levels reduce attention and working memory. Noise above ~60 dBA starts to affect tasks that require concentration. Optimized natural light dramatically reduces visual fatigue and improves alertness.",
      p3: "It's not just comfort. It's biology. Your nervous system responds to the environment automatically. A space with good light and a bit of green restores you; a dark and noisy one drains you, even if you don't notice.",
      p4: [
        "In Medellín this is especially noticeable. The city of eternal spring (around 20–24 °C most of the year) makes it easy to go out and work. But it also makes the differences between neighborhoods and between one café and another more subtle and, at the same time, more important. ",
        { t: "Laureles can feel more local and walkable", href: RHYTHM_EN },
        "; El Poblado more densely connected with other nomads. The same café can be ideal at 9 a.m. and heavy at 3 p.m. after the afternoon rain.",
      ],
    },
    usual: {
      h2: "Why “the usual place” stops working",
      p1: "There are three main reasons:",
      items: [
        {
          lead: "Your state changes faster than the place.",
          body: [
            "There are deep-work days and collaboration or recovery days. A space excellent for concentration can be the worst for a call or for simply not feeling alone.",
          ],
        },
        {
          lead: "Static maps don't see context.",
          body: [
            "They know the address, the hours, and the average reviews. They don't know if it's full today, if the air conditioning is failing, if there's a group talking loudly, or if the afternoon light comes in perfectly. They also don't know how ",
            { t: "you", em: true },
            " are.",
          ],
        },
        {
          lead: "Attention restoration is real.",
          body: [
            "Attention Restoration Theory shows that environments with “soft fascination”—plants, views, natural light, a certain level of coherence—help recover directed attention. A space that only offers noise and strong stimuli doesn't restore; it exhausts.",
          ],
        },
      ],
      p2: "The result is familiar: you choose the comfortable place out of habit and end up with a day of half productivity, more fatigue than necessary, and the feeling that “today didn't work.”",
    },
    choose: {
      h2: "How to choose according to the day, not the habit",
      p1: "It's not about changing places every day for sport. It's about having enough information to decide with clarity.",
      p2: "Some practical signals that people who work from different spaces learn to read:",
      items: [
        {
          lead: "High energy + need for deep focus:",
          body: [
            "Look for natural light, little conversational noise, good ventilation. A corner with a view or a quieter space. In Medellín, cafés like Naturalia or Zeppelin in Laureles often offer that profile in the mornings.",
          ],
        },
        {
          lead: "You need collaboration or don't want to be alone:",
          body: [
            "Places with more movement, shared tables, or spaces where people are already working (not just tourists). Pergamino or Semilla work well for that.",
          ],
        },
        {
          lead: "You're low on energy or recovering:",
          body: [
            "Prioritize places with natural elements, soft light, less density. Sometimes a change of neighborhood or simply a café with plants and fewer people changes the rest of the day.",
          ],
        },
        {
          lead: "Climate and time of day:",
          body: [
            "In Medellín, rainy afternoons change the dynamics of many cafés. A place that works perfectly in the morning can get saturated after lunch.",
          ],
        },
      ],
      p3: [
        "The point isn't to find the “best” place in the city. It's to find the place that fits your intention and your state ",
        { t: "in this moment", em: true },
        ".",
      ],
    },
    maps: {
      h2: "What maps can't see (and the community can)",
      p1: "Google Maps is excellent for navigating. It's terrible for this. Because the real context of a space—noise level right now, quality of light, whether there are people working or just passing through, whether the air feels fresh—changes constantly and isn't on any static listing.",
      p2: "Only the person who's there, or who just left, knows that.",
      p3: "That's where a community network changes the game. When people report the real state of a space (noise, occupancy, energy, recent photos), the map stops being a list of addresses and becomes something alive. You can see not only “where there are cafés,” but “where there's a space that probably fits what you need now.”",
      p4: "It's not magic. It's contextual information put in the hands of the person who needs it. And in cities like Medellín, where the climate invites you out and there's a real density of cafés and workspaces, that difference is noticeable day to day.",
    },
    right: {
      h2: "The right place is the one that lets you thrive today",
      p1: [
        "The usual place has its value. Familiarity reduces friction. But when it becomes the only option, you start working ",
        { t: "despite", em: true },
        " the environment instead of ",
        { t: "with", em: true },
        " it.",
      ],
      p2: "The science is consistent: the environment modulates your attention, your energy, and your ability to recover. In a world where many of us can choose where to work, ignoring that is leaving performance and wellbeing on the table.",
      p3: [
        "The right place today may not be the usual one. And that's fine. The question isn't “where do I usually go?”. It's “where can I thrive ",
        { t: "today", em: true },
        ", with the energy and intention I have now?”.",
      ],
      p4: "When you have that clarity, the day changes. Not because the café is magic. Because the environment stopped being an invisible obstacle and became a conscious decision.",
    },
    signoff: "Be where you thrive.",
    cta: [
      "Want Coffi to help you see the real context of the spaces near you? ",
      { t: "Explore the map", href: COFFI_APP_URL },
      " and discover what's happening right now.",
    ],
    related: { label: "Coffi Blog", ids: RIGHT_PLACE_RELATED_IDS },
  },
};

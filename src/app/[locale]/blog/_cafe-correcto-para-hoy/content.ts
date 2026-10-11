import type { BlogPostData } from "@/lib/blog-seo";

// Shared data for the EN/ES pair:
// /en/blog/the-right-cafe-for-today  <->  /es/blog/el-cafe-correcto-para-hoy
// Body copy is verbatim from the approved post. Only the visual layout is ours.

export type CafePostLang = "en" | "es";

export const CAFE_POST_SLUGS: Record<CafePostLang, string> = {
  en: "the-right-cafe-for-today",
  es: "el-cafe-correcto-para-hoy",
};

export const CAFE_POST_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://coffi.com.co";

// The site uses next-intl `localePrefix: "as-needed"`: English (default locale) is served
// without a prefix (/blog/...) and /en/... answers with a redirect. Point canonical,
// hreflang and internal links at the URL that actually returns 200.
export function cafePostLocalePrefix(lang: CafePostLang) {
  return lang === "en" ? "" : "/es";
}

export function cafePostPath(lang: CafePostLang) {
  return `${cafePostLocalePrefix(lang)}/blog/${CAFE_POST_SLUGS[lang]}`;
}

export function cafePostUrl(lang: CafePostLang) {
  return `${CAFE_POST_BASE_URL}${cafePostPath(lang)}`;
}

// <title> must stay under 60 characters, so it is a shortened version of the H1
// built only from the author's words.
export const CAFE_POST_META_TITLE: Record<CafePostLang, string> = {
  en: "The perfect café doesn’t exist. The right café does | Coffi",
  es: "El café perfecto no existe: el correcto para hoy | Coffi",
};

const shared = {
  title: {
    en: "The perfect café doesn’t exist. The right café for today does",
    es: "El café perfecto no existe. Existe el café correcto para hoy",
  },
  description: {
    en: "In Medellín, “best cafés for remote work” lists fall short. Conditions change by the hour. Here’s how to find the space that actually works for you today.",
    es: "En Medellín las listas de “mejores cafés para trabajar” se quedan cortas. El ambiente cambia cada hora. Cómo encontrar el espacio que realmente te sirve hoy.",
  },
  keywords: {
    en: [
      "best cafés to work from in Medellín",
      "remote work Medellín",
      "work-friendly cafés",
      "Laureles",
      "El Poblado",
      "noise and productivity",
      "coworking café",
      "digital nomad Medellín",
      "where to work remotely",
      "Coffi",
    ],
    es: [
      "cafés para trabajar en Medellín",
      "trabajo remoto Medellín",
      "Laureles",
      "El Poblado",
      "ruido y productividad",
      "coworking café",
      "cafés para trabajar",
      "nómadas digitales Medellín",
      "dónde trabajar remoto",
      "Coffi",
    ],
  },
  publishDate: "2026-10-10",
  lastModified: "2026-10-10",
  category: "Workspace Guide",
  author: {
    name: "Coffi Team",
    url: "https://coffi.com.co/about-us",
  },
  image: `${CAFE_POST_BASE_URL}/assets/images/screenshots/desktop/coffi-landing-screenshot-1.jpeg`,
};

export const CAFE_POST_READING_TIME = "5 min";

export function cafePostBlogData(lang: CafePostLang): BlogPostData {
  return {
    ...shared,
    slug: CAFE_POST_SLUGS[lang],
    readingTime: lang === "es" ? "5 min de lectura" : "5 min read",
  };
}

export interface CafePostCopy {
  h1: string;
  heroDescription: string;
  dateLabel: string;
  readingTimeLabel: string;
  intro: [string, string];
  introQuote: string;
  noise: {
    h2: string;
    study: string;
    statSource: string;
    scale: { low: string; mid: string; high: string };
    explanation: string;
    nuance: string;
    pull: string;
  };
  medellin: {
    h2: string;
    laureles: { label: string; text: string };
    poblado: { label: string; text: string };
    hourLead: string;
    slots: { label: string; text: string }[];
    hourClose: string;
    comfort: string;
  };
  choose: {
    h2: string;
    lead: string;
    questions: [string, string, string, string];
    advice: string;
    habits: string;
    key: string;
  };
  context: {
    h2: string;
    guidesPre: string;
    guidesLink: string;
    guidesPost: string;
    friction: string;
    coffiName: string;
    coffiRest: string;
  };
  closing: string;
  signoff: string;
  related: { label: string; posts: { title: string; href: string }[] };
}

export const CAFE_POST_COPY: Record<CafePostLang, CafePostCopy> = {
  es: {
    h1: "El café perfecto no existe. Existe el café correcto para hoy",
    heroDescription:
      "En Medellín (y en cualquier ciudad) las listas de “mejores cafés para trabajar” se quedan cortas. El ambiente cambia cada hora. Aquí te contamos cómo encontrar el espacio que realmente te sirve hoy.",
    dateLabel: "10 de octubre de 2026",
    readingTimeLabel: "5 min",
    intro: [
      "Llegas a Laureles con la laptop, abres el mapa y ves una docena de cafés con reseñas de 4.8 y “buen wifi”. Eliges uno. A las 11 ya hay demasiada gente, el ruido de las licuadoras se come tu concentración y la llamada que tenías a las 11:30 se convierte en un ejercicio de concentración forzada. Dos horas después sales con menos energía de la que tenías al entrar.",
      "Eso le pasa a casi todo el mundo que trabaja remoto en Medellín. El problema no es que falten lugares. El problema es que el “mejor café” no existe. Existe el café correcto para lo que necesitas hacer hoy, con la energía que tienes ahora.",
    ],
    introQuote:
      "El ambiente no es un detalle de fondo. Es una de las variables que más afectan si terminas el día con claridad o con fatiga mental.",
    noise: {
      h2: "El ruido no es el enemigo. El ruido equivocado sí lo es",
      study:
        "Hay un estudio de 2012 (Mehta, Zhu y Cheema en el Journal of Consumer Research) que sigue siendo referencia. Probaron cómo distintos niveles de ruido afectaban la creatividad. El resultado: alrededor de 70 decibeles —el nivel típico de un café moderadamente lleno— mejoraba el rendimiento en tareas creativas. Demasiado silencio o demasiado ruido lo empeoraban.",
      statSource: "Mehta, Zhu y Cheema · Journal of Consumer Research · 2012",
      scale: { low: "Demasiado silencio", mid: "~70 dB", high: "Demasiado ruido" },
      explanation:
        "La explicación es interesante. Un ruido moderado genera una ligera “disfluencia de procesamiento”. El cerebro tiene que trabajar un poco más, y eso lo empuja hacia un pensamiento más abstracto. Por eso a veces las ideas aparecen mejor en un café con conversaciones de fondo que en el silencio absoluto de la casa.",
      nuance:
        "Pero hay un matiz importante: eso aplica sobre todo a trabajo creativo (brainstorming, diseño, escritura exploratoria). Cuando necesitas precisión —revisar un contrato, depurar código, concentrarte en números o hacer una llamada importante—, el habla inteligible cerca de ti se convierte en distracción activa. Varios estudios de ambientes de oficina muestran que el ruido de conversaciones claras reduce la memoria de trabajo y aumenta la fatiga más que un ruido constante sin significado.",
      pull:
        "En la práctica esto se traduce en algo simple: el mismo café puede ser perfecto a las 9:30 a.m. y un error a la 1 p.m. Las condiciones cambian.",
    },
    medellin: {
      h2: "En Medellín las condiciones cambian más de lo que parece",
      laureles: {
        label: "Laureles",
        text: "Laureles suele ser más tranquilo y caminable que El Poblado. Muchos remote workers terminan prefiriendo ese barrio precisamente porque permite construir una rutina sin la densidad social constante de Provenza o Manila. Sitios como Café Revolución, Naturalia o Zeppelin aparecen con frecuencia en las recomendaciones de gente que busca sesiones más largas y enfocadas. El wifi en varios de ellos es sólido y hay enchufes.",
      },
      poblado: {
        label: "El Poblado",
        text: "El Poblado concentra más energía, más eventos y más movimiento. Puede funcionar muy bien cuando tu tarea del día es creativa, social o de networking ligero. Pero también es más fácil que a media tarde el ruido y la gente te saquen del estado que buscabas.",
      },
      hourLead: "Y dentro del mismo barrio la hora importa.",
      slots: [
        { label: "Mañanas", text: "Las mañanas suelen ser más calmadas." },
        { label: "Mediodía", text: "El mediodía trae el flujo de almuerzo." },
        { label: "Tardes", text: "Las tardes se vuelven más sociales." },
      ],
      hourClose:
        "Un lugar que a las 8:30 a.m. se siente como un espacio de trabajo puede convertirse en un punto de encuentro a las 4 p.m.",
      comfort:
        "Además está la luz, la temperatura y el simple hecho de si hay espacio real para extenderse dos o tres horas sin sentir que estás ocupando la mesa de más. Medellín tiene clima suave casi todo el año, pero un café sin buena ventilación o con sol directo puede volverse incómodo rápido.",
    },
    choose: {
      h2: "Cómo elegir el espacio según lo que necesitas hoy",
      lead: "No se trata de memorizar una lista. Se trata de hacer una pregunta corta antes de salir:",
      questions: [
        "¿Hoy necesito silencio relativo para concentrarme en una tarea precisa?",
        "¿Necesito un poco de energía de fondo para desbloquear ideas?",
        "¿Voy a tener llamadas?",
        "¿Qué tan cansado estoy y cuánto tiempo real puedo estar afuera?",
      ],
      advice:
        "Si es deep work o llamadas importantes, prioriza lugares que a esa hora suelen estar más calmados y con buena acústica. Si es trabajo creativo o exploratorio, un ambiente con más vida puede ayudarte. Si estás bajo de energía, a veces el simple cambio de contexto (salir de la casa y llegar a un sitio con luz natural y gente alrededor) ya suma, aunque no sea el café “más productivo” en abstracto.",
      habits:
        "Algunos remote workers en Medellín hacen exactamente eso de forma intuitiva: mañanas en Laureles para bloques de enfoque, y cuando necesitan cambiar de ritmo se mueven hacia zonas con más movimiento. Otros rotan entre dos o tres sitios según el día.",
      key: "La clave no es encontrar el lugar definitivo. Es dejar de tratar todas las sesiones como si fueran iguales.",
    },
    context: {
      h2: "El contexto es lo que falta en las listas",
      guidesPre: "Las guías de ",
      guidesLink: "“mejores cafés para trabajar en Medellín”",
      guidesPost:
        " son útiles como punto de partida. Te dicen dónde hay wifi decente y enchufes. Pero no saben qué necesitas tú hoy, ni cómo está el lugar en este momento. El ruido, la ocupación, la vibra y hasta la calidad de la conexión cambian.",
      friction:
        "Eso es exactamente el tipo de fricción que aparece cuando el trabajo se volvió flexible pero la infraestructura para decidir dónde hacerlo se quedó estática. Terminas haciendo prueba y error, y pagas el costo en horas y en energía mental.",
      coffiName: "Coffi",
      coffiRest:
        " existe para reducir esa fricción. En lugar de darte una lista fija, te ayuda a matchar el espacio con tu contexto actual: qué tipo de trabajo tienes por delante, cómo te sientes, y las condiciones reales del lugar en ese momento. No se trata de optimizar cada minuto. Se trata de que la decisión de “dónde voy” deje de ser una lotería y pase a ser algo que puedes sentir con claridad.",
    },
    closing:
      "El café perfecto no existe. Pero el café correcto para lo que necesitas hacer hoy sí. Y encontrarlo no debería costarte medio día.",
    signoff: "Be where you thrive.",
    related: {
      label: "Blog Coffi",
      posts: [
        {
          title: "Los Mejores Cafés y Espacios de Trabajo Amigables en Medellín (Guía 2025)",
          href: "/es/blog/los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin",
        },
        {
          title: "Entendiendo los Espacios de Trabajo Amigables: El Futuro de los Ambientes Productivos",
          href: "/es/blog/sobre-espacios-de-trabajo-amigables",
        },
      ],
    },
  },
  en: {
    h1: "The perfect café doesn’t exist. The right café for today does",
    heroDescription:
      "In Medellín (and anywhere else), “best cafés for remote work” lists fall short. Conditions change by the hour. Here’s how to find the space that actually works for you today.",
    dateLabel: "October 10, 2026",
    readingTimeLabel: "5 min",
    intro: [
      "You arrive in Laureles with your laptop, open the map, and see a dozen cafés with 4.8 ratings and “good wifi.” You pick one. By 11 a.m. it’s crowded, the blender noise kills your focus, and the call you had at 11:30 turns into a forced concentration exercise. Two hours later you leave with less energy than when you arrived.",
      "This happens to almost every remote worker in Medellín. The problem isn’t a lack of places. The problem is that the “perfect café” doesn’t exist. What exists is the right café for what you need to do today, with the energy you have right now.",
    ],
    introQuote:
      "The environment isn’t background noise. It’s one of the variables that most determines whether you finish the day with clarity or mental fatigue.",
    noise: {
      h2: "Noise isn’t the enemy. The wrong noise is.",
      study:
        "A 2012 study (Mehta, Zhu, and Cheema in the Journal of Consumer Research) is still a reference point. They tested how different noise levels affected creativity. The result: around 70 decibels — the level of a moderately busy café — improved performance on creative tasks. Too much silence or too much noise made it worse.",
      statSource: "Mehta, Zhu, and Cheema · Journal of Consumer Research · 2012",
      scale: { low: "Too much silence", mid: "~70 dB", high: "Too much noise" },
      explanation:
        "The explanation is interesting. Moderate noise creates a slight “processing disfluency.” The brain has to work a little harder, which pushes it toward more abstract thinking. That’s why ideas sometimes flow better in a café with background conversation than in the absolute silence of home.",
      nuance:
        "But there’s an important nuance: this applies mainly to creative work (brainstorming, design, exploratory writing). When you need precision — reviewing a contract, debugging code, focusing on numbers, or taking an important call — intelligible speech nearby becomes an active distraction. Multiple office environment studies show that clear conversations reduce working memory and increase fatigue more than steady, meaningless noise.",
      pull:
        "In practice this is simple: the same café can be perfect at 9:30 a.m. and a mistake at 1 p.m. Conditions change.",
    },
    medellin: {
      h2: "In Medellín, conditions change more than they seem to.",
      laureles: {
        label: "Laureles",
        text: "Laureles is usually calmer and more walkable than El Poblado. Many remote workers end up preferring it precisely because it lets them build a routine without the constant social density of Provenza or Manila. Places like Café Revolución, Naturalia, or Zeppelin come up often in recommendations from people looking for longer, more focused sessions. The wifi in several of them is solid and there are outlets.",
      },
      poblado: {
        label: "El Poblado",
        text: "El Poblado concentrates more energy, more events, and more movement. It can work very well when your task for the day is creative, social, or light networking. But it’s also easier for noise and people to pull you out of the state you were looking for by mid-afternoon.",
      },
      hourLead: "Even within the same neighborhood, the hour matters.",
      slots: [
        { label: "Mornings", text: "Mornings tend to be calmer." },
        { label: "Lunchtime", text: "Lunchtime brings the midday rush." },
        { label: "Afternoons", text: "Afternoons turn more social." },
      ],
      hourClose:
        "A place that feels like a workspace at 8:30 a.m. can become a meetup spot by 4 p.m.",
      comfort:
        "Then there’s light, temperature, and the simple fact of whether there’s real space to stretch out for two or three hours without feeling like you’re taking someone else’s table. Medellín has mild weather almost year-round, but a café without good ventilation or with direct sun can become uncomfortable quickly.",
    },
    choose: {
      h2: "How to choose the space according to what you need today",
      lead: "It’s not about memorizing a list. It’s about asking a short question before you leave:",
      questions: [
        "Do I need relative quiet today to focus on a precise task?",
        "Do I need a bit of background energy to unlock ideas?",
        "Will I have calls?",
        "How tired am I, and how much time can I actually stay out?",
      ],
      advice:
        "If it’s deep work or important calls, prioritize places that tend to be calmer at that hour and have decent acoustics. If it’s creative or exploratory work, a livelier environment can help. If your energy is low, sometimes the simple change of context (leaving the house and arriving somewhere with natural light and people around) already adds up, even if it’s not the “most productive” café in the abstract.",
      habits:
        "Some remote workers in Medellín do exactly this intuitively: mornings in Laureles for focus blocks, and when they need a change of pace they move toward areas with more movement. Others rotate between two or three spots depending on the day.",
      key: "The key isn’t finding the definitive place. It’s stopping treating every session as if it were the same.",
    },
    context: {
      h2: "Context is what’s missing from the lists",
      guidesPre: "The ",
      guidesLink: "“best cafés to work from in Medellín”",
      guidesPost:
        " guides are useful as a starting point. They tell you where there’s decent wifi and outlets. But they don’t know what you need today, or how the place is right now. Noise, occupancy, vibe, and even connection quality change.",
      friction:
        "That’s exactly the kind of friction that appears when work became flexible but the infrastructure for deciding where to do it stayed static. You end up doing trial and error, and you pay the cost in hours and mental energy.",
      coffiName: "Coffi",
      coffiRest:
        " exists to reduce that friction. Instead of giving you a fixed list, it helps you match the space to your current context: what kind of work you have ahead, how you feel, and the real conditions of the place at that moment. It’s not about optimizing every minute. It’s about making the “where do I go” decision stop being a lottery and become something you can feel with clarity.",
    },
    closing:
      "The perfect café doesn’t exist. But the right café for what you need to do today does. And finding it shouldn’t cost you half a day.",
    signoff: "Be where you thrive.",
    related: {
      label: "Coffi Blog",
      posts: [
        {
          title: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)",
          href: "/blog/best-cafes-and-workfriendly-spaces-in-medellin",
        },
        {
          title: "Understanding Work-Friendly Spaces: The Future of Productive Environments",
          href: "/blog/about-work-friendly-spaces",
        },
      ],
    },
  },
};

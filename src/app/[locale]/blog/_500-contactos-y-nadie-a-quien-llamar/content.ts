import type { BlogPostData } from "@/lib/blog-seo";
import { SITE_URL, getBlogPost } from "@/lib/seo/routes";

// Shared data for the EN/ES pair:
// /blog/500-contacts-and-no-one-to-call  <->  /es/blog/500-contactos-y-nadie-a-quien-llamar
// Body copy is verbatim from the approved post. Only the visual layout is ours.

export type ContactosLang = "en" | "es";

const POST_ID = "500-contacts-and-no-one-to-call";

export const CONTACTOS_SLUGS: Record<ContactosLang, string> = getBlogPost(POST_ID).slugs;

export const CONTACTOS_BASE_URL = SITE_URL;

// next-intl uses localePrefix "as-needed": English is served without /en.
export function contactosLocalePrefix(lang: ContactosLang) {
  return lang === "en" ? "" : "/es";
}

export function contactosPath(lang: ContactosLang) {
  return `${contactosLocalePrefix(lang)}/blog/${CONTACTOS_SLUGS[lang]}`;
}

export function contactosUrl(lang: ContactosLang) {
  return `${CONTACTOS_BASE_URL}${contactosPath(lang)}`;
}

// Meta titles are the approved ones, kept whole (they are longer than 60 chars on purpose).
export const CONTACTOS_META_TITLE: Record<ContactosLang, string> = {
  en: "500 contacts and no one to call: why the nomad community in Medellín stays on the surface",
  es: "500 contactos y nadie a quien llamar: por qué la comunidad de nomads en Medellín se queda en la superficie",
};

const IMG_DIR = "/assets/images/blog/500-contacts-no-one-to-call";
export const CONTACTOS_IMAGES = {
  hero: { src: `${IMG_DIR}/man-alone-window-sunset.webp`, width: 1168, height: 784 },
  og: { src: `${IMG_DIR}/man-alone-window-sunset-og.jpg`, width: 1200, height: 630 },
  depth: { src: `${IMG_DIR}/two-people-talking-closed-laptop.webp`, width: 1168, height: 784 },
  moments: { src: `${IMG_DIR}/group-rooftop-night-medellin.webp`, width: 1168, height: 784 },
};

const shared = {
  title: CONTACTOS_META_TITLE,
  description: {
    en: "You meet people all week in Laureles or El Poblado and still feel alone. Why nomad friendships stay shallow and how to create real moments in Medellín.",
    es: "Conoces gente toda la semana en Laureles o El Poblado y aún te sientes solo. Por qué las amistades nomad se quedan superficiales y cómo crear momentos reales en Medellín.",
  },
  keywords: {
    en: [
      "digital nomad loneliness Medellín",
      "nomad friendships",
      "making friends in Medellín",
      "remote worker community Medellín",
      "Jeffrey Hall friendship hours",
      "Laureles",
      "El Poblado",
      "Envigado",
      "digital nomad community",
      "remote work loneliness",
      "Coffi",
    ],
    es: [
      "soledad nómadas digitales Medellín",
      "amistades nomad",
      "hacer amigos en Medellín",
      "comunidad remote workers Medellín",
      "Jeffrey Hall horas de amistad",
      "Laureles",
      "El Poblado",
      "Envigado",
      "comunidad nómadas digitales",
      "soledad trabajo remoto",
      "Coffi",
    ],
  },
  publishDate: getBlogPost(POST_ID).publishDate,
  lastModified: getBlogPost(POST_ID).lastModified,
  category: "Workspace Guide",
  author: { name: "Coffi Team", url: "https://coffi.com.co/about-us" },
  image: `${CONTACTOS_BASE_URL}${CONTACTOS_IMAGES.og.src}`,
};

export function contactosBlogData(lang: ContactosLang): BlogPostData {
  return {
    ...shared,
    slug: CONTACTOS_SLUGS[lang],
    // ~900 words at 200 wpm.
    readingTime: lang === "es" ? "5 min de lectura" : "5 min read",
  };
}

// Rich text segment: plain string, or a styled/linked fragment.
export type Seg = string | { t: string; href?: string; em?: boolean; strong?: boolean };
export type Rich = Seg[];

export interface ContactosCopy {
  h1: string;
  // First paragraph of the body, shown as the hero lead (not repeated below).
  lead: Rich;
  dateLabel: string;
  readingTimeLabel: string;
  alt: { hero: string; depth: string; moments: string };
  intro: { quote: [string, string]; p1: string; p2: string };
  threshold: { h2: string; p1: string; items: string[]; p2: string; p3: string; p4: string };
  entrance: { h2: string; p1: string; p2: string; p3: string; p4: string; p5: string };
  depth: {
    h2: string;
    p1: string;
    items: { lead: string; rest: string }[];
    p2: string;
  };
  moments: { h2: string; p1: Rich; p2: string; p3: string; p4: string; p5: string };
  practice: { h2: string; lead: string; items: Rich[]; p1: Rich };
  signoff: string;
  related: { label: string; ids: string[] };
}

export const COFFI_APP_URL = "https://app.coffi.com.co";

const BEST_ES = "/es/blog/los-mejores-cafes-espacios-de-trabajo-amigables-en-medellin";
const BEST_EN = "/blog/best-cafes-and-workfriendly-spaces-in-medellin";
const LONELY_ES = "/es/blog/trabajo-remoto-y-soledad";
const LONELY_EN = "/blog/remote-work-and-loneliness";
const SPACE_ES = "/es/blog/el-espacio-que-eliges-hoy";
const SPACE_EN = "/blog/the-space-you-choose-today";

// Related posts are resolved from the registry (titles and slugs live there).
export const CONTACTOS_RELATED_IDS = [
  "remote-work-and-loneliness",
  "the-space-you-choose-today",
  "best-cafes-and-workfriendly-spaces-in-medellin",
];

export const CONTACTOS_COPY: Record<ContactosLang, ContactosCopy> = {
  es: {
    h1: shared.title.es,
    lead: [
      "Llegas a Medellín. En una semana tienes WhatsApp de media docena de personas, has estado en un language exchange, un meetup de founders y dos ",
      { t: "cafés de Laureles", href: BEST_ES },
      " donde “todo el mundo se conoce”.",
    ],
    dateLabel: "19 de octubre de 2026",
    readingTimeLabel: "5 min",
    alt: {
      hero: "Hombre joven trabajando solo en su laptop con una taza de café, sentado en una mesa de madera junto a un gran ventanal con vista a las montañas y los barrios de Medellín al atardecer",
      depth: "Dos personas conversando y sonriendo frente a frente en una mesa de madera, con la laptop cerrada y una taza de café, en un espacio con plantas y pared de ladrillo",
      moments: "Cuatro personas conversando entre risas en una terraza elevada de noche, con las luces de Medellín y las montañas bajo un cielo morado al fondo",
    },
    intro: {
      quote: ["Tienes contactos.", "No tienes a quién llamar un martes a las 8 pm cuando el día se siente vacío."],
      p1: "No es que seas malo para socializar. Es la estructura. La comunidad de remote workers y digital nomads es amplia, activa y fácil de entrar. Y al mismo tiempo, muchas de esas conexiones se quedan en la superficie. Como si cada encuentro fuera el primer capítulo de una amistad que nunca llega al segundo.",
      p2: "Eso no es un fallo tuyo. Es el patrón de un estilo de vida que premia el movimiento y la novedad por encima de la repetición.",
    },
    threshold: {
      h2: "El umbral que casi nadie cruza",
      p1: "Un estudio de Jeffrey Hall (University of Kansas, 2018) midió cuánto tiempo se necesita para que una relación avance. No es magia. Es acumulación:",
      items: [
        "Alrededor de 50 horas de tiempo compartido para pasar de conocido a amigo casual.",
        "Unas 90 horas para que se sienta como una amistad real.",
        "Más de 200 horas para que se vuelva cercana.",
      ],
      p2: "Esas horas no son iguales. El tiempo de ocio —charlar sin agenda, compartir una comida, reírse de algo absurdo, ver el mismo atardecer dos veces— pesa mucho más que estar sentados en el mismo coworking trabajando en paralelo.",
      p3: "La mayoría de nomads en Medellín se quedan entre 2 y 6 semanas. En ese tiempo es casi imposible acumular 50 horas de calidad con la misma persona. Recoges primeros capítulos. Cierras el libro. Empiezas otro en la siguiente ciudad o el siguiente barrio.",
      p4: "El resultado es familiar: agenda social llena, sensación de soledad intacta.",
    },
    entrance: {
      h2: "En Medellín la entrada es fácil. La profundidad no.",
      p1: "Medellín tiene una de las comunidades nomad más accesibles de América Latina. Language exchanges, grupos de WhatsApp, eventos en Laureles y Provenza, coworkings donde la gente llega sola y sale con tres contactos nuevos. La ciudad es cálida. La gente es abierta. El clima invita a salir.",
      p2: "Y aun así, muchos reportan la misma experiencia: amabilidad real, amistad superficial.",
      p3: "Parte del fenómeno es cultural. En Colombia las amistades profundas suelen construirse por repetición y proximidad a lo largo del tiempo —el mismo parque, la misma clase, el mismo círculo. Un extranjero que llega por un mes entra fácil al saludo y al “parceros”, pero el círculo cerrado tarda más.",
      p4: "Otra parte es el acuerdo tácito de la vida nomad: ambos sabemos que esto es temporal. Entonces mantenemos la conversación ligera. Protegemos la inversión emocional. Nadie tiene la culpa. El sistema simplemente no premia la continuidad.",
      p5: "Hay un costo silencioso. Cada despedida, aunque sea pequeña, deja una micro-pérdida. Con el tiempo, algunas personas dejan de invertir tanto. Prefieren la conversación agradable de una noche a la posibilidad de algo que duele despedir.",
    },
    depth: {
      h2: "Lo que sí construye profundidad (y no es otro meetup)",
      p1: "La investigación y la experiencia de quienes se quedan más tiempo apuntan a tres cosas simples:",
      items: [
        { lead: "Repetición en el mismo contexto.", rest: " Ver a la misma persona en el mismo lugar más de una vez. No un evento único; un ritmo." },
        { lead: "Cambio de contexto.", rest: " Pasar de “nos conocimos en el coworking” a “tomamos un café sin laptops” o “subimos al cerro”. Hall lo llamó “context shift”. Es donde la relación deja de ser utilitaria." },
        { lead: "Tiempo sin agenda.", rest: " No networking. No “vamos a ver si surge algo”. Tiempo en el que no hay que producir nada. Solo estar." },
      ],
      p2: "En Medellín eso se ve claro en quienes se quedan dos o tres meses en Laureles o Envigado. Dejan de coleccionar eventos y empiezan a tener lugares donde esperan encontrar a la misma gente. La ciudad deja de ser un backdrop y se vuelve un ritmo.",
    },
    moments: {
      h2: "Momentos, no feeds",
      p1: [
        { t: "Coffi", href: COFFI_APP_URL },
        " no es una red social ni un directorio de eventos. No pretende que más contactos resuelvan la soledad.",
      ],
      p2: "Lo que sí hace es crear condiciones para que ocurran momentos reales: el espacio correcto, en el momento correcto, con la gente que está ahí por la misma razón que tú.",
      p3: "No un feed de caras. Un contexto compartido donde la repetición puede empezar. Un lugar donde el “hola” del lunes puede convertirse en el café del jueves sin que tengas que perseguirlo en tres grupos de WhatsApp.",
      p4: "La comunidad no se construye acumulando nombres. Se construye cuando el mismo espacio te da la oportunidad de ver a alguien más de una vez, en estados de ánimo diferentes, sin la presión de que esto sea “el” encuentro.",
      p5: "Eso es Citizen. También es Explorer: la libertad de moverte, pero con la posibilidad de pertenecer donde estés.",
    },
    practice: {
      h2: "Una práctica simple para esta semana",
      lead: "Si estás en Medellín (o en cualquier ciudad):",
      items: [
        ["Elige un ", { t: "espacio", href: SPACE_ES }, " y vuelve tres veces en siete días."],
        ["Cuando conozcas a alguien con quien la conversación fluye, propón algo específico y pequeño antes de despedirte (“¿estás por aquí el jueves a las 4?”)."],
        ["Deja un hueco en la agenda sin propósito. A veces el mejor momento es el que no estaba planeado."],
      ],
      p1: [
        { t: "La soledad del remote", href: LONELY_ES },
        " no se resuelve con más eventos. Se alivia cuando dejas de coleccionar primeros capítulos y empiezas a escribir el segundo.",
      ],
    },
    signoff: "Be where you thrive.",
    related: { label: "Blog Coffi", ids: CONTACTOS_RELATED_IDS },
  },
  en: {
    h1: shared.title.en,
    lead: [
      "You land in Medellín. Within a week you have WhatsApp numbers from half a dozen people. You’ve been to a language exchange, a founders meetup, and two ",
      { t: "cafés in Laureles", href: BEST_EN },
      " where “everyone knows everyone.”",
    ],
    dateLabel: "October 19, 2026",
    readingTimeLabel: "5 min",
    alt: {
      hero: "Young man working alone on a laptop with a cup of coffee, seated at a wooden table by a large window overlooking the mountains and neighborhoods of Medellín at sunset",
      depth: "Two people smiling and talking face to face at a wooden table, with a closed laptop and a coffee mug, in a space with plants and a brick wall",
      moments: "Four people chatting and laughing on an elevated terrace at night, with the lights of Medellín and the mountains under a purple sky behind them",
    },
    intro: {
      quote: ["You have contacts.", "You have no one to call on a Tuesday at 8 pm when the day feels empty."],
      p1: "It’s not that you’re bad at socializing. It’s the structure. The remote worker and digital nomad community is wide, active, and easy to enter. At the same time, many of those connections stay on the surface. Like every encounter is the first chapter of a friendship that never reaches the second.",
      p2: "This isn’t a personal failure. It’s the pattern of a lifestyle that rewards movement and novelty over repetition.",
    },
    threshold: {
      h2: "The threshold almost no one crosses",
      p1: "A study by Jeffrey Hall (University of Kansas, 2018) measured how much time it takes for a relationship to progress. It’s not magic. It’s accumulation:",
      items: [
        "Around 50 hours of shared time to go from acquaintance to casual friend.",
        "About 90 hours for it to feel like a real friendship.",
        "More than 200 hours for it to become close.",
      ],
      p2: "Those hours are not equal. Leisure time — talking without an agenda, sharing a meal, laughing at something absurd, watching the same sunset twice — weighs much more than sitting in the same coworking working in parallel.",
      p3: "Most nomads in Medellín stay between 2 and 6 weeks. In that window it’s almost impossible to accumulate 50 quality hours with the same person. You collect first chapters. You close the book. You start another in the next city or the next neighborhood.",
      p4: "The result is familiar: a full social calendar, the feeling of loneliness intact.",
    },
    entrance: {
      h2: "In Medellín the entrance is easy. Depth is not.",
      p1: "Medellín has one of the most accessible nomad communities in Latin America. Language exchanges, WhatsApp groups, events in Laureles and Provenza, coworkings where people arrive alone and leave with three new contacts. The city is warm. People are open. The weather invites you out.",
      p2: "And still, many report the same experience: real friendliness, shallow friendship.",
      p3: "Part of the phenomenon is cultural. In Colombia, deep friendships are usually built through repetition and proximity over time — the same park, the same class, the same circle. A foreigner who arrives for a month easily enters the greeting and the “parceros,” but the closed circle takes longer.",
      p4: "Another part is the tacit agreement of nomad life: both of us know this is temporary. So we keep the conversation light. We protect the emotional investment. No one is to blame. The system simply doesn’t reward continuity.",
      p5: "There’s a quiet cost. Every goodbye, even a small one, leaves a micro-loss. Over time, some people invest less. They prefer a pleasant one-night conversation to the possibility of something that hurts to leave behind.",
    },
    depth: {
      h2: "What actually builds depth (and it’s not another meetup)",
      p1: "Research and the experience of those who stay longer point to three simple things:",
      items: [
        { lead: "Repetition in the same context.", rest: " Seeing the same person in the same place more than once. Not a one-off event; a rhythm." },
        { lead: "Context shift.", rest: " Moving from “we met at the coworking” to “we had coffee without laptops” or “we went up the hill.” Hall called it a “context shift.” That’s where the relationship stops being utilitarian." },
        { lead: "Time without an agenda.", rest: " Not networking. Not “let’s see if something comes up.” Time where nothing needs to be produced. Just being there." },
      ],
      p2: "In Medellín this shows clearly in those who stay two or three months in Laureles or Envigado. They stop collecting events and start having places where they expect to find the same people. The city stops being a backdrop and becomes a rhythm.",
    },
    moments: {
      h2: "Moments, not feeds",
      p1: [
        { t: "Coffi", href: COFFI_APP_URL },
        " is not a social network or an event directory. It doesn’t pretend that more contacts will solve loneliness.",
      ],
      p2: "What it does is create the conditions for real moments to happen: the right space, at the right time, with the people who are there for the same reason as you.",
      p3: "Not a feed of faces. A shared context where repetition can begin. A place where Monday’s “hello” can become Thursday’s coffee without you having to chase it across three WhatsApp groups.",
      p4: "Community isn’t built by accumulating names. It’s built when the same space gives you the chance to see someone more than once, in different moods, without the pressure that this has to be “the” encounter.",
      p5: "That’s Citizen. It’s also Explorer: the freedom to move, with the possibility of belonging wherever you are.",
    },
    practice: {
      h2: "A simple practice for this week",
      lead: "If you’re in Medellín (or any city):",
      items: [
        ["Choose one ", { t: "space", href: SPACE_EN }, " and go back three times in seven days."],
        ["When you meet someone the conversation flows with, propose something specific and small before you say goodbye (“Are you around Thursday at 4?”)."],
        ["Leave an open slot in the calendar with no purpose. Sometimes the best moment is the one that wasn’t planned."],
      ],
      p1: [
        { t: "Remote loneliness", href: LONELY_EN },
        " isn’t solved with more events. It eases when you stop collecting first chapters and start writing the second.",
      ],
    },
    signoff: "Be where you thrive.",
    related: { label: "Coffi Blog", ids: CONTACTOS_RELATED_IDS },
  },
};

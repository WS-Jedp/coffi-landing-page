import { MINDSETS, type Place } from "@/models/places";

/**
 * The visual language of a Coffi pin, kept identical to the real app.
 *
 * Lifted from `handleCardColor` and `handleMindsetIcon` in
 * `coffi-app/src/common/utils/icons/icons/index.tsx` — same four colours, same
 * four icons, same rounded-square card. A landing page that invents its own pin
 * vocabulary teaches the visitor something they have to unlearn the moment they
 * open the product.
 *
 * The app renders its icons with `ReactDOM.renderToString`. This does not: the
 * pins here are HTML strings handed to `L.divIcon`, deliberately, so the client
 * bundle never has to carry react-dom/server. The icon paths are therefore
 * copied out of `react-icons` (already a dependency) as raw SVG data.
 */

/**
 * FOUR colours, FIVE words.
 *
 * The colours and icons are the app's, unchanged. `cowork` is an extra label
 * that shares `work`'s blue and glasses rather than a fifth visual identity,
 * and the reason is functional rather than cosmetic.
 *
 * The intent chips have to be able to exclude contradictory results: picking
 * "Conexión y colaboración" should not surface heads-down focus spots. With
 * COWORK folded into `work`, that exclusion was impossible — dropping `work`
 * from the collaboration chip would also have dropped every coworking space,
 * which is the one thing it must show. Splitting the word lets the filter be
 * precise while the map still reads as the app's four families.
 *
 * SOCIAL keeps landing in `fun`: the two genuinely are the same suggestion.
 */
export type Ambience = "study" | "work" | "cowork" | "fun" | "romantic";

const AMBIENCE_BY_MINDSET: Record<string, Ambience> = {
  [MINDSETS.STUDY]: "study",
  [MINDSETS.WORK]: "work",
  [MINDSETS.COWORK]: "cowork",
  [MINDSETS.VIBE]: "fun",
  [MINDSETS.SOCIAL]: "fun",
  [MINDSETS.ROMANTIC]: "romantic",
};

/**
 * What the place is good for RIGHT NOW.
 *
 * `realTimeInsights.idealFor`, not `knownFor`, and the difference is the whole
 * point of the section: one is what the venue is known for in general, the
 * other is what the community says its atmosphere is at this moment. Falls back
 * to `knownFor` only when the live reading is missing.
 */
export function ambienceOf(place: Place): Ambience {
  const live = place.realTimeInsights?.idealFor;
  return (
    AMBIENCE_BY_MINDSET[live as string] ??
    AMBIENCE_BY_MINDSET[place.knownFor as string] ??
    "work"
  );
}

/** i18n key for the human name of an ambience. */
export const ambienceLabelKey = (a: Ambience) => `home.mapIntro.ambience.${a}`;

type IconSpec = { viewBox: string; d: string; stroke?: boolean };

type IconKey = Exclude<Ambience, "cowork">;

/**
 * Icon geometry, copied verbatim from react-icons so the shapes match the app
 * exactly rather than approximately.
 *
 * `work` is the odd one out and it matters: IoGlassesOutline is an OUTLINE —
 * `fill: none` with a 32-unit stroke on a 512 viewBox. Rendering it with `fill`
 * like the other three produces an invisible icon, which looks like a missing
 * asset rather than a bug.
 */
const ICONS: Record<IconKey, IconSpec> = {
  // MdSchool
  study: {
    viewBox: "0 0 24 24",
    d: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z",
  },
  // IoGlassesOutline — shared with `cowork`, see the note on Ambience.
  work: {
    viewBox: "0 0 512 512",
    d: "M224 232a32 32 0 0 1 64 0m160-32h16m-400 0H48m16 0c0 96 16 128 80 128s80-32 80-128c0 0-16-16-80-16s-80 16-80 16zm384 0c0 96-16 128-80 128s-80-32-80-128c0 0 16-16 80-16s80 16 80 16z",
    stroke: true,
  },
  // MdCelebration
  fun: {
    viewBox: "0 0 24 24",
    d: "m2 22 14-5-9-9zM14.53 12.53l5.59-5.59a1.25 1.25 0 0 1 1.77 0l.59.59 1.06-1.06-.59-.59a2.758 2.758 0 0 0-3.89 0l-5.59 5.59 1.06 1.06zM10.06 6.88l-.59.59 1.06 1.06.59-.59a2.758 2.758 0 0 0 0-3.89l-.59-.59-1.06 1.07.59.59c.48.48.48 1.28 0 1.76zM17.06 11.88l-1.59 1.59 1.06 1.06 1.59-1.59a1.25 1.25 0 0 1 1.77 0l1.61 1.61 1.06-1.06-1.61-1.61a2.758 2.758 0 0 0-3.89 0zM15.06 5.88l-3.59 3.59 1.06 1.06 3.59-3.59a2.758 2.758 0 0 0 0-3.89l-1.59-1.59-1.06 1.06 1.59 1.59c.48.49.48 1.29 0 1.77z",
  },
  // BsHearts
  romantic: {
    viewBox: "0 0 16 16",
    d: "M4.931.481c1.627-1.671 5.692 1.254 0 5.015-5.692-3.76-1.626-6.686 0-5.015m6.84 1.794c1.084-1.114 3.795.836 0 3.343-3.795-2.507-1.084-4.457 0-3.343M7.84 7.642c2.71-2.786 9.486 2.09 0 8.358-9.487-6.268-2.71-11.144 0-8.358",
  },
};

export function iconSvg(ambience: Ambience, size = 21): string {
  const spec = ICONS[ambience === "cowork" ? "work" : ambience];
  const paint = spec.stroke
    ? `fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"`
    : `fill="currentColor"`;
  return (
    `<svg viewBox="${spec.viewBox}" width="${size}" height="${size}" aria-hidden="true">` +
    `<path ${paint} d="${spec.d}"/></svg>`
  );
}

/**
 * Card colours as literal hex rather than Tailwind classes.
 *
 * These end up inside an HTML string, where Tailwind's scanner cannot see them
 * — a class name built here would survive `next dev` and be silently purged
 * from the production build, so every pin would come out unstyled in the one
 * environment nobody tests pins in. Hex in an inline style cannot be purged.
 *
 * The values are the ones the app's classes resolve to: coffi-purple-300,
 * coffi-blue, amber-400 and pink-400.
 */
export const AMBIENCE_COLOR: Record<Ambience, string> = {
  study: "#9494FF",
  work: "#6E91FF",
  cowork: "#6E91FF",
  fun: "#FBBF24",
  romantic: "#F472B6",
};

/** Deeper shade for the label's ambience line, which sits on white. */
export const AMBIENCE_INK: Record<Ambience, string> = {
  study: "#533FFF",
  work: "#3B6BE0",
  cowork: "#3B6BE0",
  fun: "#B45309",
  romantic: "#DB2777",
};

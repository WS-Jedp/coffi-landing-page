import { CHAPTERS, TRACK_VH } from "../constants";
import type { CameraTarget } from "../types";

export type SectionId = "intro" | "spaces" | "connect" | "points" | "circles";

export type SectionSpec = {
  id: SectionId;
  /** Matches the chapter of the same name in CHAPTERS. */
  chapterId: SectionId;
  /** Where the map looks while this section is active. */
  camera: CameraTarget;
  titleKey: string;
  descKey: string;
};

/**
 * Camera targets, hand-picked rather than derived from `location.zone`.
 *
 * The zone labels in `src/data/places` are unreliable — several places tagged
 * "Envigado" sit at latitude 6.25, inside Medellín proper, so the label's
 * bounding box is 14km tall and its centroid lands nowhere near any place.
 * Measured density within 900m of each candidate centre, over all 90 places:
 *
 *   El Poblado 16 · Laureles 17 · La Candelaria 11 · Belén 10 · La 70 7
 *   Envigado 0        <- and only 2 within 1200m
 *
 * That is why `connect` uses La 70 and not Envigado: the brief offered either,
 * but Envigado would put the creators on an empty map.
 *
 * All four sections share ONE zoom, and that is deliberate.
 *
 * The first attempt gave each section its own value, chosen so they all rounded
 * to tile level 16 — the theory being that Leaflet only rebuilds its tile grid
 * when `Math.round(zoom)` changes. Measuring the actual requests disproved it:
 * levels 13, 15 and 16 were all fetched. `flyTo` does not interpolate zoom
 * linearly; it follows a smooth-and-efficient path that *zooms out* through the
 * middle of the flight to cover ground and then back in, so it visits levels
 * neither endpoint ever occupies.
 *
 * With a single shared zoom the move between sections is a pure pan, the zoom
 * never changes, and no intermediate level can be created. It also reads better:
 * every section is framed at the same scale, so the city stays one continuous
 * place rather than jumping magnification for no narrative reason.
 */
export const SECTION_ZOOM = 15.9;
export const SECTIONS: readonly SectionSpec[] = [
  {
    id: "intro",
    chapterId: "intro",
    // Overridden by the intro's own calibration; present so indices line up.
    camera: { center: [6.25, -75.575], zoom: 15.7 },
    titleKey: "home.mapIntro.title",
    descKey: "home.mapIntro.description",
  },
  {
    id: "spaces",
    chapterId: "spaces",
    camera: { center: [6.2274, -75.5719], zoom: SECTION_ZOOM, animate: true }, // El Poblado
    titleKey: "home.mapIntro.spaces.title",
    descKey: "home.mapIntro.spaces.description",
  },
  {
    id: "connect",
    chapterId: "connect",
    camera: { center: [6.245, -75.59], zoom: SECTION_ZOOM, animate: true }, // La 70
    titleKey: "home.mapIntro.connect.title",
    descKey: "home.mapIntro.connect.description",
  },
  {
    id: "points",
    chapterId: "points",
    camera: { center: [6.2288, -75.582], zoom: SECTION_ZOOM, animate: true }, // Belén
    titleKey: "home.mapIntro.points.title",
    descKey: "home.mapIntro.points.description",
  },
  {
    id: "circles",
    chapterId: "circles",
    camera: { center: [6.2274, -75.5719], zoom: SECTION_ZOOM, animate: true }, // Poblado
    titleKey: "home.mapIntro.circles.title",
    descKey: "home.mapIntro.circles.description",
  },
] as const;

/**
 * Where each section takes over, and how far back you must scroll to give it up.
 *
 * Both are derived from CHAPTERS rather than written down, so re-pacing the
 * track is a one-line edit that cannot leave these behind.
 *
 * A section activates a fifth of the way into its chapter, not at its very
 * start: the boundary should land where the previous section has finished
 * reading, not the instant its scroll allowance runs out.
 *
 * The hysteresis is not there for fast flicks — those are monotonic and resolve
 * fine. It is for *resting on a boundary*: iOS momentum settles with sub-pixel
 * oscillation and a trackpad's rubber-band overshoots and comes back, either of
 * which crosses the line several times. Without a dead band that becomes a
 * flip storm, and each flip cancels a camera flight and swaps a pin layer.
 */
const ACTIVATE_FRACTION = 0.18;
const HYSTERESIS_FRACTION = 0.08;

function boundaries() {
  const activateAt: number[] = [];
  const hysteresis: number[] = [];
  let cursor = 0;
  for (const chapter of CHAPTERS) {
    const start = cursor / TRACK_VH;
    const span = chapter.vh / TRACK_VH;
    cursor += chapter.vh;
    activateAt.push(start + ACTIVATE_FRACTION * span);
    hysteresis.push(HYSTERESIS_FRACTION * span);
  }
  // The intro owns everything before the first real boundary.
  activateAt[0] = 0;
  hysteresis[0] = 0;
  return { activateAt, hysteresis };
}

export const { activateAt: SECTION_ACTIVATE_AT, hysteresis: SECTION_HYSTERESIS } =
  boundaries();

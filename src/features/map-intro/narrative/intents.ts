import { dummyPlaces } from "@/data/places";
import {
  AMBIENCE_TAG_ENUM as A,
  MINDSETS,
  NOISE_LEVEL_ENUM,
  THEME_TAG_ENUM as T,
  type Place,
} from "@/models/places";
import { ambienceOf, type Ambience } from "../map/pinVocabulary";
import type { CameraTarget } from "../types";
import { SECTION_ZOOM } from "./sections";

/**
 * The intents the first section offers, taken from the product rather than
 * invented for the landing page.
 *
 * The ids are `PURPOSE_BASED_GROUP` values from
 * `coffi-app/src/models/purposeBasedGroup`, which is the enum the app's own
 * "¿Cuál es tu intención para hoy?" filter is built on. Matching it exactly is
 * what makes the promise honest: the chips here are the same question the app
 * asks, not a marketing paraphrase of it. It also means the value the closing
 * CTA forwards as `purpose` is one the app could act on directly.
 *
 * FUN is the exception and is flagged as such below.
 */
export type IntentId =
  | "LOCKED_IN"
  | "NETWORK_AND_CHILL"
  | "WORK_AND_WELLNESS"
  | "FUN";

export const INTENT_IDS: readonly IntentId[] = [
  "LOCKED_IN",
  "NETWORK_AND_CHILL",
  "WORK_AND_WELLNESS",
  "FUN",
];

export const intentLabelKey = (id: IntentId) =>
  `home.mapIntro.spaces.intents.${id}`;

const has = <V,>(list: V[] | undefined, ...wanted: V[]) =>
  (list ?? []).some((v) => wanted.includes(v));

/**
 * What each intent selects.
 *
 * These are TRANSLATIONS of the app's `purposeBasedGroups` predicates, not
 * copies, and the difference is not laziness. The app's rules are written
 * against tags this dataset does not have — `CHILL`, `LIBRARY_LIKE`,
 * `NOMAD_FRIENDLY`, `HIGH_ENERGY`, `WELLNESS_CENTERED`, `PRODUCTIVITY_BOOST`
 * are all in the app's enums and none of them exist here. Copying the rule
 * verbatim would have compiled and matched nothing. So each group keeps its
 * MEANING, expressed in the vocabulary the landing's fixtures actually use.
 *
 * Deliberately broad, for the same reason as before: the section's window crops
 * the map to about half the stage, and a purist predicate leaves two pins on
 * screen. These land at 53 / 60 / 44 / 44 places.
 */
const MATCHES: Record<IntentId, (p: Place) => boolean> = {
  // App: LIBRARY_INSPIRED, FOCUS_ZONE, PRODUCTIVITY_BOOST, MINIMALIST
  //    + QUIET, CHILL, LIBRARY_LIKE, PROFESSIONAL
  LOCKED_IN: (p) =>
    has(p.themeTags, T.LIBRARY_INSPIRED, T.FOCUS_ZONE) ||
    has(p.ambianceTags, A.QUIET, A.MINIMALIST, A.PROFESSIONAL) ||
    has(
      [p.realTimeInsights?.noiseLevel],
      NOISE_LEVEL_ENUM.VERY_QUIET,
      NOISE_LEVEL_ENUM.QUIET,
    ),
  // App: COFFEE_CULTURE, COLLABORATIVE_ZONE, CHILL_ZONES, TRAVEL_FOCUSED,
  //      CULTURAL_EXCHANGE, EVENT_DRIVEN, FREELANCER_HUB, VIBRANT_COMMUNITY
  //    + NOMAD_FRIENDLY, HIGH_ENERGY, ADVENTUROUS, CASUAL, CULTURAL
  NETWORK_AND_CHILL: (p) =>
    has(
      p.themeTags,
      T.NOMAD_MEETUPS,
      T.CULTURAL_EXCHANGE,
      T.STARTUPS,
      T.EVENT_DRIVEN,
      T.TRAVEL_FOCUSED,
    ) ||
    has(p.ambianceTags, A.COLLABORATIVE, A.CASUAL, A.CULTURAL) ||
    p.knownFor === MINDSETS.COWORK ||
    p.knownFor === MINDSETS.SOCIAL,
  // App: HEALTH_AND_WELLNESS, CHILL_ZONES, COFFEE_CULTURE, YOGA_RETREAT
  //    + QUIET, CHILL, NATURE_INSPIRED, BOHEMIAN, ZEN, WELLNESS_CENTERED
  WORK_AND_WELLNESS: (p) =>
    has(p.themeTags, T.HEALTH_AND_WELLNESS, T.CHILL_ZONES, T.ECO_FRIENDLY) ||
    has(p.ambianceTags, A.NATURE_INSPIRED, A.ZEN, A.BOHEMIAN, A.COZY),
  /*
   * The one with no counterpart in the app.
   *
   * `purposeBasedGroups` has nothing for going out — its nearest neighbour,
   * NIGHT_OWL_MODE, is about working late and is commented out anyway. So this
   * predicate is built from the landing's own tags. If a "diversión" group is
   * ever added to the product, this is the definition to reconcile against.
   */
  FUN: (p) =>
    has(p.themeTags, T.NIGTH_OWL, T.FOODIE_PARADISE, T.EVENT_DRIVEN) ||
    has(p.ambianceTags, A.VIBRANT, A.TRENDY, A.RETRO) ||
    p.knownFor === MINDSETS.VIBE ||
    p.knownFor === MINDSETS.SOCIAL,
};

/**
 * Which live ambiences an intent is allowed to surface — the coherence rule.
 *
 * This exists because selection and display were reading different fields. The
 * predicates above match on `themeTags`, `ambianceTags` and `knownFor`, while
 * the pin's second line shows `realTimeInsights.idealFor`, and nothing tied the
 * two together. Measured on the real data, the result was exactly as bad as it
 * sounds: "Enfoque" surfaced 8 places whose pins read "Romántico", and
 * "Conexión y colaboración" surfaced 9 that read "Estudiar". The map was
 * contradicting the chip the user had just pressed.
 *
 * So an intent now also constrains what the pin is allowed to SAY. A place is
 * shown only if its live ambience is one the intent can defend.
 *
 * `cowork` is separate from `work` purely to make this table expressible —
 * collaboration has to exclude heads-down work while keeping coworking spaces.
 * See the note on Ambience.
 *
 * WORK_AND_WELLNESS is the loosest fit and worth flagging: nothing in the six
 * mindsets means "chill". `romantic` (cosy, low-key) and `study` (quiet) are the
 * calm end of what the data can express, so those are what unwinding gets.
 */
const ALLOWED_AMBIENCE: Record<IntentId, readonly Ambience[]> = {
  LOCKED_IN: ["study", "work"],
  NETWORK_AND_CHILL: ["cowork", "fun"],
  WORK_AND_WELLNESS: ["romantic", "study"],
  FUN: ["fun", "romantic"],
};

/**
 * Where the camera goes for each intent.
 *
 * Grid-searched over the whole metro area for the four points that hold the most
 * matching places within one screen, subject to being at least 1.1km apart —
 * without that constraint "the city changes" is a claim the movement does not
 * back up.
 *
 * Re-searched three times, and each pass corrected the previous one's blind spot.
 * First after the coherence rule narrowed every set. Then against the SIEVE
 * rather than a radius count — a centre with ten matching places nearby still
 * renders three pins if their labels collide, so the raw count optimises the
 * wrong number. Finally against the PHONE window rather than the desktop one:
 * a phone band leaves an anchor area of roughly 200x130px, so it is the binding
 * constraint, and cameras tuned on the roomy desktop column were leaving two of
 * the four chips with a single pin. Optimise for the tightest window and the
 * wide one inherits the result; the reverse is not true.
 *
 * The chosen quadruple sits 1105m apart at its closest and shows at least two
 * places on a 375px phone and three to six on desktop. Re-run once more after
 * the spaces band was trimmed by two points to let the copy clear it: shrinking
 * the window invalidates the cameras chosen for the old one, so the two numbers
 * have to move together.
 *
 * `zoom` here is a placeholder: MapIntro stamps the breakpoint's zoom on every
 * target before it reaches the camera hook, so all of them share one and a chip
 * change stays a pan.
 *
 * NOT derived from `location.zone`. That trap is documented on SECTIONS and it
 * is a real one: Envigado holds six matching places yet has ZERO within 900m of
 * its own centroid, because the label spans 14km and its centre lands on nothing.
 *
 * All four share SECTION_ZOOM, so switching chips is a pure pan and no
 * intermediate tile level is ever fetched.
 */
export const INTENT_CAMERAS: Record<IntentId, CameraTarget> = {
  LOCKED_IN: { center: [6.238, -75.568], zoom: SECTION_ZOOM, animate: true },
  NETWORK_AND_CHILL: {
    center: [6.234, -75.59],
    zoom: SECTION_ZOOM,
    animate: true,
  },
  WORK_AND_WELLNESS: {
    center: [6.228, -75.57],
    zoom: SECTION_ZOOM,
    animate: true,
  },
  FUN: { center: [6.238, -75.578], zoom: SECTION_ZOOM, animate: true },
};

/** Radius around the active camera that a pin must fall inside to be shown. */
export const INTENT_RADIUS_M = 900;

const EARTH_M = 6_371_000;
const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Great-circle distance in metres. */
export function distanceM(
  a: readonly [number, number],
  b: readonly [number, number],
): number {
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_M * Math.asin(Math.sqrt(h));
}

export const placesWithLocation = dummyPlaces.filter(
  (p) => p.location?.latitude && p.location?.longitude,
);

/**
 * The places an intent should light up: matching the predicate AND close enough
 * to its camera to be on screen. Without the distance test the layer would hold
 * fifty markers spread over the whole valley, all but a handful outside the crop.
 */
export function placesForIntent(intent: IntentId | null): Place[] {
  if (!intent) return placesWithLocation;
  const centre = INTENT_CAMERAS[intent].center;
  const allowed = ALLOWED_AMBIENCE[intent];
  return placesWithLocation.filter(
    (p) =>
      MATCHES[intent](p) &&
      // The coherence rule: never show a pin whose own label argues with the
      // chip that summoned it.
      allowed.includes(ambienceOf(p)) &&
      distanceM(centre, [p.location.latitude, p.location.longitude]) <
        INTENT_RADIUS_M,
  );
}

/**
 * The ambience an intent mostly SHOWS — and therefore the colour its chip wears.
 *
 * Derived rather than written down, because the honest answer is a property of
 * the data: the chip promises a colour and the map has to deliver it, so the
 * colour is whatever `ambienceOf` returns most often across the places the
 * intent actually surfaces. Re-aim a camera or edit a fixture and the chips
 * follow on their own.
 *
 * Measured on the current dataset: 3/6 `study` for LOCKED_IN, 2/3 `cowork` for
 * NETWORK_AND_CHILL, 6/7 `study` for WORK_AND_WELLNESS, 5/6 `fun` for FUN.
 *
 * TWO INTENTS SHARE A COLOUR, and that is the decision rather than a defect.
 * Focus and Unwind both come out `study` purple. The pin palette holds only four
 * hues — `work` and `cowork` share one — so giving all four chips a distinct
 * colour meant handing Unwind the pink of its second-place ambience, which
 * appears in exactly one of its seven pins. A chip whose colour predicts the map
 * six times out of seven is worth more than a tidy row; what separates those two
 * chips is the icon.
 *
 * Ties break toward the earlier entry in ALLOWED_AMBIENCE, which is ordered by
 * how central the ambience is to the intent — LOCKED_IN is 3-3 between `study`
 * and `work`, and `study` is the one the chip should claim. Iterating that list
 * instead of a tally is what makes the rule explicit, and it is complete: every
 * place in the set has an allowed ambience by construction.
 *
 * Declared at the FOOT of this module on purpose. It runs at import time and
 * reads `placesWithLocation` and `INTENT_CAMERAS` through `placesForIntent`;
 * hoisted any higher it would evaluate before those consts are initialised and
 * throw on the first import.
 */
function modalAmbience(intent: IntentId): Ambience {
  const places = placesForIntent(intent);
  let best = ALLOWED_AMBIENCE[intent][0];
  let bestCount = -1;

  for (const ambience of ALLOWED_AMBIENCE[intent]) {
    const n = places.filter((p) => ambienceOf(p) === ambience).length;
    if (n > bestCount) {
      best = ambience;
      bestCount = n;
    }
  }

  return best;
}

export const INTENT_AMBIENCE: Record<IntentId, Ambience> = Object.fromEntries(
  INTENT_IDS.map((id) => [id, modalAmbience(id)]),
) as Record<IntentId, Ambience>;

import type { Place } from "@/models/places";
import type { CameraTarget } from "../types";
import { SECTIONS } from "./sections";
import { distanceM, placesWithLocation } from "./intents";


/**
 * The offers the third section hangs on the map.
 *
 * The discounts are invented — the landing page has no perks data — but the
 * PLACES are real, taken from `dummyPlaces`, so the pins land on venues that
 * exist elsewhere in the product rather than on empty street corners.
 *
 * Anchored by proximity to the section's camera instead of by hardcoded place
 * ids. Ids would have to be re-picked by hand every time that camera moves, and
 * the failure is silent: the layer still renders, just off screen.
 */
export type Perk = {
  place: Place;
  discountPct: number;
  points: number;
};

const POINTS_CAMERA: CameraTarget = SECTIONS.find((s) => s.id === "points")!
  .camera;

/**
 * A pool, not a final count — same reasoning as CIRCLES.
 *
 * The render-time sieve in `usePinLayers` is the one that knows how much of the
 * map is actually uncropped, so it needs more candidates than it will show.
 */
const PERK_POOL = 24;
const RADIUS_M = 900;

/**
 * Rotated over the nearest places rather than randomised. A landing page that
 * renders different numbers on every visit cannot be screenshotted, reviewed or
 * QA'd, and `Math.random()` during render is also a guaranteed hydration
 * mismatch — the same bug already living in the hero's particle field.
 */
const OFFERS: readonly { discountPct: number; points: number }[] = [
  { discountPct: 20, points: 150 },
  { discountPct: 15, points: 100 },
  { discountPct: 25, points: 220 },
  { discountPct: 10, points: 80 },
  { discountPct: 30, points: 300 },
  { discountPct: 15, points: 120 },
];

/**
 * A pool of CANDIDATES, nearest first. The sieve in `usePinLayers` decides what
 * is actually drawn, because it is the only place that knows how much of the
 * map the section's window leaves uncropped. See the note in ./circles.
 */
export const PERKS: readonly Perk[] = placesWithLocation
  .map((place) => ({
    place,
    d: distanceM(POINTS_CAMERA.center, [
      place.location.latitude,
      place.location.longitude,
    ]),
  }))
  .filter((x) => x.d < RADIUS_M)
  .sort((a, b) => a.d - b.d)
  .slice(0, PERK_POOL)
  .map(({ place }, i) => ({ place, ...OFFERS[i % OFFERS.length] }));

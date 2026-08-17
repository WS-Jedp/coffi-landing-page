import type { CameraTarget } from "../types";
import { SECTIONS } from "./sections";
import { distanceM, placesWithLocation } from "./intents";
import { CREATORS, type Creator } from "./creators";


/**
 * Coffi Circles: the open micro-events the closing section is about.
 *
 * A circle is a small, spontaneous gathering hosted inside a Coffi space —
 * a study group, a sketching session, a coworking block — that anyone nearby
 * can join. So the pin is not a venue and not a person: it is an invitation,
 * and it has to read as one without being touched.
 *
 * Anchored to the real places nearest the section's camera, which is what makes
 * the "@ Venue" half of the title true rather than decorative. Ordered, never
 * random: a landing page that renders different events on each visit cannot be
 * reviewed or screenshotted, and `Math.random()` during render is a guaranteed
 * hydration mismatch.
 */
export type Circle = {
  id: string;
  /** i18n key for the event's name. The "@ Venue" half is not translated. */
  titleKey: string;
  placeName: string;
  position: [number, number];
  /** How many people have already joined. Fixture, like the rest. */
  going: number;
  /**
   * The two or three faces the pin shows, drawn from the SAME cast as the
   * creators section.
   *
   * That reuse is the point rather than a convenience. The visitor has just
   * scrolled past Ana and Samuel scattered around La 70; finding them again
   * here turns Circles from an abstract feature into something the people they
   * already met are doing. A fresh set of invented names would have cost the
   * same and said nothing.
   */
  hosts: readonly Creator[];
};

const CIRCLES_CAMERA: CameraTarget = SECTIONS.find((s) => s.id === "circles")!
  .camera;

const SEEDS: readonly { id: string; going: number }[] = [
  { id: "study", going: 6 },
  { id: "ux", going: 4 },
  { id: "sketch", going: 3 },
  { id: "build", going: 5 },
  { id: "journal", going: 4 },
];

export const CIRCLE_RADIUS_M = 900;

/**
 * A pool of CANDIDATES. Exactly one sieve decides what is drawn, and it is not
 * this one.
 *
 * An earlier version spaced these out here as well, which was a mistake worth
 * recording: this module cannot know how much of the map is actually visible.
 * The window is a 1152x317 band in this section and a 553x634 column in others,
 * so a set spread evenly over 900m looks balanced on paper and puts two thirds
 * of its pins outside the crop. Sieving twice also meant the good candidates
 * were being discarded here, before the sieve that could judge them ever saw
 * them.
 *
 * So this hands over everything within range, nearest first, and
 * `usePinLayers` — which is given the real window size — picks.
 */
const POOL = 24;

export const CIRCLES: readonly Circle[] = placesWithLocation
  .map((place) => ({
    place,
    d: distanceM(CIRCLES_CAMERA.center, [
      place.location.latitude,
      place.location.longitude,
    ]),
  }))
  .filter((x) => x.d < CIRCLE_RADIUS_M)
  .sort((a, b) => a.d - b.d)
  .slice(0, POOL)
  .map(({ place }, i) => {
    // Titles cycle, so a pool larger than the seed list still names every pin.
    // Cycling rather than randomising keeps the page identical on every load:
    // reviewable, screenshotable, and free of hydration mismatches.
    const seed = SEEDS[i % SEEDS.length];
    /*
     * Hosts picked by index, never at random. The page has to render the same
     * on every load to be reviewable, and `Math.random()` during render is a
     * guaranteed hydration mismatch besides. The stride of 3 keeps consecutive
     * circles from sharing faces.
     */
    const hosts = [0, 1, 2].map(
      (k) => CREATORS[(i * 3 + k) % CREATORS.length],
    );
    return {
      hosts,
      id: `${seed.id}-${i}`,
      titleKey: `home.mapIntro.circles.events.${seed.id}`,
      placeName: place.name,
      position: [place.location.latitude, place.location.longitude] as [
        number,
        number,
      ],
      going: seed.going,
    };
  });

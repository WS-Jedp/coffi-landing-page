import type { ChapterSpec, SceneStep } from "./types";

/**
 * Scroll track composition.
 *
 * Every chapter after `intro` is ACTIVATION-based, not scrubbed: crossing into
 * one flips a step index, which fires a camera flight, a pin swap and a copy
 * change as time-based animations. Their `vh` therefore buys reading time and
 * a comfortable activation boundary, not animation resolution.
 *
 * `intro` is the exception and is still a true scrub.
 */
export const CHAPTERS: readonly ChapterSpec[] = [
  // The intro's 200 is load-bearing and must not change: the frame scrub's
  // px-per-frame density and PIN_AT_PROGRESS are both derived from it.
  { id: "intro", vh: 200 },
  { id: "spaces", vh: 120 },
  // The longest — it carries three sub-beats, one per creator card.
  { id: "connect", vh: 180 },
  { id: "points", vh: 120 },
  // Extra tail so the CTA is readable before the stage unpins.
  { id: "circles", vh: 160 },
] as const;

/** Total track height in svh. Keep TRACK_CLASS in step with it. */
export const TRACK_VH = CHAPTERS.reduce((sum, c) => sum + c.vh, 0);

/**
 * The intro chapter's share of global progress.
 *
 * Needed because a few values are naturally measured against the WHOLE track
 * (how much of the range is already behind us at rest, say) while every
 * `RANGES.*` constant below is intro-local. Mixing the two silently shifts
 * every boundary.
 */
export const INTRO_SHARE = CHAPTERS[0].vh / TRACK_VH;

/**
 * Track height. Kept as Tailwind classes rather than an inline style so the
 * desktop/mobile split stays in CSS and never causes a hydration mismatch.
 *
 * `svh` (small viewport height), never `vh`: on iOS Safari the URL bar collapses
 * mid-scroll, and a `vh`-sized sticky stage would resize under the user's finger.
 *
 * The intro chapter's height is what sets the scrub density, because
 * `useSceneProgress` opens at `start end` rather than at the pin. So the
 * intro's 200svh over 61 frames is ~29px of scroll per frame on a 900px viewport — a trackpad flick advances 3-4 frames,
 * which is the floor for a scrub that does not strobe.
 *
 * The height also fixes when the stage pins, and that is the real constraint on
 * shortening it. The approach always eats exactly one viewport of scroll, so
 * its share of progress is `100 / trackVh` — at 200svh the stage pins at 0.5,
 * at 180svh it would pin at 0.556, and at that point CARD_ENTER would have to
 * finish inside the sliver between the pin and PUSH_IN (0.617). The card would
 * reach full size before the stage caught, and its descent to centre — which
 * only reads as a descent while pinned — would never be seen.
 *
 * The reduced-motion collapse is a `motion-reduce:` variant rather than a JS
 * branch, and that distinction matters. Branching a className on a client-only
 * media query produces a hydration mismatch, and React does not patch mismatched
 * attributes — it keeps the server's value and warns. The height would silently
 * stay at 320svh no matter what the user's OS setting said.
 *
 * The `!` on the motion-reduce utility is load-bearing: Tailwind emits
 * breakpoint variants after motion variants, so a plain `motion-reduce:h-svh`
 * loses to `md:h-[320svh]` on any screen wide enough to matter.
 */
export const TRACK_CLASS = "h-[780svh] motion-reduce:!h-svh";

/**
 * Progress at which the sticky stage catches, derived rather than measured:
 * the approach consumes one viewport of scroll out of the intro chapter, and
 * both are expressed in svh, so the ratio holds at every viewport height.
 *
 * INTRO-LOCAL, like everything in RANGES — it is measured against
 * `chapter.intro`, not against the whole track.
 */
export const PIN_AT_PROGRESS = 100 / CHAPTERS[0].vh;

/** Native size of the source render. Both rungs preserve this aspect ratio. */
export const SOURCE_ASPECT = 1136 / 800;

/**
 * Responsive frame sets emitted by `scripts/encode-map-intro.mjs`.
 * `frameCount` must match the manifest; the encode script is the source of truth.
 *
 * Decoded RAM is what these numbers are really protecting:
 *   1136x800x4 B = 3.47 MiB/frame -> 61 frames ~ 212 MiB
 *    640x451x4 B = 1.10 MiB/frame -> 41 frames ~  45 MiB
 */
export const FRAME_RUNGS = {
  // containBoost enlarges past `contain` at progress 0. A portrait phone canvas
  // is much taller than the source, so plain `contain` would leave the folded
  // paper postage-stamp sized. 1.2 is the largest boost proven not to crop the
  // paper (see frameFit.test.ts); desktop needs none because the card's aspect
  // already matches the source.
  mobile: { width: 640, height: 451, frameCount: 41, dir: "640", containBoost: 1.2 },
  desktop: { width: 1136, height: 800, frameCount: 61, dir: "1136", containBoost: 1.0 },
} as const;

export type FrameRung = (typeof FRAME_RUNGS)[keyof typeof FRAME_RUNGS];

/** Viewport width below which we serve the small rung. */
export const MOBILE_BREAKPOINT = 768;

export const framePath = (rung: FrameRung, index: number) =>
  `/assets/animations/map-intro/${rung.dir}/frame_${String(index).padStart(4, "0")}.webp`;

/**
 * Progress sub-ranges, all in global scroll progress (0..1).
 *
 * The ordering is not arbitrary. The source render animates its own camera
 * push-in from frame 74 onward, so CARD_ENTER deliberately finishes before
 * PUSH_IN begins — overlapping them multiplies two zooms on different easing
 * curves and reads as rubbery.
 *
 * Progress maps to source frames LINEARLY: the scrubber picks
 * `index = round(p * (frameCount - 1))`, and each rung's index maps back to
 * source frame `~120 * p`. Every range below is expressed in progress, so to
 * place one at a particular moment in the animation, divide by 120:
 *
 *   source frame 74 (frames stop having alpha)  ->  p = 74/120 = 0.617
 *   source frame 120 (flat city, Leaflet hand-off) -> p = 1.0
 *
 * Getting this mapping wrong is what makes the card chrome appear while the
 * frame is still a transparent cutout — a shadowed rectangle with nothing in it.
 */
export const OPAQUE_AT_PROGRESS = 74 / 120;

/**
 * A [start, end] slice of scroll progress.
 *
 * Deliberately a mutable tuple rather than part of an `as const` object:
 * Framer Motion's `useTransform` takes `number[]`, and a readonly tuple is not
 * assignable to it.
 */
export type ProgressRange = [number, number];

/**
 * Hoisted so CARD_CHROME below can be derived from its end rather than
 * hand-tuned to sit near it. See the note there.
 */
const FIT_RANGE: ProgressRange = [0.52, 0.74];

export const RANGES = {
  /** Source frames 1 -> 73: the paper unfolds. Descriptive; nothing reads it. */
  UNFOLD: [0.02, OPAQUE_AT_PROGRESS] as ProgressRange,
  /** Source frames 74 -> 120: the camera pushes into the city. Descriptive. */
  PUSH_IN: [OPAQUE_AT_PROGRESS, 1.0] as ProgressRange,
  /**
   * The card's entrance: it grows from CARD_START_WIDTH_PX to full size and
   * settles from just under the hero banner into the centre of the stage.
   *
   * Spans both halves of the section's life. It runs through the approach — the
   * map grows as it rides up the page — and has to keep running past the pin at
   * 0.5, because that is the only stretch where the descent to centre actually
   * reads as a descent. Before the stage pins, the page scrolls faster than the
   * card travels, so on screen it still moves up, just lagging; only a pinned
   * stage can move something down while the user scrolls down.
   *
   * Still ends before PUSH_IN at 0.617, for the reason in the note above: the
   * render drives its own camera from frame 74 and a container scale running
   * underneath it would multiply two zooms on different curves.
   */
  CARD_ENTER: [0.0, 0.6] as ProgressRange,
  /**
   * contain -> cover. Starts once the paper is essentially flat and finishes
   * just after the frames go opaque, so the card is never showing a letterboxed
   * "full" map with bands of surface above and below it.
   */
  FIT: FIT_RANGE,
  /**
   * Radius, ring, shadow, surface — and it may not begin before FIT ENDS.
   *
   * The card is only allowed to exist once the frame it contains actually
   * reaches its edges. Starting earlier puts a drop shadow and an opaque
   * surface around an image that does not fill the box, so the surface shows
   * through as bands down either side and the card reads as broken rather than
   * as materialising. Measured at the old [0.58, 0.72]: at 0.62 the shadow was
   * already at 28% with a 39px gap on each side, and at 0.70 it was at 86% with
   * 6px still showing.
   *
   * `FIT_RANGE[1]` is not "about where the fit finishes", it is exactly where:
   * `computeFrameFit` drives the scale with `smoothstep`, which reaches 1 at
   * the end of its range, so `fitScale === coverScale` there — on both rungs
   * and at every viewport, whatever the aspect ratio works out to. Deriving it
   * means the two cannot drift apart when the fit is re-paced.
   *
   * Ends before CROSSFADE so the card is fully established before the canvas
   * hands over to Leaflet.
   */
  CARD_CHROME: [FIT_RANGE[1], 0.86] as ProgressRange,
  /**
   * Copy migrates from centred to right-of-centre (desktop). Starts just after
   * the pin at 0.5 so the copy is not sliding sideways while the whole section
   * is still travelling up the page.
   */
  COPY_MIGRATE: [0.52, 0.75] as ProgressRange,
  /** Mobile glass card slides up from the bottom. */
  COPY_MOBILE_IN: [0.62, 0.8] as ProgressRange,
  /** Leaflet mounts hidden past here. Latched: never unmounts. */
  MAP_MOUNT: 0.5,
  /** Cross-dissolve canvas -> Leaflet. ~176px of scroll, not instantaneous. */
  CROSSFADE: [0.9, 1.0] as ProgressRange,
};

/**
 * How wide the card is at rest, before any scrolling. The scale it starts at is
 * derived from this and the card's measured full width, so the map reads the
 * same physical size on a laptop and on a 27" display instead of being a fixed
 * fraction of whatever the viewport happens to be.
 */
export const CARD_START_WIDTH_PX = 300;

/**
 * Bounds on that derived scale. A phone's card is barely wider than 300px, so
 * the raw ratio would be ~0.85 and the growth would not read as growth; the
 * upper bound forces a visible change there. The lower bound stops the card
 * from becoming a postage stamp on very wide displays.
 */
export const CARD_START_SCALE_RANGE: ProgressRange = [0.22, 0.5];

/**
 * Where the small card sits before the section takes over, as a share of its
 * own full height, measured up from the centred position.
 *
 * Expressed as a percentage of the element rather than in viewport units
 * because Framer applies `y` before `scale`: a percentage tracks the card's own
 * (unscaled) box, so the resting position holds its relationship to the hero
 * across viewport heights instead of drifting.
 */
export const CARD_START_Y_PCT = -58;


/**
 * Calibration for the frame-120 -> Leaflet hand-off.
 *
 * Stored as a geographic SPAN rather than a zoom level on purpose: the card is
 * responsive, so the zoom that matches the render differs per breakpoint.
 * `computeZoomForCard` derives the zoom from this span and the card's size, so
 * the seam lines up at every width instead of just the one it was tuned at.
 *
 * Arrived at with `?mapcal=1&lat=..&lng=..&span=..`, which splits the card down
 * the middle — rendered frame on the left, live map on the right — and compares
 * them across a hard seam.
 *
 * These will never register exactly, and chasing that is a trap: the render is a
 * stylised camera push over a tilted plane, while Leaflet is orthographic, so
 * the two projections genuinely disagree. What is tuned here is matching
 * *scale and street density* across the cut; the dissolve does the rest, helped
 * by both images being a near-white wash at the moment of the swap.
 */
export const FRAME_CENTER: [number, number] = [6.25, -75.575];
/** Metres covered by the full 800px height of the source frame at frame 120. */
export const FRAME_SPAN_M = 11_000;

export const TILE_URL_BASE =
  "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
export const TILE_URL_LABELS =
  "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png";
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/** The narrative. Part 2 pushes more steps onto this array. */
export const SCENE_STEPS: readonly SceneStep[] = [
  {
    id: "intro",
    range: [0.0, 1.0],
    titleKey: "home.mapIntro.title",
    descKey: "home.mapIntro.description",
  },
] as const;

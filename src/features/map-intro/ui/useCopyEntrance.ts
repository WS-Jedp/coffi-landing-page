"use client";

import type { RefObject } from "react";
import {
  cubicBezier,
  easeIn,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useIsMobile } from "./useIsMobile";

/**
 * How one section's copy arrives, holds and leaves.
 *
 * The copy is ordinary page content — a sibling of the sticky map, in normal
 * flow — and that stays true here. Everything below is ADDED to a block that is
 * already travelling at scroll speed; none of it replaces the scroll as the
 * motor. That is the property that made the section feel like the rest of the
 * site rather than like a slideshow, and it is not negotiable.
 *
 * The scroll target is the copy element itself (~300px tall), NOT the chapter
 * block that contains it (120–200svh). Measuring the crossing of the short
 * element gives an entrance spread over ~500px of scroll; measuring the tall
 * one would dilute the same entrance across three viewports and it would read
 * as nothing happening at all.
 */

/** 0 -> 1 across the copy's whole crossing of the viewport. */
const CROSSING: ["start end", "end start"] = ["start end", "end start"];

/**
 * Where the block sits when the user cannot have motion.
 *
 * Deliberately NOT 1, and this is the sharpest trap in the file. Elsewhere in
 * this feature reduced motion pins progress at 1 because 1 is the finished
 * state — but here 1 is the end of the *crossing*, which is the copy having
 * already left: opacity 0. Pinning at 1 would leave all five sections
 * invisible for anyone with the OS setting on, and nothing would look broken
 * enough to notice. 0.6 sits in the hold: entrance done at 0.50, exit not until
 * 0.78.
 */
const REDUCED_MOTION_AT = 0.6;

/**
 * Staggered entrance. The title leads and the body trails, so the block
 * assembles top-down instead of arriving as one slab.
 *
 * The ranges are long — over half the crossing — and they have to be, because
 * of how the curve below distributes its output. An earlier, shorter set was
 * measured finishing while the copy was still in the bottom fifth of the
 * screen: by the time anyone could comfortably read it, nothing had been moving
 * for hundreds of pixels. Ending near the middle of the crossing means the
 * arrival is still resolving as the block reaches the reading zone.
 */
const ENTER = {
  eyebrow: [0.08, 0.52] as [number, number],
  title: [0.12, 0.58] as [number, number],
  body: [0.18, 0.64] as [number, number],
};

/**
 * The colour sweep outlasts the movement on purpose. Tied to the title's range
 * it finished the moment the headline stopped, and the travelling gradient —
 * the part that is actually meant to be watched — was over before the words
 * were readable.
 */
const SWEEP: [number, number] = [0.12, 0.7];

/** Everything leaves together — a staggered exit reads as the block falling apart. */
const EXIT: [number, number] = [0.8, 0.98];

const ENTER_Y_PX = 56;
const EXIT_Y_PX = -40;
const TITLE_START_SCALE = 0.96;

/**
 * Peak blur on the headline, in px.
 *
 * The one thing in this file that costs a repaint per frame, on a page already
 * scrubbing a canvas and panning Leaflet. Kept on the headline alone and only
 * during the entrance window. If a trace ever shows dropped frames here, this
 * constant going to 0 is the whole fix — nothing else has to be unpicked.
 */
const TITLE_BLUR_PX = 10;

/**
 * Continuous drift, in px, ADDED to the entrance travel.
 *
 * This is what makes the headline and the body move at different speeds. The
 * block's base velocity is the page's; a `y` running linearly from `+A` to `−A`
 * across the crossing adds `2A` of travel on top, which reads as *faster* than
 * the page. Negative `A` runs the other way and reads as slower.
 *
 * The title leads and the body trails, so the gap between them OPENS as the
 * block rises: it enters compact and relaxes while it is being read. The
 * reverse — body chasing the headline — compresses the block exactly as it
 * leaves, which reads as crowding rather than as depth.
 *
 * The antetitle is locked to the title's amplitude on purpose. They are one
 * typographic unit; drifting them apart would read as a layout bug, not as
 * parallax.
 *
 * The amplitudes are small because the number they really move is the
 * headline-to-body gap: 2·(14+10) = 48px end to end, but the extremes only
 * happen where the copy is already at opacity 0. Across the visible window it
 * is ~34px of play over a designed gap of 28–32px — breathing, not breaking.
 * At the midpoint of the crossing, where the block is centred and being read,
 * the drift is exactly 0 and the layout is the one that was designed.
 */
const DRIFT_PX = { title: 14, body: -10 };
/** The same drift against a shorter composition reads much bigger. */
const DRIFT_MOBILE_SCALE = 0.6;

/**
 * Accelerate in, decelerate to the stop — in that order.
 *
 * The obvious pick for a reveal is an ease-OUT like `(0.16, 1, 0.3, 1)`, and it
 * is wrong here: an ease-out starts at maximum velocity, so it only ever brakes.
 * Measured, that curve is 49% complete a tenth of the way through its range and
 * 83% at a quarter — the copy snapped into place and then sat there. This one
 * is 8% / 34% / 63% at a tenth, a quarter and 40%, which is a body that gathers
 * speed and then eases down onto its mark.
 */
const EASE_IN_CURVE = cubicBezier(0.28, 0.11, 0.32, 1);

export type CopyMotion = {
  eyebrow: { y: MotionValue<number>; opacity: MotionValue<number> };
  title: {
    y: MotionValue<number>;
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    filter: MotionValue<string>;
  };
  body: { y: MotionValue<number>; opacity: MotionValue<number> };
  /** The gradient's sweep across the headline. */
  backgroundPosition: MotionValue<string>;
};

export function useCopyEntrance(
  ref: RefObject<HTMLElement | null>,
): CopyMotion {
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: ref, offset: CROSSING });
  const pinned = useMotionValue(REDUCED_MOTION_AT);

  /*
   * Raw drives opacity and the gradient sweep; the spring drives everything
   * geometric.
   *
   * Splitting them is the difference between "floating" and "smeared". A spring
   * on `y` is exactly the wanted effect — the block hangs a moment behind the
   * scroll and settles after the finger lifts, which is where the deceleration
   * comes from. The same spring on opacity leaves the text sitting translucent
   * after it has visibly stopped moving, which just reads as a rendering bug.
   */
  const raw = reduced ? pinned : scrollYProgress;
  const springed = useSpring(raw, {
    stiffness: 110,
    damping: 26,
    mass: 0.55,
    restDelta: 0.0005,
  });
  const smooth = reduced ? pinned : springed;

  const fadeIn = (range: [number, number]) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(raw, range, [0, 1], { clamp: true, ease: EASE_IN_CURVE });
  const fadeOut = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(raw, EXIT, [1, 0], { clamp: true, ease: easeIn });

  /*
   * One element cannot carry two `y` values, so the entrance travel and the
   * drift are summed into a single motion value before they reach the DOM.
   * Both are transforms, so the pair still composites and costs no paint.
   */
  const travel = (range: [number, number], driftPx: number) => {
    const amplitude = reduced
      ? 0
      : driftPx * (isMobile ? DRIFT_MOBILE_SCALE : 1);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const enter = useTransform(smooth, range, [ENTER_Y_PX, 0], {
      clamp: true,
      ease: EASE_IN_CURVE,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const leave = useTransform(smooth, EXIT, [0, EXIT_Y_PX], { clamp: true });
    // Linear and un-sprung: a drift with lag is indistinguishable from jitter,
    // and the point is that it reads as speed, not as elasticity.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const drift = useTransform(raw, [0, 1], [amplitude, -amplitude]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform([enter, leave, drift], (values) => {
      const [e, l, d] = values as number[];
      return e + l + d;
    });
  };

  // Opacity is the product of the two fades rather than one range with four
  // stops: the entrance and the exit are shaped by different curves, and a
  // single transform can only carry one easing between any pair of stops.
  const combineOpacity = (range: [number, number]) => {
    const inOpacity = fadeIn(range);
    const outOpacity = fadeOut();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform([inOpacity, outOpacity], (values) => {
      const [i, o] = values as number[];
      return i * o;
    });
  };

  const eyebrowY = travel(ENTER.eyebrow, DRIFT_PX.title);
  const eyebrowOpacity = combineOpacity(ENTER.eyebrow);

  const titleY = travel(ENTER.title, DRIFT_PX.title);
  const titleOpacity = combineOpacity(ENTER.title);
  const titleScale = useTransform(smooth, ENTER.title, [TITLE_START_SCALE, 1], {
    clamp: true,
    ease: EASE_IN_CURVE,
  });
  const titleBlur = useTransform(
    smooth,
    ENTER.title,
    [reduced ? 0 : TITLE_BLUR_PX, 0],
    { clamp: true, ease: EASE_IN_CURVE },
  );
  const titleFilter = useTransform(titleBlur, (v) =>
    // Below a quarter-pixel the blur is invisible but still forces the layer to
    // be re-rasterised, so it is dropped entirely rather than left at ~0.
    v < 0.25 ? "none" : `blur(${v}px)`,
  );

  const bodyY = travel(ENTER.body, DRIFT_PX.body);
  const bodyOpacity = combineOpacity(ENTER.body);

  /*
   * The gradient sweep, on raw progress so it lands exactly where the entrance
   * ends rather than trailing it.
   *
   * 100% shows the gradient's right half (purple->blue), 0% its left
   * (blue->purple). It therefore arrives reversed, sweeps, and settles on the
   * house order — the colour visibly travelling through the words.
   */
  const backgroundPosition = useTransform(raw, SWEEP, ["100% 50%", "0% 50%"], {
    clamp: true,
    ease: EASE_IN_CURVE,
  });

  return {
    eyebrow: { y: eyebrowY, opacity: eyebrowOpacity },
    title: {
      y: titleY,
      opacity: titleOpacity,
      scale: titleScale,
      filter: titleFilter,
    },
    body: { y: bodyY, opacity: bodyOpacity },
    backgroundPosition,
  };
}

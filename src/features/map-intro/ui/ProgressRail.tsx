"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { segmentRange } from "./segmentRange";

/**
 * How far the user has come, and how much of the section is still ahead.
 *
 * One segment per narrative section, filled by scroll. It replaced a rail of
 * four dots with a travelling pill, and both halves of that change were
 * failures of the old one rather than preferences:
 *
 * Four dots say WHERE you are and nothing about what is left, which is the one
 * thing a section this long has to keep promising. Empty track ahead of a
 * filling segment says it without a word.
 *
 * The pill travelled on `layoutId`, over an element that also carried Tailwind's
 * `-translate-y-1/2`. Motion writes `transform` on that element to project the
 * layout animation, so the class and the animation fought for the same property
 * every time the step changed — the visible jump between sections. There is no
 * travelling element here at all: the fill of one segment completes as the next
 * begins, which is a scroll-driven hand-off with nothing to desynchronise.
 *
 * Vertical against the right edge on BOTH rungs, and deliberately one geometry
 * rather than two. A phone gets the same rail a little closer to the edge; the
 * collision that pinning it right used to cause with the pin count is already
 * designed out on the other side — see the note in FilterChips.
 *
 * Rendered `aria-hidden`, unchanged from the rail before it: it is a decorative
 * echo of information the copy already carries, and announcing a step change on
 * every scroll would be noise.
 */

/** Deliberately small: an ambient marker, not a component competing with the map. */
const SEGMENT_PX = 18;
const THICKNESS = 2;

/*
 * The rail sits over the MAP for three of four sections on desktop (`points`
 * reaches x=100) and wherever a mobile band happens to be tall enough — see
 * MAP_RECTS in narrative/layouts.
 *
 * A capsule behind it was the old answer and it is what made the rail read as a
 * stray chip: `bg-white/45` over a near-white page is not a background, it is a
 * faint rectangle around nothing. A drop-shadow hugs the actual shape instead —
 * the rounded caps and the gaps between segments included — so it disappears
 * over the page and lifts the whole rail over map tiles, with no extra element
 * and no container to look like one. At 2px thick it is doing real work, not
 * polish: without it the track is unreadable over dark tiles.
 */
const HALO = "[filter:drop-shadow(0_0_1.5px_rgba(255,255,255,0.95))]";

const Segment: React.FC<{
  global: MotionValue<number>;
  /** The slice of global progress this segment owns. */
  range: readonly [number, number];
}> = ({ global, range }) => {
  const fill = useTransform(global, [range[0], range[1]], [0, 1], { clamp: true });

  /*
   * The gradient tip, cross-faded out as the segment completes.
   *
   * While a segment is filling its leading edge is lighter, so it reads as
   * something in motion rather than a bar that happens to be short. A finished
   * segment has nothing left to promise, so it goes flat — and by the time the
   * last one does, the whole rail is solid: you have arrived.
   *
   * The gradient scales with the fill rather than staying a fixed length. That
   * is the point of driving it with `scale` and not `height`: it costs no
   * layout, and the tip stays proportional instead of swallowing the segment
   * while it is still short.
   */
  const solidify = useTransform(fill, [0.8, 1], [0, 1], { clamp: true });

  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full bg-coffi-black/12"
      style={{ width: THICKNESS, height: SEGMENT_PX }}
    >
      <motion.span
        style={{ scaleY: fill, originY: 0 }}
        className="absolute inset-0 block rounded-full bg-gradient-to-b from-coffi-purple from-[55%] to-coffi-purple-400"
      />
      <motion.span
        style={{ scaleY: fill, originY: 0, opacity: solidify }}
        className="absolute inset-0 block rounded-full bg-coffi-purple"
      />
    </span>
  );
};

export const ProgressRail: React.FC<{
  /**
   * Where each section takes over, from BOUNDARIES. The rail is derived from
   * the same numbers `useActiveStep` reads, so a segment cannot complete while
   * the copy still belongs to the section before it — see segmentRange.
   */
  activateAt: readonly number[];
  /** Progress across the whole track. */
  global: MotionValue<number>;
  /** Intro-local progress; the rail arrives with the map hand-off. */
  introProgress: MotionValue<number>;
}> = ({ activateAt, global, introProgress }) => {
  // Appears as the intro seam completes and never leaves again.
  const opacity = useTransform(introProgress, [0.92, 1], [0, 1], { clamp: true });

  // The intro owns no segment: the rail only exists once it has handed off.
  const steps = activateAt.length - 1;

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      /*
       * Centred by a full-height flex box rather than by `top-1/2` plus a
       * translate. The old rail centred itself with `-translate-y-1/2`, which
       * put a transform on the same element its `style` prop wrote to — the
       * arrangement that has to be avoided here, and avoiding it in the layout
       * as well as in the fill means it cannot come back by accident.
       */
      className="pointer-events-none absolute inset-y-0 right-3 z-[520] flex items-center md:right-4"
    >
      <div className={`flex flex-col gap-[5px] ${HALO}`}>
        {Array.from({ length: steps }, (_, i) => (
          <Segment
            key={i}
            global={global}
            // i + 1: step indices start at 1, the intro being 0.
            range={segmentRange(activateAt, i + 1)}
          />
        ))}
      </div>
    </motion.div>
  );
};

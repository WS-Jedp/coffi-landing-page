"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

export type ActiveStepOptions = {
  /** Global progress at which each step takes over. Ascending. */
  activateAt: readonly number[];
  /** Dead band below each activation point, index-aligned with activateAt. */
  hysteresis: readonly number[];
};

/**
 * Which narrative section is currently active.
 *
 * This is the piece that turns a continuous scroll position into discrete
 * activations. Everything downstream — camera flights, pin swaps, copy changes —
 * is a time-based animation fired by this index changing, not something scrubbed
 * by scroll. That is what keeps them playing at their designed speed no matter
 * how fast the user scrolls.
 *
 * Two things it deliberately does NOT do:
 *
 * It does not `setState(compute(p))` on every change. Motion emits `change` on
 * every animation frame during a scroll; React would bail out on an identical
 * value, but only after a setState call and a scheduler tick per frame. The ref
 * guard means state is touched once per real transition — four times in the
 * life of the page.
 *
 * It does not treat forward and backward symmetrically. Going forward you cross
 * the activation point; coming back you must fall a full hysteresis band below
 * it. See the note in sections.ts for why that band exists.
 */
export function useActiveStep(
  progress: MotionValue<number>,
  { activateAt, hysteresis }: ActiveStepOptions,
): number {
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  const resolve = useCallback(
    (p: number) => {
      let next = stepRef.current;
      while (next + 1 < activateAt.length && p >= activateAt[next + 1]) next++;
      while (next > 0 && p < activateAt[next] - hysteresis[next]) next--;
      if (next !== stepRef.current) {
        stepRef.current = next;
        setStep(next);
      }
    },
    [activateAt, hysteresis],
  );

  useMotionValueEvent(progress, "change", resolve);

  // Resolve once on mount as well. `change` only fires when the value moves, so
  // a browser-restored scroll position deep in the track — or a reduced-motion
  // build where the value is pinned — would otherwise stay stuck at step 0.
  useEffect(() => {
    resolve(progress.get());
  }, [resolve, progress]);

  return step;
}

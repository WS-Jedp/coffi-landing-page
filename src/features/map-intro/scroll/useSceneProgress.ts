"use client";

import { useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import type { RefObject } from "react";
import type { ChapterSpec } from "../types";

export type SceneProgress = {
  /** 0..1 across the whole track, while the sticky stage is pinned. */
  global: MotionValue<number>;
  /** Per-chapter local progress, 0..1, clamped outside the chapter. */
  chapter: Record<string, MotionValue<number>>;
  prefersReducedMotion: boolean;
};

/**
 * Turns the scroll position over a track element into the progress values the
 * whole section is driven from.
 *
 * The `offset` deliberately opens at `start end` — the moment the track's top
 * crosses the viewport's bottom — rather than at `start start`, the moment the
 * stage pins. Anchoring to the pin looks correct on paper but means progress is
 * frozen at 0 for the entire approach, so the map sits dead still while the user
 * scrolls the hero and only springs to life once the section catches. Opening
 * earlier means the very first scroll moves it.
 *
 * The cost is that the section is already slightly under way at rest: the track
 * usually starts less than a viewport below the fold, so progress is a few
 * percent above 0 before anyone touches the page. That is why the entrance is
 * defined by a start size rather than a start scale — a couple of percent of
 * growth is invisible, a wrong size is not.
 *
 * Progress reaches 1 when the track's bottom meets the viewport's bottom, which
 * is still the moment the stage unpins.
 *
 * IMPORTANT: `chapters` must be a module-level constant. One hook is created per
 * chapter, so a changing array would change the hook count between renders.
 */
export function useSceneProgress(
  trackRef: RefObject<HTMLElement | null>,
  chapters: readonly ChapterSpec[],
): SceneProgress {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress: global } = useScroll({
    target: trackRef,
    offset: ["start end", "end end"],
  });

  const total = chapters.reduce((sum, c) => sum + c.vh, 0);

  const chapter: Record<string, MotionValue<number>> = {};
  let cursor = 0;
  for (const spec of chapters) {
    const start = cursor / total;
    const end = (cursor + spec.vh) / total;
    cursor += spec.vh;
    // Safe despite the loop: `chapters` is a module constant, so the number of
    // useTransform calls is fixed for the lifetime of the component.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    chapter[spec.id] = useTransform(global, [start, end], [0, 1], { clamp: true });
  }

  return { global, chapter, prefersReducedMotion };
}

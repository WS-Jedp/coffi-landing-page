"use client";

import { useTransform, type MotionValue } from "motion/react";
import { useIsMobile } from "./useIsMobile";
import {
  LAYOUT_INDEX,
  LAYOUT_ORDER,
  LAYOUT_STOPS,
  MAP_RECTS,
  MAP_RECTS_MOBILE,
  type Rect,
} from "../narrative/layouts";

export type RectMotion = {
  left: MotionValue<string>;
  top: MotionValue<string>;
  width: MotionValue<string>;
  height: MotionValue<string>;
};

/** Percent strings, because the rects are relative to the stage box. */
function useRectMotion(progress: MotionValue<number>, rects: Rect[]): RectMotion {
  const pick = (field: keyof Rect) => LAYOUT_INDEX.map((i) => rects[i][field]);

  const x = useTransform(progress, LAYOUT_STOPS, pick("x"));
  const y = useTransform(progress, LAYOUT_STOPS, pick("y"));
  const w = useTransform(progress, LAYOUT_STOPS, pick("w"));
  const h = useTransform(progress, LAYOUT_STOPS, pick("h"));

  return {
    left: useTransform(x, (v) => `${v}%`),
    top: useTransform(y, (v) => `${v}%`),
    width: useTransform(w, (v) => `${v}%`),
    height: useTransform(h, (v) => `${v}%`),
  };
}

/**
 * The map window's box and the complementary text box, as scroll-driven values.
 *
 * Both are scrubbed rather than animated on activation: the point of the
 * redesign is that the map travels across the background *while you scroll*,
 * so its geometry has to be a function of scroll position, not a spring fired
 * by a state change.
 *
 * The breakpoint comes from `useIsMobile`, which reads it in an effect rather
 * than during render — see the note there for why that is load-bearing.
 */
export function useStageLayout(progress: MotionValue<number>): {
  map: RectMotion;
  isMobile: boolean;
} {
  const isMobile = useIsMobile();

  const mapRects = LAYOUT_ORDER.map((id) => (isMobile ? MAP_RECTS_MOBILE : MAP_RECTS)[id]);

  return { map: useRectMotion(progress, mapRects), isMobile };
}

import type { DrawRect } from "../types";

/**
 * Bounding box of the folded paper inside the source frame at frame 1, as
 * fractions of the frame. Measured off `assets-src/map-intro/frame_0001.webp`.
 *
 * Normalised rather than in pixels on purpose: the two rungs are 1136px and
 * 640px wide, so a pixel box would silently mean different things per rung.
 *
 * This exists so the fit curve can be *proven* not to crop the paper rather
 * than eyeballed. See frameFit.test.ts.
 */
export const PAPER_BBOX = { x0: 0.1056, y0: 0.2125, x1: 0.8979, y1: 0.825 } as const;

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/** Hermite ease. Gentler at both ends than a linear ramp. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge1 === edge0) return x < edge0 ? 0 : 1;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export type FrameFitArgs = {
  /** Global scroll progress, 0..1. */
  progress: number;
  /** Canvas backing-store size, in canvas pixels. */
  canvas: { w: number; h: number };
  /** Source frame size, in source pixels. */
  source: { w: number; h: number };
  /** Progress range over which the fit travels from contain to cover. */
  range: readonly [number, number];
  /**
   * How much to enlarge past `contain` at progress 0. `contain` alone leaves the
   * folded paper tiny inside a portrait card, but any boost starts cropping the
   * source edges — so this is bounded by how much transparent margin the source
   * has around the paper. 1.2 is proven safe against PAPER_BBOX.
   */
  containBoost: number;
};

/**
 * Where to draw the current frame inside the canvas.
 *
 * The fit is a function of progress, not a constant, and that is the whole
 * point. Early frames are a paper cutout floating on transparency: `cover` on a
 * portrait phone canvas would slice both outer panels off and the unfold would
 * read as garbage. Late frames are opaque and edge-to-edge: `contain` would
 * letterbox them and expose the page background around a "full" map.
 *
 * So we start near contain and arrive exactly at cover, crossing over while the
 * map is still growing and nobody can tell.
 */
export function computeFrameFit(args: FrameFitArgs): DrawRect & { fitScale: number } {
  const { progress, canvas, source, range, containBoost } = args;

  const containScale = Math.min(canvas.w / source.w, canvas.h / source.h);
  const coverScale = Math.max(canvas.w / source.w, canvas.h / source.h);

  // Never let the boosted start scale exceed cover: past cover we would be
  // cropping for no reason, and the end state must land on exactly cover.
  const startScale = Math.min(containScale * containBoost, coverScale);

  const t = smoothstep(range[0], range[1], progress);
  const fitScale = startScale + (coverScale - startScale) * t;

  const dw = source.w * fitScale;
  const dh = source.h * fitScale;

  return {
    dx: (canvas.w - dw) / 2,
    dy: (canvas.h - dh) / 2,
    dw,
    dh,
    fitScale,
  };
}

/**
 * True if the paper is fully inside the canvas at this fit. Used by tests and by
 * the calibration overlay; not on the render path.
 */
export function paperIsFullyVisible(
  rect: DrawRect,
  canvas: { w: number; h: number },
): boolean {
  const left = rect.dx + PAPER_BBOX.x0 * rect.dw;
  const right = rect.dx + PAPER_BBOX.x1 * rect.dw;
  const top = rect.dy + PAPER_BBOX.y0 * rect.dh;
  const bottom = rect.dy + PAPER_BBOX.y1 * rect.dh;
  return left >= 0 && top >= 0 && right <= canvas.w && bottom <= canvas.h;
}

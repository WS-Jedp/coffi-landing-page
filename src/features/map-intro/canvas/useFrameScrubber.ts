"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { cancelFrame, frame, motionValue, type MotionValue } from "motion/react";
import {
  FRAME_RUNGS,
  MOBILE_BREAKPOINT,
  RANGES,
  framePath,
  type FrameRung,
} from "../constants";
import { computeFrameFit } from "./frameFit";
import { createFrameLoader, type FrameLoader } from "./frameLoader";

export type ScrubberState = {
  /** True once something has been painted; gates the section's fade-in. */
  firstPaint: boolean;
  loaded: number;
  total: number;
  /** The fit scale currently in use. Feeds the Leaflet zoom calculation. */
  fitScale: MotionValue<number>;
};

/**
 * Paints the frame sequence into a canvas, driven by a scroll progress value.
 *
 * Deliberately holds no React state on the render path: progress changes at
 * scroll frequency, and re-rendering React for each change would be the single
 * biggest source of jank here. Progress -> canvas is a straight imperative path;
 * only coarse facts (first paint, load count) are lifted into React state.
 */
export function useFrameScrubber(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  progress: MotionValue<number>,
  { enabled }: { enabled: boolean },
): ScrubberState {
  const [firstPaint, setFirstPaint] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [rung, setRung] = useState<FrameRung>(FRAME_RUNGS.desktop);
  const [loader, setLoader] = useState<FrameLoader | null>(null);

  const fitScaleRef = useRef<MotionValue<number> | null>(null);
  if (fitScaleRef.current === null) fitScaleRef.current = motionValue(1);
  const fitScale = fitScaleRef.current;

  const paintedRef = useRef(false);

  // Pick the rung from the viewport. In an effect, never during render, so the
  // server and client agree on the first HTML.
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const apply = () => setRung(mq.matches ? FRAME_RUNGS.mobile : FRAME_RUNGS.desktop);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // One loader per rung. Crossing the breakpoint starts a fresh sequence rather
  // than mixing resolutions mid-scrub.
  useEffect(() => {
    if (!enabled) return;
    const next = createFrameLoader({
      count: rung.frameCount,
      srcFor: (i) => framePath(rung, i),
    });
    setLoader(next);
    const unsubscribe = next.subscribe(setLoaded);
    next.start();
    return () => {
      unsubscribe();
      next.stop();
      setLoader(null);
    };
  }, [enabled, rung]);

  // The draw loop. Runs once per (canvas, progress, rung, loader) — notably NOT
  // per loaded frame: newly-arrived frames schedule a redraw through the
  // loader's own subscription instead of tearing this effect down 61 times.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loader) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let queued = false;

    const draw = () => {
      queued = false;

      const p = progress.get();
      const lastIndex = rung.frameCount - 1;
      const index = Math.min(lastIndex, Math.max(0, Math.round(p * lastIndex)));
      const img = loader.nearest(index);
      if (!img) return;

      const size = { w: canvas.width, h: canvas.height };
      const rect = computeFrameFit({
        progress: p,
        canvas: size,
        source: { w: rung.width, h: rung.height },
        range: RANGES.FIT,
        containBoost: rung.containBoost,
      });
      fitScale.set(rect.fitScale);

      // Always clear. Roughly half the sequence is a paper cutout on
      // transparency, and without a clear the previous frame smears through it.
      // Skipping the clear for the opaque half would save ~0.9M pixel writes —
      // negligible, since the backing store is pinned to the source resolution —
      // in exchange for a smearing bug the day the alpha boundary moves.
      ctx.clearRect(0, 0, size.w, size.h);
      ctx.drawImage(img, rect.dx, rect.dy, rect.dw, rect.dh);

      if (!paintedRef.current) {
        paintedRef.current = true;
        setFirstPaint(true);
      }
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      // Ride Framer Motion's frame loop rather than opening a second rAF:
      // two loops means two layout-read points per frame.
      frame.render(draw);
    };

    const unsubscribeProgress = progress.on("change", schedule);
    const unsubscribeLoader = loader.subscribe(schedule);

    // The backing store is pinned to the source resolution, not the card's CSS
    // size times DPR. A 1200px card at DPR2 would mean a 2400x1690 buffer
    // (~16MB written per frame, ~1GB/s at 60Hz) purely to upscale a 1136px
    // source. CSS stretches the element instead; on a stylised, near-white map
    // the softness is invisible, and the crossfade ramps blur to hide the
    // moment real tiles arrive.
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return;
      const w = rung.width;
      const h = Math.max(1, Math.round(w / (box.width / box.height)));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      schedule();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => {
      unsubscribeProgress();
      unsubscribeLoader();
      ro.disconnect();
      cancelFrame(draw);
    };
  }, [canvasRef, progress, rung, loader, fitScale]);

  return { firstPaint, loaded, total: rung.frameCount, fitScale };
}

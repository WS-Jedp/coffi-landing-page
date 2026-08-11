"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { FRAME_RUNGS, RANGES, TILE_ATTRIBUTION, framePath } from "../constants";
import { computeZoomForCard } from "./computeZoomForCard";
import { useLeafletMap } from "./useLeafletMap";
import { useMapCamera } from "./useMapCamera";
import { attachPlaceMarkers } from "./markers";
import { useCalibration } from "../dev/useCalibration";
import "./leafletTheme.css";

/**
 * How washed-out the tiles are while the seam is happening. Tuned to sit close
 * to the render's palette: pale, warm, very low contrast.
 *
 * REST_FILTER is the identity, written out with the *same functions in the same
 * order* rather than as `none`. CSS only interpolates between filter lists that
 * match structurally — `contrast() saturate() sepia() brightness()` to `none`
 * does not animate, it snaps. That failure is invisible in code review and
 * obvious on screen.
 */
const SEAM_FILTER = "contrast(0.42) saturate(0.55) sepia(0.12) brightness(1.05)";
const REST_FILTER = "contrast(1) saturate(1) sepia(0) brightness(1)";

/** Stage two: the map comes alive. Time-based, deliberately — see below. */
const REVEAL_MS = 700;

export const MapStage: React.FC<{
  progress: MotionValue<number>;
  fitScale: MotionValue<number>;
}> = ({ progress, fitScale }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const calibration = useCalibration();

  // Latched: once the user has scrolled deep enough we mount Leaflet and keep
  // it forever. Unmounting on scroll-up would re-fetch every tile on the way
  // back down, and Part 2 lives on the far side of this section.
  // Seeded from the current value, not just from "change": under reduced motion
  // progress is pinned at 1 and never emits, so a change-only latch would leave
  // the map unmounted forever.
  const [mounted, setMounted] = useState(() => progress.get() >= RANGES.MAP_MOUNT);
  useMotionValueEvent(progress, "change", (p) => {
    if (!mounted && p >= RANGES.MAP_MOUNT) setMounted(true);
  });

  // The zoom that lines the live map up with frame 120, derived from the card's
  // current geometry rather than hardcoded — see computeZoomForCard.
  const [zoom, setZoom] = useState(() =>
    computeZoomForCard({
      centerLat: calibration.center[0],
      frameSpanMeters: calibration.spanM,
      sourceHeight: FRAME_RUNGS.desktop.height,
      fitScale: 1,
    }),
  );
  useEffect(() => {
    const update = () =>
      setZoom(
        computeZoomForCard({
          centerLat: calibration.center[0],
          frameSpanMeters: calibration.spanM,
          sourceHeight: FRAME_RUNGS.desktop.height,
          // The hand-off happens at progress 1, where the fit has reached cover.
          fitScale: fitScale.get() || 1,
        }),
      );
    update();
    const unsubscribe = fitScale.on("change", update);
    return () => unsubscribe();
  }, [fitScale, calibration]);

  const { map, L, tilesReady, labelsLayer } = useLeafletMap(mapRef, {
    enabled: mounted,
    center: calibration.center,
    zoom,
  });

  const camera = useMemo(
    () => ({ center: calibration.center, zoom, animate: false }),
    [zoom, calibration],
  );
  useMapCamera(map, camera);

  /*
   * Stage two is driven by time, not by scroll, and that is deliberate. A
   * scroll-bound reveal can be scrubbed backwards into a half-lit state where
   * the labels are 40% faded in and the contrast is halfway — visibly wrong and
   * impossible to defend. Once the user is past the seam, the map is simply a
   * map.
   */
  const [revealed, setRevealed] = useState(false);
  const pastSeam = (p: number) => p >= RANGES.CROSSFADE[1] - 0.005;
  useMotionValueEvent(progress, "change", (p) => {
    if (!revealed && tilesReady && pastSeam(p)) setRevealed(true);
  });
  // Same reason as `mounted`: with a pinned progress the only signal that can
  // arrive late is tilesReady, so the seam has to be checked when it lands too.
  useEffect(() => {
    if (!revealed && tilesReady && pastSeam(progress.get())) setRevealed(true);
  });

  // Labels ride in with stage two. They are absent during the dissolve because
  // street names appearing out of a blank wash is the loudest possible tell.
  useEffect(() => {
    if (revealed) labelsLayer?.setOpacity(1);
  }, [revealed, labelsLayer]);

  // Pins arrive only after stage two, once the map reads as a map. Dropping
  // them during the dissolve would announce the swap.
  useEffect(() => {
    if (!revealed || !map || !L) return;
    let layer: ReturnType<typeof attachPlaceMarkers> | null = null;
    const timer = setTimeout(() => {
      layer = attachPlaceMarkers(L, map);
    }, REVEAL_MS);
    return () => {
      clearTimeout(timer);
      layer?.group.remove();
    };
  }, [revealed, map, L]);

  // Stage one, scroll-bound. The counter-motion is what hides the geometric
  // mismatch: the canvas grows slightly as it leaves while the map settles and
  // sharpens as it arrives, so the eye reads movement rather than a swap.
  const ready = tilesReady;
  const mapOpacity = useTransform(progress, RANGES.CROSSFADE, [0, 1], { clamp: true });
  const mapScale = useTransform(progress, RANGES.CROSSFADE, [0.985, 1], { clamp: true });
  const blurPx = useTransform(progress, RANGES.CROSSFADE, [1.5, 0], { clamp: true });
  const filter = useTransform(blurPx, (b) => `blur(${b.toFixed(2)}px)`);

  return (
    <motion.div
      aria-hidden
      className="map-intro-leaflet pointer-events-none absolute inset-0"
      style={{
        // Held at zero until the tiles are actually in. If the network is slow
        // the section simply rests on frame 120 rather than dissolving into a
        // half-loaded grid.
        opacity: calibration.overlay ? 1 : ready ? mapOpacity : 0,
        scale: mapScale,
        filter,
        // The transition itself lives in leafletTheme.css, on the tile pane's
        // `filter` — transitioning a custom property would be a no-op.
        ["--tile-filter" as string]:
          revealed || calibration.overlay ? REST_FILTER : SEAM_FILTER,
      }}
    >
      {/* Leaflet takes ownership of its container's children, so it gets an
          element of its own rather than sharing one with React-rendered UI. */}
      <div ref={mapRef} className="absolute inset-0 h-full w-full" />

      {calibration.overlay && (
        <>
          {/* Split rather than blended: the frame owns the left half, the live
              map the right. A 50% cross-blend of two near-white maps shows
              nothing, whereas a hard seam makes it obvious whether a road
              continues across it or steps sideways. */}
          <img
            src={framePath(FRAME_RUNGS.desktop, FRAME_RUNGS.desktop.frameCount - 1)}
            alt=""
            className="pointer-events-none absolute inset-0 z-[600] h-full w-full object-cover"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[601] w-px bg-red-500/70" />
        </>
      )}

      <div className="pointer-events-auto absolute bottom-2 right-2 z-[500]">
        <div
          className="map-intro-attribution"
          dangerouslySetInnerHTML={{ __html: TILE_ATTRIBUTION }}
        />
      </div>
    </motion.div>
  );
};

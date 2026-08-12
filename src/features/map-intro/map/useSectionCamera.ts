"use client";

import { useEffect, useRef } from "react";
import type * as LeafletNS from "leaflet";
import type { CameraTarget } from "../types";

export const FLY_SETTLE_MS = 140;
export const FLY_MS = 1250;
export const SNAP_DISTANCE_M = 3500;
export const SNAP_ZOOM_DELTA = 1.5;

const sameTarget = (a: CameraTarget | null, b: CameraTarget | null) =>
  !!a &&
  !!b &&
  a.center[0] === b.center[0] &&
  a.center[1] === b.center[1] &&
  Math.abs(a.zoom - b.zoom) < 1e-6;

export type SectionCameraArgs = {
  /** The intro's calibrated view. Recomputed as the card is resized. */
  introTarget: CameraTarget | null;
  /** The active section's view, or null while the intro still owns the camera. */
  sectionTarget: CameraTarget | null;
  /** Blocks section writes until the canvas has handed off to the live map. */
  handedOff: boolean;
  reduced: boolean;
};

/**
 * The only thing allowed to move the map.
 *
 * Single ownership is not tidiness, it is a bug fix. The intro's target is
 * recomputed whenever the frame scrubber's fit scale changes — which happens on
 * any resize, orientation change, or iOS URL-bar collapse. With two writers, a
 * user rotating their phone during section 3 would have the map silently
 * teleport back to the intro framing, because the intro's writer saw a genuinely
 * new value and had every right to apply it.
 *
 * So the moment a section takes over, this latches and the intro target is never
 * consulted again. The intro's calibration only ever meant anything at the seam.
 *
 * Two more behaviours worth knowing about, both from reading Leaflet's source:
 *
 * `flyTo` calls `_stop()` before starting, so an interrupted flight is not
 * queued — the new one simply departs from wherever the old one had reached.
 * That is the behaviour we want, but `_stop()` does NOT emit `moveend`, so
 * arrival cannot be detected from map events. Hence the timer.
 *
 * `duration` is absolute, not distance-scaled: a 200m hop and a 5km jump both
 * take the same time, and the short one crawls. Long jumps are snapped instead.
 */
export function useSectionCamera(
  map: LeafletNS.Map | null,
  { introTarget, sectionTarget, handedOff, reduced }: SectionCameraArgs,
): void {
  const latchedRef = useRef(false);
  const appliedRef = useRef<CameraTarget | null>(null);

  if (sectionTarget && handedOff) latchedRef.current = true;

  // Intro: instant writes, and only until a section takes the wheel.
  useEffect(() => {
    if (!map || latchedRef.current || !introTarget) return;
    if (sameTarget(appliedRef.current, introTarget)) return;
    appliedRef.current = introTarget;
    map.setView(introTarget.center, introTarget.zoom, { animate: false });
  }, [map, introTarget]);

  // Sections: debounced, and animated unless the jump is too big to be worth it.
  useEffect(() => {
    if (!map || !handedOff || !sectionTarget) return;
    if (sameTarget(appliedRef.current, sectionTarget)) return;

    /*
     * Settle before flying. A user flicking through three sections would
     * otherwise start three flights, each cancelling the last — the map would
     * lurch twice on its way somewhere it was always going to end up. Waiting
     * out the churn means one flight, straight to wherever they landed.
     */
    const timer = setTimeout(() => {
      const from = map.getCenter();
      const far =
        from.distanceTo(sectionTarget.center) > SNAP_DISTANCE_M ||
        Math.abs(map.getZoom() - sectionTarget.zoom) > SNAP_ZOOM_DELTA;

      appliedRef.current = sectionTarget;

      if (reduced || far) {
        map.setView(sectionTarget.center, sectionTarget.zoom, { animate: false });
        return;
      }

      /*
       * A pan, not a flight, whenever the zoom is already right — which is
       * every section-to-section move, since they share one zoom.
       *
       * `flyTo` would be the obvious choice and it is the wrong one here. Its
       * trajectory deliberately zooms out through the middle of the move to
       * cover ground, so it passes through tile levels neither the start nor
       * the end occupies, and Leaflet fetches a whole grid for each. Measured:
       * a flight between two z15.9 targets pulled level 15 as well as 16.
       * A pan holds the zoom flat and touches one level.
       */
      if (Math.abs(map.getZoom() - sectionTarget.zoom) < 0.05) {
        map.panTo(sectionTarget.center, {
          animate: true,
          duration: FLY_MS / 1000,
          easeLinearity: 0.25,
        });
        return;
      }
      map.flyTo(sectionTarget.center, sectionTarget.zoom, { duration: FLY_MS / 1000 });
    }, reduced ? 0 : FLY_SETTLE_MS);

    return () => clearTimeout(timer);
  }, [map, handedOff, sectionTarget, reduced]);

  // A flight left mid-air when the section unmounts would keep writing to a map
  // nobody is looking at.
  useEffect(() => {
    if (!map) return;
    return () => {
      map.stop();
    };
  }, [map]);
}

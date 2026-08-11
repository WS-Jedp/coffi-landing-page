"use client";

import { useEffect, useRef } from "react";
import type * as LeafletNS from "leaflet";
import type { CameraTarget } from "../types";

/**
 * Points the map at a target.
 *
 * Part 1 only ever passes one target, so this looks like overkill — but it is
 * the seam Part 2 needs. Part 2 moves the camera between places as the copy
 * changes; if Part 1 called `setView` inline from the stage component, that
 * would mean rewriting the map layer instead of passing a different target.
 *
 * Skips no-op moves so a re-render during scroll cannot restart an animation.
 */
export function useMapCamera(map: LeafletNS.Map | null, target: CameraTarget | null): void {
  const last = useRef<CameraTarget | null>(null);

  useEffect(() => {
    if (!map || !target) return;

    const prev = last.current;
    const unchanged =
      prev &&
      prev.center[0] === target.center[0] &&
      prev.center[1] === target.center[1] &&
      Math.abs(prev.zoom - target.zoom) < 1e-6;
    if (unchanged) return;

    last.current = target;

    if (target.animate) {
      map.flyTo(target.center, target.zoom, { duration: 1.4 });
    } else {
      map.setView(target.center, target.zoom, { animate: false });
    }
  }, [map, target]);
}

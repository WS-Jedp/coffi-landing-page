"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type * as LeafletNS from "leaflet";
import { TILE_ATTRIBUTION, TILE_URL_BASE, TILE_URL_LABELS } from "../constants";

export type LeafletHandle = {
  map: LeafletNS.Map | null;
  /**
   * The Leaflet module itself. Exposed because it is loaded dynamically here,
   * and callers that build markers need the same instance — the ESM build does
   * not publish a `window.L` to reach for.
   */
  L: typeof LeafletNS | null;
  /** Every tile for the current view has arrived. Gates the cross-fade. */
  tilesReady: boolean;
  /** The labels layer, faded in after the seam. */
  labelsLayer: LeafletNS.TileLayer | null;
};

export type UseLeafletMapOptions = {
  /** Latched by the caller: once true it must never go back to false. */
  enabled: boolean;
  center: [number, number];
  zoom: number;
  /** Never block the hand-off on the network forever. */
  readyTimeoutMs?: number;
};

/**
 * Creates and owns a non-interactive Leaflet map.
 *
 * Plain Leaflet rather than react-leaflet on purpose. Nothing here benefits
 * from React bindings: the map takes no user input, the markers are imperative
 * divIcons, and Part 2 drives the camera with flyTo. react-leaflet would only
 * add an ESM-only dependency, an ssr:false wrapper and context plumbing.
 */
export function useLeafletMap(
  containerRef: RefObject<HTMLDivElement | null>,
  { enabled, center, zoom, readyTimeoutMs = 2500 }: UseLeafletMapOptions,
): LeafletHandle {
  const [map, setMap] = useState<LeafletNS.Map | null>(null);
  const [L, setL] = useState<typeof LeafletNS | null>(null);
  const [tilesReady, setTilesReady] = useState(false);
  const labelsRef = useRef<LeafletNS.TileLayer | null>(null);

  // Only the initial view; afterwards the camera is driven by useMapCamera.
  const initialView = useRef({ center, zoom });

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let instance: LeafletNS.Map | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;
      setL(L);

      instance = L.map(el, {
        center: initialView.current.center,
        zoom: initialView.current.zoom,
        // The map is scenery, not a control. Every input path is off; Part 2
        // moves the camera programmatically.
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
        boxZoom: false,
        zoomControl: false,
        attributionControl: false,
        // Calibration produces a fractional zoom. The default zoomSnap of 1
        // would silently round it and the seam would never line up.
        zoomSnap: 0,
        zoomDelta: 0,
        fadeAnimation: false,
        zoomAnimation: false,
        preferCanvas: true,
      });

      const base = L.tileLayer(TILE_URL_BASE, {
        attribution: TILE_ATTRIBUTION,
        keepBuffer: 4,
        updateWhenIdle: false,
      });

      // Attach before adding: if the tiles are already in the HTTP cache, `load`
      // can fire inside addTo() and a listener registered afterwards misses it.
      base.on("load", () => {
        if (!cancelled) setTilesReady(true);
      });
      base.addTo(instance);

      // Labels ride in after the seam — see the two-stage reveal in MapStage.
      // Text materialising out of a blank wash is the loudest possible tell that
      // a cross-fade just happened, so they cannot be present during it.
      const labels = L.tileLayer(TILE_URL_LABELS, { opacity: 0, keepBuffer: 4 });
      labels.addTo(instance);
      labelsRef.current = labels;

      // A zero-sized container never fires `load`, and the stage can still be
      // laying out when we mount.
      instance.invalidateSize();

      // Never let a network stall strand the section on the last frame.
      timer = setTimeout(() => {
        if (!cancelled) setTilesReady(true);
      }, readyTimeoutMs);

      if (!cancelled) setMap(instance);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      labelsRef.current = null;
      instance?.remove();
      setMap(null);
      setL(null);
      setTilesReady(false);
    };
    // `center`/`zoom` are read once through initialView; re-running on every
    // recalculated zoom would tear the map down mid-scroll.
  }, [enabled, containerRef, readyTimeoutMs]);

  // Keep Leaflet's idea of its size in sync with the responsive card.
  useEffect(() => {
    const el = containerRef.current;
    if (!map || !el) return;
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [map, containerRef]);

  return { map, L, tilesReady, labelsLayer: labelsRef.current };
}

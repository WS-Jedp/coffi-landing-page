"use client";

import { useEffect, useState } from "react";
import { FRAME_CENTER, FRAME_SPAN_M } from "../constants";

export type Calibration = {
  center: [number, number];
  spanM: number;
  /** Show frame 120 over the live map so the two can be lined up. */
  overlay: boolean;
};

const SHIPPED: Calibration = {
  center: FRAME_CENTER,
  spanM: FRAME_SPAN_M,
  overlay: false,
};

/**
 * Calibration values, overridable from the URL in development.
 *
 * Lining the live map up with the rendered frame is a visual judgement that
 * takes many attempts, and an edit-reload cycle for each one is miserable.
 * Driving it from the query string instead means a candidate can be rendered
 * and compared without touching the source:
 *
 *   /es?mapcal=1&lat=6.2518&lng=-75.5636&span=21000
 *
 * Read after mount rather than during render — touching `location` while
 * rendering would desynchronise the server and client HTML.
 *
 * Inert in production: the branch is behind NODE_ENV, so the query string
 * cannot move the map on the live site.
 */
export function useCalibration(): Calibration {
  const [calibration, setCalibration] = useState<Calibration>(SHIPPED);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const q = new URLSearchParams(window.location.search);
    if (!q.get("mapcal")) return;

    const num = (key: string, fallback: number) => {
      const raw = q.get(key);
      if (raw === null) return fallback;
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    setCalibration({
      center: [num("lat", FRAME_CENTER[0]), num("lng", FRAME_CENTER[1])],
      spanM: num("span", FRAME_SPAN_M),
      overlay: q.get("overlay") !== "0",
    });
  }, []);

  return calibration;
}

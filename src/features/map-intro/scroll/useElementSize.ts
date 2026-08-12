"use client";

import { useEffect, useState, type RefObject } from "react";

export type Size = { w: number; h: number };

/**
 * The element's rendered size, remeasured on real layout changes.
 *
 * Used to give the Leaflet container a fixed pixel size taken from the stage
 * box rather than from the card that crops it. The distinction is the whole
 * point of the parallax design: the card's box changes shape constantly as the
 * narrative moves, and resizing Leaflet along with it would mean calling
 * `invalidateSize` on every frame of every morph. The stage box only changes
 * when the viewport genuinely does, which is exactly when a resize is correct.
 */
export function useElementSize(ref: RefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const box = el.getBoundingClientRect();
      const next = { w: Math.round(box.width), h: Math.round(box.height) };
      // Guard the update: this feeds a Leaflet container, and setting an
      // identical size still triggers the downstream resize path.
      setSize((prev) => (prev.w === next.w && prev.h === next.h ? prev : next));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

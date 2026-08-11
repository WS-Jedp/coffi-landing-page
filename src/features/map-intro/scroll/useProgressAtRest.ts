"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * The progress value the section already sits at before the user has scrolled.
 *
 * `useSceneProgress` opens its range a full viewport before the stage pins, so
 * that the first scroll moves the map. But the track normally starts less than a
 * viewport below the fold, which means part of that opening stretch is already
 * behind us at scroll zero — and there is no way to scroll back into it.
 *
 * Left unaccounted for, the entrance would begin partway through: the card would
 * render larger than its specified start size, and by a different amount on
 * every viewport height (a tall window eats more of the range, so the map would
 * be visibly bigger there). Anchoring the entrance to this value instead makes
 * the resting size exact and identical everywhere.
 *
 * Returns 0 when the track starts below the fold, where nothing is lost.
 */
export function useProgressAtRest(trackRef: RefObject<HTMLElement | null>): number {
  const [atRest, setAtRest] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const height = el.offsetHeight;
      if (!height) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const consumed = (window.innerHeight - top) / height;
      // Capped well short of 1: a pathological layout should degrade to "no
      // entrance", never to a range whose start is past its end.
      setAtRest(Math.min(0.4, Math.max(0, consumed)));
    };

    measure();
    // Height, not just width: the amount of range consumed is a function of the
    // viewport height, so a window resized vertically has to re-measure.
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [trackRef]);

  return atRest;
}

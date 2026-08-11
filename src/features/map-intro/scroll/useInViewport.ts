"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element has come within `rootMargin` of the viewport.
 *
 * Latching, not toggling: it never goes back to false. Callers use it to start
 * expensive work (fetching the frame sequence, mounting Leaflet), and undoing
 * that work when the user scrolls away would mean paying for it twice.
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  rootMargin = "0px",
): boolean {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setEntered(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, entered]);

  return entered;
}

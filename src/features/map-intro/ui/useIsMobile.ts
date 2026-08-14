"use client";

import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT } from "../constants";

/**
 * Whether we are on the small rung, read in an effect and never during render.
 *
 * That distinction is the whole reason this exists as a hook. Branching on a
 * client-only media query during render produces a hydration mismatch, and
 * React does not patch mismatched attributes — it keeps the server's value and
 * warns, so the mobile branch would silently never apply. Starting at `false`
 * and correcting in an effect means the server and the first client render
 * agree, and the real value lands a frame later.
 *
 * Extracted from `useStageLayout`, which had it inline, once the copy's
 * entrance needed the same answer. Two copies of a subtle correctness pattern
 * is one copy too many.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return isMobile;
}

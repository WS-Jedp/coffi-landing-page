"use client";

import { useEffect, useState } from "react";

/**
 * Whether the step badge is on, opted into from the URL in development.
 *
 * The badge reports which chapter the scroll has activated — the one thing
 * about this section that cannot be read off the screen, and the first thing
 * wanted back whenever an activation boundary or a chapter's pacing needs
 * tuning. Worth keeping; not worth having on screen during ordinary visual
 * work, which is what it was doing:
 *
 *   /es?mapdebug=1
 *
 * Read after mount rather than during render, for the same reason as in
 * useCalibration: touching `location` while rendering desynchronises the
 * server and client HTML. The badge therefore appears a frame after hydration
 * instead of arriving in the server's markup, which is of no consequence for
 * a debug affordance.
 *
 * Inert in production: the branch is behind NODE_ENV, so the query string
 * cannot bring the badge back on the live site.
 */
export function useDebugBadge(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const q = new URLSearchParams(window.location.search);
    if (q.get("mapdebug")) setEnabled(true);
  }, []);

  return enabled;
}

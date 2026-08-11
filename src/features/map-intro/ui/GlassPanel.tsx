"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * Noise texture, inlined as an SVG data URI exactly as the header does it.
 * Kept at module scope so the string is not rebuilt on every render.
 */
const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='coffiGlassNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23coffiGlassNoise)'/%3E%3C/svg%3E\")";

/**
 * The header's glass surface, reused.
 *
 * `Header` builds this inline: a translucent white fill with a blurred,
 * saturated backdrop, a light border and a violet shadow, over a decorative
 * layer of two slowly drifting radial gradients and a noise texture. Pulling it
 * into a component keeps the two in step — the panel beside the map should not
 * quietly diverge from the bar above it.
 *
 * `intensity` drives the whole treatment from nothing to fully present, so the
 * panel can materialise on scroll rather than being permanently on. That matters
 * here: before the copy moves over the map it sits on the page background, where
 * a glass card would read as a stray box floating in empty space.
 *
 * `isolate` is load-bearing. The noise layer uses `mix-blend-overlay`, and
 * without a new stacking context it blends against whatever is painted behind
 * the panel — the map, the page gradient — instead of against the panel itself.
 */
export const GlassPanel: React.FC<{
  intensity: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
}> = ({ intensity, className = "", children }) => {
  const backgroundColor = useTransform(
    intensity,
    [0, 1],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.55)"],
  );
  const borderColor = useTransform(
    intensity,
    [0, 1],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.5)"],
  );
  const boxShadow = useTransform(
    intensity,
    [0, 1],
    ["0 0 0 0 rgba(83,63,255,0)", "0 18px 46px -18px rgba(83,63,255,0.22)"],
  );
  // Matches the header's `backdrop-blur-xl backdrop-saturate-150`, ramped.
  const backdropFilter = useTransform(
    intensity,
    (v) => `blur(${(v * 24).toFixed(1)}px) saturate(${(100 + v * 50).toFixed(0)}%)`,
  );

  return (
    <motion.div
      style={{ backgroundColor, borderColor, boxShadow, backdropFilter }}
      className={`relative isolate overflow-hidden rounded-2xl border ${className}`}
    >
      <motion.div
        aria-hidden
        style={{ opacity: intensity }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl"
      >
        <motion.div
          className="absolute -inset-16 blur-3xl motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(38% 60% at 22% 30%, rgba(110,144,255,0.4), transparent 72%), radial-gradient(42% 62% at 82% 45%, rgba(83,63,255,0.36), transparent 74%)",
          }}
          animate={{ x: [0, 24, -14, 0], y: [0, -10, 8, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-16 blur-3xl motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(36% 58% at 65% 78%, rgba(148,148,255,0.32), transparent 72%)",
          }}
          animate={{ x: [0, -20, 16, 0], y: [0, 10, -8, 0], scale: [1, 0.94, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{ backgroundImage: NOISE_URL, backgroundSize: "180px 180px" }}
        />
      </motion.div>

      {children}
    </motion.div>
  );
};

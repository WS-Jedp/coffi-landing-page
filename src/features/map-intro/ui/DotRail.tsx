"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * Where the user is in the narrative, and how much is left.
 *
 * Sits against the right edge of the map card on both breakpoints. Rendered
 * `aria-hidden`: it is a decorative echo of information the copy already
 * carries, and announcing "step 2 of 4" on every scroll would be noise.
 *
 * The travelling pill is a `layoutId` rather than four independently animated
 * dots, so the active marker slides between positions instead of one fading out
 * while another fades in.
 */
export const DotRail: React.FC<{
  /** Number of narrative sections, excluding the intro. */
  count: number;
  /** 0 = intro, 1..count = a narrative section. */
  activeStep: number;
  /** Intro-local progress; the rail arrives with the map hand-off. */
  introProgress: MotionValue<number>;
  /** Counter-scale, so the rail keeps its size when the card shrinks. */
  inverseScale?: MotionValue<number>;
}> = ({ count, activeStep, introProgress, inverseScale }) => {
  // Appears as the intro seam completes and never leaves again.
  const opacity = useTransform(introProgress, [0.92, 1], [0, 1], { clamp: true });

  return (
    <motion.div
      aria-hidden
      style={{ opacity, scale: inverseScale, transformOrigin: "100% 50%" }}
      className="pointer-events-none absolute right-3 top-1/2 z-[520] -translate-y-1/2 rounded-full border border-white/50 bg-white/45 px-1.5 py-2 backdrop-blur-md md:right-4"
    >
      {/* The pitch is set by the ACTIVE pill, not the dots. The pill is 16px
          tall and centred on a 6px dot, so it reaches 8px either side; a 14px
          gap gives a 20px pitch and leaves 2px of clearance. At the obvious
          gap-2.5 the pill lands exactly on its neighbours' centres and hides
          them. */}
      <ul className="flex flex-col items-center gap-3.5">
        {Array.from({ length: count }, (_, i) => {
          const step = i + 1;
          const active = activeStep === step;
          return (
            <li key={step} className="relative flex h-1.5 w-1.5 items-center justify-center">
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  active ? "bg-transparent" : "bg-coffi-black/25"
                }`}
              />
              {active && (
                <motion.span
                  layoutId="mapIntroDot"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="absolute left-0 top-1/2 block h-4 w-1.5 -translate-y-1/2 rounded-full bg-coffi-purple"
                />
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { GlassPanel } from "./GlassPanel";
import { RANGES, SCENE_STEPS, type ProgressRange } from "../constants";

/**
 * Typography borrowed from the hero, so the section reads as the same voice
 * continuing rather than a different page.
 *
 * `HeroSearchForm` uses `font-bold text-4xl md:text-6xl leading-[1.05]` on the
 * title and `text-lg font-light text-gray-700` on the subtitle. The weights,
 * leading and colours are copied exactly; only the top size steps down, because
 * the hero's headline spans a 720px centred column while this one has to live
 * in a ~540px panel beside the map, and text-6xl there wraps into a wall.
 *
 * `text-balance` on the title keeps the two lines close in length instead of
 * leaving one orphaned word — the hero gets the same effect from its max-width.
 */
const TITLE_CLASS =
  "text-balance font-bold leading-[1.05] text-coffi-black text-4xl lg:text-5xl";
/**
 * Deliberately carries no font size. Appending `text-base` to a string that
 * already contains `text-lg` does not override it — Tailwind resolves conflicts
 * by the order the utilities appear in the generated stylesheet, not by the
 * order they appear in the className, and `text-lg` is emitted later. Each site
 * picks its own size instead.
 */
const BODY_CLASS = "text-pretty font-light leading-relaxed text-gray-700";

/**
 * How far behind the title the description settles, in progress units, and how
 * far each travels.
 *
 * The offset between the two at any moment is `STAGGER / rangeLength * TRAVEL`,
 * so with COPY_MIGRATE being 0.33 long these give a peak separation of ~8px —
 * enough to read as two elements arriving in sequence while scrubbing slowly,
 * without either appearing to lag behind its own panel.
 */
const COPY_STAGGER = 0.1;
const COPY_TRAVEL = 28;

/** Shifts a progress range later without changing its length. */
const lag = (range: ProgressRange, by: number): ProgressRange => [
  range[0] + by,
  range[1] + by,
];

/**
 * Title and description, migrating from the centre of the stage to their
 * resting place as the map grows underneath them.
 *
 * Two layouts, one source of truth. Desktop settles right-of-centre inside the
 * card; mobile settles into a glass panel pinned to the bottom, because
 * "right-of-centre" does not exist on a 390px phone. Both are driven by the same
 * progress value and both animate transform and opacity only — never layout.
 *
 * The copy itself comes from SCENE_STEPS. Part 1 has a single step, so this
 * renders one block; Part 2 adds steps and this component cross-fades between
 * them without changing shape.
 */
export const SceneCopy: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const t = useTranslations();
  const step = SCENE_STEPS[0];

  // Desktop: drift from centre to the right column, shrinking slightly as the
  // map takes over as the subject.
  //
  // The -50% baseline is part of the motion value rather than a Tailwind
  // `-translate-x-1/2` class on purpose: Framer writes `transform` wholesale, so
  // a utility class translate would be silently overwritten and the copy would
  // start half a block right of where it should.
  const xPct = useTransform(progress, RANGES.COPY_MIGRATE, [-50, -24], { clamp: true });
  const x = useTransform(xPct, (v) => `${v}%`);
  const textScale = useTransform(progress, RANGES.COPY_MIGRATE, [1, 0.86], {
    clamp: true,
  });
  // The glass only materialises once the copy sits over the map; at the start it
  // is over the page background, where a card would read as a stray box.
  const panel = useTransform(progress, RANGES.COPY_MIGRATE, [0, 1], { clamp: true });
  // Mobile's card is glass from the moment it appears — it slides in already
  // over the map, so there is no phase where the surface would look stray.
  const solid = useMotionValue(1);

  /*
   * Title and description settle on their own clocks rather than as one rigid
   * block. The hero does this with `staggerChildren: 0.12` on a time-based
   * entrance; here there is no clock to stagger, so the delay is expressed in
   * progress — the description's range is the title's, shifted later.
   *
   * Only the settle is staggered, not opacity: the copy has to be legible from
   * the resting state, so neither element ever fades from nothing.
   */
  const titleY = useTransform(progress, RANGES.COPY_MIGRATE, [COPY_TRAVEL, 0], {
    clamp: true,
  });
  const descY = useTransform(
    progress,
    lag(RANGES.COPY_MIGRATE, COPY_STAGGER),
    [COPY_TRAVEL, 0],
    { clamp: true },
  );

  // Mobile's stagger hangs off its own range: the glass card does not arrive
  // until COPY_MOBILE_IN, by which point the desktop ranges above have already
  // finished and would have nothing left to stagger.
  const mobileTitleY = useTransform(progress, RANGES.COPY_MOBILE_IN, [COPY_TRAVEL, 0], {
    clamp: true,
  });
  const mobileDescY = useTransform(
    progress,
    lag(RANGES.COPY_MOBILE_IN, COPY_STAGGER),
    [COPY_TRAVEL, 0],
    { clamp: true },
  );

  // Mobile: slides up into a glass card near the end of the growth.
  const mobileY = useTransform(progress, RANGES.COPY_MOBILE_IN, [40, 0], { clamp: true });
  const mobileOpacity = useTransform(progress, RANGES.COPY_MOBILE_IN, [0, 1], {
    clamp: true,
  });
  const mobileStartOpacity = useTransform(
    progress,
    [RANGES.COPY_MOBILE_IN[0] - 0.15, RANGES.COPY_MOBILE_IN[0]],
    [1, 0],
    { clamp: true },
  );

  const title = t(step.titleKey);
  const description = t(step.descKey);

  return (
    <>
      {/* Desktop / tablet */}
      <motion.div
        style={{ x, y: "-50%", scale: textScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[min(34rem,46%)] will-change-transform md:block"
      >
        <GlassPanel intensity={panel} className="px-8 py-9 text-center">
          <motion.h2 style={{ y: titleY }} className={TITLE_CLASS}>
            {title}
          </motion.h2>
          <motion.p style={{ y: descY }} className={`mt-4 text-lg ${BODY_CLASS}`}>
            {description}
          </motion.p>
        </GlassPanel>
      </motion.div>

      {/* Mobile: centred at first, then a glass card at the bottom. */}
      <motion.div
        style={{ opacity: mobileStartOpacity }}
        className="pointer-events-none absolute inset-x-5 top-1/2 -translate-y-1/2 text-center md:hidden"
      >
        {/* Matches the hero's mobile size exactly — this is the one that sits
            directly under it, so any difference reads as a mistake. */}
        <h2 className={TITLE_CLASS}>{title}</h2>
      </motion.div>

      <motion.div
        style={{ y: mobileY, opacity: mobileOpacity }}
        className="pointer-events-none absolute inset-x-3 bottom-3 will-change-transform md:hidden"
      >
        <GlassPanel intensity={solid} className="px-6 py-7 text-center">
          {/* One step down from the shared title size: this panel is only ~360px
              wide, and text-4xl breaks "oficina." onto a line of its own. */}
          <motion.h2
            style={{ y: mobileTitleY }}
            className="text-balance text-3xl font-bold leading-[1.05] text-coffi-black"
          >
            {title}
          </motion.h2>
          <motion.p style={{ y: mobileDescY }} className={`mt-3 text-base ${BODY_CLASS}`}>
            {description}
          </motion.p>
        </GlassPanel>
      </motion.div>
    </>
  );
};

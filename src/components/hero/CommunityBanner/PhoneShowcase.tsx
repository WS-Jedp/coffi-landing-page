"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Single source of truth for the phone's size: 240px wide at xl is the
 * reference the whole ladder below is built from (Tailwind needs literal
 * classNames for its JIT scanner, so the width/height pairs are these ratios
 * pre-multiplied and hand-rounded into the `w-[Npx] h-[Npx]` pairs on the
 * "stage" div further down — to resize, recompute from this table rather
 * than editing those literal classNames independently):
 *
 *   ratio   width   height (width / 0.496, the mockup's real 992:2000 ratio)
 *   base    0.25x   60px    121px
 *   sm      0.31x   75px    151px
 *   md      0.58x   140px   282px
 *   lg      0.79x   190px   383px
 *   xl      1.00x   240px   484px   <- reference
 *
 * Mobile intentionally lags the pure ratio (a literal 0.25x/0.31x scale is
 * as far as the text column can shrink before wrapping an extra line and
 * growing the banner's height) — md/lg/xl follow the reference closely.
 */

type Depth = "front" | "back";

interface FloatingIcon {
  src: string;
  /** Position as % of the phone's own box (not the reserved column) — this
   * scales consistently across breakpoints because the phone's box grows
   * from the same PHONE_SIZE ladder above, so icon placement stays
   * proportionally correct everywhere instead of drifting like it did when
   * offsets were relative to the (independently-sized) reserved column. */
  positionClassName: string;
  sizeClassName: string;
  hover: { x: number; y: number };
  /** "front" = above the phone (z-20), "back" = behind it (z-0) — the phone
   * itself sits at z-10. Flip this per icon to change the depth effect. */
  depth: Depth;
}

const FLOATING_ICONS: FloatingIcon[] = [
  {
    src: "/assets/icons/coffi-book-icon.webp",
    positionClassName: "top-[30%] right-[30%]",
    sizeClassName:
      "w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[72px] lg:h-[72px] xl:w-[99px] xl:h-[99px]",
    hover: { x: -6, y: -5 },
    depth: "front",
  },
  {
    src: "/assets/icons/coffi-camera-icon.webp",
    positionClassName: "top-[42%] -right-[9%]",
    sizeClassName:
      "w-8 h-8 sm:w-10 sm:h-10 md:w-[52px] md:h-[52px] lg:w-[68px] lg:h-[68px] xl:w-[78px] xl:h-[78px]",
    hover: { x: 7, y: -6 },
    depth: "back",
  },
  {
    src: "/assets/icons/coffi-coffe-icon.webp",
    positionClassName: "top-[45%] left-[10%]",
    sizeClassName:
      "w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-[90px] xl:h-[90px]",
    hover: { x: -9, y: 0 },
    depth: "back",
  },
  {
    src: "/assets/icons/coffi-headphones-icon.webp",
    positionClassName: "top-[54%] right-[12%]",
    sizeClassName:
      "w-8 h-8 sm:w-10 sm:h-10 md:w-[52px] md:h-[52px] lg:w-[68px] lg:h-[68px] xl:w-[78px] xl:h-[78px]",
    hover: { x: 9, y: 0 },
    depth: "front",
  },
  {
    src: "/assets/icons/coffi-laptop-icon.webp",
    positionClassName: "bottom-[18%] left-[0%]",
    sizeClassName:
      "w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[72px] lg:h-[72px] xl:w-[90px] xl:h-[90px]",
    hover: { x: -5, y: 6 },
    depth: "front",
  },
  {
    src: "/assets/icons/coffi-coffe-shop-icon.webp",
    positionClassName: "bottom-[10%] right-[18%]",
    sizeClassName:
      "w-8 h-8 sm:w-10 sm:h-10 md:w-[52px] md:h-[52px] lg:w-[68px] lg:h-[68px] xl:w-[90px] xl:h-[90px]",
    hover: { x: 5, y: 6 },
    depth: "back",
  },
];

const depthClass: Record<Depth, string> = {
  front: "z-20",
  back: "z-0",
};

// A single whileInView on the parent, propagated to children via variants —
// not one independent observer per icon. With several tiny, oddly-offset
// elements each running their own IntersectionObserver, most would silently
// never fire (verified); this single-parent-observer pattern is what
// src/containers/Benefits/index.tsx already uses for its own staggered
// entrances, and it's reliable. `amount: 0` (not a `margin` shrink) — this
// element is small and offset far from its own reserved column, so a
// margined viewport check can fail to ever intersect it (verified).
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const phoneVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.3, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

/**
 * Decorative phone mockup with Coffi icons floating around it. Reserves its
 * own column in the banner's flex row (so it never overlaps the text/CTA),
 * then breaks out of that column via absolute positioning so the top of the
 * phone pokes above the banner without changing its height. Renders at
 * every breakpoint (mobile included) — only the sizes scale down, the
 * composition (phone + all 6 icons) is always complete.
 */
export const PhoneShowcase: React.FC = () => {
  return (
    <motion.div
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      variants={containerVariants}
      className="pointer-events-none relative w-[60px] shrink-0 self-stretch sm:w-[75px] md:w-[140px] lg:w-[190px] xl:w-[240px]"
    >
      {/* Stage — sized to exactly match the phone's own box (PHONE_SIZE
          ladder above) and bottom-anchored per breakpoint so the phone pokes
          above the section. Icons below are positioned as % of THIS stage,
          not the reserved column, so their placement around the phone stays
          proportionally correct at every breakpoint. */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[120px] h-[300px] -bottom-[42%]  sm:-bottom-[90%] md:w-[180px] md:h-[300px] md:-bottom-[30%] lg:w-[190px] lg:h-[383px] lg:bottom-[-127px] xl:w-[240px] xl:h-[484px] xl:bottom-[-120px]">
        <motion.div
          variants={phoneVariants}
          className="relative z-10 h-full w-full drop-shadow-2xl"
        >
          <Image
            src="/assets/images/mockups/coffi-phone-home-mockup.webp"
            alt=""
            width={992}
            height={2000}
            className="h-full w-full object-contain"
            sizes="240px"
          />
        </motion.div>

        {/* Floating icons — entrance pop-in only, no idle animation. Each
            icon needs pointer-events-auto explicitly: the wrapper above is
            pointer-events-none (decorative, must never block clicks on the
            CTA/text) and pointer-events is inherited, so without this
            override hover would never fire on the icon. */}
        {FLOATING_ICONS.map((icon) => (
          <motion.div
            key={icon.src}
            variants={iconVariants}
            whileHover={{
              x: icon.hover.x,
              y: icon.hover.y,
              transition: { type: "spring", stiffness: 300, damping: 16 },
            }}
            className={`absolute pointer-events-auto ${depthClass[icon.depth]} ${icon.positionClassName} ${icon.sizeClassName}`}
          >
            <Image
              src={icon.src}
              alt=""
              width={84}
              height={84}
              className="h-full w-full object-contain"
              sizes="84px"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

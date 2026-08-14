"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { CARD_START_SCALE_RANGE, CARD_START_WIDTH_PX, RANGES } from "../constants";

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

/**
 * The frame that the map lives in.
 *
 * It has two jobs, both driven by scroll.
 *
 * The first is the entrance: the card rests small, high in the stage — sitting
 * just under the hero banner, where it is visible before the section ever pins —
 * then travels down to centre while growing to full size. Both halves run over
 * CARD_ENTER and finish early, because the source render starts its own camera
 * push at frame 74 and a container scale still running under it would multiply
 * two zooms on different easing curves and read as rubbery.
 *
 * The second is the chrome — surface, radius, ring, shadow — which is deliberately
 * *not* always on. For the first half of the sequence the frame being drawn is a
 * paper cutout on transparency, and a rounded card with a drop shadow around a
 * transparent rectangle reads as a broken image: a shadowed box with nothing in
 * it, next to the paper's own baked-in shadow.
 *
 * So the card materialises over CARD_CHROME, which begins only once the frame
 * has grown to cover the box completely. Opacity is not enough on its own —
 * the frame goes opaque well before it reaches the edges, and in between a
 * shadowed card would be showing its own surface as bands down either side.
 * See the note on CARD_CHROME for why that boundary is derived from FIT rather
 * than tuned to sit near it.
 */
export const MapCard: React.FC<{
  progress: MotionValue<number>;
  /**
   * The entrance travel, owned by the section rather than computed here because
   * the copy has to ride the exact same value — otherwise the headline sits
   * centred in the full-size stage while the map is still small and high, and
   * the two read as unrelated elements.
   */
  y: MotionValue<string>;
  /** Entrance range, anchored to where the section already sits at rest. */
  enterRange: [number, number];
  /**
   * The window's box within the stage, scroll-driven. During the intro it is
   * the whole stage and therefore inert; from the first section on it is what
   * makes the map travel.
   *
   * It does not collide with `scale`/`y` above even though both are geometry:
   * CARD_ENTER finishes at intro-local 0.6 (global 0.154) and the first morph
   * does not begin until the spaces chapter opens at global 0.256.
   */
  rect: {
    left: MotionValue<string>;
    top: MotionValue<string>;
    width: MotionValue<string>;
    height: MotionValue<string>;
  };
  children: React.ReactNode;
}> = ({ progress, y, enterRange, rect, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [fullWidth, setFullWidth] = useState(0);

  // The card is responsive, so its full width is only knowable at runtime.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFullWidth(el.offsetWidth));
    ro.observe(el);
    setFullWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const startScale = fullWidth
    ? clamp(CARD_START_WIDTH_PX / fullWidth, ...CARD_START_SCALE_RANGE)
    : CARD_START_SCALE_RANGE[0];

  const scale = useTransform(progress, enterRange, [startScale, 1], { clamp: true });

  const chrome = useTransform(progress, RANGES.CARD_CHROME, [0, 1], { clamp: true });
  // Interpolated in the unscaled box, so `scale` shrinks the radius visually
  // along with everything else — no counter-scaling needed.
  const radius = useTransform(useTransform(chrome, [0, 1], [12, 28]), (r) => `${r}px`);
  const boxShadow = useTransform(
    chrome,
    [0, 1],
    ["0 0 0 0 rgba(49,47,61,0)", "0 24px 70px -20px rgba(49,47,61,0.28)"],
  );
  const ring = useTransform(chrome, [0, 1], ["rgba(49,47,61,0)", "rgba(49,47,61,0.10)"]);
  const surface = useTransform(
    chrome,
    [0, 1],
    ["rgba(239,239,249,0)", "rgba(239,239,249,1)"],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        y,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: radius,
        boxShadow,
        backgroundColor: surface,
        borderColor: ring,
      }}
      // `absolute` + a percentage box, not `h-full w-full`: this element is the
      // window that crops the map, and it has to be able to sit anywhere in the
      // stage. `overflow-hidden` is what does the cropping.
      className="absolute overflow-hidden border will-change-transform"
    >
      {children}
    </motion.div>
  );
};

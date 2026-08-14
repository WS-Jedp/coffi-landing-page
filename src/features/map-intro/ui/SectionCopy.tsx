"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  BODY_CLASS,
  EMPHASIS_CLASS,
  EYEBROW_CLASS,
  TITLE_CLASS,
  TITLE_GRADIENT_CLASS,
  TITLE_GRADIENT_STYLE,
} from "./typography";
import { useCopyEntrance } from "./useCopyEntrance";
import { COPY_SCALE, COPY_WIDTH } from "../narrative/layouts";
import type { SectionSpec } from "../narrative/sections";

/**
 * One narrative section's copy.
 *
 * Still a plain block of text in the document flow — its POSITION comes from
 * the page scrolling, exactly as before, and `SceneLayer` explains why that is
 * the whole design. What it gains here is an arrival: a staggered fade-and-rise
 * with an eased curve, and a drift that puts the headline and the body on
 * slightly different speeds. All of it is added on top of the scroll; none of
 * it replaces the scroll as the motor.
 *
 * No surface behind it. The map underneath is a very pale wash — the light
 * Carto basemap with labels at low contrast — so the copy reads straight over
 * it, and a card would put a hard edge between the words and the thing they
 * describe.
 *
 * The three planes are wrapped separately rather than styled on one element on
 * purpose:
 *
 * - `filter` sits on a wrapper AROUND the headline, never on the `<h2>` itself.
 *   Combining `filter` with `background-clip: text` on one element has a
 *   history of breaking in Safari, and the failure mode is invisible text —
 *   the `<h2>`'s own colour is `transparent`, so if the background drops the
 *   headline simply is not there.
 * - Nothing that creates a stacking context (`filter`, `opacity`) may move up
 *   to the chapter block. That block carries COPY_DEPTH, and its z-index is
 *   what gets compared against the map's `z-10`; a stacking context there would
 *   trap the comparison and every section would pass in front.
 */
export const SectionCopy: React.FC<{ section: SectionSpec }> = ({ section }) => {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement | null>(null);
  const copy = useCopyEntrance(ref);
  const scale = COPY_SCALE[section.id];

  return (
    // The scroll target is this element, not the chapter block that holds it.
    // See useCopyEntrance for why the short box is the right frame of reference.
    <div ref={ref} className={`map-intro-copy ${COPY_WIDTH[section.id]}`}>
      <motion.p style={copy.eyebrow} className={EYEBROW_CLASS}>
        {t(section.eyebrowKey)}
      </motion.p>

      <motion.div style={{ ...copy.title, transformOrigin: "0% 100%" }}>
        <motion.h2
          style={{
            ...TITLE_GRADIENT_STYLE,
            backgroundPosition: copy.backgroundPosition,
          }}
          className={`${TITLE_CLASS[scale]} ${TITLE_GRADIENT_CLASS}`}
        >
          {t(section.titleKey)}
        </motion.h2>
      </motion.div>

      <motion.p style={copy.body} className={BODY_CLASS[scale]}>
        {t.rich(section.descKey, {
          b: (chunks) => <strong className={EMPHASIS_CLASS}>{chunks}</strong>,
        })}
      </motion.p>
    </div>
  );
};

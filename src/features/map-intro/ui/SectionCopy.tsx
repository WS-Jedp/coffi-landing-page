"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  BODY_CLASS,
  EMPHASIS_CLASS,
  EYEBROW_CHIP_CLASS,
  EYEBROW_DOT_CLASS,
  EYEBROW_WRAP_CLASS,
  TITLE_CLASS,
  TITLE_GRADIENT_CLASS,
  TITLE_GRADIENT_STYLE,
} from "./typography";
import { useCopyEntrance } from "./useCopyEntrance";
import { FilterChips, type ChipOption } from "./FilterChips";
import { SectionCta } from "./SectionCta";
import { COPY_SCALE, COPY_WIDTH } from "../narrative/layouts";
import { INTENT_IDS, intentLabelKey, type IntentId } from "../narrative/intents";
import {
  CREATOR_ROLES,
  roleLabelKey,
  type CreatorRole,
} from "../narrative/creators";
import type { SectionSpec } from "../narrative/sections";
import type { SectionFilters } from "./useSectionFilters";

const INTENT_OPTIONS: readonly ChipOption[] = INTENT_IDS.map((id) => ({
  id,
  labelKey: intentLabelKey(id),
}));

const ROLE_OPTIONS: readonly ChipOption[] = CREATOR_ROLES.map((id) => ({
  id,
  labelKey: roleLabelKey(id),
}));

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
export const SectionCopy: React.FC<{
  section: SectionSpec;
  filters: SectionFilters;
}> = ({ section, filters }) => {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement | null>(null);
  const copy = useCopyEntrance(ref);
  const scale = COPY_SCALE[section.id];

  /*
   * Circles splits into two columns from `md` up, and only Circles.
   *
   * It is the one section with five blocks — antetitle, headline, two
   * paragraphs, a CTA and a closing line — and stacked they run 582px against
   * the 441px the bottom map band leaves above it. The band sliced through the
   * second paragraph and the CTA never appeared at all.
   *
   * Only the CONTENT splits. The map window stays the full-width band it always
   * was: the two columns are the headline against everything that follows it, so
   * the block ends up about half as tall while the composition underneath is
   * untouched.
   */
  const twoColumn = section.id === "circles";

  const head = (
    <>
      <motion.p style={copy.eyebrow} className={EYEBROW_WRAP_CLASS}>
        <span className={EYEBROW_CHIP_CLASS}>
          <span aria-hidden className={EYEBROW_DOT_CLASS} />
          {t(section.eyebrowKey)}
        </span>
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
    </>
  );

  const body = (
    <>
      <motion.p
        style={copy.body}
        // In two columns the paragraph starts a new column rather than following
        // the headline, so the gap that separates them vertically has to go.
        className={`${BODY_CLASS[scale]}${twoColumn ? " md:!mt-0" : ""}`}
      >
        {t.rich(section.descKey, {
          b: (chunks) => <strong className={EMPHASIS_CLASS}>{chunks}</strong>,
        })}
      </motion.p>

      {/*
        The interactive tail. Wrapped in its own plane so it arrives after the
        paragraph rather than with it — the block should still assemble
        top-down once there is a fourth thing in it.
      */}
      {section.id === "spaces" && (
        <motion.div style={copy.extras}>
          <FilterChips
            labelKey="home.mapIntro.spaces.chipsLabel"
            options={INTENT_OPTIONS}
            selected={filters.intent}
            onSelect={(id) => filters.setIntent(id as IntentId | null)}
          />
        </motion.div>
      )}

      {section.id === "connect" && (
        <motion.div style={copy.extras}>
          <FilterChips
            labelKey="home.mapIntro.connect.chipsLabel"
            options={ROLE_OPTIONS}
            selected={filters.role}
            onSelect={(id) => filters.setRole(id as CreatorRole | null)}
          />
        </motion.div>
      )}

      {section.id === "circles" && (
        <motion.div style={copy.extras}>
          <p className={`${BODY_CLASS[scale]} !mt-4 md:!mt-6`}>
            {t("home.mapIntro.circles.description2")}
          </p>
          <SectionCta intent={filters.intent} />
        </motion.div>
      )}
    </>
  );

  return (
    // The scroll target is this element, not the chapter block that holds it.
    // See useCopyEntrance for why the short box is the right frame of reference.
    <div ref={ref} className={`map-intro-copy ${COPY_WIDTH[section.id]}`}>
      {twoColumn ? (
        // `items-start` so the two columns share a top edge rather than being
        // centred against each other — the headline is much shorter than the
        // stack beside it, and centring would float it in the middle of nothing.
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-12">
          <div>{head}</div>
          <div>{body}</div>
        </div>
      ) : (
        <>
          {head}
          {body}
        </>
      )}
    </div>
  );
};

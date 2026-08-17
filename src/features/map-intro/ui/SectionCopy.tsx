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
import { INTENT_VISUAL, ROLE_VISUAL } from "./chipVocabulary";
import { SectionClosing, SectionCta } from "./SectionCta";
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
  /** Pins the map is showing for THIS section, or null when it is not ours. */
  count: number | null;
}> = ({ section, filters, count }) => {
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
   * was.
   *
   * The split is NOT "headline | everything else". That was the first version
   * and it left a two-line headline sitting beside a 360px stack, so the left
   * column was mostly empty air. The CTA goes with the headline instead:
   *
   *   left   antetitle -> headline -> button      a poster, ending on the action
   *   right  paragraph -> paragraph -> sign-off   the text, ending on the tagline
   *
   * Measured, that is 278px against 274px — two columns of the same weight
   * instead of one carrying the section.
   */
  const twoColumn = section.id === "circles";

  /*
   * The phone order, and the reason the two columns are wrapped in `contents`
   * below.
   *
   * The desktop reading order is not the phone's: the button belongs under the
   * headline in the left column, but under the second PARAGRAPH once everything
   * is one flow — it is the closing action, and jumping straight from the
   * headline to a button would skip the pitch. DOM order can only encode one of
   * the two.
   *
   * So the phone gets a flex column with `order`, which needs all six blocks to
   * be siblings — hence `contents` on the wrappers, which dissolves them at that
   * breakpoint. From `md` the wrappers become real columns again and `order` is
   * inert, because these are no longer flex items.
   *
   * Written out rather than generated: Tailwind scans for literal class names,
   * and an `order-${n}` would be purged from the stylesheet.
   */
  const ORDER = twoColumn
    ? {
        eyebrow: "order-1",
        title: "order-2",
        lead: "order-3",
        detail: "order-4",
        cta: "order-5",
        closing: "order-6",
      }
    : { eyebrow: "", title: "", lead: "", detail: "", cta: "", closing: "" };

  const eyebrow = (
    <motion.p
      style={copy.eyebrow}
      className={`${EYEBROW_WRAP_CLASS} ${ORDER.eyebrow}`}
    >
      <span className={EYEBROW_CHIP_CLASS}>
        <span aria-hidden className={EYEBROW_DOT_CLASS} />
        {t(section.eyebrowKey)}
      </span>
    </motion.p>
  );

  const title = (
    <motion.div
      style={{ ...copy.title, transformOrigin: "0% 100%" }}
      className={ORDER.title}
    >
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
  );

  const lead = (
    <motion.p
      style={copy.body}
      // In two columns the paragraph starts a new column rather than following
      // the headline, so the gap that separates them vertically has to go.
      className={`${BODY_CLASS[scale]} ${twoColumn ? "md:!mt-0" : ""} ${ORDER.lead}`}
    >
      {t.rich(section.descKey, {
        b: (chunks) => <strong className={EMPHASIS_CLASS}>{chunks}</strong>,
      })}
    </motion.p>
  );

  /*
    The tail below the paragraph, each piece in its own plane so it arrives
    after the paragraph rather than with it — the block should still assemble
    top-down once there is a fourth thing in it.
  */
  const tail = (
    <>
      {section.id === "spaces" && (
        <motion.div style={copy.extras}>
          <FilterChips
            labelKey="home.mapIntro.spaces.chipsLabel"
            options={INTENT_OPTIONS}
            selected={filters.intent}
            onSelect={(id) => filters.setIntent(id as IntentId | null)}
            visuals={INTENT_VISUAL}
            count={count}
            countKey="home.mapIntro.spaces.count"
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
            visuals={ROLE_VISUAL}
            count={count}
            countKey="home.mapIntro.connect.count"
          />
        </motion.div>
      )}
    </>
  );

  if (!twoColumn) {
    return (
      // The scroll target is this element, not the chapter block that holds it.
      // See useCopyEntrance for why the short box is the right frame of
      // reference.
      <div ref={ref} className={`map-intro-copy ${COPY_WIDTH[section.id]}`}>
        {eyebrow}
        {title}
        {lead}
        {tail}
      </div>
    );
  }

  const detail = (
    <motion.p
      style={copy.extras}
      className={`${BODY_CLASS[scale]} !mt-4 md:!mt-6 ${ORDER.detail}`}
    >
      {t("home.mapIntro.circles.description2")}
    </motion.p>
  );

  return (
    <div ref={ref} className={`map-intro-copy ${COPY_WIDTH[section.id]}`}>
      {/* `items-start` so the columns share a top edge: they are close in
          height but not identical, and centring would leave the antetitle
          floating below the first line of the paragraph beside it. */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:items-start md:gap-x-12 lg:gap-x-16">
        <div className="contents md:block">
          {eyebrow}
          {title}
          <motion.div style={copy.extras} className={ORDER.cta}>
            <SectionCta intent={filters.intent} />
          </motion.div>
        </div>
        <div className="contents md:block">
          {lead}
          {detail}
          <motion.div style={copy.extras} className={ORDER.closing}>
            <SectionClosing />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

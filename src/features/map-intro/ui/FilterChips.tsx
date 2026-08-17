"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  CHIP_ACTIVE_CLASS,
  CHIP_COUNT_CLASS,
  CHIP_ICON_CLASS,
  CHIP_IDLE_CLASS,
  CHIP_LABEL_CLASS,
  EYEBROW_DOT_CLASS,
} from "./typography";
import type { ChipVisual } from "./chipVocabulary";

export type ChipOption = { id: string; labelKey: string };

/**
 * Alpha suffixes, appended to the accent's hex.
 *
 * Eight-digit hex rather than `color-mix()` or an rgba conversion: it is one
 * string concatenation, it cannot be purged the way a Tailwind arbitrary value
 * can, and it needs no colour-space reasoning to read six months from now.
 */
const A = {
  border: "59", // 35% — visible as a rim on white without becoming a colour block
  shadow: "26", // 15%
  disc: "24", // 14% — the icon's disc while resting
  discOn: "73", // 45% white, a light lozenge once the chip itself is the colour
} as const;

/**
 * A single-select row of filter chips.
 *
 * Single-select with de-selection rather than multi-select, because picking a
 * chip also flies the camera somewhere: two intents selected at once would have
 * no defensible answer for where the map should look. Clicking the active chip
 * clears it, which is what returns the map to the section's default view.
 *
 * Real `<button>`s, not styled divs. These sit inside the map section, whose
 * Leaflet container is `aria-hidden` scenery — so the keyboard and screen-reader
 * story for the whole section rests here. `aria-pressed` is the right role for a
 * toggle that stays on screen, and `Tab`/`Enter`/`Space` come free from using the
 * element that was built for this.
 *
 * The icon and the accent come from the caller rather than being looked up here,
 * so this component stays the same for intents and for roles — two rows that
 * mean very different things and have to look like one family.
 */
export const FilterChips: React.FC<{
  labelKey: string;
  options: readonly ChipOption[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  /** Icon and accent per option id — see chipVocabulary. */
  visuals: Record<string, ChipVisual>;
  /**
   * How many pins the map is showing for THIS section, or null when the number
   * is not ours to report — during the intro, or while the layer still holds
   * another section's species. Never a stale count and never a guessed one.
   */
  count: number | null;
  countKey: string;
}> = ({
  labelKey,
  options,
  selected,
  onSelect,
  visuals,
  count,
  countKey,
}) => {
  const t = useTranslations();
  const reduced = useReducedMotion() ?? false;

  // One key for both halves of the count line, so the dot's beat and the text's
  // swap are the same event rather than two things that happen to coincide.
  const beat = `${selected ?? "all"}:${count}`;

  return (
    <div className="mt-5 md:mt-7">
      {/*
        Both on one line, both anchored LEFT — not pushed to opposite ends.

        `justify-between` was the obvious arrangement and it put the count under
        the DotRail: the rail is pinned to the right edge of the same 1200px grid
        the copy uses, so anything flush right eventually crosses it. Measured, a
        20x16px overlap on a phone, and on desktop section 1's count spans the
        rail's column and would have collided on the way past. Keeping the pair
        left means the collision cannot happen at any scroll position or width.

        `flex-wrap` so a long locale drops the count to its own line instead of
        overflowing — 16px is a cheap worst case next to a broken row.
      */}
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:mb-3">
        <p className={CHIP_LABEL_CLASS}>{t(labelKey)}</p>

        {/*
          The proof that the chip did something. `aria-live` so a screen reader
          hears the result of pressing one — the map itself is scenery, so this
          sentence is the only feedback that reaches assistive tech.
        */}
        {count !== null && (
          <p aria-live="polite" className={CHIP_COUNT_CLASS}>
            {/*
              The dot beats once on every change, which is what makes the line
              read as live rather than as a static caption.
            */}
            <motion.span
              key={`dot-${beat}`}
              aria-hidden
              className={EYEBROW_DOT_CLASS}
              initial={reduced ? false : { scale: 1 }}
              animate={reduced ? {} : { scale: [1, 1.6, 1] }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            />

            {/*
              Keyed on the SELECTION as well as the number, so pressing a chip
              always shows the line respond. Keyed on the count alone it would
              sit dead whenever two filters happen to return the same total —
              which is most of the time on a phone, where three of the four role
              chips resolve to one pin each.

              `mode="wait"` so the outgoing text leaves before the incoming
              arrives: they are inline, and overlapping them would print the two
              numbers side by side for a moment.
            */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={beat}
                className="inline-block"
                initial={{ opacity: 0, y: reduced ? 0 : 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -7 }}
                transition={{ duration: 0.16, ease: [0.28, 0.11, 0.32, 1] }}
              >
                {t(countKey, { n: count })}
              </motion.span>
            </AnimatePresence>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected === option.id;
          const { Icon, tint, ink, deep } = visuals[option.id];

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              // Toggling off is the only way back to the unfiltered view, so the
              // active chip has to stay clickable rather than being disabled.
              onClick={() => onSelect(active ? null : option.id)}
              className={active ? CHIP_ACTIVE_CLASS : CHIP_IDLE_CLASS}
              style={
                active
                  ? {
                      backgroundColor: tint,
                      borderColor: tint,
                      color: deep,
                      boxShadow: `0 6px 16px -6px ${tint}`,
                    }
                  : {
                      borderColor: `${tint}${A.border}`,
                      boxShadow: `0 1px 2px ${tint}${A.shadow}`,
                    }
              }
            >
              <span
                aria-hidden
                className={CHIP_ICON_CLASS}
                // Selected, the glyph joins the label at the deep step so the
                // whole chip speaks in one voice; resting, it keeps the vivid
                // mid-tone that makes the row scannable.
                style={
                  active
                    ? { backgroundColor: `#FFFFFF${A.discOn}`, color: deep }
                    : { backgroundColor: `${tint}${A.disc}`, color: ink }
                }
              >
                <Icon size={15} />
              </span>
              {t(option.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

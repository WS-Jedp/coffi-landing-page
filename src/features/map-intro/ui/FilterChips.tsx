"use client";

import { useTranslations } from "next-intl";
import {
  CHIP_ACTIVE_CLASS,
  CHIP_IDLE_CLASS,
  CHIP_LABEL_CLASS,
} from "./typography";

export type ChipOption = { id: string; labelKey: string };

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
 */
export const FilterChips: React.FC<{
  labelKey: string;
  options: readonly ChipOption[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}> = ({ labelKey, options, selected, onSelect }) => {
  const t = useTranslations();

  return (
    <div className="mt-5 md:mt-7">
      <p className={CHIP_LABEL_CLASS}>{t(labelKey)}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              // Toggling off is the only way back to the unfiltered view, so the
              // active chip has to stay clickable rather than being disabled.
              onClick={() => onSelect(active ? null : option.id)}
              className={active ? CHIP_ACTIVE_CLASS : CHIP_IDLE_CLASS}
            >
              {t(option.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

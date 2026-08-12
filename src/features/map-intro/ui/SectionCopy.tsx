"use client";

import { useTranslations } from "next-intl";
import { BODY_CLASS, SECTION_TITLE_CLASS } from "./typography";
import { COPY_WIDTH } from "../narrative/layouts";
import type { SectionSpec } from "../narrative/sections";

/**
 * One narrative section's copy.
 *
 * Deliberately inert: no motion values, no panel, no positioning of its own.
 * It is a plain block of text living in the document flow, and everything that
 * used to be animated here now happens because the page is scrolling. See
 * `SceneLayer` for why that is the whole point.
 *
 * No surface behind it either. The map underneath is a very pale wash — the
 * light Carto basemap with the labels layer at low contrast — so ink-coloured
 * text reads cleanly straight over it, and a card would put a hard edge between
 * the copy and the map it is describing.
 */
export const SectionCopy: React.FC<{ section: SectionSpec }> = ({ section }) => {
  const t = useTranslations();

  return (
    <div className={COPY_WIDTH[section.id]}>
      <h2 className={SECTION_TITLE_CLASS}>{t(section.titleKey)}</h2>
      <p className={`mt-5 text-lg md:text-xl ${BODY_CLASS}`}>{t(section.descKey)}</p>
    </div>
  );
};

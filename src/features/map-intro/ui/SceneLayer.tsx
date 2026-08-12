"use client";

import { CHAPTERS } from "../constants";
import { SECTIONS } from "../narrative/sections";
import { COPY_ALIGN, COPY_DEPTH } from "../narrative/layouts";
import { SectionCopy } from "./SectionCopy";

/**
 * The narrative copy, as ordinary page content scrolling over the map.
 *
 * This layer is a sibling of the sticky map, not a child of it, and that is the
 * entire design. The map is pinned; this is a normal-flow column the height of
 * the whole track that scrolls past at scroll speed. The copy rising from
 * below, passing the map and leaving over the top is not an animation imitating
 * scrolling — it *is* the page scrolling, which is why it feels like the rest of
 * the site rather than like a slideshow.
 *
 * Whether a given section passes in front of the map or behind it is decided by
 * COPY_DEPTH, per breakpoint.
 *
 * Each block is exactly as tall as its chapter, so the copy's arrival stays in
 * step with the map's shape change and with the camera. The intro's share is an
 * empty spacer — its copy belongs to the map composition and lives in the
 * sticky layer.
 *
 * Only the horizontal side is set per section. Vertical placement would be
 * meaningless here: a block's vertical alignment decides *when* the copy crosses
 * the viewport, not where it sits on screen, because it is always moving.
 */
export const SceneLayer: React.FC = () => (
  /*
   * Lifted half a viewport, and the number is not a nudge — it is derived.
   *
   * `useSceneProgress` opens its range at `start end`, a full viewport before
   * the stage pins, so the scroll position at a chapter's midpoint is
   * `chapterCentre − 100svh` measured from the track's top. For this column's
   * matching block to be centred on screen at that moment it has to sit at
   * `chapterCentre − 50svh`. Without the shift every headline arrives centred
   * just as its chapter ends and the map has already begun changing shape for
   * the next one.
   */
  <div
    aria-live="polite"
    style={{ top: "-50svh" }}
    // No z-index here on purpose: it would create a stacking context and trap
    // the blocks inside it, so they could never sit in front of or behind the
    // map. Depth is decided per block — see COPY_DEPTH.
    className="pointer-events-none absolute inset-x-0"
  >
    {/* The intro owns this stretch; its copy is part of the map composition. */}
    <div style={{ height: `${CHAPTERS[0].vh}svh` }} />

    {SECTIONS.slice(1).map((section, i) => (
      <div
        key={section.id}
        style={{ height: `${CHAPTERS[i + 1].vh}svh` }}
        className={`relative flex items-center px-4 md:px-6 ${COPY_DEPTH[section.id]}`}
      >
        {/* Same 1200px grid the map stage uses, so the copy lines up with the
            map's edges instead of running out to the viewport. */}
        <div
          className={`mx-auto flex w-full max-w-[1200px] ${COPY_ALIGN[section.id]}`}
        >
          <SectionCopy section={section} />
        </div>
      </div>
    ))}
  </div>
);

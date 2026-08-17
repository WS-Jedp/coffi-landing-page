import { CHAPTERS, chaptersFor } from "../constants";
import type { ChapterSpec } from "../types";
import type { CopyScale } from "../ui/typography";
import type { SectionId } from "./sections";

/** A box inside the stage, in percent of the stage box. */
export type Rect = { x: number; y: number; w: number; h: number };

/**
 * Where the map's visible window sits in each section.
 *
 * The map is a background element: its container never changes size, so these
 * describe the *window that crops it*, not the map itself. A narrower window
 * shows less city at the same scale — the zoom is constant across every
 * section, so streets never change size and no new tile level is ever fetched.
 *
 * The sequence alternates deliberately, so the map appears to travel across the
 * page as the narrative advances: full, left, top, right, bottom.
 */
export const MAP_RECTS: Record<SectionId, Rect> = {
  intro: { x: 0, y: 0, w: 100, h: 100 },
  spaces: { x: 0, y: 6, w: 48, h: 88 },
  connect: { x: 0, y: 0, w: 100, h: 44 },
  points: { x: 52, y: 6, w: 48, h: 88 },
  circles: { x: 0, y: 56, w: 100, h: 44 },
};

/**
 * Mobile alternates top/bottom instead of left/right: a 48%-wide column is
 * unreadable at 390px, and the map would be a sliver.
 *
 * The heights are PER SECTION rather than one number, because the copy blocks
 * are nowhere near the same size. Measured on a 390px phone: Points needs 278px
 * of clear space, Connect 492, Circles 597. A single band height either buries
 * the long ones or wastes the map on the short ones — with every section at 46%
 * the Connect headline was being sliced by the map exactly while it was being
 * read.
 *
 * So each section keeps as much map as its own text can spare. These pair with
 * `items-start` on the sticky wrapper: centred, a shorter band frees nothing.
 *
 * They are a BALANCE, not a pure derivation from the copy. A first pass sized
 * them from the text alone and pushed Circles to 28%, which left a 149px band
 * that could only hold one pin — and "at least two circles visible" was the
 * other half of the same request. Where the two pull against each other the
 * pins win, because the copy on mobile is designed to pass behind the map
 * anyway; being briefly overlapped is the effect, an empty map is a bug.
 *
 * The bottom two keep `y + h = 100` on purpose: the stage is no longer capped at
 * 80svh on phones, so its floor is the screen's floor, and a band anchored there
 * reaches the bottom edge instead of hovering above a dead strip.
 */
export const MAP_RECTS_MOBILE: Record<SectionId, Rect> = {
  intro: { x: 0, y: 0, w: 100, h: 100 },
  spaces: { x: 0, y: 0, w: 100, h: 34 },
  connect: { x: 0, y: 0, w: 100, h: 30 },
  points: { x: 0, y: 68, w: 100, h: 32 },
  circles: { x: 0, y: 76, w: 100, h: 24 },
};

/**
 * Which side of the screen each section's copy sits on, opposite the map.
 *
 * Only the horizontal side, and only from `md` up. The copy is normal page
 * content: its vertical position is decided by the scroll, and on a phone there
 * is no room for a column beside the map, so everything centres.
 */
/**
 * Which typographic scale each section gets.
 *
 * Follows directly from MAP_RECTS above: `spaces` and `points` share their row
 * with a 48%-wide map window, the other three sit over full-width bands with
 * nothing beside them. See CopyScale in ui/typography.
 */
export const COPY_SCALE: Record<SectionId, CopyScale> = {
  intro: "wide",
  spaces: "column",
  connect: "wide",
  points: "column",
  /*
   * Column scale even though the map beneath it is a full-width band, because
   * what shares the row here is the section's OWN second column — see the
   * two-column branch in SectionCopy. An 84px headline in a half-width column
   * wraps into a wall.
   */
  circles: "column",
};

/**
 * How wide the copy is allowed to run, which depends on whether it shares the
 * row with the map.
 *
 * Beside a 48%-wide map there are only ~624px of grid left at `lg`; 34rem
 * (544px) leaves an 80px gutter so the headline never touches the map's edge.
 * Over the full-width bands there is nothing to clear, and 52rem (832px) is
 * what breaks the long headlines into two lines instead of three at 84px.
 */
export const COPY_WIDTH: Record<SectionId, string> = {
  intro: "max-w-[52rem]",
  spaces: "max-w-[34rem]",
  connect: "max-w-[52rem]",
  points: "max-w-[34rem]",
  circles: "max-w-[52rem] md:max-w-[68rem]",
};

/**
 * Whether each section's copy passes in front of the map or behind it.
 *
 * On a phone it always goes behind. The map is a full-width band there, so copy
 * crossing in front of it would spend most of its travel sitting on top of the
 * only thing worth looking at; sliding under reads as depth instead of as
 * clutter.
 *
 * On desktop only Coffi Circles goes behind. The map is a side panel or a band
 * with room to spare, so the earlier sections gain from the overlap — and
 * reserving the occlusion for the closing section makes it land differently
 * from the three before it.
 *
 * These are z-indexes against the map's own `z-10`, which is why `SceneLayer`
 * must NOT carry one: a positioned element with a z-index creates a stacking
 * context, and its children could then never be compared with the map at all.
 */
export const COPY_DEPTH: Record<SectionId, string> = {
  // The exception, on every breakpoint. During the intro the map fills the whole
  // container, so there is no free space for the copy to occupy and "behind"
  // would mean "invisible". It is the one section that has to be in front.
  intro: "z-20",
  spaces: "z-0 md:z-20",
  connect: "z-0 md:z-20",
  points: "z-0 md:z-20",
  circles: "z-0",
};

/**
 * Extra room at the foot of a chapter block, which pushes its centred copy UP.
 *
 * Only the sections whose map is a bottom band need it. Their readable area is
 * the half of the screen ABOVE the band, but the copy is centred on the
 * viewport, so at the moment the section is naturally being read its lower third
 * — the CTA and the closing line, in Circles — is still behind the map. The copy
 * was reachable by scrolling further; it just was not there when you looked.
 *
 * The value is half the band's height, which is what re-centres the copy on the
 * free zone rather than on the screen. Applied as PADDING and never as a
 * transform: a transform on this block would create a stacking context and trap
 * the z-index that COPY_DEPTH uses to decide whether the copy passes in front of
 * the map or behind it.
 */
export const COPY_FOOT: Record<SectionId, string> = {
  intro: "",
  spaces: "",
  connect: "",
  // Bottom band on phones only; its copy is short enough to clear it anyway.
  points: "",
  circles: "pb-[18svh] md:pb-[34svh]",
};

export const COPY_ALIGN: Record<SectionId, string> = {
  intro: "justify-center",
  spaces: "justify-center md:justify-end",   // mapa a la izquierda
  connect: "justify-center",                 // mapa en banda superior
  points: "justify-center md:justify-start", // mapa a la derecha
  circles: "justify-center",                 // mapa en banda inferior
};

/**
 * How much of a chapter the map spends changing shape before it settles.
 *
 * Without the hold the map would never stop moving — it would be interpolating
 * between two layouts for the entire length of the track, which reads as
 * restlessness rather than as travel. Morphing over the opening third and then
 * sitting still gives the section time to be read.
 */
const MORPH_FRACTION = 0.35;

/**
 * Global-progress stops for the layout interpolation, with every layout
 * appearing TWICE so `useTransform` produces morph-then-hold:
 *
 *   [0, chapterStart₁, morphEnd₁, chapterStart₂, morphEnd₂, …, 1]
 *   [L₀,          L₀,        L₁,            L₁,        L₂, …, L₄]
 *
 * Derived from CHAPTERS rather than written down, so re-pacing the track stays
 * a one-line edit and cannot leave these behind.
 */
export function layoutStops(
  chapters: readonly ChapterSpec[] = CHAPTERS,
): { stops: number[]; index: number[] } {
  const trackVh = chapters.reduce((s, c) => s + c.vh, 0);
  const starts: number[] = [];
  let cursor = 0;
  for (const chapter of chapters) {
    starts.push(cursor / trackVh);
    cursor += chapter.vh;
  }

  const stops: number[] = [0];
  const index: number[] = [0];

  for (let i = 1; i < chapters.length; i++) {
    const span = chapters[i].vh / trackVh;
    stops.push(starts[i]);
    index.push(i - 1);
    stops.push(starts[i] + MORPH_FRACTION * span);
    index.push(i);
  }

  stops.push(1);
  index.push(chapters.length - 1);
  return { stops, index };
}

/**
 * Per rung, because the chapters are paced differently on a phone — see
 * CHAPTERS_MOBILE. Computed once per module rather than per render.
 */
export const LAYOUT = {
  desktop: layoutStops(chaptersFor(false)),
  mobile: layoutStops(chaptersFor(true)),
} as const;

/** Section ids in chapter order, so a layout index can be resolved to a rect. */
export const LAYOUT_ORDER: SectionId[] = CHAPTERS.map((c) => c.id as SectionId);

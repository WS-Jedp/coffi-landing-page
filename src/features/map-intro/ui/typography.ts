/**
 * Typography borrowed from the hero, so the section reads as the same voice
 * continuing rather than a different page.
 *
 * `HeroSearchForm` uses `font-bold text-4xl md:text-6xl leading-[1.05]` on the
 * title and `text-lg font-light text-gray-700` on the subtitle. The weights,
 * leading and colours are copied exactly; only the top size steps down, because
 * the hero's headline spans a 720px centred column while these have to live in
 * a ~540px panel beside the map, and text-6xl there wraps into a wall.
 *
 * `text-balance` on the title keeps the two lines close in length instead of
 * leaving one orphaned word — the hero gets the same effect from its max-width.
 *
 * Shared between the intro's scroll-driven copy and the sections' time-driven
 * copy so the two cannot drift apart.
 */
export const TITLE_CLASS =
  "text-balance font-bold leading-[1.05] text-coffi-black text-4xl lg:text-5xl";

/**
 * Deliberately carries no font size. Appending `text-base` to a string that
 * already contains `text-lg` does not override it — Tailwind resolves conflicts
 * by the order the utilities appear in the generated stylesheet, not by the
 * order they appear in the className, and `text-lg` is emitted later. Each site
 * picks its own size instead.
 */
export const BODY_CLASS = "text-pretty font-light leading-relaxed text-gray-700";

/**
 * The narrative sections' headlines — the largest type on the page.
 *
 * They used to be a step *below* the intro's, because every headline lived in a
 * glass panel and panels of different heights made the copy jump vertically as
 * sections changed. That constraint is gone: the copy is now free-standing page
 * content scrolling over the map, so nothing depends on the blocks matching
 * heights and the type can be sized for the composition instead.
 *
 * It goes past the hero's `md:text-6xl` at the top end deliberately. The hero
 * shares its screen with a search bar and a banner; these headlines are alone
 * over a near-white map and have to carry the section on their own.
 */
export const SECTION_TITLE_CLASS =
  "text-balance font-bold leading-[1.02] tracking-[-0.02em] text-coffi-black text-4xl md:text-5xl lg:text-6xl";

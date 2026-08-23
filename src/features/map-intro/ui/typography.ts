/**
 * The narrative sections' type.
 *
 * Editorial rather than utilitarian: a short ink antetitle, a very large
 * gradient headline, and a body paragraph with one phrase lifted out of the
 * grey. The section is the most visual stretch of the home page and the type
 * has to carry it over a near-white map with no card behind it.
 *
 * Everything here is exported as class strings rather than components so the
 * copy stays plain markup — see `SectionCopy` for why that matters.
 */

/**
 * Two scales, not one, because the sections do not all get the same room.
 *
 * `spaces` and `points` share their row with a map window that takes 48% of the
 * 1200px grid, leaving ~624px. `intro`, `connect` and `circles` sit over
 * full-width bands with nothing beside them. An 84px headline that reads as
 * display type over a band breaks into five lines in a column, so the column
 * sections step down a rung instead of being squeezed.
 */
export type CopyScale = "wide" | "column";

/**
 * The antetitle, as a chip.
 *
 * The styling is the house chip, taken from `filters/placeType` and
 * `placeCard`: fully rounded, a soft blue->purple tint, purple text. What is
 * added for this context is a white base under the tint. Those chips sit on
 * solid page background; these sit over a live map, and a 20% tint alone lets
 * streets run straight through the label.
 *
 * `bg-white/70` and `bg-gradient-to-r` coexist rather than conflict — the first
 * sets `background-color`, the second `background-image`, so the tint composites
 * over the white base. That is also why this stays plain Tailwind instead of
 * needing `backdrop-blur`, which would cost a filter pass every frame on a page
 * that is already scrubbing a canvas and panning a map.
 *
 * The wrapper is a separate block from the chip on purpose: the chip has to
 * shrink-wrap its text, and the motion values need a predictable block box to
 * carry the entrance travel and the margin.
 */
// Tighter rhythm on phones. The type sizes are untouched — they are the point
// of the section — but the gaps between blocks are pure air, and on a 667px
// screen that air is the difference between a headline that clears the map and
// one the map slices through.
export const EYEBROW_WRAP_CLASS = "mb-3 md:mb-5";

export const EYEBROW_CHIP_CLASS = [
  "inline-flex items-center gap-2 rounded-full",
  "border border-coffi-purple/15",
  "bg-white/70 bg-gradient-to-r from-coffi-blue/20 to-coffi-purple/20",
  "px-3.5 py-1.5 md:px-4",
  "text-sm font-semibold tracking-[-0.01em] text-coffi-purple md:text-[0.9375rem]",
  "shadow-sm shadow-coffi-purple/10",
].join(" ");

/**
 * Decorative, and an internal rhyme: the same purple the ProgressRail fills
 * with, so the chip reads as part of this section's vocabulary.
 */
export const EYEBROW_DOT_CLASS =
  "h-1.5 w-1.5 shrink-0 rounded-full coffi-gradient-blue-to-purple";

/**
 * Filter chips, and the whole point here is that they are NO LONGER the
 * antetitle's twin.
 *
 * They used to share everything with `EYEBROW_CHIP_CLASS` above — the same pill,
 * the same `coffi-purple/15` border, the same translucent white under the same
 * blue->purple tint, the same shadow, the same type. The only differences were
 * the text colour and a hover border. That is why nobody could tell they were
 * pressable: the eye had already learned that this exact object is a label, and
 * it applied the lesson to the control.
 *
 * So the two diverge on the property that actually reads as affordance, which is
 * ELEVATION rather than colour. The antetitle stays a flat translucent tint; the
 * chip becomes an opaque white surface that lifts on hover and settles on press.
 * A tinted disc carries the icon, which is what makes the row scannable.
 *
 * Colour is NOT here. Border, shadow and fill are painted inline from
 * `chipVocabulary`, because a class name assembled from a hex at runtime
 * survives `next dev` and is purged from the production stylesheet — the same
 * trap already documented for the pins in `map/pinVocabulary.ts`.
 *
 * `pointer-events-auto` is load-bearing. `SceneLayer` sets `pointer-events-none`
 * on the whole copy column so the text never intercepts a scroll gesture over
 * the map; these are the only elements that opt back in.
 */
const CHIP_BASE = [
  "pointer-events-auto inline-flex items-center gap-2 rounded-full border",
  // Tighter on the icon side than the text side, so the disc sits in the pill
  // rather than floating in a gutter of its own.
  "py-1 pl-1 pr-3.5 md:pr-4",
  "text-sm font-semibold tracking-[-0.01em] md:text-[0.9375rem]",
  // Named properties rather than `transition-all`: the chip is in a block that
  // is already being transformed every frame by the copy's entrance, and
  // transitioning `transform` here would fight it.
  "transition-[box-shadow,background-color,border-color,translate] duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffi-purple/50 focus-visible:ring-offset-2",
].join(" ");

export const CHIP_IDLE_CLASS = [
  CHIP_BASE,
  "bg-white text-coffi-black",
  // The lift is the affordance. `translate-y` and not `transform`, so it cannot
  // clash with the entrance animation's own transform on an ancestor.
  "hover:-translate-y-px active:translate-y-0",
].join(" ");

/**
 * Selected: filled with the accent at full strength, carrying DARK text.
 *
 * Dark rather than white, and that is what keeps the fills on brand. To make
 * white legible the colour has to be darkened until it clears 4.5:1, which turns
 * the amber into brown and the cowork blue into navy — measured, and it read as
 * dark as it sounds. Dark text on the brand colours themselves needs nothing
 * dimmed to be readable.
 *
 * The label is the accent's own DEEP step, arriving inline like the fill — not a
 * neutral. A black label reads as something dropped onto the chip; the chip's
 * colour taken down to near-ink reads as part of it, and it measures better too.
 * See AMBIENCE_DEEP in chipVocabulary for the numbers and for why white was not
 * an option.
 *
 * No text colour here on purpose, then: it varies per accent, and a class would
 * only be able to state one of them.
 *
 * Never the house gradient: that is reserved for primary actions, and this
 * section already spends it on "Explore the city now".
 */
export const CHIP_ACTIVE_CLASS = CHIP_BASE;

/** The tinted disc the icon sits in. */
export const CHIP_ICON_CLASS =
  "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-7 md:w-7";

/** The quiet line above a chip row. */
export const CHIP_LABEL_CLASS =
  "text-xs font-semibold uppercase tracking-[0.12em] text-coffi-black/45";

/**
 * The live result count, opposite the row's label.
 *
 * Sits on the label's line rather than under the chips because vertical space is
 * the binding constraint on a phone: the copy in these two sections has to clear
 * the map band, and there were 85px of slack before this. A row of its own would
 * have spent a third of that on one short sentence.
 */
export const CHIP_COUNT_CLASS =
  "inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-coffi-black/55";

/**
 * Headline sizes. Deliberately past the hero's `md:text-6xl` at the top end:
 * the hero shares its screen with a search bar and a banner, while these are
 * alone over a pale map and have to carry the section on their own.
 *
 * The negative tracking is what stops large bold type reading as shouty — at
 * 84px the default letter spacing is visibly loose.
 *
 * The phone step is a fifth smaller than it was — 35px wide, 32px column — and
 * that was bought rather than chosen. Circles carries a headline, two
 * paragraphs, a CTA and a closing line; at the previous size that block ran
 * 545px against 440px of readable screen, so the map cut through it. 35px is
 * still larger than the hero's own headline on the same device.
 *
 * Leading opens slightly as the size drops: tight leading is what makes big type
 * feel deliberate, and the same value on small type just makes lines collide.
 */
const TITLE_BASE = "text-balance font-bold tracking-[-0.03em]";

export const TITLE_CLASS: Record<CopyScale, string> = {
  // 44 / 60 / 72 / 84
  wide: `${TITLE_BASE} leading-[1.02] text-[2.1875rem] sm:text-6xl md:text-7xl lg:text-[5.25rem]`,
  // 40 / 48 / 52 / 64
  column: `${TITLE_BASE} leading-[1.05] text-[2rem] sm:text-5xl md:text-[3.25rem] lg:text-[4rem]`,
};

/**
 * The gradient fill, reusing the palette already in production in the blog and
 * in `coffi-app` (`from-coffi-blue to-coffi-purple`).
 *
 * Three stops rather than two, and 200% wide, so the fill can be SWEPT: at
 * `background-position: 100%` the visible half runs purple->blue, at `0%` it
 * runs blue->purple. The headline therefore lands on the house order and the
 * colour visibly travels through the words on the way there.
 *
 * `0% 50%` is set here as the resting value so the server render and any
 * no-JS/reduced-motion path show the settled gradient rather than the reversed
 * one. The motion value overrides it while scrolling.
 */
/**
 * The `forced-colors` fallback is not decoration. In forced-colors mode the
 * background is dropped but `color: transparent` survives, and the headline —
 * which has no colour of its own — disappears entirely.
 */
export const TITLE_GRADIENT_CLASS =
  "bg-clip-text text-transparent forced-colors:text-coffi-black";

export const TITLE_GRADIENT_STYLE = {
  backgroundImage:
    "linear-gradient(100deg, #6E91FF 0%, #533FFF 50%, #6E91FF 100%)",
  backgroundSize: "200% 100%",
  backgroundPosition: "0% 50%",
} as const;

/**
 * Body copy, size and tone in ONE string per scale.
 *
 * They cannot be split into a shared tone plus a per-scale size: appending
 * `text-base` to a string that already contains `text-lg` does not override it,
 * because Tailwind resolves conflicts by the order utilities appear in the
 * generated stylesheet, not by the order they appear in the className. Keeping
 * each variant whole is the only arrangement that cannot silently lose.
 *
 * The top margin is the designed headline-to-body gap. It matters more than it
 * looks: the two travel at different speeds, so this is the value the block is
 * measured against at the midpoint of its crossing, where the drift is zero.
 */
export const BODY_CLASS: Record<CopyScale, string> = {
  // 20 / 24 / 26
  wide: "mt-5 md:mt-8 text-pretty font-light leading-[1.45] text-gray-700 text-base md:text-2xl lg:text-[1.625rem]",
  // 20 / 22
  column:
    "mt-5 md:mt-7 text-pretty font-light leading-[1.45] text-gray-700 text-base md:text-[1.375rem]",
};

/**
 * The lifted phrase inside the body.
 *
 * `font-medium` and not `font-bold`: the paragraph is `font-light`, so one step
 * of weight plus grey->ink is already a clear change. Going to bold turns an
 * emphasis into a second headline.
 */
export const EMPHASIS_CLASS = "font-medium text-coffi-black";

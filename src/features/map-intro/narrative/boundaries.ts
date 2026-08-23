import type { ChapterSpec } from "../types";

/**
 * Where each section takes over, and how far back you must scroll to give it up.
 *
 * Both are derived from CHAPTERS rather than written down, so re-pacing the
 * track is a one-line edit that cannot leave these behind.
 *
 * A section activates a fifth of the way into its chapter, not at its very
 * start: the boundary should land where the previous section has finished
 * reading, not the instant its scroll allowance runs out.
 *
 * The hysteresis is not there for fast flicks — those are monotonic and resolve
 * fine. It is for *resting on a boundary*: iOS momentum settles with sub-pixel
 * oscillation and a trackpad's rubber-band overshoots and comes back, either of
 * which crosses the line several times. Without a dead band that becomes a
 * flip storm, and each flip cancels a camera flight and swaps a pin layer.
 *
 * Lives in its own module, apart from the SECTIONS it serves, for one practical
 * reason: it is the arithmetic the progress rail is also built on, and the rail
 * has a test. `sections.ts` cannot be loaded by `node --test` — it imports
 * `../constants` for values, and the extensionless specifier that Next resolves
 * happily is unresolvable to Node. Taking the chapters as an argument leaves
 * this file with nothing but a type import, so the numbers can be checked
 * against real chapter pacing rather than a fixture.
 */
const ACTIVATE_FRACTION = 0.18;
const HYSTERESIS_FRACTION = 0.08;

export function boundaries(chapters: readonly ChapterSpec[]) {
  const trackVh = chapters.reduce((s, c) => s + c.vh, 0);
  const activateAt: number[] = [];
  const hysteresis: number[] = [];
  let cursor = 0;
  for (const chapter of chapters) {
    const start = cursor / trackVh;
    const span = chapter.vh / trackVh;
    cursor += chapter.vh;
    activateAt.push(start + ACTIVATE_FRACTION * span);
    hysteresis.push(HYSTERESIS_FRACTION * span);
  }
  // The intro owns everything before the first real boundary.
  activateAt[0] = 0;
  hysteresis[0] = 0;
  return { activateAt, hysteresis };
}

/**
 * Run with: node --test src/features/map-intro/ui/segmentRange.test.ts
 *
 * One claim, and it is the entire reason the rail reads from `activateAt`
 * rather than from per-chapter progress: a segment must finish filling at the
 * exact instant the next section takes over.
 *
 * Sections do not activate at their chapter's edge — `boundaries()` puts the
 * line 18% into the chapter (ACTIVATE_FRACTION, narrative/sections.ts). A rail
 * filled from `chapter[id]` would therefore sit at 100% for that whole 18%
 * while the copy on screen still belonged to the previous section, and the two
 * would visibly disagree. Deriving both from the same numbers makes the
 * agreement structural instead of hand-calibrated.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { segmentRange } from "./segmentRange.ts";
import { boundaries } from "../narrative/boundaries.ts";
import { CHAPTERS, CHAPTERS_MOBILE } from "../constants.ts";

/**
 * Read from the chapters rather than from SECTIONS, which cannot be imported
 * here — see the note in narrative/boundaries.ts. The two are index-aligned by
 * construction: `boundaries()` emits one activation point per chapter, and
 * every chapter has exactly one section.
 */
const RUNGS = [
  { name: "desktop", activateAt: boundaries(CHAPTERS).activateAt },
  { name: "mobile", activateAt: boundaries(CHAPTERS_MOBILE).activateAt },
] as const;

/** The intro owns no segment: the rail only appears once it has handed off. */
const FIRST_STEP = 1;
const LAST_STEP = CHAPTERS.length - 1;

for (const { name, activateAt } of RUNGS) {
  test(`${name}: a segment ends exactly where the next section activates`, () => {
    for (let step = FIRST_STEP; step < LAST_STEP; step++) {
      const [, end] = segmentRange(activateAt, step);
      assert.equal(
        end,
        activateAt[step + 1],
        `segment ${step} must hand over at the activation of ${step + 1}`,
      );
    }
  });

  test(`${name}: a segment starts where its own section activates`, () => {
    for (let step = FIRST_STEP; step <= LAST_STEP; step++) {
      const [start] = segmentRange(activateAt, step);
      assert.equal(start, activateAt[step]);
    }
  });

  test(`${name}: the last segment closes at the end of the track`, () => {
    const [, end] = segmentRange(activateAt, LAST_STEP);
    assert.equal(end, 1);
  });

  test(`${name}: the first segment opens after the intro, not at zero`, () => {
    const [start] = segmentRange(activateAt, FIRST_STEP);
    assert.ok(start > 0, "the rail must not be part-filled while the map unfolds");
  });

  /*
   * Non-degeneracy is not pedantry. These ranges are fed straight to
   * `useTransform(global, [start, end], [0, 1])`, and a zero-width input range
   * is a division by zero there — the segment would render at NaN width and
   * silently vanish.
   */
  test(`${name}: every segment has width`, () => {
    for (let step = FIRST_STEP; step <= LAST_STEP; step++) {
      const [start, end] = segmentRange(activateAt, step);
      assert.ok(end > start, `segment ${step} is ${start}..${end}`);
    }
  });

  test(`${name}: segments tile the track without gap or overlap`, () => {
    for (let step = FIRST_STEP; step < LAST_STEP; step++) {
      const [, end] = segmentRange(activateAt, step);
      const [nextStart] = segmentRange(activateAt, step + 1);
      assert.equal(end, nextStart);
    }
  });
}

/*
 * Pinned against a synthetic array as well as the real one. The invariants
 * above would all still pass if `segmentRange` were rewritten to derive its
 * numbers some other way that happens to agree on today's chapter heights;
 * this one says what the function actually does.
 */
test("reads its endpoints straight from the activation points", () => {
  const activateAt = [0, 0.2, 0.5, 0.8];
  assert.deepEqual(segmentRange(activateAt, 1), [0.2, 0.5]);
  assert.deepEqual(segmentRange(activateAt, 2), [0.5, 0.8]);
  assert.deepEqual(segmentRange(activateAt, 3), [0.8, 1]);
});

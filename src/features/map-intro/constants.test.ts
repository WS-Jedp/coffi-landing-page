/**
 * Run with: node --test src/features/map-intro/constants.test.ts
 *
 * `TRACK_VH` is computed from CHAPTERS but the track's actual height is a
 * Tailwind class, because a JS-driven height would either cause a hydration
 * mismatch or a layout jump when the breakpoint is read in an effect. That
 * leaves two facts about the same number in two places, and re-pacing a chapter
 * touches only one of them.
 *
 * This is the guard. It has teeth: the last re-pacing changed three chapters and
 * would otherwise have left the track 50svh too long on desktop, which shows up
 * as dead scroll nobody can trace back to a constant.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { TRACK_CLASS, TRACK_VH, TRACK_VH_MOBILE } from "./constants.ts";

test("TRACK_CLASS encodes the chapter totals for both rungs", () => {
  const mobile = TRACK_CLASS.match(/(?:^|\s)h-\[(\d+)svh\]/);
  const desktop = TRACK_CLASS.match(/md:h-\[(\d+)svh\]/);

  assert.ok(mobile, `no mobile height in "${TRACK_CLASS}"`);
  assert.ok(desktop, `no md: height in "${TRACK_CLASS}"`);
  assert.equal(Number(mobile[1]), TRACK_VH_MOBILE, "mobile height out of step");
  assert.equal(Number(desktop[1]), TRACK_VH, "desktop height out of step");
});

test("the reduced-motion collapse still wins over the height", () => {
  // `!h-svh` needs the bang: Tailwind emits breakpoint variants after motion
  // variants, so a plain `motion-reduce:h-svh` loses to `md:h-[...]`.
  assert.match(TRACK_CLASS, /motion-reduce:!h-svh/);
});

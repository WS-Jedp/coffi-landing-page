/**
 * Run with: node --test src/features/map-intro/canvas/frameFit.test.ts
 *
 * The claims worth testing here are geometric invariants, not snapshots:
 *  - the folded paper is never cropped while it is still folded (the failure
 *    that would make the unfold read as garbage on a phone), and
 *  - the fit lands on exactly `cover` at the end (any gap would expose the page
 *    background around a map that is supposed to be full).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { computeFrameFit, paperIsFullyVisible, smoothstep } from "./frameFit.ts";

const RANGE = [0.52, 0.74] as const;

/**
 * How far into the sequence the paper is still visibly *folded* — outer panels
 * angled away, clear transparent margin around it. This is the phase where
 * cropping destroys the effect, because the panels that get sliced off are the
 * whole point of the unfold.
 *
 * Deliberately not the alpha boundary (74/120 = 0.617). Past this point the
 * paper is flat and nearly edge-to-edge, and moving toward cover crops a few
 * percent of a flat map — which is intended, not a defect. PAPER_BBOX is
 * measured at frame 1, where the paper is at its smallest, so it only describes
 * this early phase honestly.
 */
const FOLDED_UNTIL = 0.5;

/** Card shapes that actually ship, with the rung each one would use. */
const CASES = [
  {
    name: "phone portrait 390x620",
    canvas: { w: 640, h: Math.round((640 * 620) / 390) },
    source: { w: 640, h: 451 },
    containBoost: 1.2,
  },
  {
    /*
     * The tallest card that ships, and the reason this case exists.
     *
     * The stage used to be capped at 80svh on every breakpoint. Dropping that
     * ceiling on phones — so a bottom map band can reach the floor instead of
     * floating above it — makes the intro card 358x764 on a 390px device, an
     * aspect of 0.47 against the 0.63 the case above covers. A taller card is
     * exactly the shape that can crop the folded paper, because `contain`
     * becomes width-bound and the 1.2 boost then has nothing to spare.
     */
    name: "phone portrait 358x764 (uncapped stage)",
    canvas: { w: 640, h: Math.round((640 * 764) / 358) },
    source: { w: 640, h: 451 },
    containBoost: 1.2,
  },
  {
    name: "tablet 768x600",
    canvas: { w: 1136, h: Math.round((1136 * 600) / 768) },
    source: { w: 1136, h: 800 },
    containBoost: 1.0,
  },
  {
    name: "desktop 1200x845",
    canvas: { w: 1136, h: Math.round((1136 * 845) / 1200) },
    source: { w: 1136, h: 800 },
    containBoost: 1.0,
  },
] as const;

test("folded paper is never cropped, at every shipping card shape", () => {
  // The invariant that keeps the unfold legible on a phone. Without it, `cover`
  // on a 390px portrait card slices both outer panels off the folded map.
  for (const c of CASES) {
    for (let p = 0; p <= FOLDED_UNTIL; p += 0.02) {
      const rect = computeFrameFit({ ...c, progress: p, range: RANGE });
      assert.ok(
        paperIsFullyVisible(rect, c.canvas),
        `${c.name}: paper cropped at progress ${p.toFixed(2)}`,
      );
    }
  }
});

test("fit lands exactly on cover at the end of the range", () => {
  for (const c of CASES) {
    const cover = Math.max(c.canvas.w / c.source.w, c.canvas.h / c.source.h);
    for (const p of [RANGE[1], 0.95, 1.0]) {
      const { fitScale, dx, dy, dw, dh } = computeFrameFit({ ...c, progress: p, range: RANGE });
      assert.ok(
        Math.abs(fitScale - cover) < 1e-9,
        `${c.name}: fitScale ${fitScale} != cover ${cover} at p=${p}`,
      );
      // cover means no gaps: the drawn rect must fully contain the canvas.
      assert.ok(dx <= 1e-9 && dy <= 1e-9, `${c.name}: gap at p=${p}`);
      assert.ok(dx + dw >= c.canvas.w - 1e-9 && dy + dh >= c.canvas.h - 1e-9);
    }
  }
});

test("fit scale is monotonically non-decreasing", () => {
  // A non-monotonic fit would read as the map breathing in and out mid-scrub.
  for (const c of CASES) {
    let prev = -Infinity;
    for (let p = 0; p <= 1.0001; p += 0.01) {
      const { fitScale } = computeFrameFit({ ...c, progress: p, range: RANGE });
      assert.ok(fitScale >= prev - 1e-12, `${c.name}: fit decreased at ${p.toFixed(2)}`);
      prev = fitScale;
    }
  }
});

test("boost never pushes the start scale past cover", () => {
  // Landscape canvases are wider than the source aspect, so cover is small and
  // an unclamped boost would crop for no reason.
  const wide = { canvas: { w: 1136, h: 400 }, source: { w: 1136, h: 800 }, containBoost: 1.2 };
  const cover = Math.max(wide.canvas.w / wide.source.w, wide.canvas.h / wide.source.h);
  const { fitScale } = computeFrameFit({ ...wide, progress: 0, range: RANGE });
  assert.ok(fitScale <= cover + 1e-9, `start ${fitScale} exceeded cover ${cover}`);
});

test("smoothstep is clamped and symmetric about its midpoint", () => {
  assert.equal(smoothstep(0.2, 0.8, 0.1), 0);
  assert.equal(smoothstep(0.2, 0.8, 0.9), 1);
  assert.ok(Math.abs(smoothstep(0.2, 0.8, 0.5) - 0.5) < 1e-12);
  const a = smoothstep(0, 1, 0.25);
  const b = smoothstep(0, 1, 0.75);
  assert.ok(Math.abs(a + b - 1) < 1e-12);
});

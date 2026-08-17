/**
 * Run with: node --test src/features/map-intro/map/selectLabelled.test.ts
 *
 * The sieve is what makes permanent labels possible, and its failure mode is
 * quiet: a couple of boxes drawn on top of each other in one section, at one
 * breakpoint, which a screenshot review can easily miss. So the invariant is
 * asserted rather than eyeballed — no two selected pins may overlap, ever.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { metresPerPixel, project, selectLabelled } from "./selectLabelled.ts";

const CENTRE = [6.234, -75.574] as const;
const ZOOM = 15.9;
/** A place-sized pin: a 40px card, so it reaches 20px below its anchor. */
const BOX = { w: 150, h: 46, below: 20 };

/** Offsets a point by a distance in metres, using the local scale. */
function offsetBy(metresEast: number, metresNorth: number): [number, number] {
  const latDeg = metresNorth / 111_320;
  const lngDeg = metresEast / (111_320 * Math.cos((CENTRE[0] * Math.PI) / 180));
  return [CENTRE[0] + latDeg, CENTRE[1] + lngDeg];
}

const pick = (points: readonly (readonly [number, number])[], max = 9) =>
  selectLabelled(points, {
    centre: CENTRE,
    zoom: ZOOM,
    max,
    positionOf: (p) => p,
    boxOf: () => BOX,
  });

test("the projection matches the known ground scale at the section's zoom", () => {
  // Web Mercator at z15.9 and latitude 6.24 is ~2.55 m/px. Every radius and
  // label-size decision in the feature is derived from this number, so if the
  // projection drifts the whole sieve is silently mis-scaled.
  const mpp = metresPerPixel(CENTRE[0], ZOOM);
  assert.ok(Math.abs(mpp - 2.545) < 0.01, `expected ~2.545 m/px, got ${mpp}`);

  // And a 1000m step east should be about 1000/mpp pixels wide.
  const a = project(CENTRE[0], CENTRE[1], ZOOM);
  const b = project(...offsetBy(1000, 0), ZOOM);
  assert.ok(Math.abs(b.x - a.x - 1000 / mpp) < 2);
});

test("no two selected pins can overlap, however dense the input", () => {
  // A deliberately cruel field: 200 points scattered inside 400m, which is
  // tighter than any real cluster in the data.
  const points: [number, number][] = [];
  for (let i = 0; i < 200; i++) {
    const angle = i * 2.399963; // golden angle: even, non-repeating coverage
    const r = 400 * Math.sqrt(i / 200);
    points.push(offsetBy(Math.cos(angle) * r, Math.sin(angle) * r));
  }

  // Rebuild each label's real extent, honouring which side it was hung on.
  const boxes = pick(points).map(({ item, below }) => {
    const p = project(item[0], item[1], ZOOM);
    const up = below ? BOX.below : BOX.h - BOX.below;
    const down = below ? BOX.h - BOX.below : BOX.below;
    return { x: p.x, y: p.y + (down - up) / 2 };
  });

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const dx = Math.abs(boxes[i].x - boxes[j].x);
      const dy = Math.abs(boxes[i].y - boxes[j].y);
      assert.ok(
        dx * 2 >= BOX.w + BOX.w || dy * 2 >= BOX.h + BOX.h,
        `pins ${i} and ${j} overlap: dx=${dx.toFixed(1)} dy=${dy.toFixed(1)}`,
      );
    }
  }
});

test("a label flips below when the window has no room above it", () => {
  /*
   * A pin 260m north of the camera — 102px up — inside a band only 150px tall
   * either side. A real pin box is ~86px, of which 60 reaches upward (86 minus
   * the 26 that sits below the anchor), so the label cannot go above without
   * crossing the crop; hung underneath it fits.
   *
   * The box height matters and is the reason an earlier version of this test
   * passed for the wrong reason: with a short box, "above" fits comfortably and
   * the flip never has to happen.
   */
  const TALL = { w: 150, h: 86, below: 26 };
  const place = (halfH: number) =>
    selectLabelled([offsetBy(0, 260)], {
      centre: CENTRE,
      zoom: ZOOM,
      max: 9,
      positionOf: (p) => p,
      boxOf: () => TALL,
      bounds: { halfW: 500, halfH },
    });

  const tight = place(150);
  assert.equal(tight.length, 1, "the pin should still be selectable");
  assert.equal(tight[0].below, true, "its label should hang underneath");

  // Given room, it prefers the default placement.
  assert.equal(place(400)[0].below, false);
});

test("spread reaches the far candidates, not just the near huddle", () => {
  /*
   * Four pins tight around the camera and four out at the edges. A spread of
   * four must reach the edges — the failure this guards against is the cap
   * being applied nearest-first BEFORE the spread, which leaves the far ones
   * unconsidered and produces a cluster on one side of an otherwise empty map.
   */
  const near: [number, number][] = [
    offsetBy(60, 60),
    offsetBy(-60, 60),
    offsetBy(60, -60),
    offsetBy(-60, -60),
  ];
  const far: [number, number][] = [
    offsetBy(1400, 1400),
    offsetBy(-1400, 1400),
    offsetBy(1400, -1400),
    offsetBy(-1400, -1400),
  ];
  const chosen = selectLabelled([...near, ...far], {
    centre: CENTRE,
    zoom: ZOOM,
    max: 4,
    spread: 4,
    positionOf: (p) => p,
    boxOf: () => BOX,
  });

  assert.equal(chosen.length, 4);
  const reach = Math.max(...chosen.map((c) => Math.hypot(c.x, c.y)));
  assert.ok(
    reach > 300,
    `expected the spread to reach the outer ring, furthest was ${reach.toFixed(0)}px`,
  );
});

test("spread covers every quadrant before it optimises gaps", () => {
  /*
   * Five candidates: one in each quadrant plus a spare that sits slightly
   * further from its neighbours than the south-east one does. Ranking on gap
   * alone takes the spare and leaves a quadrant empty — which is exactly what
   * happened on the real perk data, and exactly what a person notices first.
   */
  const ne = offsetBy(600, 600);
  const nw = offsetBy(-600, 600);
  const sw = offsetBy(-600, -600);
  const se = offsetBy(500, -500);
  const spare = offsetBy(-900, 900); // further out, same quadrant as nw

  const chosen = selectLabelled([ne, nw, sw, se, spare], {
    centre: CENTRE,
    zoom: ZOOM,
    max: 9,
    spread: 4,
    positionOf: (p) => p,
    boxOf: () => BOX,
  });

  const quadrants = new Set(
    chosen.map((c) => (c.y < 0 ? "N" : "S") + (c.x < 0 ? "W" : "E")),
  );
  assert.equal(chosen.length, 4);
  assert.equal(quadrants.size, 4, `all four quadrants, got ${[...quadrants]}`);
});

test("coincident pins collapse to one", () => {
  const same = offsetBy(0, 0);
  assert.equal(pick([same, same, same]).length, 1);
});

test("the cap is honoured once the field is sparse enough to allow it", () => {
  const spread: [number, number][] = [];
  for (let i = 0; i < 30; i++) spread.push(offsetBy(i * 600, 0));
  assert.equal(pick(spread, 5).length, 5);
});

test("the pin nearest the camera wins a contested spot, whatever the input order", () => {
  const near = offsetBy(20, 0);
  const far = offsetBy(60, 0); // close enough that their labels would collide
  assert.deepEqual(pick([far, near], 9).map((p) => p.item), [near]);
  assert.deepEqual(pick([near, far], 9).map((p) => p.item), [near]);
});

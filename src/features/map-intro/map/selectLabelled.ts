/**
 * Choosing which pins get to exist, so their labels can never collide.
 *
 * Every pin in this section carries a permanent label — the whole point of the
 * redesign is that nothing needs a hover — and permanent labels are unforgiving:
 * two venues forty metres apart produce two boxes drawn on top of each other,
 * and the map reads as broken. Capping the count does not fix it, because the
 * problem is proximity, not quantity.
 *
 * So the set is sieved geometrically. Candidates are considered nearest-first
 * and one is kept only if its whole pin box, projected into screen pixels,
 * clears everything already kept.
 *
 * Deliberately pure and deliberately independent of Leaflet. The projection is
 * plain Web Mercator, the same one Leaflet uses for EPSG:3857, so the result can
 * be computed before the map exists, does not change between loads, and can be
 * unit-tested — which matters for a rule whose failure mode is "looks slightly
 * wrong in one screenshot".
 */

const TILE_SIZE = 256;

/** Web Mercator, matching Leaflet's EPSG:3857. Pixels at the given zoom. */
export function project(
  lat: number,
  lng: number,
  zoom: number,
): { x: number; y: number } {
  const scale = TILE_SIZE * Math.pow(2, zoom);
  const s = Math.sin((lat * Math.PI) / 180);
  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale,
  };
}

/** Ground resolution in metres per pixel — useful for sizing radii. */
export function metresPerPixel(lat: number, zoom: number): number {
  return (
    (156543.03392 * Math.cos((lat * Math.PI) / 180)) / Math.pow(2, zoom)
  );
}

export type PinBox = {
  /** Total footprint of icon plus label, in CSS pixels. */
  w: number;
  h: number;
  /**
   * How far the marker itself reaches BELOW its anchor point.
   *
   * Per species, not a shared constant, and that distinction was paid for. A
   * single global value of 26 — half the tallest card — silently mis-measured
   * every smaller marker: the Circles huddle is 24px tall, so it reaches 12px
   * down and its label 77px up, while the constant claimed 26 and 62. The sieve
   * under-counted the upward reach by fifteen pixels and let two labels overlap
   * by twenty-four. The rest of the box is above the anchor.
   */
  below: number;
};

export type SelectArgs<T> = {
  centre: readonly [number, number];
  zoom: number;
  /** Hard cap once collisions have already thinned the field. */
  max: number;
  positionOf: (item: T) => readonly [number, number];
  boxOf: (item: T) => PinBox;
  /** Extra breathing room between boxes, in px. */
  gap?: number;
  /**
   * Half the visible window, in px, measured from the centre.
   *
   * The map's container is the full stage but a much smaller window crops it,
   * and that window is `overflow-hidden`. A pin sitting just inside the crop
   * still gets its label sliced in half by the edge — which looks like a
   * rendering bug rather than like a map that continues past the frame. Given
   * the bounds, a candidate is rejected unless its whole box fits.
   *
   * Omitted means unbounded, which is only right when nothing is cropping.
   */
  bounds?: { halfW: number; halfH: number };
  /**
   * Keep only this many, chosen for SPREAD rather than for closeness.
   *
   * The sieve is nearest-first, which is right when you want the pins the
   * section is looking at — but it clumps them around the camera. For a set
   * meant to read as "these are scattered across the neighbourhood", clumping
   * says the opposite. Given this, the survivors are thinned by farthest-point
   * sampling: keep the closest one, then repeatedly take whichever remaining
   * pin is furthest from everything already kept.
   */
  spread?: number;
};

const overlaps = (
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
  gap: number,
) =>
  Math.abs(a.x - b.x) * 2 < a.w + b.w + gap * 2 &&
  Math.abs(a.y - b.y) * 2 < a.h + b.h + gap * 2;

/** An accepted item, where its label had to go, and its position in pixels. */
export type Placed<T> = { item: T; below: boolean; x: number; y: number };

export function selectLabelled<T>(
  items: readonly T[],
  args: SelectArgs<T>,
): Placed<T>[] {
  const { centre, zoom, max, positionOf, boxOf, gap = 6, bounds, spread } = args;
  const origin = project(centre[0], centre[1], zoom);

  const candidates = items
    .map((item) => {
      const [lat, lng] = positionOf(item);
      const p = project(lat, lng, zoom);
      return { item, x: p.x - origin.x, y: p.y - origin.y };
    })
    // Nearest to the camera first: if two pins fight for the same patch of
    // screen, the one the section is actually looking at should win, and the
    // ordering is what makes the outcome stable rather than input-order luck.
    .sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y));

  const kept: { x: number; y: number; w: number; h: number }[] = [];
  const out: Placed<T>[] = [];

  /*
   * When spreading, collect EVERYTHING placeable before thinning.
   *
   * Capping here first was a real bug and a subtle one: the loop is
   * nearest-first, so `max` kept the nine pins closest to the camera and the
   * spread step then scattered four of them inside that huddle. The map showed
   * three pins down one edge and an empty half, even though the data has
   * candidates in all four quadrants. The cap belongs after the spread, not
   * before it.
   */
  const collectLimit = spread ? Number.POSITIVE_INFINITY : max;

  for (const c of candidates) {
    if (out.length >= collectLimit) break;
    const box = boxOf(c.item);

    if (bounds && Math.abs(c.x) + box.w / 2 > bounds.halfW) continue;

    /*
     * The box is NOT centred on the anchor. The pin's card straddles it and the
     * label stacks to one side, so nearly all the height reaches that way and
     * only half a card reaches the other. Treating it as centred would let
     * labels slip past the crop, which is the bug this guards against.
     *
     * Both placements are tried, above first. Flipping is not a nicety: with
     * labels locked above, the upward reach eats half the available height, and
     * on a phone — where a band is barely 310px tall — that left one section
     * rendering ZERO pins, every candidate having landed in the top half.
     * Hanging the label underneath roughly doubles the usable band.
     */
    let chosen: {
      below: boolean;
      box: { x: number; y: number; w: number; h: number };
    } | null = null;

    for (const below of [false, true]) {
      const up = below ? box.below : box.h - box.below;
      const down = below ? box.h - box.below : box.below;
      if (bounds && (c.y - up < -bounds.halfH || c.y + down > bounds.halfH)) {
        continue;
      }
      // Centre of the real extent, which is what the overlap test compares.
      const candidateBox = {
        x: c.x,
        y: c.y + (down - up) / 2,
        w: box.w,
        h: box.h,
      };
      if (kept.some((k) => overlaps(k, candidateBox, gap))) continue;
      chosen = { below, box: candidateBox };
      break;
    }

    if (!chosen) continue;
    kept.push(chosen.box);
    out.push({ item: c.item, below: chosen.below, x: c.x, y: c.y });
  }

  return spread ? spreadOut(out, spread) : out;
}

/**
 * Chooses `n` of the placeable pins for the widest possible spread.
 *
 * Every input is already non-overlapping and inside the crop, so any subset is
 * valid — this only decides WHICH subset.
 *
 * Three objectives, in order: cover as many QUADRANTS of the window as possible,
 * then maximise the smallest gap between any two pins, then the total spread.
 *
 * Quadrant coverage leads because it is the thing a person actually sees. Ranking
 * by gap alone is defensible on paper and was wrong in practice: on the real perk
 * data it chose a set whose minimum gap beat the alternative by half a pixel while
 * doubling up on one corner and leaving another corner of the map empty. Half a
 * pixel is invisible; an empty quadrant is the first thing you notice.
 *
 * Solved exhaustively when the field is small, which it always is here — the
 * sieve rarely leaves more than a dozen placeable positions and C(12,4) is 495
 * combinations. Greedy farthest-point sampling only stands in for the pathological
 * case, where it is an approximation nobody will be looking closely at anyway.
 */
function spreadOut<T>(items: Placed<T>[], n: number): Placed<T>[] {
  if (items.length <= n) return items;

  const gap = (a: Placed<T>, b: Placed<T>) => Math.hypot(a.x - b.x, a.y - b.y);
  const quadrant = (p: Placed<T>) => (p.y < 0 ? 0 : 2) + (p.x < 0 ? 0 : 1);
  const score = (set: Placed<T>[]) => {
    let min = Infinity;
    let total = 0;
    for (let i = 0; i < set.length; i++) {
      for (let j = i + 1; j < set.length; j++) {
        const d = gap(set[i], set[j]);
        if (d < min) min = d;
        total += d;
      }
    }
    return { quadrants: new Set(set.map(quadrant)).size, min, total };
  };

  const combinations = (len: number, k: number): number =>
    k === 0 ? 1 : Math.round((len / k) * combinations(len - 1, k - 1));

  if (combinations(items.length, n) > 20_000) return farthestFirst(items, n);

  let best: Placed<T>[] = [];
  let bestScore = { quadrants: -1, min: -1, total: -1 };
  const walk = (start: number, chosen: Placed<T>[]) => {
    if (chosen.length === n) {
      const s = score(chosen);
      const better =
        s.quadrants > bestScore.quadrants ||
        (s.quadrants === bestScore.quadrants &&
          (s.min > bestScore.min ||
            (s.min === bestScore.min && s.total > bestScore.total)));
      if (better) {
        bestScore = s;
        best = [...chosen];
      }
      return;
    }
    for (let i = start; i < items.length; i++) {
      chosen.push(items[i]);
      walk(i + 1, chosen);
      chosen.pop();
    }
  };
  walk(0, []);
  return best;
}

/**
 * Farthest-point sampling: seed with the two candidates furthest apart, then
 * repeatedly add whichever is furthest from everything kept so far.
 *
 * Every input is already non-overlapping and inside the crop, so any subset is
 * valid — this only decides WHICH subset, and picking for distance is what turns
 * a cluster around the camera into a scatter across the window.
 *
 * The SEED is the part that had to be got right. Starting from the candidate
 * nearest the camera looks natural and quietly poisons the result: that pin is
 * wherever the data happens to be densest, usually off to one side, and every
 * subsequent pick inherits the bias. Measured on the real perks, it put three of
 * four pins down the western edge and left a whole quadrant empty. Seeding with
 * the most distant PAIR fixes an axis across the field first, so the remaining
 * picks fill in around it — the same four candidates then land one per quadrant.
 */
function farthestFirst<T>(items: Placed<T>[], n: number): Placed<T>[] {
  if (items.length <= n) return items;

  let a = 0;
  let bIdx = 1;
  let widest = -1;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const d = Math.hypot(items[i].x - items[j].x, items[i].y - items[j].y);
      if (d > widest) {
        widest = d;
        a = i;
        bIdx = j;
      }
    }
  }

  const kept = [items[a], items[bIdx]];
  const rest = items.filter((_, i) => i !== a && i !== bIdx);
  while (kept.length < n && rest.length) {
    let bestI = 0;
    let bestD = -1;
    rest.forEach((r, i) => {
      const d = Math.min(...kept.map((k) => Math.hypot(k.x - r.x, k.y - r.y)));
      if (d > bestD) {
        bestD = d;
        bestI = i;
      }
    });
    kept.push(rest.splice(bestI, 1)[0]);
  }
  return kept;
}

/**
 * The slice of GLOBAL progress one rail segment represents.
 *
 * The rail is filled from global progress remapped onto the section activation
 * points, not from `chapter[id]`. The two are not the same range: a section
 * takes over 18% into its chapter (ACTIVATE_FRACTION, narrative/sections.ts),
 * so chapter-local progress would drive a segment to 100% while `activeStep` —
 * and therefore the copy, the pins and the camera — still belonged to the
 * section before it. Reading both from `activateAt` makes the rail agree with
 * the narrative by construction rather than by matching numbers twice.
 *
 * `step` is a step index, the same one `useActiveStep` returns: 1..n, because
 * the intro owns no segment. The last segment runs to 1 — there is no
 * activation point past it, and the track's end is where it hands over.
 */
export function segmentRange(
  activateAt: readonly number[],
  step: number,
): readonly [number, number] {
  const start = activateAt[step];
  const end = step + 1 < activateAt.length ? activateAt[step + 1] : 1;
  return [start, end];
}

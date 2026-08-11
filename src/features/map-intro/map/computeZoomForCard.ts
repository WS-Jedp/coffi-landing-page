/** Web Mercator metres per pixel at zoom 0 on the equator. */
const EQUATOR_M_PER_PX = 156543.03392;

export type ZoomArgs = {
  centerLat: number;
  /** Metres spanned by the full height of the source frame at the hand-off. */
  frameSpanMeters: number;
  /** Source frame height in pixels (the span above refers to this). */
  sourceHeight: number;
  /** How much the scrubber is scaling the frame up to fill the card. */
  fitScale: number;
};

/**
 * The Leaflet zoom that makes the live map match the rendered frame.
 *
 * Calibration is stored as a geographic SPAN plus this formula rather than as a
 * zoom constant, because the card is responsive: the zoom that lines up with
 * the render at 1440px is wrong at 390px. A hardcoded zoom would make the
 * hand-off seam line up at exactly one viewport width.
 *
 * It is also what Part 2 needs — framing a cluster of places is the same
 * metres-per-pixel model run backwards.
 */
export function computeZoomForCard({
  centerLat,
  frameSpanMeters,
  sourceHeight,
  fitScale,
}: ZoomArgs): number {
  const metersPerCssPx = frameSpanMeters / (sourceHeight * fitScale);
  const latitudeCorrection = Math.cos((centerLat * Math.PI) / 180);
  return Math.log2((EQUATOR_M_PER_PX * latitudeCorrection) / metersPerCssPx);
}

/** A vertical slice of the scroll track. Part 1 is one chapter; Part 2 appends more. */
export type ChapterSpec = {
  id: string;
  /** Relative weight of this chapter's scroll length. Only ratios matter. */
  vh: number;
};

/** Where to draw a frame inside the canvas, in canvas pixels. */
export type DrawRect = {
  dx: number;
  dy: number;
  dw: number;
  dh: number;
};

/** A Leaflet camera position. Part 1 uses one; Part 2 animates between many. */
export type CameraTarget = {
  center: [number, number];
  zoom: number;
  animate?: boolean;
};

/**
 * One beat of the narrative: copy on screen over a slice of global progress,
 * optionally with a camera move and a set of places to highlight.
 *
 * Part 1 declares exactly one of these. Part 2 is implemented by pushing more
 * entries onto the array — not by adding props or components.
 */
export type SceneStep = {
  id: string;
  /** [start, end] in global scroll progress, 0..1. */
  range: [number, number];
  titleKey: string;
  descKey: string;
  camera?: CameraTarget;
  /** Place ids to emphasise while this step is active. Part 2. */
  highlight?: string[];
};

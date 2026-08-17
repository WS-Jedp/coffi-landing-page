import type * as LeafletNS from "leaflet";
import type { Circle } from "../narrative/circles";
import { STATUS_COLOR } from "./creatorPins";
import type { PinBox, Placed } from "./selectLabelled";
import { labelBox, truncate } from "./markers";

/**
 * Coffi Circles pins: a huddle of people with a seat left open.
 *
 * This replaced a dashed ring with a star in it, and the reason is worth
 * keeping. That ring was the lightest mark on the map and the only one whose
 * drawing said nothing about what it stood for — a star reads as "featured",
 * not as "people are meeting here". The section it belongs to is the one about
 * human connection, and every scrap of that had to be carried by the label
 * while the map itself stayed abstract.
 *
 * So the mark is now the people. Overlapping dots with initials, in the SAME
 * shape and colours as the creator pins two sections earlier, followed by one
 * dashed circle holding a `+`.
 *
 * The dashed circle is the only part of the old ring that survived, and it is
 * the part that was working: an opening you can step into. Empty, it would read
 * as absence; with a `+` it reads as an invitation, which is the difference
 * between "there is a group here" and "there is a group here you can join".
 */
const FACE = 24;
const OVERLAP = 8;
const FACES = 3;
/** Three faces and the empty seat, each overlapping the last. */
const HUDDLE_W = (FACES + 1) * FACE - FACES * OVERLAP;
// Measured at 59px in the browser; carried at 60 so the estimate never sits
// under the real thing. Under-estimating is the direction that produces
// overlaps and clipped labels.
const LABEL_H = 60;

const FACE_COMPACT = 17;
const HUDDLE_W_COMPACT = (FACES + 1) * FACE_COMPACT - FACES * (OVERLAP - 2);
const LABEL_H_COMPACT = 26;
/**
 * Four characters shorter than every other species, and the reason is arithmetic
 * rather than taste: at the default cap two circle labels need 224px between
 * them and the phone band offers 204, so the second pin could never be placed.
 */
const TITLE_CAP_COMPACT = 14;

export const circleBox = (
  title: string,
  place: string,
  people: string,
  compact: boolean,
): PinBox =>
  labelBox(
    // One line on a phone, three on desktop, and the cut is geometric rather
    // than editorial. Two circle labels at their full compact width need 246px
    // of separation inside a band that only offers 194 — two pins simply cannot
    // coexist. Dropping to the title alone makes the box short enough to STACK,
    // which is what buys the second pin. The people are not lost: the huddle of
    // faces is right there under the label saying exactly the same thing.
    compact
      ? [truncate(title, compact, TITLE_CAP_COMPACT)]
      : [truncate(title, compact), place, people],
    compact,
    // Wide and short — the shape `labelBox` had to grow a second dimension for.
    {
      w: compact ? HUDDLE_W_COMPACT : HUDDLE_W,
      h: compact ? FACE_COMPACT : FACE,
    },
    compact ? LABEL_H_COMPACT : LABEL_H,
  );

export type CircleLabel = (circle: Circle) => {
  title: string;
  place: string;
  people: string;
};

function circleHtml(
  circle: Circle,
  labels: { title: string; place: string; people: string },
  compact: boolean,
  below: boolean,
  delayMs: number,
): string {
  const cls = [
    "map-intro-circle",
    compact ? "map-intro-compact" : "",
    below ? "map-intro-below" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const faces = circle.hosts
    .slice(0, FACES)
    .map(
      (h) =>
        `<span class="map-intro-circle-face" style="background:${STATUS_COLOR[h.status]}">` +
        `${h.name.slice(0, 1).toUpperCase()}</span>`,
    )
    .join("");

  return (
    `<span class="${cls}" style="--pin-delay:${delayMs.toFixed(0)}ms">` +
    `<span class="map-intro-circle-label">` +
    `<span class="map-intro-circle-title">${truncate(labels.title, compact, TITLE_CAP_COMPACT)}</span>` +
    // The venue is the first thing to go on a phone: the huddle already sits on
    // top of it, so the map is saying it anyway.
    (compact
      ? ""
      : `<span class="map-intro-circle-place">${labels.place}</span>` +
        `<span class="map-intro-circle-people">${labels.people}</span>`) +
    `</span>` +
    `<span class="map-intro-circle-huddle">` +
    faces +
    `<span class="map-intro-circle-seat" aria-hidden="true">+</span>` +
    `</span>` +
    `</span>`
  );
}

export function createCircleMarkers(
  L: typeof LeafletNS,
  circles: readonly Placed<Circle>[],
  labels: CircleLabel,
  compact: boolean,
): LeafletNS.Marker[] {
  const w = compact ? HUDDLE_W_COMPACT : HUDDLE_W;
  const h = compact ? FACE_COMPACT : FACE;
  return circles.map(({ item: circle, below }, i) => {
    const icon = L.divIcon({
      className: "map-intro-pin-wrap",
      html: circleHtml(
        circle,
        labels(circle),
        compact,
        below,
        (i / Math.max(1, circles.length)) * 420,
      ),
      iconSize: [w, h],
      iconAnchor: [w / 2, h / 2],
    });
    return L.marker(circle.position, {
      icon,
      interactive: true,
      keyboard: false,
      riseOnHover: true,
    });
  });
}

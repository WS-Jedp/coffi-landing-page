import type * as LeafletNS from "leaflet";
import type { Creator, CreatorStatus } from "../narrative/creators";
import type { PinBox, Placed } from "./selectLabelled";
import { labelBox, square, truncate } from "./markers";

/**
 * Creator pins: who is nearby and what they are open to, at a glance.
 *
 * The colour encodes what the person is doing or looking for, not their
 * profession, because that is the thing that decides whether you walk over —
 * their role is already filterable with the chips and printed in the label.
 *
 * The status is written out as well as coloured. Colour alone must never be the
 * only carrier of meaning: emerald and Coffi blue are close enough to be
 * indistinguishable with the commonest form of colour blindness, and the pin
 * would then say nothing at all.
 */
export const STATUS_COLOR: Record<CreatorStatus, string> = {
  collaborating: "#10B981",
  focused: "#6E91FF",
  creating: "#533FFF",
};

const DOT = 34;
const DOT_COMPACT = 28;
const LABEL_H = 40;

export const creatorBox = (
  name: string,
  status: string,
  compact: boolean,
): PinBox =>
  labelBox(
    [truncate(name, compact), status],
    compact,
    square(compact ? DOT_COMPACT : DOT),
    LABEL_H,
  );

export type CreatorLabels = (creator: Creator) => {
  role: string;
  status: string;
};

function creatorHtml(
  creator: Creator,
  labels: { role: string; status: string },
  compact: boolean,
  below: boolean,
  delayMs: number,
): string {
  const initial = creator.name.slice(0, 1).toUpperCase();
  const color = STATUS_COLOR[creator.status];
  return (
    `<span class="map-intro-creator${compact ? " map-intro-compact" : ""}${below ? " map-intro-below" : ""}" style="--pin-delay:${delayMs.toFixed(0)}ms">` +
    `<span class="map-intro-creator-label">` +
    `<span class="map-intro-creator-name">${truncate(`${creator.name} · ${labels.role}`, compact)}</span>` +
    `<span class="map-intro-creator-status" style="color:${color}">${labels.status}</span>` +
    `</span>` +
    `<span class="map-intro-creator-pin">` +
    `<span class="map-intro-creator-halo" style="background:${color}"></span>` +
    `<span class="map-intro-creator-dot" style="background:${color}">${initial}</span>` +
    `</span>` +
    `</span>`
  );
}

export function createCreatorMarkers(
  L: typeof LeafletNS,
  creators: readonly Placed<Creator>[],
  labels: CreatorLabels,
  compact: boolean,
): LeafletNS.Marker[] {
  const size = compact ? DOT_COMPACT : DOT;
  return creators.map(({ item: creator, below }, i) => {
    const icon = L.divIcon({
      className: "map-intro-pin-wrap",
      html: creatorHtml(
        creator,
        labels(creator),
        compact,
        below,
        (i / Math.max(1, creators.length)) * 420,
      ),
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
    return L.marker(creator.position, {
      icon,
      interactive: true,
      keyboard: false,
      riseOnHover: true,
    });
  });
}

import type * as LeafletNS from "leaflet";
import type { Place } from "@/models/places";
import {
  AMBIENCE_COLOR,
  AMBIENCE_INK,
  ambienceOf,
  iconSvg,
  type Ambience,
} from "./pinVocabulary";
import type { PinBox, Placed } from "./selectLabelled";

/** Stagger window. Pins arrive as a wave rather than all at once. */
const STAGGER_MS = 400;

const CARD = 40;
const CARD_COMPACT = 32;
/** Two lines of label plus its padding, measured against the shipped styles. */
const LABEL_H = 40;
const LABEL_GAP = 6;

/**
 * How wide a label will render, estimated from the text that will actually be
 * in it.
 *
 * The sieve runs before Leaflet exists — that is what makes it pure and
 * testable — so it cannot measure the DOM. It CAN be given the resolved
 * strings, and it must be: an earlier version estimated from the venue name
 * alone and was caught overlapping by 29px² in the creators section, where the
 * second line ("buscando colaboración") is longer than the first. Always
 * measure the widest line, never the first one.
 *
 * Deliberately generous. Over-estimating costs a pin that would have fitted;
 * under-estimating puts two labels on top of each other, which is the single
 * failure this mechanism exists to prevent.
 */
export function labelBox(
  lines: readonly string[],
  compact: boolean,
  /**
   * The marker's own footprint. Width and height are separate because they
   * stopped being the same number: every species used to be a square card or a
   * round dot, but a Circles pin is a ROW of overlapping faces — wide and short.
   * Collapsing the two either inflates its height or lets its width slip under
   * the label's, and both mistakes end as a label clipped by the crop.
   */
  icon: { w: number; h: number },
  labelH: number,
): PinBox {
  const perChar = compact ? 5.6 : 6.8;
  const widest = Math.max(...lines.map((l) => l.length));
  const pad = compact ? 16 : 24;
  return {
    w: Math.max(icon.w, pad + widest * perChar),
    h: (compact ? labelH - 6 : labelH) + LABEL_GAP + icon.h,
    // The marker straddles the anchor; everything else stacks above it.
    below: icon.h / 2,
  };
}

/** For the species whose marker is square or round, which is most of them. */
export const square = (size: number) => ({ w: size, h: size });

/**
 * Long names have to give way on a phone: the whole window is only ~358px.
 *
 * `compactCap` exists for the species that need to be narrower still. Circles
 * are the case: two of their labels at the default cap need 224px of horizontal
 * separation inside a band that offers 204, so a second pin was mathematically
 * impossible and the section rendered one. Trimming four characters buys it.
 */
export function truncate(
  text: string,
  compact: boolean,
  compactCap = 18,
): string {
  const cap = compact ? compactCap : 30;
  return text.length > cap ? `${text.slice(0, cap - 1)}…` : text;
}

export const placeBox = (name: string, mood: string, compact: boolean): PinBox =>
  labelBox(
    [truncate(name, compact), mood],
    compact,
    square(compact ? CARD_COMPACT : CARD),
    LABEL_H,
  );

export type MarkerLayer = {
  group: LeafletNS.LayerGroup;
  /** Stable id -> marker, so a subset can be highlighted without rebuilding. */
  byId: Map<string, LeafletNS.Marker>;
};

/**
 * A place pin, in the app's visual language.
 *
 * Card, colour and icon are `placeMarker.tsx` from `coffi-app`; the label is
 * permanently visible rather than revealed on hover, because on a phone there
 * is no hover and the information would simply be unreachable.
 *
 * The second line is the point of the section: not what the venue is known for,
 * but what the community says its atmosphere is good for right now.
 *
 * Colours are inline hex, never Tailwind classes. This is an HTML string, so
 * Tailwind's scanner cannot see anything built here — a class name would work
 * in dev and be purged from the production bundle, leaving every pin grey in
 * the one environment where nobody re-checks them.
 */
function placeHtml(
  place: Place,
  ambience: Ambience,
  moodLabel: string,
  compact: boolean,
  below: boolean,
  delayMs: number,
): string {
  return (
    `<span class="map-intro-place${compact ? " map-intro-compact" : ""}${below ? " map-intro-below" : ""}" style="--pin-delay:${delayMs.toFixed(0)}ms">` +
    `<span class="map-intro-place-label">` +
    `<span class="map-intro-place-name">${truncate(place.name, compact)}</span>` +
    `<span class="map-intro-place-mood" style="color:${AMBIENCE_INK[ambience]}">${moodLabel}</span>` +
    `</span>` +
    `<span class="map-intro-place-card" style="background:${AMBIENCE_COLOR[ambience]}">` +
    iconSvg(ambience, 21) +
    `</span>` +
    `</span>`
  );
}

export function createPlaceMarkers(
  L: typeof LeafletNS,
  places: readonly Placed<Place>[],
  moodLabel: (a: Ambience) => string,
  compact: boolean,
): MarkerLayer {
  const size = compact ? CARD_COMPACT : CARD;
  const group = L.layerGroup();
  const byId = new Map<string, LeafletNS.Marker>();

  places.forEach(({ item: place, below }, i) => {
    const ambience = ambienceOf(place);
    const icon = L.divIcon({
      className: "map-intro-pin-wrap",
      // Staggered through CSS so the wave costs no timers and no per-marker
      // React state.
      html: placeHtml(
        place,
        ambience,
        moodLabel(ambience),
        compact,
        below,
        (i / Math.max(1, places.length)) * STAGGER_MS,
      ),
      // Sized to the card alone and anchored at its centre: the label is
      // absolutely positioned above and must not shift the pin off its venue.
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
    const marker = L.marker([place.location.latitude, place.location.longitude], {
      icon,
      // Interactive only for the hover lift borrowed from the app. There is no
      // tooltip any more — the label already says everything a tooltip would.
      interactive: true,
      keyboard: false,
      riseOnHover: true,
    });
    marker.addTo(group);
    byId.set(place.id, marker);
  });

  return { group, byId };
}

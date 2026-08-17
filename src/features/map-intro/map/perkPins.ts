import type * as LeafletNS from "leaflet";
import type { Perk } from "../narrative/perks";
import { ambienceOf, iconSvg } from "./pinVocabulary";
import type { PinBox, Placed } from "./selectLabelled";
import { labelBox, square, truncate } from "./markers";

/**
 * Perk pins: the only species that does not look like the map it sits on.
 *
 * Every other pin is a Coffi-blue or amber card because that is what the app
 * paints venues with. These deliberately break that: a perk is not a venue, it
 * is something the visitor gets for being a member, and a crowned blue card
 * read as "a workspace, with a badge" rather than as a reward.
 *
 * So the whole card changes register — deep ink with a gold rim and a gold
 * crown, the visual grammar of a members' card rather than a map marker. The
 * words carry it too: the offer is not enough on its own, because a discount
 * could come from anywhere. "Solo con Coffi" is what says where it comes from.
 *
 * That line is dropped in compact mode. On a phone the section's window is a
 * 358x310 band and a third line of text costs a pin, which is the worse trade:
 * the gradient card and crown still say "exclusive" without it.
 */
const CARD = 52;
const CARD_COMPACT = 38;
/*
 * Measured in the browser, not guessed: the three-line plate renders at 61px.
 * An earlier estimate of 58 put one label five pixels from the frame — inside
 * by the maths, visibly glued to the edge on screen.
 *
 * Both values then carry the crown's extra clearance (14px full, 10px compact)
 * on top, because `labelBox` only ever adds a flat 6px gap. Leaving that out
 * would let the sieve believe every perk is shorter than it is, which is the
 * one direction of error that produces overlaps.
 */
const LABEL_H = 62 + 14;
const LABEL_H_COMPACT = 40 + 10;

export const perkBox = (
  offer: string,
  name: string,
  exclusive: string,
  compact: boolean,
): PinBox =>
  labelBox(
    // The crown glyph rides inside the offer line, so it is padded for.
    compact
      ? [`${offer}xxx`, truncate(name, compact)]
      : [`${offer}xxx`, truncate(name, compact), exclusive],
    compact,
    square(compact ? CARD_COMPACT : CARD),
    compact ? LABEL_H_COMPACT : LABEL_H,
  );

const CROWN = (size: number) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path fill="currentColor" d="M3 8l4.5 3L12 4l4.5 7L21 8l-1.8 9H4.8L3 8z"/></svg>`;

export type PerkLabel = (perk: Perk) => { offer: string; exclusive: string };

function perkHtml(
  perk: Perk,
  labels: { offer: string; exclusive: string },
  compact: boolean,
  below: boolean,
  delayMs: number,
): string {
  const cls = [
    "map-intro-perk",
    compact ? "map-intro-compact" : "",
    below ? "map-intro-below" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    `<span class="${cls}" style="--pin-delay:${delayMs.toFixed(0)}ms">` +
    `<span class="map-intro-perk-label">` +
    `<span class="map-intro-perk-offer">${CROWN(13)}${labels.offer}</span>` +
    `<span class="map-intro-perk-place">${truncate(perk.place.name, compact)}</span>` +
    (compact
      ? ""
      : `<span class="map-intro-perk-only">${labels.exclusive}</span>`) +
    `</span>` +
    `<span class="map-intro-perk-card">` +
    // The venue's own ambience icon still shows through, so the pin stays
    // legible as a place — just one wearing a different jacket.
    iconSvg(ambienceOf(perk.place), compact ? 20 : 24) +
    `</span>` +
    /*
     * The crown is a SIBLING of the card, never a child of it.
     *
     * The card carries `overflow: hidden` so the shimmer stays inside its
     * rounded box. A crown nested in there gets sliced by that same clip and by
     * the border radius, which rendered it as a pair of white wings poking out
     * of the top — a shape nobody designed. Outside the clip it is just a crown.
     */
    `<span class="map-intro-perk-crown">${CROWN(14)}</span>` +
    `</span>`
  );
}

export function createPerkMarkers(
  L: typeof LeafletNS,
  perks: readonly Placed<Perk>[],
  label: PerkLabel,
  compact: boolean,
): LeafletNS.Marker[] {
  const size = compact ? CARD_COMPACT : CARD;
  return perks.map(({ item: perk, below }, i) => {
    const icon = L.divIcon({
      className: "map-intro-pin-wrap",
      html: perkHtml(
        perk,
        label(perk),
        compact,
        below,
        (i / Math.max(1, perks.length)) * 420,
      ),
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
    return L.marker(
      [perk.place.location.latitude, perk.place.location.longitude],
      { icon, interactive: true, keyboard: false, riseOnHover: true },
    );
  });
}

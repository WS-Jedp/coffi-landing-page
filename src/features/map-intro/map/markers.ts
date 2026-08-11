import type * as LeafletNS from "leaflet";
import { dummyPlaces } from "@/data/places";
import { MINDSETS } from "@/models/places";

/**
 * Pin colour per mindset. Written as literal class strings, never composed, so
 * Tailwind's scanner can see them — these end up inside an HTML string rather
 * than JSX, and a template-built class name would be silently purged in a
 * production build.
 */
const MINDSET_CLASS: Record<string, string> = {
  [MINDSETS.WORK]: "bg-coffi-blue",
  [MINDSETS.COWORK]: "bg-coffi-purple",
  [MINDSETS.STUDY]: "bg-coffi-blue-400",
  [MINDSETS.SOCIAL]: "bg-coffi-purple-400",
  [MINDSETS.VIBE]: "bg-coffi-purple-300",
  [MINDSETS.ROMANTIC]: "bg-coffi-blue-300",
};
const FALLBACK_CLASS = "bg-coffi-blue";

/**
 * How many pins to place. The whole set is 90; a landing page wants a sense of
 * density, not a directory, and every extra pin is a DOM node behind a map the
 * user cannot interact with.
 */
const MAX_MARKERS = 28;

/** Stagger window. Pins arrive as a wave rather than all at once. */
const STAGGER_MS = 400;

export type MarkerLayer = {
  group: LeafletNS.LayerGroup;
  /** Stable id -> marker, so Part 2 can highlight subsets without rebuilding. */
  byId: Map<string, LeafletNS.Marker>;
};

function pinHtml(mindset: string, delayMs: number): string {
  const color = MINDSET_CLASS[mindset] ?? FALLBACK_CLASS;
  // The delay is baked into the markup rather than set afterwards through
  // `marker.getElement()`, which returns null until the marker is on the map.
  return `<span class="map-intro-pin ${color}" style="--pin-delay:${delayMs.toFixed(0)}ms"></span>`;
}

/**
 * Drops Coffi pins onto the map.
 *
 * Built as an HTML string rather than with `renderToString` (which is what the
 * app does) so the client bundle does not have to carry react-dom/server for
 * the sake of a coloured dot.
 */
export function attachPlaceMarkers(
  L: typeof LeafletNS,
  map: LeafletNS.Map,
): MarkerLayer {
  const group = L.layerGroup();
  const byId = new Map<string, LeafletNS.Marker>();

  const places = dummyPlaces
    .filter((p) => p.location?.latitude && p.location?.longitude)
    .slice(0, MAX_MARKERS);

  places.forEach((place, i) => {
    const icon = L.divIcon({
      className: "map-intro-pin-wrap",
      // Staggered through CSS so the wave costs no timers and no per-marker
      // React state.
      html: pinHtml(String(place.knownFor), (i / places.length) * STAGGER_MS),
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    const marker = L.marker([place.location.latitude, place.location.longitude], {
      icon,
      interactive: false,
      keyboard: false,
    });
    marker.addTo(group);
    byId.set(place.id, marker);
  });

  group.addTo(map);
  return { group, byId };
}

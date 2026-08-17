"use client";

import { useEffect, useRef } from "react";
import type * as LeafletNS from "leaflet";
import { createPlaceMarkers, placeBox } from "./markers";
import { createCreatorMarkers, creatorBox, creatorTitle } from "./creatorPins";
import { createPerkMarkers, perkBox } from "./perkPins";
import { createCircleMarkers, circleBox } from "./circlePins";
import { selectLabelled } from "./selectLabelled";
import { ambienceOf, type Ambience } from "./pinVocabulary";
import { creatorsForRole, type Creator, type CreatorRole } from "../narrative/creators";
import { placesForIntent, type IntentId } from "../narrative/intents";
import { PERKS, type Perk } from "../narrative/perks";
import { CIRCLES, type Circle } from "../narrative/circles";

import { SECTION_ZOOM } from "../narrative/sections";
import type { CameraTarget } from "../types";

/**
 * Which pin species belongs to which chapter.
 *
 * Circles gets its own species now rather than falling back to place pins: the
 * closing section is about the gatherings, and showing venues under a headline
 * announcing micro-events was the map contradicting the copy.
 */
type Species = "places" | "creators" | "perks" | "circles";
const SPECIES_BY_STEP: readonly Species[] = [
  "places", // intro
  "places", // spaces
  "creators", // connect
  "perks", // points
  "circles", // circles
];

/**
 * How many pins a section may show at most.
 *
 * Low, and that is the trade this redesign makes: every pin now carries a
 * permanent label, so the ceiling is set by how much text fits on screen rather
 * than by how much data exists. The sieve usually cuts below this anyway.
 */
const MAX_PINS = 9;

/**
 * Perks are capped tighter than everything else, and on purpose. Scarcity is
 * the message: seven crowned cards on one screen reads as a discount aisle,
 * four reads as something you were let in on.
 */
const PERK_PINS = 4;

export type PinLayerArgs = {
  activeStep: number;
  intent: IntentId | null;
  role: CreatorRole | null;
  /** The camera the section is looking through; the sieve measures from here. */
  camera: CameraTarget | null;
  /** Visible size of the cropping window, so labels never straddle its edge. */
  windowSize: { w: number; h: number };
  /** Blocks everything until the canvas has handed off to the live map. */
  enabled: boolean;
  moodLabel: (a: Ambience) => string;
  creatorLabels: (c: Creator) => { role: string; status: string };
  perkLabel: (p: Perk) => { offer: string; exclusive: string };
  circleLabels: (c: Circle) => { title: string; place: string; people: string };
  /**
   * How many pins the layer just put on the map, reported with the step it
   * belongs to.
   *
   * The step travels with the number because the copy that displays it is a
   * sibling of the map, scrolling past at its own pace: at any moment the layer
   * may hold a species the on-screen section did not ask for, and a bare count
   * would let section 1 advertise section 2's creators. The consumer compares
   * and shows nothing on a mismatch.
   *
   * This is the only honest place to count from. The chips filter by predicate
   * but the SIEVE decides what survives — a label that would straddle the crop
   * is dropped — so `placesForIntent(...).length` is a number the visitor never
   * sees.
   */
  onCount?: (report: { step: number; count: number }) => void;
};

/**
 * The single owner of what is on the map.
 *
 * Everything about pins funnels through here for the same reason the camera has
 * exactly one writer: with two places calling `addTo`/`remove`, a user scrolling
 * back and forth across a chapter boundary ends up with two species on the map
 * at once, and it is invisible in code review.
 *
 * Layers are rebuilt when their inputs change rather than diffed. Rebuilding is
 * what replays the CSS arrival wave — Leaflet destroys the icon element on
 * removal and creates a fresh one on add, so a filter change reads as the new
 * set dropping in rather than as pins blinking out of existence. At nine
 * divIcons the cost is not measurable.
 */
export function usePinLayers(
  L: typeof LeafletNS | null,
  map: LeafletNS.Map | null,
  {
    activeStep,
    intent,
    role,
    camera,
    windowSize,
    enabled,
    moodLabel,
    creatorLabels,
    perkLabel,
    circleLabels,
    onCount,
  }: PinLayerArgs,
): void {
  const layerRef = useRef<LeafletNS.LayerGroup | null>(null);

  // Label builders close over `t`, so they are new identities on every render.
  // Read through a ref instead of as dependencies, or the layer would be torn
  // down and rebuilt on every single render. `onCount` joins them for the same
  // reason: it must never be able to trigger a rebuild.
  const labels = useRef({
    moodLabel,
    creatorLabels,
    perkLabel,
    circleLabels,
    onCount,
  });
  labels.current = {
    moodLabel,
    creatorLabels,
    perkLabel,
    circleLabels,
    onCount,
  };

  const species = SPECIES_BY_STEP[activeStep] ?? "places";
  // Only the selector relevant to the current species may trigger a rebuild;
  // otherwise changing the intent chip in section 1 would also rebuild the
  // creator layer the moment the user reached section 2.
  const selector =
    species === "places" ? intent : species === "creators" ? role : null;
  const centreKey = camera ? `${camera.center[0]},${camera.center[1]}` : "";

  useEffect(() => {
    if (!L || !map || !enabled) return;

    const centre = camera?.center ?? map.getCenter();
    const from: readonly [number, number] = Array.isArray(centre)
      ? (centre as [number, number])
      : [(centre as LeafletNS.LatLng).lat, (centre as LeafletNS.LatLng).lng];
    /*
     * The sieve measures at the target's zoom, not the map's live one: a rebuild
     * can land mid-flight, and sizing labels against a transient zoom would let
     * two of them overlap once the camera settled.
     *
     * It has to be the CAMERA's zoom rather than a constant, now that phones use
     * a wider one. Measuring metres-per-pixel at the desktop scale while the map
     * is actually further out would misjudge every gap by 60%.
     */
    /*
     * Compact below ~420px of visible window.
     *
     * Not a media query: what matters is how wide the CROP is, not the device.
     * The same phone shows a full-width band in one section and the mobile
     * rects give ~358px in another, and it was the 358px case that produced a
     * section with zero pins — every label was wider than the space it had.
     */
    const compact = windowSize.w > 0 && windowSize.w < 420;

    const sieve = {
      centre: from,
      zoom: camera?.zoom ?? SECTION_ZOOM,
      max: MAX_PINS,
      /*
       * Inset from the crop, and 8px was not enough.
       *
       * A label that clears the frame by five pixels is inside by the maths and
       * looks pinned to the edge on screen — and in the bottom-right corner it
       * collides with the map attribution, which is a real element the sieve
       * knows nothing about. Sixteen gives the plate somewhere to sit.
       */
      bounds: {
        halfW: Math.max(60, windowSize.w / 2 - 16),
        halfH: Math.max(60, windowSize.h / 2 - 16),
      },
    };

    const group = L.layerGroup();
    const add = (markers: LeafletNS.Marker[]) => {
      for (const m of markers) m.addTo(group);
    };

    // What the sieve actually kept, which is the only count worth reporting.
    let placed = 0;

    if (species === "creators") {
      const chosen = selectLabelled(creatorsForRole(role), {
        ...sieve,
        positionOf: (c) => c.position,
        boxOf: (c) =>
          creatorBox(
            creatorTitle(
              c.name,
              labels.current.creatorLabels(c).role,
              compact,
            ),
            labels.current.creatorLabels(c).status,
            compact,
          ),
      });
      placed = chosen.length;
      add(createCreatorMarkers(L, chosen, labels.current.creatorLabels, compact));
    } else if (species === "perks") {
      const chosen = selectLabelled(PERKS, {
        ...sieve,
        // Exactly four, scattered rather than clustered. A wall of discount
        // pins stops reading as "exclusive" and starts reading as a sale.
        spread: PERK_PINS,
        positionOf: (p) => [
          p.place.location.latitude,
          p.place.location.longitude,
        ],
        boxOf: (p) => {
          const l = labels.current.perkLabel(p);
          return perkBox(l.offer, p.place.name, l.exclusive, compact);
        },
      });
      placed = chosen.length;
      add(createPerkMarkers(L, chosen, labels.current.perkLabel, compact));
    } else if (species === "circles") {
      const chosen = selectLabelled(CIRCLES, {
        ...sieve,
        positionOf: (c) => c.position,
        boxOf: (c) => {
          const l = labels.current.circleLabels(c);
          return circleBox(l.title, l.place, l.people, compact);
        },
      });
      placed = chosen.length;
      add(createCircleMarkers(L, chosen, labels.current.circleLabels, compact));
    } else {
      const chosen = selectLabelled(placesForIntent(intent), {
        ...sieve,
        positionOf: (p) => [p.location.latitude, p.location.longitude],
        boxOf: (p) =>
          placeBox(p.name, labels.current.moodLabel(ambienceOf(p)), compact),
      });
      placed = chosen.length;
      createPlaceMarkers(
        L,
        chosen,
        labels.current.moodLabel,
        compact,
      ).group.eachLayer((l) => group.addLayer(l));
    }

    group.addTo(map);
    layerRef.current = group;

    /*
     * Reported only from here, once a layer has actually been built.
     *
     * `activeStep` is read from the closure and is NOT a dependency, so if it
     * ever changed without any dependency changing, this would not fire and the
     * consumer would keep a report whose step no longer matches — which shows
     * nothing rather than showing the wrong number. In practice every step
     * boundary does change one: the species changes at three of them, and the
     * intro-to-spaces crossing changes the camera.
     */
    labels.current.onCount?.({ step: activeStep, count: placed });

    return () => {
      group.remove();
      if (layerRef.current === group) layerRef.current = null;
    };
    // `selector` stands in for whichever of intent/role this species reads, and
    // `centreKey` for the camera; the rest are refs. See the notes above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    L,
    map,
    enabled,
    species,
    selector,
    centreKey,
    camera?.zoom,
    // Rounded so a sub-pixel resize during the window's morph does not rebuild
    // the layer on every animation frame.
    Math.round(windowSize.w / 20),
    Math.round(windowSize.h / 20),
  ]);
}

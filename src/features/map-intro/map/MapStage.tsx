"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { FRAME_RUNGS, RANGES, TILE_ATTRIBUTION, framePath } from "../constants";
import type { CameraTarget } from "../types";
import { computeZoomForCard } from "./computeZoomForCard";
import { useTranslations } from "next-intl";
import { useLeafletMap } from "./useLeafletMap";
import { useSectionCamera } from "./useSectionCamera";
import { usePinLayers } from "./usePinLayers";
import { ambienceLabelKey } from "./pinVocabulary";
import { useCalibration } from "../dev/useCalibration";
import {
  roleLabelKey,
  statusLabelKey,
  statusShortLabelKey,
} from "../narrative/creators";
import type { CreatorRole } from "../narrative/creators";
import type { IntentId } from "../narrative/intents";
import "./leafletTheme.css";

/**
 * How washed-out the tiles are while the seam is happening. Tuned to sit close
 * to the render's palette: pale, warm, very low contrast.
 *
 * REST_FILTER is the identity, written out with the *same functions in the same
 * order* rather than as `none`. CSS only interpolates between filter lists that
 * match structurally — `contrast() saturate() sepia() brightness()` to `none`
 * does not animate, it snaps. That failure is invisible in code review and
 * obvious on screen.
 */
const SEAM_FILTER = "contrast(0.42) saturate(0.55) sepia(0.12) brightness(1.05)";
const REST_FILTER = "contrast(1) saturate(1) sepia(0) brightness(1)";

/** Stage two: the map comes alive. Time-based, deliberately — see below. */
const REVEAL_MS = 700;

export const MapStage: React.FC<{
  progress: MotionValue<number>;
  fitScale: MotionValue<number>;
  /** 0 = intro. Past that, the section camera owns the view. */
  activeStep: number;
  /**
   * The stage box's pixel size. The Leaflet container is pinned to THIS, not to
   * the card that crops it — see useElementSize for why.
   */
  stageSize: { w: number; h: number };
  /** Where the active section wants to look; null while the intro owns it. */
  sectionCamera: CameraTarget | null;
  /** Chip selections, used to decide which pins the layer holds. */
  activeIntent: IntentId | null;
  activeRole: CreatorRole | null;
  /** Visible (uncropped) size of the map window, for the pin sieve. */
  windowSize: { w: number; h: number };
  reduced: boolean;
  /** How many pins landed, so the copy's chip row can say so. */
  onPinCount?: (report: { step: number; count: number }) => void;
}> = ({
  progress,
  fitScale,
  activeStep,
  stageSize,
  sectionCamera,
  activeIntent,
  activeRole,
  windowSize,
  reduced,
  onPinCount,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const calibration = useCalibration();
  const t = useTranslations();

  // Latched: once the user has scrolled deep enough we mount Leaflet and keep
  // it forever. Unmounting on scroll-up would re-fetch every tile on the way
  // back down, and Part 2 lives on the far side of this section.
  // Seeded from the current value, not just from "change": under reduced motion
  // progress is pinned at 1 and never emits, so a change-only latch would leave
  // the map unmounted forever.
  const [mounted, setMounted] = useState(() => progress.get() >= RANGES.MAP_MOUNT);
  useMotionValueEvent(progress, "change", (p) => {
    if (!mounted && p >= RANGES.MAP_MOUNT) setMounted(true);
  });

  // The zoom that lines the live map up with frame 120, derived from the card's
  // current geometry rather than hardcoded — see computeZoomForCard.
  const [zoom, setZoom] = useState(() =>
    computeZoomForCard({
      centerLat: calibration.center[0],
      frameSpanMeters: calibration.spanM,
      sourceHeight: FRAME_RUNGS.desktop.height,
      fitScale: 1,
    }),
  );
  useEffect(() => {
    const update = () =>
      setZoom(
        computeZoomForCard({
          centerLat: calibration.center[0],
          frameSpanMeters: calibration.spanM,
          sourceHeight: FRAME_RUNGS.desktop.height,
          // The hand-off happens at progress 1, where the fit has reached cover.
          fitScale: fitScale.get() || 1,
        }),
      );
    update();
    const unsubscribe = fitScale.on("change", update);
    return () => unsubscribe();
  }, [fitScale, calibration]);

  const { map, L, tilesReady, labelsLayer } = useLeafletMap(mapRef, {
    // Also gated on having measured the stage: mounting Leaflet into a
    // zero-sized container leaves it convinced the viewport is 0x0, and its
    // `load` event never fires because there are no tiles to wait for.
    enabled: mounted && stageSize.w > 0 && stageSize.h > 0,
    center: calibration.center,
    zoom,
  });

  const introCamera = useMemo(
    () => ({ center: calibration.center, zoom, animate: false }),
    [zoom, calibration],
  );

  /*
   * Stage two is driven by time, not by scroll, and that is deliberate. A
   * scroll-bound reveal can be scrubbed backwards into a half-lit state where
   * the labels are 40% faded in and the contrast is halfway — visibly wrong and
   * impossible to defend. Once the user is past the seam, the map is simply a
   * map.
   */
  const [revealed, setRevealed] = useState(false);
  const pastSeam = (p: number) => p >= RANGES.CROSSFADE[1] - 0.005;
  useMotionValueEvent(progress, "change", (p) => {
    if (!revealed && tilesReady && pastSeam(p)) setRevealed(true);
  });
  // Same reason as `mounted`: with a pinned progress the only signal that can
  // arrive late is tilesReady, so the seam has to be checked when it lands too.
  //
  // Scoped to the values it actually reads. It used to run on every render,
  // which was harmless while this component re-rendered twice; once the section
  // machine starts driving it, that would be every step change.
  useEffect(() => {
    if (!revealed && tilesReady && pastSeam(progress.get())) setRevealed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pastSeam is a pure
    // local read of module constants; including it would re-run on every render.
  }, [revealed, tilesReady, progress]);

  // One writer for the whole life of the map. See useSectionCamera for why the
  // intro's target has to stop being consulted the moment a section takes over.
  useSectionCamera(map, {
    introTarget: introCamera,
    sectionTarget: activeStep > 0 ? sectionCamera : null,
    handedOff: revealed,
    reduced,
  });

  // Labels ride in with stage two. They are absent during the dissolve because
  // street names appearing out of a blank wash is the loudest possible tell.
  useEffect(() => {
    if (revealed) labelsLayer?.setOpacity(1);
  }, [revealed, labelsLayer]);

  // Pins arrive only after stage two, once the map reads as a map. Dropping
  // them during the dissolve would announce the swap.
  const [pinsAllowed, setPinsAllowed] = useState(false);
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => setPinsAllowed(true), REVEAL_MS);
    return () => clearTimeout(timer);
  }, [revealed]);

  /*
   * Everything on the map, owned in one place.
   *
   * Label text is built here rather than inside the layer because this is where
   * `useTranslations` lives — the pins are HTML strings handed to `L.divIcon`,
   * so nothing downstream is a React component that could call a hook.
   */
  // Mirrors the threshold inside usePinLayers; the label text has to agree with
  // the box the sieve measured, or the two disagree and pins overlap.
  const compactPins = windowSize.w > 0 && windowSize.w < 420;

  usePinLayers(L, map, {
    activeStep,
    intent: activeIntent,
    role: activeRole,
    camera: sectionCamera,
    windowSize,
    enabled: pinsAllowed,
    onCount: onPinCount,
    moodLabel: (a) => t(ambienceLabelKey(a)),
    creatorLabels: (c) => ({
      role: t(roleLabelKey(c.role)),
      // The short form on a phone. Same reasoning as the perk pin's two offer
      // lengths: on a narrow band the text is what sets the plate's width, and
      // the plate's width is what decides how many people are on screen at all.
      status: t(
        compactPins ? statusShortLabelKey(c.status) : statusLabelKey(c.status),
      ),
    }),
    // The compact form, not the sentence. "Oferta activa: 20% off con 150
    // puntos" was written for a tooltip; on a pin it is a 250px plate that
    // crowds out its neighbours and forces the sieve to drop them.
    /*
     * Two lengths, because on a phone the offer line is what sets the label's
     * WIDTH — not the venue name — and in a 358px band that width is the
     * difference between four perk pins and three. The points cost is the part
     * that gives way: the discount is the hook, and the paragraph beside the map
     * already explains that points are how you get it.
     */
    perkLabel: (p) => ({
      offer: t(
        compactPins ? "home.mapIntro.points.pinTiny" : "home.mapIntro.points.pinShort",
        { discount: p.discountPct, points: p.points },
      ),
      // Whose offer it is. Keyed off the perk's own plan so the two alternate
      // across the map rather than every pin making the same claim.
      exclusive: t(`home.mapIntro.points.pinPlan.${p.plan}`),
    }),
    /*
     * The names line is built here so the plural is resolved by ICU rather than
     * concatenated by hand: "Ana, Samuel y 2 más" has to collapse cleanly when
     * the hosts already account for everyone going.
     */
    circleLabels: (c) => {
      const shown = c.hosts.slice(0, 2);
      return {
        title: t(c.titleKey),
        place: `@ ${c.placeName}`,
        people: t("home.mapIntro.circles.pinPeople", {
          names: shown.map((h) => h.name).join(", "),
          rest: Math.max(0, c.going - shown.length),
        }),
      };
    },
  });

  // Stage one, scroll-bound. The counter-motion is what hides the geometric
  // mismatch: the canvas grows slightly as it leaves while the map settles and
  // sharpens as it arrives, so the eye reads movement rather than a swap.
  const ready = tilesReady;
  const mapOpacity = useTransform(progress, RANGES.CROSSFADE, [0, 1], { clamp: true });
  const mapScale = useTransform(progress, RANGES.CROSSFADE, [0.985, 1], { clamp: true });
  const blurPx = useTransform(progress, RANGES.CROSSFADE, [1.5, 0], { clamp: true });
  const filter = useTransform(blurPx, (b) => `blur(${b.toFixed(2)}px)`);

  return (
    <motion.div
      aria-hidden
      className="map-intro-leaflet pointer-events-none absolute inset-0"
      style={{
        // Held at zero until the tiles are actually in. If the network is slow
        // the section simply rests on frame 120 rather than dissolving into a
        // half-loaded grid.
        opacity: calibration.overlay ? 1 : ready ? mapOpacity : 0,
        scale: mapScale,
        filter,
        // The transition itself lives in leafletTheme.css, on the tile pane's
        // `filter` — transitioning a custom property would be a no-op.
        ["--tile-filter" as string]:
          revealed || calibration.overlay ? REST_FILTER : SEAM_FILTER,
      }}
    >
      {/*
        Leaflet takes ownership of its container's children, so it gets an
        element of its own rather than sharing one with React-rendered UI.

        Fixed pixel size, centred rather than stretched to fit. This is the
        mechanism the whole parallax rests on: the card around it changes shape
        for every section, but this box does not, so Leaflet's viewport maths
        never moves and `invalidateSize` never has to run. Centring it with
        `left/top: 50%` + a −50% translate means the map's centre automatically
        coincides with the centre of whatever window is cropping it, which is
        why the pins stay centred in every layout without any offset maths.
      */}
      <div
        ref={mapRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: stageSize.w || "100%",
          height: stageSize.h || "100%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {calibration.overlay && (
        <>
          {/* Split rather than blended: the frame owns the left half, the live
              map the right. A 50% cross-blend of two near-white maps shows
              nothing, whereas a hard seam makes it obvious whether a road
              continues across it or steps sideways. */}
          <img
            src={framePath(FRAME_RUNGS.desktop, FRAME_RUNGS.desktop.frameCount - 1)}
            alt=""
            className="pointer-events-none absolute inset-0 z-[600] h-full w-full object-cover"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[601] w-px bg-red-500/70" />
        </>
      )}

      <div className="pointer-events-auto absolute bottom-2 right-2 z-[500]">
        <div
          className="map-intro-attribution"
          dangerouslySetInnerHTML={{ __html: TILE_ATTRIBUTION }}
        />
      </div>
    </motion.div>
  );
};

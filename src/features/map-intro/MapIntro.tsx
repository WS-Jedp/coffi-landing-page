"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import {
  CARD_START_Y_PCT,
  RANGES,
  TRACK_CLASS,
  chaptersFor,
  introShareFor,
} from "./constants";
import { useSceneProgress } from "./scroll/useSceneProgress";
import { useInViewport } from "./scroll/useInViewport";
import { useProgressAtRest } from "./scroll/useProgressAtRest";
import { useElementSize } from "./scroll/useElementSize";
import { useStageLayout } from "./ui/useStageLayout";
import { useIsMobile } from "./ui/useIsMobile";
import { MAP_RECTS, MAP_RECTS_MOBILE } from "./narrative/layouts";
import { useFrameScrubber } from "./canvas/useFrameScrubber";
import { MapCard } from "./ui/MapCard";
import { MapStage } from "./map/MapStage";
import { DotRail } from "./ui/DotRail";
import { SceneLayer } from "./ui/SceneLayer";
import { useSectionFilters } from "./ui/useSectionFilters";
import { useActiveStep } from "./narrative/useActiveStep";
import { INTENT_CAMERAS } from "./narrative/intents";
import { ROLE_CAMERAS } from "./narrative/creators";
import { BOUNDARIES, SECTIONS, sectionZoom } from "./narrative/sections";

/**
 * The scroll-driven map section.
 *
 * Deliberately one track + one sticky stage, with chapters carving up the
 * progress range. Part 2 must live inside this same stage: were it a sibling
 * <section>, the Leaflet instance would unmount and re-fetch every tile as the
 * user scrolled between parts.
 */
export const MapIntro: React.FC = () => {
  const trackRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // The stage box, measured so the Leaflet container can be pinned to it while
  // the card that crops it changes shape freely.
  const stageRef = useRef<HTMLDivElement | null>(null);

  /*
   * The breakpoint is needed BEFORE the progress hooks, because the chapters are
   * paced differently on a phone and every fraction downstream is derived from
   * them. Read here rather than taken from `useStageLayout` below purely for
   * ordering; `useIsMobile` is a shared media-query subscription either way.
   */
  const isMobile = useIsMobile();
  const chapters = chaptersFor(isMobile);

  const { global, chapter, prefersReducedMotion } = useSceneProgress(trackRef, chapters);

  // Reduced motion renders the end state, statically. Everything downstream is
  // driven by a progress value, so "no animation" is expressed as a progress
  // that is pinned at 1 rather than as a parallel set of static styles.
  const settled = useMotionValue(1);

  /*
   * INTRO-LOCAL, deliberately — this is `chapter.intro`, not `global`.
   *
   * Every `RANGES.*` constant describes a moment inside the intro's own frame
   * sequence (CROSSFADE at 0.9 means "the last tenth of the unfold"). Feeding
   * them global progress worked only while the intro was the entire track. With
   * five chapters the intro is ~26% of it, so global 0.9 would land three
   * sections later: the canvas would never hand off and the map would never
   * appear. The numbers in RANGES did not change — their frame of reference is
   * now stated explicitly instead of being implied by there being only one.
   */
  const introProgress = prefersReducedMotion ? settled : chapter.intro;

  /*
   * The narrative machine reads GLOBAL progress, unlike everything above it.
   * That asymmetry is the point: the intro is scrubbed inside its own chapter,
   * while the sections are activated by where the user is in the whole track.
   */
  const bounds = isMobile ? BOUNDARIES.mobile : BOUNDARIES.desktop;
  const activeStep = useActiveStep(global, {
    activateAt: bounds.activateAt,
    hysteresis: bounds.hysteresis,
  });

  const filters = useSectionFilters();

  /*
   * How many pins the map is showing, lifted out of the map so the chip row can
   * report it.
   *
   * Held here because this component already owns the other thing both sides
   * need — `filters` goes down to the copy and to the stage — so the count
   * travels a path that exists rather than adding one.
   *
   * The identity comparison is not a micro-optimisation. This setter is called
   * from inside Leaflet's layer effect on every rebuild, and a rebuild happens
   * on every chip press and every window resize step; returning the previous
   * object when nothing moved is what keeps that from re-rendering the whole
   * section for no reason.
   */
  const [pinCount, setPinCount] = useState<{
    step: number;
    count: number;
  } | null>(null);

  const handlePinCount = useCallback(
    (report: { step: number; count: number }) =>
      setPinCount((prev) =>
        prev && prev.step === report.step && prev.count === report.count
          ? prev
          : report,
      ),
    [],
  );

  const stageSize = useElementSize(stageRef);
  // The map window's box and the complementary text box, both scrubbed.
  const layout = useStageLayout(global);

  /*
   * The chip's camera, folded in BEFORE the target reaches useSectionCamera.
   *
   * Deliberately composed here rather than letting the camera hook read the
   * filters itself. That hook is the single writer of the map's view, and the
   * one time something else was allowed an opinion the intro kept reclaiming
   * the camera mid-section. Composing upstream keeps the rule intact: the hook
   * still sees exactly one target and knows nothing about chips.
   *
   * Both chip sections now steer: intents in step 1, roles in step 2. The zoom
   * is stamped last and depends only on the breakpoint, so every target within
   * a breakpoint shares it and a chip change stays a pan.
   */
  const zoom = sectionZoom(layout.isMobile);
  const chipCentre =
    activeStep === 1 && filters.intent
      ? INTENT_CAMERAS[filters.intent].center
      : activeStep === 2 && filters.role
        ? ROLE_CAMERAS[filters.role]
        : null;

  const sectionCamera =
    activeStep === 0
      ? null
      : {
          center: chipCentre ?? SECTIONS[activeStep].camera.center,
          zoom,
          animate: true,
        };

  /*
   * The visible window in pixels, for the pin sieve.
   *
   * The Leaflet container is always the whole stage, but only this much of it
   * is not cropped away, and the crop is `overflow-hidden` — so a pin near the
   * edge gets its label sliced. The sieve needs the real number to reject those,
   * and it changes per section and per breakpoint, which is why it is computed
   * from the same MAP_RECTS the window itself is animated from rather than
   * guessed at.
   */
  const rect = (layout.isMobile ? MAP_RECTS_MOBILE : MAP_RECTS)[
    SECTIONS[activeStep].id
  ];
  const windowSize = {
    w: (stageSize.w * rect.w) / 100,
    h: (stageSize.h * rect.h) / 100,
  };

  // ~2.3MB of frames must not compete with the hero's LCP, so fetching only
  // starts once the track is within a viewport of entering.
  const near = useInViewport(trackRef, "100% 0px");
  const { firstPaint, fitScale } = useFrameScrubber(canvasRef, introProgress, {
    enabled: near,
  });

  // The entrance starts wherever the section already sits at rest, not at zero,
  // so the map's resting size is exactly what CARD_START_WIDTH_PX asks for on
  // every viewport height. See useProgressAtRest.
  // Converted from global to intro-local: useProgressAtRest measures against the
  // whole track, and the other end of this range is intro-local. Left unmixed,
  // the resting size would be wrong by the ratio between the two.
  const atRest = Math.min(0.4, useProgressAtRest(trackRef) / introShareFor(isMobile));
  const enterRange: [number, number] = [atRest, RANGES.CARD_ENTER[1]];

  // The card's entrance travel. It used to have a sibling for the intro copy,
  // which has since moved out into the scrolling content column.
  const entranceY = useTransform(
    introProgress,
    enterRange,
    [`${CARD_START_Y_PCT}%`, "0%"],
    { clamp: true },
  );

  // The canvas leaves as the map arrives, growing very slightly on its way out.
  // The counter-motion is what sells the hand-off: the eye reads the frame
  // moving rather than one image being swapped for another.
  const canvasOpacity = useTransform(introProgress, RANGES.CROSSFADE, [1, 0], {
    clamp: true,
  });
  const canvasScale = useTransform(introProgress, RANGES.CROSSFADE, [1, 1.04], {
    clamp: true,
  });

  // The reduced-motion collapse to a single screen lives in TRACK_CLASS as a
  // `motion-reduce:` variant, not as a branch here — see the note there.
  return (
    <section ref={trackRef} className={`relative w-full ${TRACK_CLASS}`}>
      {/*
        Two layers, and their relationship is the whole composition.

        The map is pinned at `z-10`. The copy is a sibling in normal flow — NOT
        a child of the map — which is what makes it behave like the rest of the
        page: it rises from below, passes the map and leaves through the top
        because the page is scrolling, not because anything is animating it.

        Each section decides for itself whether it passes in front of that z-10
        or behind it, per breakpoint. See COPY_DEPTH in narrative/layouts.
      */}
      {/*
        `items-start` on phones, centred from `md` up, and that asymmetry is
        load-bearing rather than cosmetic. The copy on mobile has to clear the
        map band to be readable, and with the stage centred, shrinking the band
        does not free any space at the bottom — it just re-centres the whole
        thing. Only once the stage is pinned to the top does a shorter band turn
        into visible text.

        `pointer-events-none` on the sticky wrapper for the same reason as on
        the stage box below it: this is a full-viewport layout container with no
        surface of its own, and at z-10 it sits over the entire copy column. Left
        interactive it is a sheet of glass across the whole screen — nothing in
        the copy underneath can be clicked anywhere, at any breakpoint.
      */}
      <div className="pointer-events-none sticky top-0 z-10 flex h-svh w-full items-start justify-center px-4 pb-6 pt-14 md:items-center md:px-6 md:pt-20">
        {/* No scroll-driven fade in: the folded map is meant to be sitting
            under the hero banner before the user scrolls at all. The only gate
            is `firstPaint`, because an unpainted canvas is a blank rectangle,
            not a map. */}
        <motion.div
          ref={stageRef}
          style={{ opacity: firstPaint ? 1 : 0 }}
          /*
            Transparent to the pointer, and this is a fix rather than a detail.
            The stage box always spans the full 1200x80svh even when the map
            window inside it is a 46%-tall band, so more than half of it is
            empty — but it still sat above the copy column and swallowed every
            click aimed at the space around the map. Measured on a phone: the
            filter chips were unreachable at every scroll position, and at some
            of them the element receiving the click was this box, over blank
            page. Whatever genuinely needs the pointer opts back in: the map
            pins via `.leaflet-interactive`, the chips and CTA via
            `pointer-events-auto`, the attribution link on its own wrapper.
          */
          /*
            The 80svh ceiling is a DESKTOP number and now says so.

            On a phone it was leaving 113px of the viewport unused below the
            stage, and in the two sections whose map is a bottom band that dead
            strip sat between the map and the edge of the screen — the map
            floating above the floor for no reason, and the copy above it short
            of exactly that much room. Letting the stage take the height the
            sticky wrapper already gives it puts the band on the floor and hands
            the difference to the text.
          */
          className="pointer-events-none relative h-full w-full max-w-[1200px] transition-opacity duration-500 md:max-h-[80svh]"
        >
          <MapCard
            progress={introProgress}
            y={entranceY}
            enterRange={enterRange}
            rect={layout.map}
          >
            <MapStage
              progress={introProgress}
              fitScale={fitScale}
              activeStep={activeStep}
              stageSize={stageSize}
              sectionCamera={sectionCamera}
              activeIntent={filters.intent}
              activeRole={filters.role}
              windowSize={windowSize}
              reduced={prefersReducedMotion}
              onPinCount={handlePinCount}
            />
            <motion.canvas
              ref={canvasRef}
              style={{
                opacity: canvasOpacity,
                scale: canvasScale,
              }}
              // pointer-events-none is not cosmetic: the canvas covers the whole
              // card and outlives its own animation at opacity 0, sitting above
              // the map. Without this it silently swallows every click and hover
              // meant for anything underneath.
              className="pointer-events-none absolute inset-0 block h-full w-full"
            />
          </MapCard>
          <DotRail
            count={SECTIONS.length - 1}
            activeStep={activeStep}
            introProgress={introProgress}
          />

          {process.env.NODE_ENV === "development" && (
            <div
              data-testid="map-intro-step"
              className="pointer-events-none absolute left-3 top-3 z-[520] rounded-lg bg-coffi-black/80 px-2 py-1 font-mono text-[11px] text-coffi-white"
            >
              {activeStep}:{SECTIONS[activeStep].id}
            </div>
          )}
        </motion.div>
      </div>

      <SceneLayer filters={filters} chapters={chapters} pinCount={pinCount} />
    </section>
  );
};

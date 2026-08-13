"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import {
  CARD_START_Y_PCT,
  CHAPTERS,
  INTRO_SHARE,
  RANGES,
  TRACK_CLASS,
} from "./constants";
import { useSceneProgress } from "./scroll/useSceneProgress";
import { useInViewport } from "./scroll/useInViewport";
import { useProgressAtRest } from "./scroll/useProgressAtRest";
import { useElementSize } from "./scroll/useElementSize";
import { useStageLayout } from "./ui/useStageLayout";
import { useFrameScrubber } from "./canvas/useFrameScrubber";
import { MapCard } from "./ui/MapCard";
import { MapStage } from "./map/MapStage";
import { DotRail } from "./ui/DotRail";
import { SceneLayer } from "./ui/SceneLayer";
import { useActiveStep } from "./narrative/useActiveStep";
import {
  SECTIONS,
  SECTION_ACTIVATE_AT,
  SECTION_HYSTERESIS,
} from "./narrative/sections";

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

  const { global, chapter, prefersReducedMotion } = useSceneProgress(trackRef, CHAPTERS);

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
  const activeStep = useActiveStep(global, {
    activateAt: SECTION_ACTIVATE_AT,
    hysteresis: SECTION_HYSTERESIS,
  });

  const stageSize = useElementSize(stageRef);
  // The map window's box and the complementary text box, both scrubbed.
  const layout = useStageLayout(global);

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
  const atRest = Math.min(0.4, useProgressAtRest(trackRef) / INTRO_SHARE);
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
      <div className="sticky top-0 z-10 flex h-svh w-full items-center justify-center px-4 pb-6 pt-20 md:px-6">
        {/* No scroll-driven fade in: the folded map is meant to be sitting
            under the hero banner before the user scrolls at all. The only gate
            is `firstPaint`, because an unpainted canvas is a blank rectangle,
            not a map. */}
        <motion.div
          ref={stageRef}
          style={{ opacity: firstPaint ? 1 : 0 }}
          className="relative h-full max-h-[80svh] w-full max-w-[1200px] transition-opacity duration-500"
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
              sectionCamera={activeStep > 0 ? SECTIONS[activeStep].camera : null}
              reduced={prefersReducedMotion}
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

      <SceneLayer />
    </section>
  );
};

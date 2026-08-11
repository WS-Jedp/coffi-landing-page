"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import {
  CARD_START_Y_PCT,
  CHAPTERS,
  COPY_START_Y_PCT,
  RANGES,
  TRACK_CLASS,
} from "./constants";
import { useSceneProgress } from "./scroll/useSceneProgress";
import { useInViewport } from "./scroll/useInViewport";
import { useProgressAtRest } from "./scroll/useProgressAtRest";
import { useFrameScrubber } from "./canvas/useFrameScrubber";
import { MapCard } from "./ui/MapCard";
import { SceneCopy } from "./ui/SceneCopy";
import { MapStage } from "./map/MapStage";

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

  const { global, prefersReducedMotion } = useSceneProgress(trackRef, CHAPTERS);

  // Reduced motion renders the end state, statically. Everything downstream is
  // driven by a progress value, so "no animation" is expressed as a progress
  // that is pinned at 1 rather than as a parallel set of static styles.
  const settled = useMotionValue(1);
  const progress = prefersReducedMotion ? settled : global;

  // ~2.3MB of frames must not compete with the hero's LCP, so fetching only
  // starts once the track is within a viewport of entering.
  const near = useInViewport(trackRef, "100% 0px");
  const { firstPaint, fitScale } = useFrameScrubber(canvasRef, progress, {
    enabled: near,
  });

  // The entrance starts wherever the section already sits at rest, not at zero,
  // so the map's resting size is exactly what CARD_START_WIDTH_PX asks for on
  // every viewport height. See useProgressAtRest.
  const atRest = useProgressAtRest(trackRef);
  const enterRange: [number, number] = [atRest, RANGES.CARD_ENTER[1]];

  // The entrance travel, owned here rather than inside MapCard because the copy
  // needs a matching one. Both consumers sit in the same full-size box, so a
  // percentage resolves against the same height for each.
  //
  // The copy travels a shorter distance than the card so that at rest it lands
  // just below the folded map rather than on top of it — see COPY_START_Y_PCT.
  const entranceY = useTransform(
    progress,
    enterRange,
    [`${CARD_START_Y_PCT}%`, "0%"],
    { clamp: true },
  );
  const copyEntranceY = useTransform(
    progress,
    enterRange,
    [`${COPY_START_Y_PCT}%`, "0%"],
    { clamp: true },
  );

  // The canvas leaves as the map arrives, growing very slightly on its way out.
  // The counter-motion is what sells the hand-off: the eye reads the frame
  // moving rather than one image being swapped for another.
  const canvasOpacity = useTransform(progress, RANGES.CROSSFADE, [1, 0], {
    clamp: true,
  });
  const canvasScale = useTransform(progress, RANGES.CROSSFADE, [1, 1.04], {
    clamp: true,
  });

  // The reduced-motion collapse to a single screen lives in TRACK_CLASS as a
  // `motion-reduce:` variant, not as a branch here — see the note there.
  return (
    <section ref={trackRef} className={`relative w-full ${TRACK_CLASS}`}>
      <div className="sticky top-0 flex h-svh w-full items-center justify-center px-4 pb-6 pt-20 md:px-6">
        {/* No scroll-driven fade in: the folded map is meant to be sitting
            under the hero banner before the user scrolls at all. The only gate
            is `firstPaint`, because an unpainted canvas is a blank rectangle,
            not a map. */}
        <motion.div
          style={{ opacity: firstPaint ? 1 : 0 }}
          className="relative h-full max-h-[80svh] w-full max-w-[1200px] transition-opacity duration-500"
        >
          <MapCard progress={progress} y={entranceY} enterRange={enterRange}>
            <MapStage progress={progress} fitScale={fitScale} />
            <motion.canvas
              ref={canvasRef}
              style={{
                opacity: canvasOpacity,
                scale: canvasScale,
              }}
              className="absolute inset-0 block h-full w-full"
            />
          </MapCard>
          <motion.div style={{ y: copyEntranceY }} className="absolute inset-0">
            <SceneCopy progress={progress} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

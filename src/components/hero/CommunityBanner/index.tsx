"use client";

import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PhoneShowcase } from "./PhoneShowcase";

interface CommunityBannerProps {
  /** Live creators count shown in the banner (hardcoded for now). */
  count?: number;
  /** City name shown in the banner (hardcoded for now). */
  city?: string;
  /**
   * Community photos (people working, connecting, smiling).
   * TODO: drop images in public/assets/images/community/ and pass their
   * paths here, e.g. ["/assets/images/community/community-1.jpg", ...].
   * While empty, the band renders the vibrant gradient only (no 404s).
   */
  images?: string[];
}

export const CommunityBanner: React.FC<CommunityBannerProps> = ({
  count = 47,
  city = "Medellín",
  images = [],
}) => {
  const t = useTranslations();
  const { redirectToCoffi } = useRedirectToCoffiApp();
  const hasImages = images.length > 0;

  const statusAndCta = (
    <>
      {/* Live count — refined glass pill: soft inner highlight, a dot with
          real glow instead of a flat fill, tighter tracking so it reads as
          a live product stat rather than a plain label. */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-2 pl-2.5 pr-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] backdrop-blur-md">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.65)]" />
        </span>
        <span className="whitespace-nowrap text-xs font-medium tracking-wide text-white/95 md:text-sm">
          {t("home.hero.community.liveCount", { count, city })}
        </span>
      </div>

      {/* Secondary CTA — light on the vibrant band. A lifted shadow + arrow
          micro-interaction on hover instead of a flat color swap. */}
      <button
        type="button"
        onClick={() => redirectToCoffi()}
        className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-2.5 pl-6 pr-5 font-semibold text-sm text-coffi-purple shadow-[0_10px_30px_-8px_rgba(20,10,60,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(20,10,60,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:translate-y-0"
      >
        {t("home.hero.community.cta")}
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="relative w-full"
      data-testid="community-banner"
    >
      {/* Background layers — clipped in their own wrapper so the content row
          below (and PhoneShowcase's intentional overflow) never touches a
          non-`visible` overflow value. Mixing `visible` with a non-visible
          value across x/y on the same box makes the browser silently resolve
          the `visible` axis to `auto`, turning this into a real scroll
          container — that was the source of the reported internal scroll. */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 coffi-gradient-blue-to-purple" />

        {/* Optional community photo collage behind an overlay for legibility */}
        {hasImages && (
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 opacity-25">
            {images.slice(0, 4).map((src, i) => (
              <div key={i} className="relative w-full h-full">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-coffi-purple/40 via-transparent to-coffi-blue/40 mix-blend-multiply" />
      </div>

      {/* Inner content — capped to the header width */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-4 md:px-5 py-8 md:py-9 flex flex-col items-start gap-3 md:gap-0">
        {/* Row A — headline + phone, always a row, always left-aligned.
            From md up there's plenty of width beside the phone column, so
            the status/CTA row rejoins inline below the text (matching the
            original single-row layout's height); below md it needs its own
            full-width row (see Row B) so the live-count pill has room. */}
        <div className="w-full flex flex-row items-start gap-2 sm:gap-3 md:gap-10">
          <div className="min-w-0 flex-1 text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
              {t("home.hero.community.title")}
            </h3>
            <p className="mt-1.5 md:mt-2 text-[13px] sm:text-sm md:text-[15px] font-light text-white/80 leading-relaxed max-w-[540px]">
              <span className="inline md:block">
                {t("home.hero.community.subtitle")}
              </span>{" "}
              <span className="inline md:block">
                {t("home.hero.community.subtitleSecondary")}
              </span>
            </p>

            <div className="hidden md:flex md:items-center md:gap-4 md:mt-4">
              {statusAndCta}
            </div>
          </div>

          <PhoneShowcase />
        </div>

        {/* Row B — status badge + CTA, full content width so it never
            competes with the phone column for space. Mobile/tablet only. */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 md:hidden">
          {statusAndCta}
        </div>
      </div>
    </motion.section>
  );
};

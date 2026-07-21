"use client";

import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="relative w-full overflow-hidden"
    >
      {/* Vibrant full-width brand gradient */}
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

      {/* Inner content — capped to the header width */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-4 md:px-5 py-8 md:py-9 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
            {t("home.hero.community.title")}
          </h3>
          <p className="mt-2 text-sm md:text-[15px] font-light text-white/80 leading-relaxed max-w-[540px] mx-auto md:mx-0">
            {t("home.hero.community.subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          {/* Live count */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3.5 py-2 border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-xs md:text-sm font-medium text-white whitespace-nowrap">
              {t("home.hero.community.liveCount", { count, city })}
            </span>
          </div>

          {/* Secondary CTA — light on the vibrant band */}
          <button
            type="button"
            onClick={() => redirectToCoffi()}
            className="whitespace-nowrap rounded-full bg-white text-coffi-purple font-semibold text-sm py-2.5 px-6 shadow-md shadow-coffi-purple/20 hover:bg-coffi-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {t("home.hero.community.cta")}
          </button>
        </div>
      </div>
    </motion.section>
  );
};

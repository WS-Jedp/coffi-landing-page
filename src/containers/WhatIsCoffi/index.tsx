"use client";

import { CommunityBanner } from "@/components/hero/CommunityBanner";
import { HeroSearchForm } from "@/components/hero/HeroSearchForm";

export const WhatIsCoffi: React.FC = () => {
  return (
    <article id="features" className="relative w-full pt-6 md:pt-10 mb-12">
      {/* Search form — centered single column, given more vertical presence */}
      <div className="w-full max-w-[860px] mx-auto px-4 md:px-5 min-h-[58vh] md:min-h-[36vh] flex flex-col justify-center">
        <HeroSearchForm />
      </div>

      {/* Community banner — full-bleed band; inner content capped to header width.
          mx-[calc(50%-50vw)] breaks the band out to the full viewport width; the
          page's outer section has overflow-hidden so no horizontal scroll appears. */}
      <div className="mt-14 md:mt-20 mx-[calc(50%-50vw)]">
        <CommunityBanner count={47} city="Medellín" />
      </div>
    </article>
  );
};

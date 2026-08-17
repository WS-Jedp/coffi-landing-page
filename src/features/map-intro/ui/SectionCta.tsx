"use client";

import { useTranslations } from "next-intl";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import type { IntentId } from "../narrative/intents";

/**
 * The closing call to action.
 *
 * Carries the intent the user picked back in the first section, if they picked
 * one. `IntentId` values are literally the `purpose` values the app's URL
 * accepts — that alignment was the reason for choosing them — so somebody who
 * clicked "Creativity" here lands in the app already filtered for it instead of
 * on a blank search.
 */
export const SectionCta: React.FC<{ intent: IntentId | null }> = ({ intent }) => {
  const t = useTranslations();
  const { redirectToCoffiWithFilters } = useRedirectToCoffiApp();

  return (
    <div className="mt-6 md:mt-9">
      <button
        type="button"
        onClick={() => redirectToCoffiWithFilters({ purpose: intent })}
        // pointer-events-auto for the same reason the chips have it: the copy
        // column is transparent to the pointer so it can never eat a scroll.
        className="pointer-events-auto inline-flex items-center rounded-full coffi-gradient-blue-to-purple px-6 py-2.5 md:px-7 md:py-3 text-[0.9375rem] font-semibold text-white shadow-md shadow-coffi-purple/30 transition-all duration-300 hover:shadow-lg hover:shadow-coffi-purple/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffi-purple/50 focus-visible:ring-offset-2 md:text-lg"
      >
        {t("home.mapIntro.circles.cta")}
      </button>

      <p className="mt-5 md:mt-7 text-[0.9375rem] font-semibold text-coffi-black md:text-xl">
        {t("home.mapIntro.circles.closing")}
      </p>
    </div>
  );
};

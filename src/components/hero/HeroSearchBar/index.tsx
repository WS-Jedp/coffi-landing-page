"use client";

import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useRef, useState } from "react";

type SegmentId = "purpose" | "needs" | "placeType";

const SEGMENTS: {
  id: SegmentId;
  icon: React.ElementType;
  labelKey: string;
  optionKey: string;
  options: string[];
  multi: boolean;
}[] = [
  {
    id: "purpose",
    icon: Sparkles,
    labelKey: "home.hero.purposeLabel",
    optionKey: "home.hero.purposeOptions",
    options: ["focus", "creativity", "collaboration", "connection", "recharge"],
    multi: false,
  },
  {
    id: "needs",
    icon: Sliders,
    labelKey: "home.hero.needsLabel",
    optionKey: "home.hero.needsOptions",
    options: ["stableWifi", "quiet", "goodLight", "inspiring", "spacious"],
    multi: true,
  },
  {
    id: "placeType",
    icon: MapPin,
    labelKey: "home.hero.placeTypeLabel",
    optionKey: "home.hero.placeTypeOptions",
    options: ["cafe", "library", "viewpoint", "rooftop", "coworking"],
    multi: false,
  },
];

export const HeroSearchBar: React.FC = () => {
  const t = useTranslations();
  const { redirectToCoffiWithFilters } = useRedirectToCoffiApp();

  const [purpose, setPurpose] = useState<string | null>(null);
  const [placeType, setPlaceType] = useState<string | null>(null);
  const [needs, setNeeds] = useState<string[]>([]);
  const [openSegment, setOpenSegment] = useState<SegmentId | null>(null);

  const barRef = useRef<HTMLDivElement>(null);

  // Close the open dropdown on outside click / Escape.
  useEffect(() => {
    if (!openSegment) return;
    const onPointerDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenSegment(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSegment(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openSegment]);

  const hasValue = (id: SegmentId) =>
    id === "purpose" ? !!purpose : id === "placeType" ? !!placeType : needs.length > 0;

  const isOptionSelected = (id: SegmentId, value: string) =>
    id === "purpose"
      ? purpose === value
      : id === "placeType"
      ? placeType === value
      : needs.includes(value);

  const selectOption = (id: SegmentId, value: string) => {
    if (id === "purpose") {
      setPurpose((prev) => (prev === value ? null : value));
      setOpenSegment(null);
    } else if (id === "placeType") {
      setPlaceType((prev) => (prev === value ? null : value));
      setOpenSegment(null);
    } else {
      setNeeds((prev) =>
        prev.includes(value) ? prev.filter((n) => n !== value) : [...prev, value]
      );
    }
  };

  // Compact value shown under each segment label.
  const segmentValue = (id: SegmentId, optionKey: string) => {
    if (id === "purpose")
      return purpose ? t(`${optionKey}.${purpose}`) : t("home.hero.select");
    if (id === "placeType")
      return placeType ? t(`${optionKey}.${placeType}`) : t("home.hero.select");
    if (needs.length === 0) return t("home.hero.select");
    if (needs.length === 1) return t(`${optionKey}.${needs[0]}`);
    return t("home.hero.needsSelected", { count: needs.length });
  };

  const ctaLabel = `${t("home.hero.cta")} →`;

  return (
    <div
      ref={barRef}
      className="relative w-full flex flex-col lg:flex-row lg:items-center bg-white/95 backdrop-blur-sm rounded-[26px] lg:rounded-full border border-coffi-black/[0.07] shadow-[0_14px_44px_-16px_rgba(83,63,255,0.28)] p-1.5 lg:pl-2.5 lg:pr-1.5"
    >
      {SEGMENTS.map((seg, i) => {
        const Icon = seg.icon;
        const isOpen = openSegment === seg.id;
        const active = hasValue(seg.id) || isOpen;

        return (
          <Fragment key={seg.id}>
            {i > 0 && (
              <span
                aria-hidden
                className="shrink-0 bg-coffi-black/[0.08] h-px w-full lg:h-7 lg:w-px lg:self-center"
              />
            )}

            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenSegment((prev) => (prev === seg.id ? null : seg.id))
                }
                className={`w-full flex items-center gap-2.5 text-left rounded-[20px] lg:rounded-full px-3.5 py-2 transition-colors duration-200 ${
                  isOpen
                    ? "bg-coffi-purple/[0.05]"
                    : "hover:bg-coffi-black/[0.03]"
                }`}
              >
                <Icon
                  className={`shrink-0 h-[18px] w-[18px] transition-colors ${
                    active ? "text-coffi-purple" : "text-coffi-black/40"
                  }`}
                  strokeWidth={1.75}
                />
                <span className="flex flex-col min-w-0">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-coffi-black/40 whitespace-nowrap leading-none">
                    {t(seg.labelKey)}
                  </span>
                  <span
                    className={`mt-1.5 flex items-center gap-1 whitespace-nowrap leading-none text-[13px] ${
                      hasValue(seg.id)
                        ? "font-semibold text-coffi-black"
                        : "font-normal text-coffi-black/50"
                    }`}
                  >
                    {segmentValue(seg.id, seg.optionKey)}
                    <ChevronDown
                      className={`h-3 w-3 shrink-0 text-coffi-black/35 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </span>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    role="listbox"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute left-0 right-0 lg:right-auto top-full mt-2.5 z-50 lg:min-w-[230px] rounded-2xl bg-white border border-coffi-black/[0.06] shadow-[0_18px_50px_-14px_rgba(83,63,255,0.3)] p-1.5"
                  >
                    {seg.options.map((opt) => {
                      const selected = isOptionSelected(seg.id, opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => selectOption(seg.id, opt)}
                          className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-[13px] transition-colors duration-150 ${
                            selected
                              ? "bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple font-medium"
                              : "text-coffi-black/80 hover:bg-coffi-black/[0.04]"
                          }`}
                        >
                          <span className="truncate">
                            {t(`${seg.optionKey}.${opt}`)}
                          </span>
                          {selected && (
                            <Check
                              className="h-4 w-4 shrink-0"
                              strokeWidth={2.25}
                            />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Fragment>
        );
      })}

      {/* Primary CTA — full labelled pill on mobile, circular icon on desktop */}
      <button
        type="button"
        aria-label={ctaLabel}
        title={ctaLabel}
        onClick={() => redirectToCoffiWithFilters({ purpose, placeType, needs })}
        className="mt-1.5 lg:mt-0 lg:ml-1.5 shrink-0 flex items-center justify-center gap-1.5 coffi-gradient-blue-to-purple text-white font-semibold rounded-full shadow-md shadow-coffi-purple/30 hover:shadow-lg hover:shadow-coffi-purple/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-coffi-purple/40 w-full py-3 text-sm lg:w-[52px] lg:h-[52px] lg:py-0"
      >
        <span className="lg:hidden">{ctaLabel}</span>
        <ArrowRight className="hidden lg:block h-5 w-5" strokeWidth={2.25} />
      </button>
    </div>
  );
};

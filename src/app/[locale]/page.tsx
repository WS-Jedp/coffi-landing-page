"use client";
import { Benefits } from "@/containers/Benefits";
import { CallToActionBanner } from "@/containers/CallToActionBanner";
import { HowItWorks } from "@/containers/HowItWorks";
import { Purpose } from "@/containers/Purpose";
import { Subscriptions } from "@/containers/Subscriptions";
import { WhatIsCoffi } from "@/containers/WhatIsCoffi";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-items-center w-full min-h-screen">
      <div className="w-full max-w-[1200px] mx-auto">
        <WhatIsCoffi />
        <HowItWorks />
        <Benefits />
        <Subscriptions />
      </div>
      <CallToActionBanner />
      <div className="w-full max-w-[1200px] mx-auto">
        <Purpose />
      </div>
    </section>
  );
}

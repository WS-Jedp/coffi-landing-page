"use client"
import { Benefits } from "@/containers/Benefits";
import { HowItWorks } from "@/containers/HowItWorks";
import { Purpose } from "@/containers/Purpose";
import { WhatIsCoffi } from "@/containers/WhatIsCoffi";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-items-center w-full min-h-screen">

     <WhatIsCoffi />
     <HowItWorks />
     <Benefits />
     <Purpose />

     
    </section>
  );
}

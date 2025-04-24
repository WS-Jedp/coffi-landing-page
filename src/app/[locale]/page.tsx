"use client";
import { Benefits } from "@/containers/Benefits";
import { CallToActionBanner } from "@/containers/CallToActionBanner";
import { HowItWorks } from "@/containers/HowItWorks";
import { Purpose } from "@/containers/Purpose";
import { Subscriptions } from "@/containers/Subscriptions";
import { WhatIsCoffi } from "@/containers/WhatIsCoffi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Custom component for animating sections
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Custom easing
        },
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Improved component for the flowing tech lines
const FlowingLines: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 mix-blend-soft-light pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-coffi-purple/30 to-transparent"
          style={{
            width: "120%",
            left: "-10%",
            top: `${10 + i * 12}%`,
            opacity: 0.3 + (i % 3) * 0.2,
          }}
          animate={{
            x: ["-5%", "5%", "-5%"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            x: {
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 8 + i * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
};

// Improved noise texture overlay component
const NoiseOverlay: React.FC = () => {
  // Use a pre-defined noise pattern instead of dynamic SVG generation
  // This helps ensure it's visible across browsers
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-15"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  );
};

export default function Home() {
  // Enhanced circle animation variants with more constrained movement
  const floatingCircleVariants = {
    animate: (custom: number) => ({
      y: [custom / 2, -custom / 2, custom / 2], // Reduced movement range
      x: [-custom / 3, custom / 3, -custom / 3], // Reduced movement range
      rotate: [0, custom / 4, 0, -custom / 4, 0],
      scale: [1, 1 + custom / 120, 1],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 5 + Math.random() * 3,
          ease: "easeInOut",
        },
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 7 + Math.random() * 4,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 20 + Math.random() * 10,
          ease: "easeInOut",
        },
        scale: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 12 + Math.random() * 8,
          ease: "easeInOut",
        },
      },
    }),
  };

  return (
    <section className="relative flex flex-col items-center justify-items-center w-full min-h-screen overflow-hidden">
      {/* Enhanced Gradient Circle Background Elements - fixed positioning */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Add a base background gradient for better visibility */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-slate-900/5"></div>

        {/* Top-left large circle - repositioned */}
        <motion.div
          className="absolute top-[5%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-coffi-purple/15 via-blue-400/10 to-pink-200/5 blur-3xl"
          style={{
            backgroundSize: "200% 200%",
            mixBlendMode: "soft-light",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
          custom={15}
          variants={floatingCircleVariants}
        />

        {/* Add flowing tech lines */}
        <FlowingLines />
        <NoiseOverlay />

        {/* Enhanced sparkle effects */}
        <div className="absolute w-full h-full">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute rounded-full bg-gradient-radial from-white to-transparent"
              style={{
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                left: `${5 + Math.random() * 90}%`, // Keep sparkles within viewport
                top: `${5 + Math.random() * 90}%`, // Keep sparkles within viewport
                opacity: 0.4 + Math.random() * 0.3,
                filter: "blur(0.5px)",
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.8, 1],
                x: [0, Math.random() * 10 - 5, 0],
                y: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <WhatIsCoffi />
        <HowItWorks />

        <Benefits />

        <Subscriptions />
      </div>

      <AnimatedSection delay={0.1}>
        <CallToActionBanner />
      </AnimatedSection>

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
          <Purpose />
      </div>
    </section>
  );
}

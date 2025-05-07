"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SimpleDarkButton } from "@/components/buttons";
import { ArrowRight, AlertCircle, XCircle, Info, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Error particle component - simplified version of celebration
const ErrorParticle = () => {
  // Create random values for natural movement
  const size = Math.random() * 4 + 2; // 2-6px (smaller than celebration)
  const startX = Math.random() * 100; // 0-100%
  const startY = 30 + Math.random() * 40; // 30-70% (center-ish of screen)
  const delay = Math.random() * 2; // 0-2s
  const duration = Math.random() * 8 + 7; // 7-15s
  const opacity = Math.random() * 0.5 + 0.2; // 0.2-0.7 (more subtle)

  // Simpler shape types for error state
  const shapeTypes = ["circle", "square"];
  const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

  // Error color palette
  const colors = [
    "rgba(255, 100, 100, 0.7)", // Red
    "rgba(255, 150, 150, 0.7)", // Light red
    "rgba(200, 80, 80, 0.7)",   // Dark red
    "rgba(255, 255, 255, 0.5)", // White (subtle)
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Define shape clip path
  let clipPath = "none";
  if (shapeType === "square") {
    clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  }

  // Calculate random angle for movement (more subtle)
  const angle = Math.random() * 360;
  const distance = 30 + Math.random() * 100; // Less movement than celebration

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${startX}%`,
        top: `${startY}%`,
        opacity: opacity,
        backgroundColor: color,
        boxShadow: `0 0 5px 1px ${color}`,
        animation: `errorFloat ${duration}s linear ${delay}s infinite`,
        borderRadius: shapeType === "circle" ? "50%" : "0",
        clipPath: clipPath,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};

export default function NomadPlanFailedPage() {
  const t = useTranslations();
  const [particles, setParticles] = useState<number[]>([]);
  const router = useRouter();
  const locale = useLocale();

  // Initialize particles on component mount
  useEffect(() => {
    setParticles(Array.from({ length: 30 }, (_, i) => i)); // Fewer particles

    // Add animation keyframes to document
    if (!document.querySelector("#error-animation-keyframes")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "error-animation-keyframes";
      styleSheet.textContent = `
        @keyframes errorFloat {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 0;
          }
          5% {
            opacity: var(--opacity);
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate(
              calc(cos(var(--angle)) * var(--distance) * 1px), 
              calc(sin(var(--angle)) * var(--distance) * 1px)
            ) 
            rotate(360deg) scale(0);
            opacity: 0;
          }
        }

        .text-glow-red {
          text-shadow: 0 0 10px rgba(255, 100, 100, 0.8), 0 0 20px rgba(255, 100, 100, 0.4);
        }

        .icon-glow-red {
          filter: drop-shadow(0 0 8px rgba(255, 100, 100, 0.8));
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.21, 0.45, 0.15, 1], // Custom easing for elegant motion
      },
    },
  };

  // Redirect to subscription page
  const redirectToSubscribePage = () => {
    router.push(`/${locale}/subscribe-nomad-plan`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-500/80 to-red-400/80 backdrop-blur-lg py-10 px-4 md:py-20">
      {/* Error particles container - fewer particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((index) => (
          <ErrorParticle key={index} />
        ))}
      </div>

      <motion.div
        className="max-w-3xl mx-auto bg-gradient-to-br from-red-500/60 to-red-400/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl text-center p-8 md:p-12 relative z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.15,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-red-400 rounded-full p-6 mb-6"
          >
            <XCircle className="text-white h-16 w-16" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t("subscriptions.nomad.failed.title", {
              defaultValue: "Payment Failed",
            })}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6"
          >
            <AlertCircle className="text-red-300 icon-glow-red" size={20} />
            <p className="text-white font-medium text-glow-red">
              {t("subscriptions.nomad.failed.paymentError", {
                defaultValue: "We couldn't process your payment",
              })}
            </p>
            <AlertCircle className="text-red-300 icon-glow-red" size={20} />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-white/90 text-lg max-w-2xl mb-8"
          >
            {t("subscriptions.nomad.failed.errorMessage", {
              defaultValue: "There was an issue processing your payment for the Nomad Plan. Please check your payment details and try again.",
            })}
          </motion.p>

          <motion.div
            className="bg-white/10 backdrop-blur p-6 rounded-xl mb-8 max-w-lg w-full"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Info className="text-white" size={20} />
              {t("subscriptions.nomad.failed.whatToDo", {
                defaultValue: "What to do next?",
              })}
            </h2>

            <ul className="text-left space-y-3">
              {[
                t("subscriptions.nomad.failed.nextSteps.checkCard", {
                  defaultValue:
                    "Check your card details and ensure they're correct",
                }),
                t("subscriptions.nomad.failed.nextSteps.verifyFunds", {
                  defaultValue: "Verify you have sufficient funds available",
                }),
                t("subscriptions.nomad.failed.nextSteps.tryAgain", {
                  defaultValue: "Try again or use a different payment method",
                }),
              ].map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                >
                  <HelpCircle className="text-red-300 icon-glow-red shrink-0 mt-1" size={18} />
                  <span className="text-white/90">{step}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full max-w-md"
          >
            <SimpleDarkButton
              action={redirectToSubscribePage}
              text={t("subscriptions.nomad.failed.actions.tryAgain", {
                defaultValue: "Try Payment Again",
              })}
              full
            />
            <p className="text-xs text-white/60 mt-4">
              <Link href={`/${locale}/contact-us`} className="text-white underline">
                {t("subscriptions.nomad.failed.contactSupport", {
                  defaultValue: "If you continue to have issues, please contact our support team",
                })}
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}

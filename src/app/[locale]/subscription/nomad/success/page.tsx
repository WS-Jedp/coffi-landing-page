"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SimpleDarkButton } from "@/components/buttons";
import { ArrowRight, CheckCircle, Coffee, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";

// Celebration particle component
const CelebrationParticle = () => {
  // Create random values for natural movement
  const size = Math.random() * 6 + 3; // 3-9px
  const startX = Math.random() * 100; // 0-100%
  const startY = 30 + Math.random() * 40; // 30-70% (center-ish of screen)
  const delay = Math.random() * 2; // 0-2s
  const duration = Math.random() * 10 + 5; // 5-15s
  const pulseSpeed = Math.random() * 3 + 2; // 2-5s for pulse animation
  const opacity = Math.random() * 0.7 + 0.3; // 0.3-1.0

  // Choose between different shapes
  const shapeTypes = ["circle", "star", "triangle", "square"];
  const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

  // Random color from coffi palette
  const colors = [
    "rgba(190, 149, 255, 0.9)", // Purple
    "rgba(100, 160, 255, 0.9)", // Blue
    "rgba(255, 145, 248, 0.9)", // Pink (replacing gold)
    "rgba(255, 255, 255, 0.9)", // White
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Define shape clip path
  let clipPath = "none";
  switch (shapeType) {
    case "star":
      clipPath =
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
      break;
    case "triangle":
      clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
      break;
    case "square":
      clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      break;
    default:
      clipPath = "none"; // circle
  }

  // Calculate random angle for movement
  const angle = Math.random() * 360;
  const distance = 50 + Math.random() * 300; // How far the particle travels

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
        boxShadow: `0 0 10px 2px ${color}`,
        animation: `celebrateFloat ${duration}s linear ${delay}s infinite, celebratePulse ${pulseSpeed}s ease-in-out infinite alternate`,
        borderRadius: shapeType === "circle" ? "50%" : "0",
        clipPath: clipPath,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};

export default function NomadPlanSuccessPage() {
  const t = useTranslations();
  const [particles, setParticles] = useState<number[]>([]);
  const [userEmail, setUserEmail] = useState<string>(); // Placeholder for any additional state
  const { redirectToCoffi } = useRedirectToCoffiApp()

  // Initialize particles on component mount
  useEffect(() => {
    setParticles(Array.from({ length: 70 }, (_, i) => i));

    // Add animation keyframes to document
    if (!document.querySelector("#celebration-animation-keyframes")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "celebration-animation-keyframes";
      styleSheet.textContent = `
        @keyframes celebrateFloat {
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
        
        @keyframes celebratePulse {
          0% {
            box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.4);
            opacity: 0.4;
          }
          50% {
            box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.8);
            opacity: 0.8;
          }
          100% {
            box-shadow: 0 0 15px 6px rgba(255, 255, 255, 0.9);
            opacity: 1;
          }
        }

        .text-glow-purple {
          text-shadow: 0 0 10px rgba(190, 149, 255, 0.8), 0 0 20px rgba(190, 149, 255, 0.4);
        }

        .icon-glow-purple {
          filter: drop-shadow(0 0 8px rgba(190, 149, 255, 0.8));
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    if (email) {
      setUserEmail(email);
    }
  }, [])

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

  
  

  // Get username dynamically from URL (in real app - or via context)
  const username = "Nomad"; // Default placeholder

  return (
    <main className="min-h-screen bg-gradient-to-br from-coffi-blue/80 to-coffi-purple/80 backdrop-blur-lg py-10 px-4 md:py-20">
      {/* Celebration particles container */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((index) => (
          <CelebrationParticle key={index} />
        ))}
      </div>

      <motion.div
        className="max-w-3xl mx-auto bg-gradient-to-br from-coffi-purple/60 to-coffi-blue/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl text-center p-8 md:p-12 relative z-20"
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
            className="bg-coffi-purple-400/30 rounded-full p-6 mb-6"
          >
            <CheckCircle className="text-coffi-white h-16 w-16" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t("subscriptions.nomad.success.title", {
              defaultValue: "Welcome to Coffi Nomad Plan!",
            })}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="text-coffi-purple-300 icon-glow-purple" size={20} />
            <p className="text-coffi-white font-medium text-glow-purple">
              {t("subscriptions.nomad.success.nomadPlanUnlocked", {
                defaultValue: "Your premium access is now active",
              })}
            </p>
            <Sparkles className="text-coffi-purple-300 icon-glow-purple" size={20} />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-coffi-white/90 text-lg max-w-2xl mb-8"
          >
            {t("subscriptions.nomad.success.welcomeMessage", {
              defaultValue: `Thanks for joining Coffi, ${username}! Your subscription to the Nomad Plan is now active. You now have full access to all premium features.`,
            })}
          </motion.p>
          
          {userEmail && (
            <motion.p
              variants={itemVariants}
              className="text-coffi-white text-base mb-6"
            >
              <span>
                {t("subscriptions.nomad.success.emailConfirmation", {
                  defaultValue: "Subscription confirmed with:",
                })}
              </span>{" "}
              <span className="text-coffi-white font-semibold">{userEmail}</span>
            </motion.p>
          )}

          <motion.div
            className="bg-coffi-white/10 backdrop-blur p-6 rounded-xl mb-8 max-w-lg w-full"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Coffee className="text-coffi-white" size={20} />
              {t("subscriptions.nomad.success.whatsNext", {
                defaultValue: "What happens next?",
              })}
            </h2>

            <ul className="text-left space-y-3">
              {[
                t("subscriptions.nomad.success.nextSteps.explore", {
                  defaultValue:
                    "Explore exclusive Coffi spots around the world",
                }),
                t("subscriptions.nomad.success.nextSteps.connect", {
                  defaultValue: "Connect with other nomads and professionals",
                }),
                t("subscriptions.nomad.success.nextSteps.enjoy", {
                  defaultValue: "Enjoy special discounts at partner locations",
                }),
              ].map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                >
                  <Star className="text-coffi-purple-300 icon-glow-purple shrink-0 mt-1" size={18} />
                  <span className="text-coffi-white/90">{step}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full max-w-md"
          >
            <SimpleDarkButton
              shimmer
              action={redirectToCoffi}
              text={t("actions.general.startDiscovering", {
                defaultValue: "Go to the App",
              })}
              full
            />
            <p className="text-xs text-coffi-white/60 mt-4">
              {t("subscriptions.nomad.success.receiptEmail", {
                defaultValue: "A receipt has been sent to your email",
              })}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

// Particle component for premium animation - reused from subscribe page
const Particle = () => {
  // Create random values for natural movement
  const size = Math.random() * 4 + 2; // 2-6px
  const startPosition = Math.random() * 100; // 0-100%
  const delay = Math.random() * 10; // 0-10s
  const duration = Math.random() * 10 + 10; // 10-20s
  const pulseSpeed = Math.random() * 3 + 2; // 2-5s for pulse animation
  const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
  const starPoints = Math.random() > 0.7 ? 5 : 4; // Mix of 4 and 5 pointed stars

  return (
    <div
      className="absolute bottom-0 pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${startPosition}%`,
        opacity: opacity,
        backgroundColor: "rgba(190, 149, 255, 0.8)", // Light coffi purple
        boxShadow: "0 0 8px 2px rgba(190, 149, 255, 0.7)", // Enhanced purple glow
        animation: `float ${duration}s linear ${delay}s infinite, pulse ${pulseSpeed}s ease-in-out infinite alternate`,
        borderRadius: starPoints === 4 ? "50%" : "0", // Circle or star shape
        clipPath:
          starPoints === 5
            ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
            : "none",
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};

export default function PaymentStatus() {
  const router = useRouter();

  const t = useTranslations();
  const locale = useLocale();
  const [particles, setParticles] = useState<number[]>([]);


  const validateStatusPayment = async () => {
    const wompiTransactionAPIUrl = process.env.NEXT_PUBLIC_WOMPI_URL;
    // Payment id from query param
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    if (!id) {
      console.error("No transaction ID found in URL");
      return; // Early return if ID is missing
    }
    const resp = await fetch(`${wompiTransactionAPIUrl}/transactions/${id}`);
    const data = await resp.json();

    return { status: data.data.status, email, coffiSubscriptionId: data.data.reference };
  };

  useEffect(() => {
    validateStatusPayment().then((data) => {
      if (!data || data.status !== "APPROVED") {
        router.push(`/${locale}/subscription/nomad/failed?email=${data?.email}&subscriptionId=${data?.coffiSubscriptionId}`);
      } else {
        router.push(`/${locale}/subscription/nomad/success?email=${data?.email}&subscriptionId=${data?.coffiSubscriptionId}`);
      }
    }).catch((error) => {
      console.error("Error fetching payment status:", error);
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      router.push(`/${locale}/subscription/nomad/failed?wompiId=${id}`);
    });
  }, []);
  // Initialize particles on component mount
  useEffect(() => {
    setParticles(Array.from({ length: 42 }, (_, i) => i));

    // Add animation keyframes to document if not already present
    if (!document.querySelector("#particle-animation-keyframes")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "particle-animation-keyframes";
      styleSheet.textContent = `
        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 4px 1px rgba(190, 149, 255, 0.4);
            opacity: 0.3;
          }
          50% {
            box-shadow: 0 0 10px 4px rgba(190, 149, 255, 0.8);
            opacity: 0.6;
          }
          100% {
            box-shadow: 0 0 15px 6px rgba(190, 149, 255, 0.9);
            opacity: 0.9;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.1, 0.5, 0.3, 1],
      },
    },
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-coffi-blue to-coffi-purple backdrop-blur-lg flex items-center justify-center py-10 px-4 md:py-20 fixed top-0 z-[999]">
      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((index) => (
          <Particle key={index} />
        ))}
      </div>

      <motion.div
        className="max-w-lg mx-auto bg-gradient-to-br from-coffi-purple/60 to-coffi-blue/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex justify-center">
            <motion.div
              className="p-4 bg-coffi-purple-100/20 rounded-full inline-flex"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(190, 149, 255, 0.3)",
                  "0 0 0 15px rgba(190, 149, 255, 0)",
                  "0 0 0 0 rgba(190, 149, 255, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Loader className="w-10 h-10 text-white animate-spin" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          {t("subscriptions.payments.status.processing.title")}
        </motion.h1>

        <motion.p
          className="text-coffi-white/80 text-lg mb-6"
          variants={itemVariants}
        >
          {t("subscriptions.payments.status.processing.description")}
        </motion.p>

        <motion.div
          className="text-center text-coffi-white/60 text-sm"
          variants={itemVariants}
        >
          {t("subscriptions.payments.status.processing.note")}
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          variants={itemVariants}
        >
          <div className="flex space-x-2 justify-center">
            <div
              className="w-2 h-2 rounded-full bg-white/70 animate-pulse"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-white/70 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-white/70 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

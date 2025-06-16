import { SimpleButton } from "@/components/buttons";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { BiMouse } from "react-icons/bi";

export const WhatIsCoffi: React.FC = () => {
  const { redirectToCoffi } = useRedirectToCoffiApp();
  const t = useTranslations();
  const currentLocale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const screenshotsSectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for each screenshot
  const leftImageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const centerImageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Animation trigger effect
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // Ensure state is reset when unmounting
  }, []);

  // Text animation variants with improved easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0, // Increased for smoother motion
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve for smoother motion
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5, // Slightly increased for smoother exit
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7, // Increased for smoother motion
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
        delay: 0.6,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeInOut" }, // Added ease-in-out for hover
    },
  };

  // Shimmer effect variants with smoother animation
  const shimmerVariants = {
    animate: {
      x: ["100%", "-100%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 8, // Increased duration for smoother effect
        ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
      },
    },
  };

  return (
    <article
      id="features" // Add ID for smooth scrolling
      ref={containerRef}
      className="flex flex-col md:flex-row items-start md:items-center justify-between w-full min-h-full h-auto md:min-h-auto md:h-[90vh] mb-12 md:mb-auto pt-6 md:pt-0 px-6 xl:px-0 relative"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.section
            className="w-full md:w-8/12 relative z-[99]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.h2
              className="font-bold text-4xl md:text-7xl text-center md:text-start text-gray-900 drop-shadow-sm"
              variants={itemVariants}
            >
              {t("home.discoverPlacesInCity", { city: "Medellín" })} <br />
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center justify-center md:justify-start flex-wrap"
              >
                {t("home.toElevate")}{" "}
                {/* dynamic word with shimmer effect - improved for mobile */}
                <span className="ml-2 md:ml-3 relative inline-block text-coffi-purple overflow-hidden">
                  <span className="relative z-10 font-extrabold">
                    {t("home.sessionsType.work")}
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-20"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </span>
              </motion.span>
              <br />
              <motion.span variants={itemVariants} className="inline-block">
                {currentLocale === "en" ? t("home.sessions") : t("home.daily")}
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg font-light mt-3 mb-5 text-center md:text-start w-full md:w-[80%] text-gray-800"
              variants={itemVariants}
            >
              {t("home.howToExplanaiton")}
            </motion.p>

            <motion.section
              className="flex flex-col items-start justify-center md:justify-start w-full md:w-64 mt-2"
              variants={buttonVariants}
            >
              <SimpleButton
                action={redirectToCoffi}
                text={t("actions.general.findYourPlace")}
                full
              />

              <motion.div
                className="mt-6 flex items-center justify-center w-full md:justify-start gap-1 text-sm text-gray-500 opacity-60"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <BiMouse className="text-lg animate-bounce" />
                <span>{t("home.scrollToExplore")}</span>
              </motion.div>
            </motion.section>
          </motion.section>
        )}
      </AnimatePresence>

      <section
        className="block w-full md:w-4/12 relative z-10"
        ref={screenshotsSectionRef}
      >
        <div className="relative h-[600px] md:h-[500px] w-full flex items-center justify-center">
          <AnimatePresence>
            {isVisible && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -15 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotate: -12,
                    transition: {
                      duration: 0.8,
                      delay: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -50,
                    rotate: -15,
                    transition: {
                      duration: 0.5,
                      ease: "easeIn",
                    },
                  }}
                  style={{ y: leftImageY }}
                  className={`absolute left-0 bottom-4 shadow-2xl shadow-coffi-purple/40
                            rounded-2xl border-2 p-2 border-white/80 overflow-hidden w-[210px] h-[440px] z-10
                            animate-float-left bg-coffi-white/70 backdrop-blur-md`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none" />
                  <Image
                    alt="Coffi app screenshot - home"
                    src="/assets/images/screenshots/mobile/mobile-place-detail-premium-en.jpeg"
                    width={210}
                    height={350}
                    className="object-cover rounded-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.1,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 50,
                    transition: {
                      duration: 0.5,
                      ease: "easeIn",
                    },
                  }}
                  style={{ y: centerImageY }}
                  className={`absolute transform shadow-2xl shadow-coffi-purple/40
                            rounded-2xl border-2 p-2 border-white/90 overflow-hidden w-[240px] h-[510px] z-30
                            animate-float-center bg-coffi-white/80 backdrop-blur-md`}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(110, 65, 226, 0.1)",
                        "0 0 25px rgba(110, 65, 226, 0.3)",
                        "0 0 15px rgba(110, 65, 226, 0.1)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <Image
                    alt="Coffi app screenshot - details"
                    src="/assets/images/screenshots/mobile/mobile-home-en.jpeg"
                    width={240}
                    height={390}
                    className="object-cover rounded-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: 12 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotate: 6,
                    transition: {
                      duration: 0.8,
                      delay: 0.5,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: 50,
                    rotate: 12,
                    transition: {
                      duration: 0.5,
                      ease: "easeIn",
                    },
                  }}
                  style={{ y: rightImageY }}
                  className={`absolute right-0 bottom-4 shadow-2xl shadow-coffi-purple/40
                            rounded-2xl border-2 p-2 border-white/80 overflow-hidden w-[210px] h-[440px] z-20
                            animate-float-right bg-coffi-white/70 backdrop-blur-md`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none" />
                  <Image
                    alt="Coffi app screenshot - map"
                    src="/assets/images/screenshots/mobile/mobile-home-search-en.jpeg"
                    width={210}
                    height={350}
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
    </article>
  );
};

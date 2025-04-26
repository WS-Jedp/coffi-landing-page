import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

export const Benefits: React.FC = () => {
  const t = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionOneRef = useRef<HTMLDivElement>(null);
  const sectionTwoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [sectionHeight, setSectionHeight] = useState<string | number>("auto");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set animation active when in view
  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView]);

  // Equal height effect for sections
  useEffect(() => {
    const adjustHeights = () => {
      if (sectionOneRef.current && sectionTwoRef.current) {
        // Reset heights to auto to measure actual content height
        sectionOneRef.current.style.height = "auto";
        sectionTwoRef.current.style.height = "auto";

        // Get natural content heights after a small delay
        setTimeout(() => {
          if (sectionOneRef.current && sectionTwoRef.current) {
            const sectionOneHeight = sectionOneRef.current.scrollHeight;
            const sectionTwoHeight = sectionTwoRef.current.scrollHeight;

            // Set both sections to the height of the taller one
            const maxHeight = Math.max(sectionOneHeight, sectionTwoHeight);
            setSectionHeight(maxHeight);
          }
        }, 0);
      }
    };

    // Initial adjustment
    adjustHeights();

    // Adjust on window resize
    window.addEventListener("resize", adjustHeights);

    return () => {
      window.removeEventListener("resize", adjustHeights);
    };
  }, []); // Run once on mount

  const allPlaceCards = [
    // Top row - spread across the width
    {
      name: "Coffee Club",
      distance: "2.3",
      depth: 0,
      position: { x: "1%", y: 0 },
    },
    {
      name: "Espresso Lane",
      distance: "3.4",
      depth: 2,
      position: { x: "42%", y: 6 },
    },
    {
      name: "Caffeine Corner",
      distance: "1.9",
      depth: 0,
      position: { x: "76%", y: 3 },
    },

    // Middle row - offset from top row positions
    {
      name: "The Roastery",
      distance: "5.3",
      depth: 0,
      position: { x: "30%", y: 54 },
    },
    {
      name: "The Coffee Lab",
      distance: "4.5",
      depth: 1,
      position: { x: "1%", y: 81 },
    },

    // Bottom row - balanced distribution
    {
      name: "Bitter Sweet",
      distance: "2.1",
      depth: 1,
      position: { x: "69%", y: 66 },
    },
    {
      name: "Nights And Coffe",
      distance: "3.6",
      depth: 2,
      position: { x: "45%", y: 99 },
    },
  ];

  // Generate a reduced set of cards with optimal distribution
  const placeCards = useMemo(() => {
    if (isMobile) {
      return [
        { ...allPlaceCards[0], position: { x: "3%", y: "0%" } },
        { ...allPlaceCards[1], position: { x: "-6%", y: "66%" } },
        { ...allPlaceCards[2], position: { x: "30%", y: "42%" } },
        { ...allPlaceCards[3], position: { x: "60%", y: "1%" } },
        { ...allPlaceCards[4], position: { x: "60%", y: "66%" } },
        // { ...allPlaceCards[6], position: { x: '12%', y: '36%' } },
      ];
    }
    return allPlaceCards;
  }, [isMobile]);

  // Create network profiles for Section Two with color groups and depth
  const allNetworkProfiles = useMemo(() => {
    return [
      // Group 1
      {
        name: "Alex",
        position: { x: "8%", y: "12%" },
        colorGroup: 1,
        depth: 0,
      },
      {
        name: "Emma",
        position: { x: "42%", y: "8%" },
        colorGroup: 1,
        depth: 1,
      },
      {
        name: "Miguel",
        position: { x: "85%", y: "15%" },
        colorGroup: 1,
        depth: 2,
      },
      {
        name: "Jamie",
        position: { x: "15%", y: "68%" },
        colorGroup: 1,
        depth: 0,
      },
      {
        name: "Noah",
        position: { x: "92%", y: "78%" },
        colorGroup: 1,
        depth: 1,
      },

      // Group 2
      {
        name: "Sophie",
        position: { x: "30%", y: "30%" },
        colorGroup: 2,
        depth: 0,
      },
      {
        name: "Ben",
        position: { x: "76%", y: "42%" },
        colorGroup: 2,
        depth: 1,
      },
      {
        name: "Ryan",
        position: { x: "12%", y: "90%" },
        colorGroup: 2,
        depth: 2,
      },
      {
        name: "Leah",
        position: { x: "58%", y: "88%" },
        colorGroup: 2,
        depth: 0,
      },
      {
        name: "Zoe",
        position: { x: "88%", y: "55%" },
        colorGroup: 2,
        depth: 1,
      },

      // Group 3
      {
        name: "Nora",
        position: { x: "22%", y: "48%" },
        colorGroup: 3,
        depth: 2,
      },
      {
        name: "David",
        position: { x: "65%", y: "62%" },
        colorGroup: 3,
        depth: 0,
      },
      {
        name: "Julia",
        position: { x: "38%", y: "78%" },
        colorGroup: 3,
        depth: 1,
      },
      {
        name: "Ethan",
        position: { x: "74%", y: "22%" },
        colorGroup: 3,
        depth: 2,
      },
      {
        name: "Mia",
        position: { x: "80%", y: "92%" },
        colorGroup: 3,
        depth: 0,
      },

      // Group 4 (yellow/orange tones)
      {
        name: "Leo",
        position: { x: "25%", y: "18%" },
        colorGroup: 4,
        depth: 1,
      },
      {
        name: "Ava",
        position: { x: "62%", y: "35%" },
        colorGroup: 4,
        depth: 2,
      },
      {
        name: "Max",
        position: { x: "48%", y: "55%" },
        colorGroup: 4,
        depth: 0,
      },
    ];
  }, []);

  // Filter profiles for mobile display
  const networkProfiles = useMemo(() => {
    if (isMobile) {
      // Mobile: Use only 8 profiles with adjusted positions for better spacing
      return [
        // Top left quadrant
        { ...allNetworkProfiles[0], position: { x: "15%", y: "20%" } }, // Alex (Marketing)

        // Top right quadrant
        { ...allNetworkProfiles[5], position: { x: "85%", y: "20%" } }, // Sophie (Software Eng)

        // Middle left
        { ...allNetworkProfiles[10], position: { x: "15%", y: "50%" } }, // Nora (Design)

        // Middle right
        { ...allNetworkProfiles[16], position: { x: "85%", y: "50%" } }, // Leo (Finance)
        { ...allNetworkProfiles[15], position: { x: "50%", y: "50%" } }, // Leo (Finance)

        // Bottom left quadrant
        { ...allNetworkProfiles[1], position: { x: "35%", y: "80%" } }, // Emma (Marketing)

        // Bottom right quadrant
        { ...allNetworkProfiles[12], position: { x: "65%", y: "80%" } }, // Julia (Design)

        { ...allNetworkProfiles[8], position: { x: "42%", y: "15%" } },
      ];
    }
    return allNetworkProfiles;
  }, [allNetworkProfiles, isMobile]);

  // Define group color gradients
  const colorGroups: Record<
    number,
    { from: string; to: string; glow: string }
  > = useMemo(() => {
    return {
      1: {
        from: "from-coffi-purple-300",
        to: "to-coffi-purple-400",
        glow: "0 0 12px rgba(101, 2, 221, 0.9)",
      },
      2: {
        from: "from-coffi-blue-400",
        to: "to-coffi-purple-300",
        glow: "0 0 12px rgba(37, 99, 235, 0.9)",
      },
      3: {
        from: "from-emerald-500",
        to: "to-emerald-600",
        glow: "0 0 12px rgba(34, 197, 94, 0.9)",
      },
      4: {
        from: "from-amber-400",
        to: "to-orange-500",
        glow: "0 0 12px rgba(245, 158, 11, 0.9)",
      },
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      className="relative flex flex-col items-end justify-start w-full h-min-screen h-auto text-end px-6 xl:px-0 mx-auto mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h1
        className="font-bold text-4xl md:text-7xl mb-6"
        variants={itemVariants}
      >
        {t("home.benefits.enhanceYourJourney")}{" "}
        <br className="hidden md:block" />
        {t("home.benefits.coffiBenefits")}
      </motion.h1>

      <motion.section
        className="relative w-full h-auto grid grid-cols-4 grid-rows-2 gap-4 md:gap-4"
        variants={containerVariants}
      >
        {/* Section One */}
        <motion.article
          className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 bg-coffi-blue/20 text-coffi-purple rounded-md overflow-hidden"
          style={{ height: sectionHeight }}
          variants={itemVariants}
          ref={(el) => {
            // Assign to both refs
            if (el) {
              sectionRef.current = el as HTMLDivElement;
              sectionOneRef.current = el as HTMLDivElement;
            }
          }}
        >
          <section className="px-6 pt-6 pb-4 md:flex-grow">
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("home.benefits.matchYourFavoriteSpots.title")}
            </h2>
            <p className="font-light text-lg">
              {t("home.benefits.matchYourFavoriteSpots.description")}
            </p>
          </section>

          {/* Floating cards with subtle animations */}
          <div className="w-full relative flex-shrink-0 h-[160px]">
            {shouldAnimate &&
              placeCards.map((card, i) => {
                // Create depth effect
                const scale = 1 - card.depth * 0.08; // Slightly reduced depth effect
                const blur = card.depth * 1; // Slightly reduced blur
                const zIndex = 10 - card.depth;

                // Create more subtle animation parameters with varied timing
                const floatY = 2 + (i % 4); // Reduced range (2-5px)
                const floatDuration = 4 + (i % 7) * 1.5; // Varied durations (4-13.5 seconds)
                const rotateAmount =
                  i % 3 === 0 ? 0.6 : i % 3 === 1 ? -0.6 : 0.3; // Three rotation patterns
                const delayAmount = (i * 0.3) % 3; // Shorter staggered delays for smoother overall effect

                return (
                  <motion.div
                    key={`floating-card-${i}`}
                    className="pointer-events-none bg-white/90 backdrop-blur-sm rounded-xl w-[170px] h-14 flex flex-row items-center justify-start p-2 gap-2 absolute"
                    style={{
                      filter: `blur(${blur}px)`,
                      zIndex,
                      transform: `translateX(-50%)`, // This centers the card on its position point
                      left: card.position.x,
                      top: card.position.y,
                      scale,
                      transformOrigin: "center center",
                      opacity: 0.95 - card.depth * 0.1, // Slight opacity variation by depth
                    }}
                    animate={{
                      y: [0, floatY, 0],
                      rotate: [0, rotateAmount, 0],
                      scale: [scale, scale * 1.01, scale],
                    }}
                    transition={{
                      duration: floatDuration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                      delay: delayAmount,
                    }}
                  >
                    <figure className="bg-coffi-purple/20 rounded-lg w-9 h-9 flex items-center justify-center">
                      <span className="text-sm text-coffi-purple">☕</span>
                    </figure>
                    <div className="flex flex-col overflow-hidden">
                      <h3 className="text-sm font-medium truncate">
                        {card.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {card.distance}km
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.article>

        {/* Section Two */}
        <motion.article
          className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 bg-coffi-purple/20 text-coffi-purple rounded-md overflow-hidden"
          style={{ height: sectionHeight }}
          variants={itemVariants}
          ref={sectionTwoRef}
        >
          <section className="px-6 pt-6 pb-4">
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("home.benefits.realConnections.title")}
            </h2>
            <p className="font-light text-lg">
              {t("home.benefits.realConnections.description")}
              <br />
              {t("home.benefits.realConnections.2ndDescription")}
            </p>
          </section>

          {/* Dynamic Networking animations */}
          <div
            className={`relative w-full ${
              isMobile ? "h-[160px]" : "h-[120px]"
            }`}
          >
            {/* Network profile circles */}
            {shouldAnimate &&
              networkProfiles.map((profile, i) => {
                const initial = profile.name[0];

                // Create depth effect
                const scale = 1 - profile.depth * 0.15; // Scale down for deeper profiles

                const mobileScaleFactor = 1;
                const finalScale = scale * mobileScaleFactor;

                const blur = profile.depth * 0.6; // Slight blur for deeper profiles
                const zIndex = 10 - profile.depth; // Higher z-index for closer profiles

                // Create varied animation parameters
                const floatY = 3 + (i % 5) - profile.depth * 0.5; // Less movement for deeper profiles
                const floatX = 2 + (i % 4) - profile.depth * 0.3;
                const floatDuration = 5 + (i % 7) * 1.2 + profile.depth * 0.5; // Slower for deeper profiles
                const delayAmount = (i * 0.15) % 3;

                // Adjust size based on device
                const baseSize = 30;
                const variationRange = 20;
                const size = baseSize + Math.random() * variationRange;

                // Get the appropriate gradient classes and glow effect based on colorGroup
                const fromClass = colorGroups[profile.colorGroup].from;
                const toClass = colorGroups[profile.colorGroup].to;
                const glowEffect = colorGroups[profile.colorGroup].glow;

                // Get group name based on colorGroup
                const groupNames = [
                  "",
                  t("home.benefits.professions.marketing"),
                  t("home.benefits.professions.softwareEngineering"),
                  t("home.benefits.professions.design"),
                  t("home.benefits.professions.finance"),
                ];
                const groupName = groupNames[profile.colorGroup];

                return (
                  <motion.div
                    key={`profile-${i}`}
                    className="absolute"
                    style={{
                      left: profile.position.x,
                      top: profile.position.y,
                      transform: "translate(-50%, -50%)",
                      zIndex,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: [0, floatY, 0],
                      x: [0, floatX, 0],
                    }}
                    transition={{
                      // Initial appearance
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      // Floating effect
                      y: {
                        duration: floatDuration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: delayAmount,
                      },
                      x: {
                        duration: floatDuration * 1.2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: delayAmount + 0.5,
                      },
                    }}
                  >
                    {/* Profile circle */}
                    <div
                      className={`bg-gradient-to-r ${fromClass} ${toClass} shadow-sm rounded-full flex items-center justify-center`}
                      style={{
                        width: `${size * finalScale}px`,
                        height: `${size * finalScale}px`,
                        filter: `blur(${blur}px)`,
                        opacity: 0.95 - profile.depth * 0.15,
                        boxShadow: glowEffect,
                      }}
                    >
                      <span
                        className="text-sm font-medium text-white"
                        style={{ transform: `scale(${1 / finalScale})` }}
                      >
                        {initial}
                      </span>
                    </div>

                    {/* Group label */}
                    <div
                      className="absolute bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs whitespace-nowrap"
                      style={{
                        top: `${(size * finalScale) / 1.5 + 4}px`,
                        left: "50%",
                        transform: "translateX(-50%)",
                        filter: `blur(${blur * 0.5}px)`,
                        opacity: 0.9 - profile.depth * 0.2,
                        boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
                        color: `var(--color-${fromClass.split("-").pop()})`,
                        fontSize: `${Math.max(8, 10 - profile.depth)}px`,
                      }}
                    >
                      {groupName}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.article>

        <motion.article
          className="flex flex-col md:flex-row items-center justify-start text-start col-span-4 bg-gradient-to-r from-coffi-purple/30 to-coffi-blue/30 text-coffi-purple rounded-md p-6 overflow-hidden"
          variants={itemVariants}
        >
          <section className="flex flex-col items-start justify-start w-full md:w-1/2 mb-8 md:mb-0 z-[99]">
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("home.benefits.poweredByCommunity.title")} <br />{" "}
              {t("home.benefits.poweredByCommunity.subTitle")}
            </h2>

            <p className="font-light text-lg mb-2">
              {t("home.benefits.poweredByCommunity.description")}
            </p>
            <p className="font-light text-lg mb-2">
              {t("home.benefits.poweredByCommunity.2ndDescription")}
            </p>
            <p className="font-light text-lg">
              {t("home.benefits.poweredByCommunity.3rdDescription")}
            </p>
          </section>

          <section className="relative flex items-center justify-end md:justify-end w-full h-full md:w-1/2">
            {/* Mobile screenshot - positioned at bottom */}
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
              className={`inline-block md:absolute right-48 bottom-[-120px] shadow-2xl shadow-coffi-purple/40
                                          rounded-2xl border-2 p-2 border-white/80 overflow-hidden w-[210px] h-[300px] md:h-[440px] z-10
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
              className={`inline-block md:absolute right-6 bottom-[-120px] shadow-2xl shadow-coffi-purple/40
                                         rounded-2xl border-2 p-2 border-white/80 overflow-hidden w-[210px] h-[300px] md:h-[440px] z-20
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
          </section>
        </motion.article>
      </motion.section>
    </motion.article>
  );
};

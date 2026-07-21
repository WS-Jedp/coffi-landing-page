"use client";

import { HeroSearchBar } from "@/components/hero/HeroSearchBar";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const HeroSearchForm: React.FC = () => {
  const t = useTranslations();

  return (
    <motion.div
      className="w-full flex flex-col items-center text-center relative z-[99]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={itemVariants}
        className="font-bold text-4xl md:text-6xl leading-[1.05] text-coffi-black max-w-[720px]"
      >
        {t("home.hero.title")}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-lg font-light mt-4 mb-9 text-gray-700 max-w-[560px]"
      >
        {t("home.hero.subtitle")}
      </motion.p>

      <motion.div variants={itemVariants} className="w-full">
        <HeroSearchBar />
      </motion.div>
    </motion.div>
  );
};

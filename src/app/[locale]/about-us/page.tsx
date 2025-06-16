"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutUs() {
  const t = useTranslations();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: "easeInOut",
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
        ease: "easeInOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex flex-col items-start justify-items-start w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0"
    >
      <motion.h2
        variants={itemVariants}
        className="font-bold text-4xl md:text-7xl mb-6 w-full md:w-3/4"
      >
        {t("aboutUs.yourPartner")}
      </motion.h2>
      <motion.section
        variants={containerVariants}
        className="relative w-full h-auto grid grid-cols-4 grid-rows-2 gap-4 md:gap-4"
      >
        {/* Section One */}
        <motion.article
          variants={cardVariants}
          className="flex flex-col md:flex-row items-start justify-start text-start col-span-4 bg-gradient-to-r from-coffi-purple to-coffi-blue text-coffi-white rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/70"
        >
          <section className="flex flex-col items-start justify-start w-full">
            <motion.div variants={itemVariants}>
              <Image
                alt="Eye icon"
                src="/assets/icons/eye-icon.svg"
                width={30}
                height={30}
                className="mb-3"
              />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="font-extrabold text-3xl md:text-4xl mb-2"
            >
              {t("aboutUs.why.text")}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-light text-lg mb-2"
            >
              {t("aboutUs.why.ourBelieve")}
            </motion.p>
            <motion.p variants={itemVariants} className="font-light text-lg">
              {t("aboutUs.why.anEasierJourney")}
            </motion.p>
          </section>
        </motion.article>

        {/* Section Two */}
        <motion.article
          variants={cardVariants}
          className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 h-auto md:h-[300px] bg-gradient-to-tr from-coffi-blue/20 to-coffi-purple/20 text-coffi-purple rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/50"
        >
          <motion.div variants={itemVariants}>
            <Image
              alt="Construction tools icon"
              src="/assets/icons/construction-icon.svg"
              width={30}
              height={30}
              className="mb-3"
            />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-extrabold text-3xl md:text-4xl mb-2"
          >
            {t("aboutUs.how.text")}
          </motion.h2>
          <motion.p variants={itemVariants} className="font-light text-lg">
            {t("aboutUs.how.digitalNomadTeam")}
          </motion.p>
        </motion.article>

        {/* Section Three */}
        <motion.article
          variants={cardVariants}
          className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 bg-gradient-to-br from-coffi-blue/5 to-coffi-blue/40 text-coffi-blue rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/50"
        >
          <section>
            <motion.div variants={itemVariants}>
              <Image
                alt="Coffi logo icon"
                src="/assets/icons/coffi-logo-icon.svg"
                width={30}
                height={30}
                className="mb-3"
              />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="font-extrabold text-3xl md:text-4xl mb-2"
            >
              {t("aboutUs.what.text")}
            </motion.h2>
            <motion.p variants={itemVariants} className="font-light text-lg">
              {t("aboutUs.what.discoverThePlatform")}
            </motion.p>
          </section>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Link
              className="font-bold underline flex flex-row flex-nowrap"
              href="https://app.coffi.com.co"
              target="_blank"
            >
              {t("aboutUs.what.action")}
              <Image
                alt="Link icon"
                src="/assets/icons/link-icon.svg"
                width={11}
                height={11}
                className="ml-1"
              />
            </Link>
          </motion.div>
        </motion.article>
      </motion.section>
    </motion.article>
  );
}

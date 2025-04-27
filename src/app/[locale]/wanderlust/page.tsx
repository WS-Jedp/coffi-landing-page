"use client";

import { SimpleButton } from "@/components/buttons";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants for consistent use
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

// Custom hook for scroll-triggered animations
function useScrollAnimation<T extends HTMLElement = HTMLElement>(threshold = 0.1): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null) as React.RefObject<T>;
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

export default function Wanderlust() {
  const t = useTranslations();
  const { redirectToCoffi } = useRedirectToCoffiApp();
  
  const [heroRef, heroInView] = useScrollAnimation<HTMLDivElement>();
  const [sectionRef1, sectionInView1] = useScrollAnimation<HTMLElement>(0.3);
  const [sectionRef2, sectionInView2] = useScrollAnimation<HTMLElement>(0.3);
  const [sectionRef3, sectionInView3] = useScrollAnimation<HTMLElement>(0.3);
  const [sectionRef4, sectionInView4] = useScrollAnimation<HTMLElement>(0.2);
  
  return (
    <motion.article 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex flex-col items-start md:items-center justify-items-center w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0"
    >
      <motion.div ref={heroRef} variants={containerVariants} animate={heroInView ? "visible" : "hidden"}>
        <motion.h1 variants={itemVariants} className="font-bold text-4xl md:text-7xl mb-3 text-start md:text-center">
          {t("wanderlust.title")}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg font-light mt-1 mb-3 text-start md:text-center w-full max-w-[500px] md:mx-auto">
          {t("wanderlust.subTitle")}
        </motion.p>
      </motion.div>

      <motion.section 
        ref={sectionRef1}
        variants={containerVariants}
        initial="hidden"
        animate={sectionInView1 ? "visible" : "hidden"}
        className="text-lg mt-1 mb-6 w-full px-1 text-start font-light"
      >
        <motion.p variants={itemVariants}>{t("wanderlust.description")}</motion.p>
      </motion.section>

      <motion.section 
        ref={sectionRef2}
        variants={containerVariants}
        initial="hidden"
        animate={sectionInView2 ? "visible" : "hidden"}
        className="mt-1 mb-3 w-full px-1 text-center"
      >
        <motion.h2 variants={itemVariants} className="font-bold text-2xl md:text-5xl mb-3">
          {t("wanderlust.buildingTheFutureTogether")}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg font-light">
          {t("wanderlust.inDevelopment.text")}
        </motion.p>
      </motion.section>

      <motion.section 
        ref={sectionRef3}
        variants={containerVariants}
        initial="hidden"
        animate={sectionInView3 ? "visible" : "hidden"}
        className="mt-1 mb-3 text-start w-full px-1 grid grid-cols-4 grid-rows-2 gap-4 md:gap-3"
      >
        <motion.article 
          variants={cardVariants}
          className="flex flex-col items-start text-start col-span-4 bg-coffi-blue/20 text-coffi-purple h-full rounded-2xl p-6"
        >
          <h3 className="font-extrabold text-3xl md:text-4xl mb-2">
            {t("wanderlust.inDevelopment.realTimePlaceInteraction.title")}
          </h3>
          <p className="text-lg mb-1 font-light">
            {t("wanderlust.inDevelopment.realTimePlaceInteraction.stayConnected")}
          </p>
          <p className="text-lg font-light">
            {t("wanderlust.inDevelopment.realTimePlaceInteraction.noMoreGuessing")}
          </p>
        </motion.article>

        <motion.article 
          variants={cardVariants}
          className="items-start text-start col-span-4 grid grid-cols-4 gap-6 bg-gradient-to-r from-coffi-purple/30 to-coffi-blue/30 text-coffi-purple rounded-2xl p-6"
        >
          <section className="col-span-4 md:col-span-2">
            <h3 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("wanderlust.inDevelopment.productivityTools.title")}
            </h3>
            <p className="text-lg mb-1 font-light">
              {t("wanderlust.inDevelopment.productivityTools.aboutThriving")}
            </p>
            <p className="text-lg font-light">
              {t("wanderlust.inDevelopment.productivityTools.aboutThrivingTogether")}
            </p>
          </section>

          <ul className="list-disc h-full col-span-4 md:col-span-2 grid grid-cols-4 grid-rows-2 gap-3">
            <motion.li 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 } 
                }
              }}
              className="col-span-4 w-full h-full flex flex-row items-center justify-center rounded-2xl shadow-md drop-shadow-md shadow-coffi-purple/20 bg-coffi-purple/10 backdrop-blur-lg p-3"
            >
              <section className="w-full flex flex-col items-center text-center text-md">
                <strong className="text-lg font-bold my-1 w-[72%]">
                  {t("wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.setSessionGoals.title")}
                </strong>
                <p className="text-md font-light mx-auto text-center w-full md:w-[60%]">
                  {t("wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.setSessionGoals.description")}
                </p>
              </section>
            </motion.li>
            <motion.li 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: "easeInOut", delay: 0.3 } 
                }
              }}
              className="col-span-2 w-full h-full flex flex-row items-center justify-center rounded-2xl shadow-md drop-shadow-md shadow-coffi-purple/20 bg-coffi-purple/10 backdrop-blur-lg p-3"
            >
              <section className="w-full flex flex-col items-center text-center text-md">
                <strong className="text-lg font-bold my-1">
                  {t("wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.productivityStrategy.title")}
                </strong>
                <p className="text-md font-light">
                  {t("wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.productivityStrategy.description")}
                </p>
              </section>
            </motion.li>
            <motion.li 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: "easeInOut", delay: 0.4 } 
                }
              }}
              className="col-span-2 w-full h-full flex flex-row items-center justify-center rounded-2xl shadow-md drop-shadow-md shadow-coffi-purple/20 bg-coffi-purple/10 backdrop-blur-lg p-3"
            >
              <section className="w-full flex flex-col items-center text-center text-md">
                <strong className="text-lg font-bold my-1 mx-5">
                  {t("wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.trackYourProgress.title")}
                </strong>
                <p className="text-md font-light">
                  {t("wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.trackYourProgress.description")}
                </p>
              </section>
            </motion.li>
          </ul>
        </motion.article>
      </motion.section>

      <motion.section 
        ref={sectionRef4}
        variants={containerVariants}
        initial="hidden"
        animate={sectionInView4 ? "visible" : "hidden"}
        className="relative w-full grid grid-cols-4 grid-rows-1 gap-12 mt-6 min-h-[45vh] h-auto my-auto"
      >
        <motion.article 
          variants={itemVariants}
          className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 h-auto md:h-[270px] my-auto"
        >
          <section>
            <h2 className="font-bold text-2xl md:text-3xl mb-3">
              {t("wanderlust.inDevelopment.expandingTheCoffiDatabase.title")}
            </h2>
            <p className="text-lg font-light">
              {t("wanderlust.inDevelopment.expandingTheCoffiDatabase.about")}
            </p>
          </section>
          <Link
            className="font-bold underline flex flex-row flex-nowrap"
            href="/for-places"
          >
            {t("wanderlust.inDevelopment.expandingTheCoffiDatabase.action")}
            <Image
              alt="Link icon"
              src="/assets/icons/link-icon.svg"
              width={11}
              height={11}
              className="ml-1"
            />
          </Link>
        </motion.article>

        <motion.article 
          variants={itemVariants}
          className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 h-auto md:h-[270px] my-auto"
        >
          <section>
            <h2 className="font-bold text-2xl md:text-3xl mb-3">
              {t("wanderlust.inDevelopment.partnershipWithCompanies.title")}
            </h2>
            <p className="text-lg font-light">
              {t("wanderlust.inDevelopment.partnershipWithCompanies.about")}
            </p>
          </section>
          <strong className="font-bold flex flex-row flex-nowrap">
            {t("wanderlust.inDevelopment.partnershipWithCompanies.action")}
          </strong>
        </motion.article>
      </motion.section>

      <motion.article 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-1 mb-3 w-full px-1 text-center flex flex-col items-center justify-center min-h-[60vh]"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
          viewport={{ once: true }}
          className="font-bold text-2xl md:text-5xl mb-3"
        >
          {t("wanderlust.joinTheCoffiJourney.bePart")}
        </motion.h2>
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" } }}
          viewport={{ once: true }}
          className="mx-auto w-full md:w-[81%]"
        >
          <p className="text-lg font-light mb-1">
            {t("wanderlust.joinTheCoffiJourney.moreThanAPlatform")}
          </p>
          <p className="text-lg font-light mb-1">
            {t("wanderlust.joinTheCoffiJourney.everyActionCounts")}
          </p>
          <p className="text-lg font-light mb-5">
            {t("wanderlust.joinTheCoffiJourney.joinUs")}
          </p>
        </motion.section>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ 
            scale: 1, 
            opacity: 1, 
            transition: { duration: 0.5, delay: 0.4, ease: "easeInOut" } 
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } }}
          viewport={{ once: true }}
        >
          <SimpleButton text={t("actions.subscriptions.startExploring")} action={redirectToCoffi} />
        </motion.div>
      </motion.article>
    </motion.article>
  );
}

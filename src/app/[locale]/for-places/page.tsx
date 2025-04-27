"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CoffiAdminDashboard() {
  const t = useTranslations();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] } }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] } 
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.article 
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center w-full max-w-[1200px] min-h-screen mx-auto py-16 px-6"
    >
      {/* Hero Section */}
      <motion.section 
        variants={fadeIn}
        className="text-center mb-24"
      >
        <motion.h1 
          variants={slideUp}
          className="font-bold text-4xl md:text-6xl"
        >
          {t("forPlaces.adminDashboard")}
        </motion.h1>
        <motion.p 
          variants={slideUp}
          className="text-lg font-light mt-6 max-w-[800px] mx-auto"
        >
          {t("forPlaces.about")}
        </motion.p>
      </motion.section>

      <motion.section 
        variants={slideUp}
        className="mb-16 text-center"
      >
        <p className="font-light text-xl">{t("forPlaces.why")}</p>
      </motion.section>

      {/* Subscription Plans */}
      <motion.section 
        variants={staggerContainer}
        className="w-full text-start mb-24"
      >
        <motion.div variants={slideUp}>
          <h2 className="font-bold text-3xl mb-3 text-center">
            {t("forPlaces.placesSubscriptions.title")}
          </h2>
          <p className="font-light text-lg mb-12 text-center max-w-[800px] mx-auto">
            {t("forPlaces.placesSubscriptions.about")}
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Free Plan */}
          <motion.article 
            variants={slideUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="border border-coffi-blue/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <section className="w-full relative flex flex-col items-start justify-start rounded-t-lg p-6 bg-gradient-to-br from-coffi-blue/20 to-coffi-blue/10 mb-3 text-coffi-blue">
              <h2 className="font-extrabold text-2xl md:text-3xl">
                {t("forPlaces.placesSubscriptions.basicLayer.title")}
              </h2>
              <p className="text-md font-light mt-2">
                {t("forPlaces.placesSubscriptions.basicLayer.about")}
              </p>
            </section>
            
            <section className="px-6 py-4">
              <strong className="font-semibold text-lg">
                {t("forPlaces.placesSubscriptions.benefitsAndFeatures")}
              </strong>
              <motion.ul 
                variants={staggerContainer}
                className="space-y-3 mt-4 pb-6"
              >
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.basicLayer.benefits.basicAnalytics")}
                </motion.li>
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.basicLayer.benefits.promotionPlatform")}
                </motion.li>
              </motion.ul>
            </section>
          </motion.article>

          {/* Local Business Plan */}
          <motion.article 
            variants={slideUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="border border-coffi-purple/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <section className="w-full relative flex flex-col items-start justify-start rounded-t-lg p-6 bg-gradient-to-br from-coffi-purple/30 to-coffi-purple/10 mb-3 text-coffi-purple">
              <h2 className="font-extrabold text-2xl md:text-3xl">
                {t("forPlaces.placesSubscriptions.localBusiness.title")}
              </h2>
              <p className="text-md font-light mt-2">
                {t("forPlaces.placesSubscriptions.localBusiness.about")}
              </p>
            </section>

            <section className="px-6 py-4">
              <strong className="font-semibold text-lg">
                {t("forPlaces.placesSubscriptions.benefitsAndFeatures")}
              </strong>
              <motion.ul 
                variants={staggerContainer}
                className="space-y-3 mt-4 pb-6"
              >
                <motion.li variants={slideUp} className="flex font-light items-center">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.localBusiness.benefits.fidelitySystem")}
                </motion.li>
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.localBusiness.benefits.detailedAnalytics")}
                </motion.li>
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.localBusiness.benefits.directInteractionWithUsers")}
                </motion.li>
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.localBusiness.benefits.enhancedPromotions")}
                </motion.li>
              </motion.ul>
            </section>
          </motion.article>

          {/* Premium Plan */}
          <motion.article 
            variants={slideUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="border border-coffi-purple/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <section className="w-full relative flex flex-col items-start justify-start rounded-t-lg p-6 bg-gradient-to-r from-coffi-purple/90 to-coffi-blue/90 mb-3 text-coffi-white">
              <h2 className="font-extrabold text-2xl md:text-3xl">
                {t("forPlaces.placesSubscriptions.enterprise.title")}
              </h2>
              <p className="text-md font-light mt-2">
                {t("forPlaces.placesSubscriptions.enterprise.about")}
              </p>
            </section>

            <section className="px-6 py-4">
              <strong className="font-semibold text-lg">
                {t("forPlaces.placesSubscriptions.benefitsAndFeatures")}
              </strong>

              <motion.ul 
                variants={staggerContainer}
                className="space-y-3 mt-4 pb-6"
              >
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.enterprise.benefits.multiplePlaces")}
                </motion.li>
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.enterprise.benefits.advancedVisitorAnalytics")}
                </motion.li>
                <motion.li variants={slideUp} className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={14}
                    height={14}
                    alt="List icon"
                    className="mr-3 mt-[1px]"
                  />
                  {t("forPlaces.placesSubscriptions.enterprise.benefits.strategicPartnerships")}
                </motion.li>
              </motion.ul>
            </section>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* Closing Section */}
      <motion.section 
        variants={fadeIn}
        className="text-center mt-16 bg-white/60 backdrop-blur-sm py-12 px-6 rounded-2xl shadow-2xl shadow-coffi-purple/20 w-full"
      >
        <motion.h2 
          variants={slideUp}
          className="font-bold text-3xl md:text-4xl"
        >
          {t("forPlaces.helpingPlacesGrow.title")}
        </motion.h2>
        <motion.p 
          variants={slideUp}
          className="text-lg font-light mt-6 max-w-[800px] mx-auto"
        >
          {t("forPlaces.helpingPlacesGrow.gameChanger")}
        </motion.p>
        <motion.p 
          variants={slideUp}
          className="text-lg font-light mt-3 max-w-[800px] mx-auto"
        >
          {t("forPlaces.helpingPlacesGrow.forEveryPlace")}
        </motion.p>
        <motion.div 
          variants={slideUp}
          className="mt-8 p-4rounded-lg"
        >
          <p className="text-xl font-bold">
            {t("forPlaces.helpingPlacesGrow.ready")}
          </p>
          <p className="text-lg font-bold mt-1">
            {t("forPlaces.helpingPlacesGrow.stayTuned")}
          </p>
        </motion.div>
      </motion.section>
    </motion.article>
  );
}

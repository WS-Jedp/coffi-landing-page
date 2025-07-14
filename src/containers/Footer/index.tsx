"use client"

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const productNavOptions = [
    {
      name: "about",
      link: "/#about",
    },
    {
      name: "features",
      link: "/#features",
    },
    {
      name: "pricing",
      link: "/#pricing",
    },
    {
      name: "blog",
      link: "/blog",
    },
  ];

  const helpNavOptions = [
    {
      name: "termsAndConditions",
      link: "/terms-of-service",
    },
    {
      name: "privacyPolicy",
      link: "/privacy-policy",
    },
    {
      name: "faqs",
      link: "/faqs",
    },
    {
      name: "contact",
      link: "/contact-us",
    },
  ];

  const socialNavOptions = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/coffi-be-where-you-thrive/",
      icon: "/assets/images/social/linkedin.svg",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/letscoffi",
      icon: "/assets/images/social/instagram.svg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="w-full bg-gradient-to-tr from-coffi-blue to-coffi-purple text-coffi-white py-12 px-6 xl:px-0">
      <motion.div
        className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-[1200px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.article
          variants={itemVariants}
          className="flex flex-col items-center md:items-start mb-8 md:mb-0 md:mr-8"
        >
          <Image
            src="/assets/images/coffi-logo-positive-icon.svg"
            width={40}
            height={40}
            alt="Coffi icon in positive colors (White)"
            className="mb-4"
          />
          <strong className="font-bold text-lg mb-2">Be where you thrive</strong>
          <p className="font-medium text-sm mb-6 opacity-80">© Coffi, Inc. 2025.</p>

          <motion.div variants={itemVariants} className="mt-4">
            <Link
              href="https://app.coffi.com.co"
              className="bg-white text-coffi-purple font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all shadow-lg inline-flex items-center"
            >
              {t("actions.general.startDiscovering")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.article>

        <motion.nav
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left"
        >
          <motion.section variants={itemVariants}>
            <h3 className="font-bold text-xl mb-4">{t("utils.navigationLinks.product")}</h3>
            <ul className="space-y-2">
              {productNavOptions.map((option) => (
                <li
                  key={option.name}
                  className="font-normal text-sm hover:text-white text-opacity-80 transition-colors"
                >
                  <Link href={option.link} className="hover:underline">
                    {t(`utils.navigationLinks.${option.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h3 className="font-bold text-xl mb-4">{t("utils.navigationLinks.help")}</h3>
            <ul className="space-y-2">
              {helpNavOptions.map((option) => (
                <li
                  key={option.name}
                  className="font-normal text-sm hover:text-white text-opacity-80 transition-colors"
                >
                  <Link href={option.link} className="hover:underline">
                    {t(`utils.navigationLinks.${option.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h3 className="font-bold text-xl mb-4">{t("utils.navigationLinks.social")}</h3>
            <ul className="space-y-2">
              {socialNavOptions.map((option) => (
                <li
                  key={option.name}
                  className="font-normal text-sm hover:text-white text-opacity-80 transition-colors"
                >
                  <Link href={option.link} className="hover:underline inline-flex items-center">
                    <span>{option.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>
        </motion.nav>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[1200px] mx-auto mt-8 pt-6 border-t border-white border-opacity-20"
      >
        <p className="text-center text-xs opacity-70">
          Coffi helps digital nomads find the perfect workspaces. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

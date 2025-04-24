import { useRouter } from "next/navigation";
import { SimpleLightButton } from "@/components/buttons";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

export const Purpose: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const currentLocale = useLocale();

  const toAboutUs = () => {
    router.push(`/${currentLocale}/about-us`); // Replace with your target URL
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: { 
        staggerChildren: 0.2,
        staggerDirection: -1, 
        when: "afterChildren" 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  return (
    <motion.article
      className="flex flex-col items-center justify-center w-full h-[90vh] text-center mx-auto px-6 xl:px-0 z-[99]"
      id="about"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h1 
        className="font-bold text-4xl md:text-7xl mx-auto mb-9"
        variants={itemVariants}
      >
        {t("home.purpose.empoweringNomads")} <br />
        {t("home.purpose.oneAtATime")}
      </motion.h1>
      <motion.p 
        className="text-xl font-light mt-2 w-full md:w-8/12 mb-9"
        variants={itemVariants}
      >
        {t("home.purpose.description")}
      </motion.p>
      <motion.div 
        className="w-full md:w-4/12"
        variants={itemVariants}
      >
        <SimpleLightButton
          action={toAboutUs}
          text={t("home.purpose.action")}
          full
          disabled={false}
        />
      </motion.div>
    </motion.article>
  );
};

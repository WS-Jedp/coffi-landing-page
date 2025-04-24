import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { SubscriptionSimpleCard } from "@/components/subscriptionsCards/Simple";
import { SubscriptionSpecialCard } from "@/components/subscriptionsCards/specialCard";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const Subscriptions: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const currentLocale = useLocale();

  // Set up intersection observer with threshold to trigger animations when component is 15% visible
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.article
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col items-center justify-start w-full min-h-screen h-auto text-center px-6 xl:px-0 mx-auto mb-14"
      id="pricing"
    >
      <motion.h1
        variants={headerVariants}
        className="font-bold text-4xl md:text-7xl mx-auto"
      >
        {t("home.subscriptions.choose")} <br />
        {t("home.subscriptions.betterForYou")}
      </motion.h1>
      <motion.p
        variants={headerVariants}
        className="w-full md:w-6/12 wtext-lg font-light mt-2"
      >
        {t("home.subscriptions.description")}
      </motion.p>

      <motion.section
        variants={containerVariants}
        className="relative w-full h-auto grid grid-cols-3 grid-rows-1 gap-4 md:gap-7 mt-16"
      >
        <motion.article
          variants={cardVariants}
          className="flex flex-col items-start justify-start text-start col-span-3 md:col-span-1 "
        >
          <SubscriptionSimpleCard
            title={t("home.subscriptions.plans.explorer.title")}
            description={t("home.subscriptions.plans.explorer.description")}
            price={t("home.subscriptions.plans.explorer.price")}
            secondaryPriceText={t(
              "home.subscriptions.plans.explorer.priceText"
            )}
            actionButton={t("home.subscriptions.plans.explorer.action")}
            specialAction
            full
          />

          <div className="h-auto md:h-[120px] mt-4">
            <p className="my-4 font-light text-md">
              {t("home.subscriptions.plans.explorer.why")}
            </p>
          </div>

          <h3 className="text-lg font-bold mb-1">
            {t("home.subscriptions.plans.benefitsAndFeatures")}
          </h3>

          <ul className="text-md font-light">
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t(
                  "home.subscriptions.plans.explorer.benefits.officialSpotsAccess"
                )}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t("home.subscriptions.plans.explorer.benefits.basicFilters")}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t(
                  "home.subscriptions.plans.explorer.benefits.realTimeInsights"
                )}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t("home.subscriptions.plans.explorer.benefits.free")}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t(
                  "home.subscriptions.plans.explorer.benefits.noCreditOrDebitCard"
                )}
              </span>
            </li>
          </ul>
        </motion.article>
        <motion.article
          variants={cardVariants}
          className="flex flex-col items-start justify-start text-start col-span-3 md:col-span-1"
        >
          <SubscriptionSpecialCard
            title={t("home.subscriptions.plans.nomad.title")}
            description={t("home.subscriptions.plans.nomad.description")}
            yearlyPrice={t("home.subscriptions.plans.nomad.price", {
              price: "$4,99",
            })}
            monthlyPrice={t("home.subscriptions.plans.nomad.price", {
              price: "$6,99",
            })}
            secondaryYearlyPriceText={t(
              "home.subscriptions.plans.nomad.yearlyPrice",
              { price: "$6,99" }
            )}
            secondaryMonthlyPriceText={t(
              "home.subscriptions.plans.nomad.monthlyPrice",
              { price: "$4,99" }
            )}
            actionButton={t("home.subscriptions.plans.nomad.action")}
            full
          />

          <div className="h-auto md:h-[120px] mt-4">
            <p className="my-4 font-light text-md">
              {t("home.subscriptions.plans.nomad.why")}
            </p>
          </div>

          <h3 className="text-lg font-bold mb-1">
            {t("home.subscriptions.plans.benefitsAndFeatures")}
          </h3>

          <ul className="text-md font-light">
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t("home.subscriptions.plans.nomad.benefits.explorerBenefits")}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t(
                  "home.subscriptions.plans.nomad.benefits.officialAndCommunitySpotsAccess"
                )}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t(
                  "home.subscriptions.plans.nomad.benefits.exclusiveDiscounts"
                )}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t("home.subscriptions.plans.nomad.benefits.2xCoffiPoints")}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t("home.subscriptions.plans.nomad.benefits.realTimeFilter")}
              </span>
            </li>
            <li className="flex flex-row items-start flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2 mt-[7px]"
              />
              <span>
                {t("home.subscriptions.plans.nomad.benefits.earlyAccess")}
              </span>
            </li>
          </ul>
        </motion.article>
        <motion.article
          variants={cardVariants}
          className="flex flex-col items-start justify-start text-start col-span-3 md:col-span-1"
        >
          <SubscriptionSimpleCard
            title={t("home.subscriptions.plans.wanderlust.title")}
            description={t("home.subscriptions.plans.wanderlust.description")}
            price={t("home.subscriptions.plans.wanderlust.comingSoon")}
            secondaryPriceText={t(
              "home.subscriptions.plans.wanderlust.working"
            )}
            actionButton={t("home.subscriptions.plans.wanderlust.action")}
            full
            onAction={() => router.push(`/${currentLocale}/wanderlust`)}
          />
          <div className="h-auto md:h-[120px] mt-4">
            <p className="my-4 font-light text-md">
              {t("home.subscriptions.plans.wanderlust.why")}
            </p>
          </div>
        </motion.article>
      </motion.section>
    </motion.article>
  );
};

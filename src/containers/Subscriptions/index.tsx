import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { SubscriptionSimpleCard } from "@/components/subscriptionsCards/Simple";
import { SubscriptionSpecialCard } from "@/components/subscriptionsCards/specialCard";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "react-intersection-observer";

/**
 * La curva de la casa, la misma que usa la sección de beneficios: sale rápido y
 * frena largo.
 */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Subscriptions: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const currentLocale = useLocale();

  const reduced = useReducedMotion() ?? false;

  // 0.10 y no 0.15: el artículo mide `min-h-screen`, así que el umbral se
  // cuenta sobre más de una pantalla completa y cada punto porcentual retrasa
  // el disparo. Aquí la sección arranca en cuanto asoma.
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  /**
   * Por qué esta sección llegaba tarde, y qué cambió.
   *
   * El culpable no era el escalonado sino `when: "beforeChildren"` junto a un
   * `duration: 0.8` en el contenedor: el artículo tenía que TERMINAR su propio
   * fundido de 0.8s antes de que ningún hijo empezara. Y como el mismo objeto
   * colgaba también de la rejilla, ese peaje se pagaba dos veces. Sumado a un
   * escalonado de 0.3 y a muelles muy blandos (rigidez 50), la tercera tarjeta
   * no terminaba de asentarse hasta pasados unos tres segundos.
   *
   * Ahora el contenedor no bloquea a nadie, el escalonado baja a 0.08 y los
   * muelles se cambian por interpolaciones cortas con la curva de la casa: la
   * sección entera queda montada en algo menos de un segundo.
   */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };

  /** La rejilla sólo reparte entre las tres tarjetas; no vuelve a retrasar. */
  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.3 : 0.45, ease: EASE },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.3 : 0.5, ease: EASE },
    },
  };

  return (
    <section 
      id="pricing" // Add ID for smooth scrolling
      className="w-full py-20"
    >
      <motion.article
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col items-center justify-start w-full min-h-screen h-auto text-center px-6 xl:px-0 mx-auto mb-14"
      >
        <motion.h2
          variants={headerVariants}
          className="font-bold text-4xl md:text-7xl mx-auto"
        >
          {t("home.subscriptions.choose")} <br />
          {t("home.subscriptions.betterForYou")}
        </motion.h2>
        <motion.p
          variants={headerVariants}
          className="w-full md:w-6/12 wtext-lg font-light mt-2"
        >
          {t("home.subscriptions.description")}
        </motion.p>

        <motion.section
          variants={gridVariants}
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
                price: "$5,75",
              })}
              monthlyPrice={t("home.subscriptions.plans.nomad.price", {
                price: "$6.99",
              })}
              secondaryYearlyPriceText={t(
                "home.subscriptions.plans.nomad.yearlyPrice",
                { price: "$6.99" }
              )}
              secondaryMonthlyPriceText={t(
                "home.subscriptions.plans.nomad.monthlyPrice",
                { price: "$5,75" }
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
    </section>
  );
};

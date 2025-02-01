import { useTranslations } from "next-intl";

export const Benefits: React.FC = () => {
  const t = useTranslations();

  return (
    <article className="relative flex flex-col items-end justify-start w-full h-min-screen h-auto text-end px-6 xl:px-0 mx-auto mb-20">
      <h1 className="font-bold text-4xl md:text-7xl mb-6">
        {t("home.benefits.enhanceYourJourney")}{" "}
        <br className="hidden md:block" />
        {t("home.benefits.coffiBenefits")}
      </h1>

      <section className="relative w-full h-auto grid grid-cols-4 grid-rows-2 gap-4 md:gap-4">
        {/* Section One */}
        <article className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 h-[360px] bg-coffi-blue/20 text-coffi-purple rounded-md p-6">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
            {t("home.benefits.matchYourFavoriteSpots.title")}
          </h2>
          <p className="font-light text-lg">
            {t("home.benefits.matchYourFavoriteSpots.description")}
          </p>
        </article>

        {/* Section Two */}
        <article className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 bg-coffi-purple/20 text-coffi-purple rounded-md p-6">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
            {t("home.benefits.realConnections.title")}
          </h2>
          <p className="font-light text-lg">
            {t("home.benefits.realConnections.description")}
            <br />
            {t("home.benefits.realConnections.2ndDescription")}
          </p>
        </article>
        <article className="flex flex-col md:flex-row items-center justify-start text-start col-span-4 bg-gradient-to-r from-coffi-purple/30 to-coffi-blue/30 text-coffi-purple rounded-md p-6">
          <section className="flex flex-col items-start justify-start w-full md:w-1/2">
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
        </article>
      </section>
    </article>
  );
};

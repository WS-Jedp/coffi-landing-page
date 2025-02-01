import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CoffiAdminDashboard() {
  const t = useTranslations();
  return (
    <article className="relative flex flex-col items-center w-full max-w-[1200px] min-h-screen mx-auto py-12 px-6">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="font-bold text-4xl md:text-6xl">
          {t("forPlaces.adminDashboard")}
        </h1>
        <p className="text-lg font-light mt-3 max-w-[800px] mx-auto">
          {t("forPlaces.about")}
        </p>
      </section>

      <section className="mb-5">
        <p className="font-light text-lg">{t("forPlaces.why")}</p>
      </section>

      {/* Subscription Plans */}
      <section className="w-full text-start mb-12">
        <h2 className="font-bold text-3xl mb-1">
          {t("forPlaces.placesSubscriptions.title")}
        </h2>
        <p className="font-light text-lg mb-6">
          {t("forPlaces.placesSubscriptions.about")}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <article>
            <section className="w-full relative flex flex-col items-tart justify-start rounded-lg p-5 shadow-md drop-shadow-md shadow-coffi-blue/10  bg-gradient-to-br from-coffi-blue/20 to-coffi-blue/10 mb-3 text-coffi-blue">
              <h2 className="font-extrabold text-2xl md:text-3xl">
                {t("forPlaces.placesSubscriptions.basicLayer.title")}
              </h2>
              <p className="text-md font-light mb-2">
                {t("forPlaces.placesSubscriptions.basicLayer.about")}
              </p>
            </section>
            <section className="px-5">
              <strong className="font-semibold text-lg">
                {t("forPlaces.placesSubscriptions.benefitsAndFeatures")}
              </strong>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.basicLayer.benefits.basicAnalytics"
                  )}
                </li>
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.basicLayer.benefits.promotionPlatform"
                  )}
                </li>
              </ul>
            </section>
          </article>

          {/* Local Business Plan */}
          <article>
            <section className="w-full relative flex flex-col items-tart justify-start rounded-lg p-5 shadow-md drop-shadow-md shadow-coffi-purple/10  bg-gradient-to-br from-coffi-purple/30 to-coffi-purple/10 mb-3 text-coffi-purple">
              <h2 className="font-extrabold text-2xl md:text-3xl">
                {t("forPlaces.placesSubscriptions.localBusiness.title")}
              </h2>
              <p className="text-md font-light mb-2">
                {t("forPlaces.placesSubscriptions.localBusiness.about")}
              </p>
            </section>

            <section className="px-5">
              <strong className="font-semibold text-lg">
                  {t("forPlaces.placesSubscriptions.benefitsAndFeatures")}
              </strong>
              <ul className="space-y-2 mt-2">
                <li className="flex font-light items-center">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.localBusiness.benefits.fidelitySystem"
                  )}
                </li>
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.localBusiness.benefits.detailedAnalytics"
                  )}
                </li>
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.localBusiness.benefits.directInteractionWithUsers"
                  )}
                </li>
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.localBusiness.benefits.enhancedPromotions"
                  )}
                </li>
              </ul>
            </section>
          </article>

          {/* Premium Plan */}
          <article>
            <section className="w-full relative flex flex-col items-tart justify-start rounded-lg p-5 shadow-md drop-shadow-md shadow-coffi-purple/10  bg-gradient-to-r from-coffi-purple/90 to-coffi-blue/90 mb-3 text-coffi-white">
              <h2 className="font-extrabold text-2xl md:text-3xl">
                {t("forPlaces.placesSubscriptions.enterprise.title")}
              </h2>
              <p className="text-md font-light mb-2">
                {t("forPlaces.placesSubscriptions.enterprise.about")}
              </p>
            </section>

            <section className="px-5">
              <strong className="font-semibold text-lg">
                {t("forPlaces.placesSubscriptions.benefitsAndFeatures")}
              </strong>

              <ul className="space-y-2 mt-2">
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.enterprise.benefits.multiplePlaces"
                  )}
                </li>
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.enterprise.benefits.advancedVisitorAnalytics"
                  )}
                </li>
                <li className="flex items-center font-light">
                  <Image
                    src="/assets/icons/list-icon.svg"
                    width={12}
                    height={12}
                    alt="List icon"
                    className="mr-2 mt-[1px]"
                  />{" "}
                  {t(
                    "forPlaces.placesSubscriptions.enterprise.benefits.strategicPartnerships"
                  )}
                </li>
              </ul>
            </section>
          </article>
        </div>
      </section>

      {/* Closing Section */}
      <section className="text-center mt-12">
        <h2 className="font-bold text-3xl md:text-4xl">
          {t("forPlaces.helpingPlacesGrow.title")}
        </h2>
        <p className="text-lg font-light mt-3 max-w-[800px] mx-auto">
          {t("forPlaces.helpingPlacesGrow.gameChanger")}
        </p>
        <p className="text-lg font-light mt-1 max-w-[800px] mx-auto">
          {t("forPlaces.helpingPlacesGrow.forEveryPlace")}
        </p>
        <p className="text-lg font-bold mt-4">
          {t("forPlaces.helpingPlacesGrow.ready")}
        </p>
        <p className="text-lg font-bold">
          {t("forPlaces.helpingPlacesGrow.stayTuned")}
        </p>
      </section>
    </article>
  );
}

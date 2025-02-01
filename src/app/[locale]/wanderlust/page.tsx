"use client";

import { SimpleButton } from "@/components/buttons";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Wanderlust() {
  const t = useTranslations();
  function handleOnJoinTheMovement() {
    console.log("Join the movement!");
  }
  return (
    <article className="relative flex flex-col items-start md:items-center justify-items-center w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0">
      <h1 className="font-bold text-4xl md:text-7xl mb-3 text-start md:text-center">
        {t("wanderlust.title")}
      </h1>
      <p className="text-lg font-light mt-1 mb-3 text-start md:text-center w-full max-w-[500px]">
        {t("wanderlust.subTitle")}
      </p>

      <section className="text-lg mt-1 mb-6 w-full px-1 text-start font-light">
        <p>{t("wanderlust.description")}</p>
      </section>

      <section className="mt-1 mb-3 w-full px-1 text-center">
        <h2 className="font-bold text-2xl md:text-5xl mb-3">
          {t("wanderlust.buildingTheFutureTogether")}
        </h2>
        <p className="text-lg font-light">
          {t("wanderlust.inDevelopment.text")}
        </p>
      </section>

      <section className="mt-1 mb-3 text-start w-full px-1 grid grid-cols-4 grid-rows-2 gap-4 md:gap-3">
        <article className="flex flex-col items-start text-start col-span-4 bg-coffi-blue/20 text-coffi-purple h-full rounded-2xl p-6">
          <h3 className="font-extrabold text-3xl md:text-4xl mb-2">
            {t("wanderlust.inDevelopment.realTimePlaceInteraction.title")}
          </h3>
          <p className="text-lg mb-1 font-light">
            {t(
              "wanderlust.inDevelopment.realTimePlaceInteraction.stayConnected"
            )}
          </p>
          <p className="text-lg font-light">
            {t(
              "wanderlust.inDevelopment.realTimePlaceInteraction.noMoreGuessing"
            )}
          </p>
        </article>

        <article className="items-start text-start col-span-4 grid grid-cols-4 gap-6 bg-gradient-to-r from-coffi-purple/30 to-coffi-blue/30 text-coffi-purple rounded-2xl p-6">
          <section className="col-span-4 md:col-span-2">
            <h3 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("wanderlust.inDevelopment.productivityTools.title")}
            </h3>
            <p className="text-lg mb-1 font-light">
              {t("wanderlust.inDevelopment.productivityTools.aboutThriving")}
            </p>
            <p className="text-lg font-light">
              {t(
                "wanderlust.inDevelopment.productivityTools.aboutThrivingTogether"
              )}
            </p>
          </section>

          <ul className="list-disc h-full col-span-4 md:col-span-2 grid grid-cols-4 grid-rows-2 gap-3">
            <li className="col-span-4 w-full h-full flex flex-row items-center justify-center rounded-2xl shadow-md drop-shadow-md shadow-coffi-purple/20 bg-coffi-purple/10 backdrop-blur-lg p-3">
              <section className="w-full flex flex-col items-center text-center text-md">
                <strong className="text-lg font-bold my-1 w-[72%]">
                  {t(
                    "wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.setSessionGoals.title"
                  )}
                </strong>
                <p className="text-md font-light mx-auto text-center w-full md:w-[60%]">
                  {t(
                    "wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.setSessionGoals.description"
                  )}
                </p>
              </section>
            </li>
            <li className="col-span-2 w-full h-full flex flex-row items-center justify-center rounded-2xl shadow-md drop-shadow-md shadow-coffi-purple/20 bg-coffi-purple/10 backdrop-blur-lg p-3">
              <section className="w-full flex flex-col items-center text-center text-md">
                <strong className="text-lg font-bold my-1">
                  {t(
                    "wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.productivityStrategy.title"
                  )}
                </strong>
                <p className="text-md font-light">
                  {t(
                    "wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.productivityStrategy.description"
                  )}
                </p>
              </section>
            </li>
            <li className="col-span-2 w-full h-full flex flex-row items-center justify-center rounded-2xl shadow-md drop-shadow-md shadow-coffi-purple/20 bg-coffi-purple/10 backdrop-blur-lg p-3">
              <section className="w-full flex flex-col items-center text-center text-md">
                <strong className="text-lg font-bold my-1 mx-5">
                  {t(
                    "wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.trackYourProgress.title"
                  )}
                </strong>
                <p className="text-md font-light">
                  {t(
                    "wanderlust.inDevelopment.productivityTools.aboutTheSystem.benefits.trackYourProgress.description"
                  )}
                </p>
              </section>
            </li>
          </ul>
        </article>
      </section>

      <section className="relative w-full grid grid-cols-4 grid-rows-1 gap-12 mt-6 min-h-[45vh] h-auto my-auto">
        <article className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 h-auto md:h-[270px] my-auto">
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
        </article>

        <article className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 h-auto md:h-[270px] my-auto">
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
        </article>
      </section>

      <article className="mt-1 mb-3 w-full px-1 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="font-bold text-2xl md:text-5xl mb-3">
          {t("wanderlust.joinTheCoffiJourney.bePart")}
        </h2>
        <section className="mx-auto w-full md:w-[81%]">
          <p className="text-lg font-light mb-1">
            {t("wanderlust.joinTheCoffiJourney.moreThanAPlatform")}
          </p>
          <p className="text-lg font-light mb-1">
            {t("wanderlust.joinTheCoffiJourney.everyActionCounts")}
          </p>
          <p className="text-lg font-light mb-5">
            {t("wanderlust.joinTheCoffiJourney.joinUs")}
          </p>
        </section>

        <SimpleButton text={t("actions.subscriptions.startExploring")} action={handleOnJoinTheMovement} />
      </article>
    </article>
  );
}

import { SimpleButton } from "@/components/buttons";
import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { useLocale, useTranslations } from "next-intl";

export const WhatIsCoffi: React.FC = () => {
  const { redirectToCoffi } = useRedirectToCoffiApp();
  const t = useTranslations();
  const currentLocale = useLocale();
  return (
    <article className="flex flex-row items-start md:items-center justify-between w-full h-[90vh] pt-6 md:pt-0 px-6 xl:px-0">
      <section className="w-full md:w-8/12">
        <h1 className="font-bold text-4xl md:text-7xl text-center md:text-start">
          {t("home.discoverPlacesInCity", { city: "Medellín" })} <br />
          {t("home.toElevate")}{" "}
          <span className="text-coffi-purple">
            {t("home.sessionsType.work")}
          </span>{" "}
          <br />
          {currentLocale === "en" ? t("home.sessions") : t("home.daily")}
        </h1>
        <p className="text-lg font-light mt-1 mb-3 text-center md:text-start w-full md:w-[80%]">
          {t("home.howToExplanaiton")}
        </p>
        <section className="flex flex-col items-center justify-center md:justify-start w-full md:w-64">
          <SimpleButton
            action={redirectToCoffi}
            text={t("actions.general.findYourPlace")}
            full
          />
          <span className="font-light text-sm my-1">
            {t("utils.general.or")}
          </span>
          <a href="#" className="font-light text-md">
            {t("actions.general.discoverMoreAboutCoffi")}
          </a>
        </section>
      </section>
    </article>
  );
};

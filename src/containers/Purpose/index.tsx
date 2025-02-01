import { useRouter } from "next/navigation";
import { SimpleLightButton } from "@/components/buttons";
import { useLocale, useTranslations } from "next-intl";

export const Purpose: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const currentLocale = useLocale();

  const toAboutUs = () => {
    router.push(`/${currentLocale}/about-us`); // Replace with your target URL
  };
  return (
    <article
      className="flex flex-col items-center justify-center w-full h-[90vh] text-center mx-auto px-6 xl:px-0"
      id="about"
    >
      <h1 className="font-bold text-4xl md:text-7xl mx-auto mb-9">
        {t("home.purpose.empoweringNomads")} <br />
        {t("home.purpose.oneAtATime")}
      </h1>
      <p className="text-xl font-light mt-2 w-full md:w-8/12 mb-9">
        {t("home.purpose.description")}
      </p>
      <div className="w-full md:w-4/12">
        <SimpleLightButton
          action={toAboutUs}
          text={t("home.purpose.action")}
          full
        />
      </div>
    </article>
  );
};

import { SimpleDarkButton } from "@/components/buttons";
import { useTranslations } from "next-intl";

export const CallToActionBanner: React.FC = () => {
  const t = useTranslations();

  return (
    <article className="w-full h-auto bg-coffi-blue/30 py-9 my-9 text-coffi-purple px-6 xl:px-0">
      <section className="w-full max-w-[1200px] mx-auto flex flex-row">
        <article className="relative flex flex-col items-start justify-center w-full md:w-5/12">
          <h3 className="text-2xl md:text-4xl font-extrabold">
            {t("home.callToActionBanner.title")}
          </h3>
          <p className="font-light text-lg mt-1 mb-3">
            {t("home.callToActionBanner.description")}
          </p>
          <SimpleDarkButton
            text={t("home.callToActionBanner.action")}
            action={() => {}}
          />
        </article>
      </section>
    </article>
  );
};

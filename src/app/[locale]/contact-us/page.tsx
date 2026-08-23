import { useTranslations } from "next-intl";

export default function ContactUs() {
  const t = useTranslations();
  return (
    <article className="relative flex flex-col items-center w-full max-w-[1120px] min-h-screen mx-auto px-5 pt-24 md:pt-28 pb-16 md:pb-24">
      <h1 className="font-bold text-4xl md:text-7xl mb-6 text-center">
        {t("contact.contactUs")}
      </h1>
      <p className="text-lg font-light mt-1 mb-6 text-center w-full max-w-[600px]">
        {t("contact.description")}
      </p>

      <section className="w-full">
        <h2 className="font-bold text-xl md:text-4xl mb-4 text-start">
          {t("contact.getInTouch")}
        </h2>
        <div className="text-md font-normal text-start space-y-4">
          <p>
            <a
              href="mailto:letscoffi@gmail.com"
              className="font-bold text-coffi-purple underline hover:text-coffi-purple/70 transition text-4xl md:text-6xl"
            >
              letscoffi@gmail.com
            </a>
          </p>
          <p>{t("contact.howItWorks.description")}</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>{t("contact.howItWorks.initialAcknowledgment.title")}:</strong> {t("contact.howItWorks.initialAcknowledgment.description")}
            </li>
            <li>
              <strong>{t("contact.howItWorks.review.title")}:</strong> {t("contact.howItWorks.review.description")}
            </li>
            <li>
              <strong>{t("contact.howItWorks.response.title")}:</strong> {t("contact.howItWorks.response.description")}
            </li>
          </ol>
        </div>
      </section>
    </article>
  );
}

import { useRedirectToCoffiApp } from "@/hooks/useRedirectToCoffi";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  const { redirectToCoffi } = useRedirectToCoffiApp();
  const t = useTranslations();
  return (
    <article className="relative flex flex-col items-start justify-items-start w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0">
      <h2 className="font-bold text-4xl md:text-7xl mb-6 w-full md:w-3/4 ">
        {t("aboutUs.yourPartner")}
      </h2>
      <section className="relative w-full h-auto grid grid-cols-4 grid-rows-2 gap-4 md:gap-4">
        {/* Section One */}
        <article className="flex flex-col md:flex-row items-start justify-start text-start col-span-4 bg-gradient-to-r from-coffi-purple to-coffi-blue text-coffi-white rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/70">
          <section className="flex flex-col items-start justify-start w-full">
            <Image
              alt="Eye icon"
              src="/assets/icons/eye-icon.svg"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("aboutUs.why.text")}
            </h2>

            <p className="font-light text-lg mb-2">
              {t("aboutUs.why.ourBelieve")}
            </p>
            <p className="font-light text-lg">
              {t("aboutUs.why.anEasierJourney")}
            </p>
          </section>
        </article>
        {/* Section Two */}
        <article className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 h-[300px] bg-gradient-to-tr from-coffi-blue/20 to-coffi-purple/20 text-coffi-purple rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/50">
          <Image
            alt="Construction tools icon"
            src="/assets/icons/construction-icon.svg"
            width={30}
            height={30}
            className="mb-3"
          />
          <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
            {t("aboutUs.how.text")}
          </h2>
          <p className="font-light text-lg">
            {t("aboutUs.how.digitalNomadTeam")}
          </p>
        </article>

        {/* Section Three */}
        <article className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 bg-gradient-to-br from-coffi-blue/5 to-coffi-blue/40 text-coffi-blue rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/50">
          <section>
            <Image
              alt="Coffi logo icon"
              src="/assets/icons/coffi-logo-icon.svg"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              {t("aboutUs.what.text")}
            </h2>
            <p className="font-light text-lg">
              {t("aboutUs.what.discoverThePlatform")}
            </p>
          </section>

          <Link
            className="font-bold underline flex flex-row flex-nowrap"
            href="https://qa.coffi.com.co"
            target="_blank"
          >
            {t("aboutUs.what.action")}
            <Image
              alt="Link icon"
              src="/assets/icons/link-icon.svg"
              width={11}
              height={11}
              className="ml-1"
            />
          </Link>
        </article>
      </section>
    </article>
  );
}

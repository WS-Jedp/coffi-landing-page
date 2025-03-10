import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const productNavOptions = [
    {
      name: "about",
      link: "/#about",
    },
    {
      name: "features",
      link: "/#features",
    },
    {
      name: "pricing",
      link: "/#pricing",
    },
  ];

  const helpNavOptions = [
    {
      name: "termsAndConditions",
      link: "/terms-of-service",
    },
    {
      name: "privacyPolicy",
      link: "/privacy-policy",
    },
    {
      name: "faqs",
      link: "/faqs",
    },
    {
      name: "contact",
      link: "/contact-us",
    },
  ];

  return (
    <footer className="w-full min-h-[330px] bg-gradient-to-tr from-coffi-blue to-coffi-purple text-coffi-white py-6 px-6 xl:px-0">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between  w-full max-w-[1200px] h-full mx-auto mt-9">
        <article className="flex flex-col items-center md:items-start justify-center mb-6 md:mb-0">
          <Image
            src="/assets/images/coffi-logo-positive-icon.svg"
            width={33}
            height={33}
            alt="Coffi icon in positive colors (White)"
            className="mb-1"
          />
          <strong className="font-bold text-sm">Be where you thrive</strong>
          <p className="font-semibold text-xs">© Coffi, Inc. 2025.</p>
        </article>

        <nav className="flex flex-row items-start justify-between text-center md:text-start">
          <section className="mr-16">
            <h3 className="font-bold text-2xl mb-1">{t("utils.navigationLinks.product")}</h3>
            <ul>
              {productNavOptions.map((option) => (
                <li
                  key={option.name}
                  className="font-normal text-sm cursor-pointer hover:text-coffi-purple mb-1"
                >
                  <Link href={option.link}>
                    {t(`utils.navigationLinks.${option.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="mr-16">
            <h3 className="font-bold text-2xl mb-1">{t("utils.navigationLinks.help")}</h3>
            <ul>
              {helpNavOptions.map((option) => (
                <li
                  key={option.name}
                  className="font-normal text-sm cursor-pointer hover:text-coffi-purple mb-1"
                >
                  <Link href={option.link}>
                    {t(`utils.navigationLinks.${option.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="font-bold text-2xl mb-1">{t("utils.navigationLinks.social")}</h3>
            <ul>
              {productNavOptions.map((option) => (
                <li
                  key={option.name}
                  className="font-normal text-sm cursor-pointer hover:text-coffi-purple mb-1"
                >
                  <Link href={option.link}>{option.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>
      </div>
    </footer>
  );
};

import { getTranslations } from "next-intl/server";

/** Sections and questions in page order; the copy lives in `faqs.json`. */
const SECTIONS = [
  { key: "general", questions: ["whatIsCoffi", "isCoffiFree"] },
  {
    key: "privacy",
    questions: [
      "personalInfo",
      "dataProtection",
      "thirdParties",
      "whoCanSeeMe",
      "whoCanSeeMeNomad",
    ],
  },
  { key: "plans", questions: ["whichPlans", "cancel", "upgrade"] },
  {
    key: "community",
    questions: ["contribute", "rewards", "inappropriateContent"],
  },
  {
    key: "support",
    questions: ["forgotPassword", "deleteAccount", "technicalIssues"],
  },
] as const;

const PLANS = ["explorer", "nomad", "wanderlust"] as const;

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqs" });

  return (
    <article className="relative flex flex-col items-center w-full max-w-[1120px] min-h-screen mx-auto px-5 pt-24 md:pt-28 pb-16 md:pb-24">
      <h1 className="font-bold text-4xl md:text-7xl mb-6 text-center">
        {t("title")}
      </h1>
      {SECTIONS.map((section, sectionIndex) => (
        <section
          key={section.key}
          className={`w-full${sectionIndex > 0 ? " mt-8" : ""}`}
        >
          <h2 className="font-bold text-2xl md:text-3xl mb-4">
            {t(`${section.key}.title`)}
          </h2>
          <div className="space-y-6">
            {section.questions.map((question, index) => {
              const id = `${section.key}.${question}`;
              return (
                <div key={id}>
                  <h3 className="font-semibold text-lg">
                    {index + 1}. {t(`${id}.question`)}
                  </h3>
                  {id === "plans.whichPlans" ? (
                    <article>
                      <p>{t(`${id}.intro`)}</p>
                      <ul className="list-disc ml-5 mt-2">
                        {PLANS.map((plan) => (
                          <li key={plan}>
                            {t.rich(`${id}.${plan}`, {
                              b: (chunks) => <strong>{chunks}</strong>,
                            })}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ) : (
                    <p>{t(`${id}.answer`)}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </article>
  );
}

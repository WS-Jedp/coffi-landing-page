import { SimpleButtonOutline } from "@/components/buttons";
import { TooglePanel } from "@/components/tooglePanel";
import { Tooltip } from "@/components/tooltip";
import { PlaceFilter } from "@/containers/HowItWorks";
import { useTranslations } from "next-intl";

interface PlaceCommunityInsightsFilterCardProps {
  filters: {
    id: number;
    title: string;
    value: string;
  }[];
  selectedFilters: PlaceFilter[];
  onFilter: (filter: PlaceFilter) => void;
  isOpen?: boolean;
  showNext?: boolean;
  onNext: () => void;
}

export const PlaceCommunityInsightsFilterCard: React.FC<
  PlaceCommunityInsightsFilterCardProps
> = ({ filters, selectedFilters, onFilter, isOpen, showNext, onNext }) => {
  const t = useTranslations();
  const isFilterSelected = (filterID: number) =>
    selectedFilters.find((f) => f.id === filterID);
  return (
    <TooglePanel
      title={t("home.howItWorks.guide.communityInsights.title")}
      description={t("home.howItWorks.guide.communityInsights.description")}
      isOpen={isOpen}
      tag={t("utils.subscriptions.forPremiumUsers")}
      specialTag
    >
      <article className="w-full flex flex-col items-start justify-start overflow-hidden">
        <Tooltip
          title={t("home.howItWorks.guide.howItWorks")}
          text={t("home.howItWorks.guide.communityInsights.howItWorks")}
        />
        <section className="flex flex-row flex-wrap items-center justify-start w-full mt-2">
          {filters.map((insight) => (
            <article
              key={insight.id}
              className={`
                w-auto min-w-content
                px-6 py-1 mr-1 mb-1
                cursor-pointer border-[1px] border-solid
                ${
                  !isFilterSelected(insight.id)
                    ? "border-coffi-black/15"
                    : "border-transparent bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple"
                }    
                hover:bg-coffi-black/10
                rounded-full 
                ransition-colors ease-in-out duration-500   
             `}
              onClick={() => onFilter(insight)}
            >
              <h3 className="font-light text-sm">
                {t(
                  `home.howItWorks.guide.communityInsights.options.${insight.title}`
                )}
              </h3>
            </article>
          ))}
        </section>

        <div
          className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
            showNext
              ? "translate-y-0  max-h-screen opacity-100"
              : "-translate-y-3 max-h-0 opacity-0"
          }`}
        >
          <SimpleButtonOutline
            text={t("actions.general.findYourPlace")}
            action={onNext}
            full
          />
        </div>
      </article>
    </TooglePanel>
  );
};

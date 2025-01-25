import { SimpleButtonOutline } from "@/components/buttons";
import { TooglePanel } from "@/components/tooglePanel";
import { Tooltip } from "@/components/tooltip";
import { PlaceFilter } from "@/containers/HowItWorks";

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

export const PlaceCommunityInsightsFilterCard: React.FC<PlaceCommunityInsightsFilterCardProps> = ({
  filters,
  selectedFilters,
  onFilter,
  isOpen,
  showNext,
  onNext,
}) => {
  const isFilterSelected = (filterID: number) => selectedFilters.find(f => f.id === filterID);
  return (
    <TooglePanel
      title="Community Insights"
      description="Access to real-time insights from the community."
      isOpen={isOpen}
      tag="For premium users"
      specialTag
    >
      <article className="w-full flex flex-col items-start justify-start overflow-hidden">
        <Tooltip
          title="How it works?"
          text="Leverage the power of our community with real-time updates about crowd levels, noise, and current vibes."
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
              <h3 className="font-light text-sm">{insight.title}</h3>
            </article>
          ))}
        </section>
        
        <div className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${showNext ? "translate-y-0  max-h-screen opacity-100" : "-translate-y-3 max-h-0 opacity-0"}`}>
            <SimpleButtonOutline
                text="Find Your Place"
                action={onNext}
                full
            />
        </div>
      </article>
    </TooglePanel>
  );
};

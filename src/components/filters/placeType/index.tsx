import { SimpleButtonOutline } from "@/components/buttons";
import { TooglePanel } from "@/components/tooglePanel";
import { Tooltip } from "@/components/tooltip";

interface PlaceTypeFilterCardProps {
  filters: {
    id: number;
    title: string;
    value: string;
  }[];
  selectedFilters: string[];
  onFilter: (filter: string) => void;
  isOpen?: boolean;
  showNext?: boolean;
  onNext: () => void;
}

export const PlaceTypeFilterCard: React.FC<PlaceTypeFilterCardProps> = ({
  filters,
  selectedFilters,
  onFilter,
  isOpen,
  showNext,
  onNext,
}) => {
  const isFilterSelected = (filter: string) => selectedFilters.includes(filter);
  return (
    <TooglePanel
      title="Choose Your Type of Place"
      description="Start by selecting the type of environment that suits your current need."
      isOpen={isOpen}
    >
      <article className="w-full flex flex-col items-start justify-start overflow-hidden">
        <Tooltip
          title="How it works?"
          text="From cozy cafes to quiet libraries, select an environment that aligns with today’s needs."
        />
        <section className="flex flex-row flex-nowrap items-center justify-start w-full overflow-x-auto mt-2">
          {filters.map((placeType) => (
            <article
              key={placeType.id}
              className={`
                px-6 py-1 mr-1
                cursor-pointer border-[1px] border-solid
                ${
                  !isFilterSelected(placeType.value)
                    ? "border-coffi-black/15"
                    : "border-transparent bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple"
                }    
                hover:bg-coffi-black/10
                rounded-full 
                ransition-colors ease-in-out duration-500   
             `}
              onClick={() => onFilter(placeType.value)}
            >
              <h3 className="font-light text-sm">{placeType.title}</h3>
            </article>
          ))}
        </section>
        
        <div className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${showNext ? "translate-y-0  max-h-screen opacity-100" : "-translate-y-3 max-h-0 opacity-0"}`}>
            <SimpleButtonOutline
                text="Next"
                action={onNext}
                full
            />
        </div>
      </article>
    </TooglePanel>
  );
};

import { Place } from "@/models/places";
import { useMemo } from "react";

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const rulesAvailable = useMemo(() => {
    const rulesToIgnore = ['openAt', 'closedAt']
    const rules: any[] = [];
    Object.keys(place.rules).filter(rule => !rulesToIgnore.includes(rule)).forEach((rule) => {
      if (place.rules[rule as keyof Place["rules"]]) {
        if(Array.isArray(place.rules[rule as keyof Place["rules"]])) {
        } else {
            rules.push(place.rules[rule as keyof Place["rules"]]);
        }
      }
    });
    return rules;
  }, [place]);
  const commoditiesAvailables = useMemo(() => {
    if (!place.commodities) return [];

    const commoditiesToIgnore = ['bakeryQuality', 'foodQuality', 'cafeQuality', 'temperatureControl', 'plugsAmount']

    const commodities: string[] = [];
    Object.keys(place.commodities).filter(c => !commoditiesToIgnore.includes(c)).forEach((commodity) => {
      if (!place.commodities) return;
      if (place.commodities[commodity as keyof Place["commodities"]]) {
        commodities.push(commodity);
      }
    });
    return commodities;
  }, [place]);
  return (
    <article className="min-w-[390px] w-full max-w-[420px] h-[390px] max-h-[390px] flex flex-col items-start justify-start text-start overflow-hidden p-4 rounded-lg  shadow-lg text-coffi- bg-white">
      {/* image of the place */}
      <figure className="relative w-full h-[150px] overflow-hidden bg-coffi-black/10 rounded-md">
        <img src="/lol" alt="" className="w-full h-full object-cover" />
      </figure>

      {/* place name */}
      <section className="mt-2">
        <h3 className="font-bold text-xl my-0 py-0">{place.name}</h3>
        <span className="text-xs font-light mt-[2px]">
          A 7.4 kilometros de ti
        </span>
        <p className="text-xs font-normal">{place.description}</p>
      </section>
      <hr className="w-full border-coffi-black mt-3 mb-1" />
      {/* Rules and Accomodations */}
      <section className="flex flex-row flex-wrap items-center justify-start w-full mt-2 h-[20%] overflow-y-auto">
        {place.themeTags.map((tag) => (
          <article
            key={tag}
            className={`
                
                    w-auto min-w-content
                px-4 py-[1px] mr-1 mb-1
                cursor-pointer border-[1px] border-solid
                ${
                  true
                    ? "border-coffi-black/15"
                    : "border-transparent bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple"
                }    
                rounded-full 
                    `}
          >
            <span className="font-light text-xs">{tag}</span>
          </article>
        ))}
        {place.ambianceTags.map((tag, i) => (
          <article
            key={`${tag}-${i}`}
            className={`
                
                    w-auto min-w-content
                px-4 py-[1px] mr-1 mb-1
                cursor-pointer border-[1px] border-solid
                ${
                  true
                    ? "border-coffi-black/15"
                    : "border-transparent bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple"
                }    
                rounded-full 
                    `}
          >
            <span className="font-light text-xs">{tag}</span>
          </article>
        ))}
        {rulesAvailable.map((rule, i) => (
          <article
            key={`${rule}-${i}`}
            className={`
                
                    w-auto min-w-content
                px-4 py-[1px] mr-1 mb-1
                cursor-pointer border-[1px] border-solid
                ${
                  true
                    ? "border-coffi-black/15"
                    : "border-transparent bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple"
                }    
                rounded-full 
                    `}
          >
            <span className="font-light text-xs">{rule}</span>
          </article>
        ))}
        {commoditiesAvailables.map((commodity, i) => (
          <article
            key={`${commodity}-${i}`}
            className={`
                
                    w-auto min-w-content
                px-4 py-[1px] mr-1 mb-1
                cursor-pointer border-[1px] border-solid
                ${
                  true
                    ? "border-coffi-black/15"
                    : "border-transparent bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple"
                }    
                rounded-full 
                    `}
          >
            <span className="font-light text-xs">{commodity}</span>
          </article>
        ))}
        {place.languages.map((lang) => (
          <article
            key={lang}
            className={`
                
                    w-auto min-w-content
                px-4 py-[1px] mr-1 mb-1
                cursor-pointer border-[1px] border-solid
                ${
                  true
                    ? "border-coffi-black/15"
                    : "border-transparent bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 text-coffi-purple"
                }    
                rounded-full 
                    `}
          >
            <span className="font-light text-xs">{lang}</span>
          </article>
        ))}
        
      </section>
    </article>
  );
};

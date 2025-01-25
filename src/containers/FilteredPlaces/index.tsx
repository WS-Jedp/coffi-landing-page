"use client";

import { useMemo, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PlaceCard } from "@/components/placeCard";
import { dummyPlaces } from "@/data/places";
import { PLACE_TYPES } from "@/models/places";

import "./index.css";
import { PlaceFilter } from "../HowItWorks";

interface FilteredPlacesProps {
  placeTypesSelected: PLACE_TYPES[];
  commoditiesAndRulesSelected: PlaceFilter[];
  realTimeDataSelected: PlaceFilter[];
}

export const FilteredPlaces: React.FC<FilteredPlacesProps> = ({
  placeTypesSelected,
  commoditiesAndRulesSelected,
  realTimeDataSelected,
}) => {
  const [places, setPlaces] = useState(dummyPlaces);

  const refs = useRef<Record<string, HTMLDivElement | null>>({}); // Manage refs for all cards

  const filteredPlaces = useMemo(() => {
    let currPlaces = [...places];

    currPlaces = currPlaces.filter((place) => {
      let isValid = true;

      if (placeTypesSelected.length > 0) {
        // Invalid if place type is not selected
        if (
          !place.type.filter((type) => placeTypesSelected.includes(type)).length
        ) {
          isValid = false;
        }
      }
      return isValid;
    });

    if (commoditiesAndRulesSelected.length > 0) {
      currPlaces = currPlaces.filter((place) => {
        let isValid = true;

        commoditiesAndRulesSelected.forEach((filter) => {
          const currProperty = filter.property || filter.value;

          if (place.commodities && currProperty in place.commodities) {
            if (filter.property) {
              if (
                Array.isArray(
                  place.commodities[
                    filter.property as keyof typeof place.commodities
                  ]
                )
              ) {
                const arrValue = place.commodities[
                  filter.property as keyof typeof place.commodities
                ] as string[];
                if (!arrValue.includes(filter.value)) isValid = false;
              } else {
                if (
                  place.commodities[
                    filter.property as keyof typeof place.commodities
                  ] !== filter.value
                )
                  isValid = false;
              }
            } else {
              if (
                place.commodities[
                  filter.value as keyof typeof place.commodities
                ] !== true
              )
                isValid = false;
            }
          } else if (place.rules && currProperty in place.rules) {
            if (filter.property) {
              if (
                Array.isArray(
                  place.rules[currProperty as keyof typeof place.rules]
                )
              ) {
                const arrValue = place.rules[
                  currProperty as keyof typeof place.rules
                ] as string[];
                if (!arrValue.includes(filter.value)) isValid = false;
              } else {
                if (
                  place.rules[currProperty as keyof typeof place.rules] !=
                  filter.value
                ) {
                  isValid = false;
                }
              }
            } else {
              if (
                place.rules[currProperty as keyof typeof place.rules] !== true
              ) {
                isValid = false;
              }
            }
          }
        });

        return isValid;
      });
    }

    if (realTimeDataSelected.length > 0) {
      currPlaces = currPlaces.filter((place) => {
        let isValid = true;

        realTimeDataSelected.forEach((filter) => {
          const currProperty = filter.property || filter.value;
          if (
            place.realTimeInsights &&
            currProperty in place.realTimeInsights
          ) {
            if (filter.property) {
              if (
                place.realTimeInsights[
                  currProperty as keyof typeof place.realTimeInsights
                ] !== filter.value
              ) {
                isValid = false;
              }
            } else {
              if (
                !place.realTimeInsights[
                  currProperty as keyof typeof place.realTimeInsights
                ]
              ) {
                isValid = false;
              }
            }
          }
        });
        return isValid;
      });
    }

    return currPlaces;
  }, [
    places,
    placeTypesSelected,
    commoditiesAndRulesSelected,
    realTimeDataSelected,
  ]);

  const first5DummyPlaces = useMemo(
    () => filteredPlaces.slice(0, 4),
    [filteredPlaces]
  );

  return (
    <section className="relative w-full h-full flex flex-row items-center justify-start p-9">
      <TransitionGroup component={null}>
        {first5DummyPlaces.map((place, i) => {
          const calculatedTransform = `translate(-${i * 30}px, -${i * 18}px)`;
          return (
            <CSSTransition
              key={place.id}
              timeout={600} // Animation duration in ms
              classNames="place-card"
              nodeRef={{
                current: refs.current[place.id],
              }}
            >
              <div
                ref={(ref) => {
                  refs.current[place.id] = ref; // Assign ref, but return nothing
                }}
                className={`absolute w-full md:w-1/2 lg:w-1/3`}
                style={{
                  transform: calculatedTransform,
                  zIndex: first5DummyPlaces.length - i, // Ensure correct stacking
                }}
                data-animation-transform={calculatedTransform}
              >
                <PlaceCard place={place} />
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </section>
  );
};

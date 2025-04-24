"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PlaceCard } from "@/components/placeCard";
import { dummyPlaces } from "@/data/places";
import { PLACE_TYPES } from "@/models/places";
import Confetti from "@/components/Confetti";

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
  const [places] = useState(dummyPlaces);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const prevCountRef = useRef<number>(0); // Track previous count for animation direction
  const [animationDirection, setAnimationDirection] = useState<'adding' | 'removing' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

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

  const filteredPlacesCount = useMemo(
    () => filteredPlaces.length,
    [filteredPlaces]
  );

  // Determine animation direction based on count changes
  useEffect(() => {
    if (prevCountRef.current < filteredPlacesCount) {
      setAnimationDirection('adding');
    } else if (prevCountRef.current > filteredPlacesCount) {
      setAnimationDirection('removing');
    }
    
    // Trigger confetti when exactly one place is filtered
    if (filteredPlacesCount === 1 && prevCountRef.current > 1) {
      setShowConfetti(true);
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    prevCountRef.current = filteredPlacesCount;
  }, [filteredPlacesCount]);

  return (
    <>
      <Confetti active={showConfetti} />
      <section className="relative w-full h-full flex flex-row items-center justify-start pl-0 md:pl-[150px] p-9">
        <TransitionGroup component={null}>
          {first5DummyPlaces.map((place, i) => {
            const calculatedTransform = `translate(-${i * 30}px, -${i * 18}px)`;
            return (
              <CSSTransition
                key={place.id}
                timeout={900} // Increased timeout to match longer animations
                classNames={{
                  enter: 'place-card-enter',
                  enterActive: 'place-card-enter-active',
                  exit: 'place-card-exit',
                  exitActive: 'place-card-exit-active',
                }}
                nodeRef={{
                  current: refs.current[place.id],
                }}
                onEnter={(node:any) => {
                  if (node instanceof HTMLElement) {
                    node.setAttribute('data-animation', 'adding');
                  }
                }}
                //@ts-ignore
                onExit={(node:any) => {
                  if (node) node.setAttribute('data-animation', 'removing');
                }}
              >
                <div
                  ref={(ref) => {
                    refs.current[place.id] = ref;
                  }}
                  className={`absolute w-auto md:w-1/2 lg:w-1/3 card-in-deck`}
                  style={{
                    transform: calculatedTransform,
                    zIndex: first5DummyPlaces.length - i,
                  }}
                  data-animation-transform={calculatedTransform}
                  data-animation-direction={animationDirection}
                  data-card-index={i}
                >
                  <PlaceCard place={place} isSelected={filteredPlacesCount === 1} />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </section>
    </>
  );
};

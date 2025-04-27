"use client";

import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dummyPlaces } from "@/data/places";
import { PLACE_TYPES } from "@/models/places";
import Confetti from "@/components/Confetti";

import "./index.css";
import { PlaceFilter } from "../HowItWorks";
import { useTranslations } from "next-intl";

interface FilteredPlacesZoneMapProps {
  placeTypesSelected: PLACE_TYPES[];
  commoditiesAndRulesSelected: PlaceFilter[];
  realTimeDataSelected: PlaceFilter[];
  // Add new prop for reporting available filter options
  onAvailableFiltersChange?: (availableFilters: {
    commoditiesAndRules: PlaceFilter[];
    realTimeData: PlaceFilter[];
  }) => void;
}

export const FilteredPlacesZoneMap: React.FC<FilteredPlacesZoneMapProps> = ({
  placeTypesSelected,
  commoditiesAndRulesSelected,
  realTimeDataSelected,
  onAvailableFiltersChange,
}) => {
  const t = useTranslations();
  const [places] = useState(dummyPlaces);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevMatchingCountRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const prevPositionsRef = useRef<any[]>([]);
  const [filterChangeCount, setFilterChangeCount] = useState(0);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Increment filter change counter when filters change
  useEffect(() => {
    setFilterChangeCount((prev) => prev + 1);
  }, [placeTypesSelected, commoditiesAndRulesSelected, realTimeDataSelected]);

  // Function to get the emoji of the card according to place type
  function getPlaceEmoji(placeType: PLACE_TYPES) {
    switch (placeType) {
      case PLACE_TYPES.COFFEE:
        return "☕";
      case PLACE_TYPES.RESTAURANT:
        return "🍽️";
      case PLACE_TYPES.ROOFTOP:
        return "🍺";
      case PLACE_TYPES.COWORK_ZONE:
        return "💻";
      case PLACE_TYPES.LIBRARY:
        return "📚";
      case PLACE_TYPES.PARK:
        return "🌳";
      default:
        return "📍";
    }
  }

  // Filter places based on selected criteria
  const filteredPlaces = useMemo(() => {
    let currPlaces = [...places];

    // Filter by place types with improved logging
    if (placeTypesSelected.length > 0) {
      currPlaces = currPlaces.filter((place) => {
        // Check if any of the place types match the selected types
        const typeMatches = place.type.some((type) =>
          placeTypesSelected.includes(type)
        );
        return typeMatches;
      });
    }

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

  // Function to analyze available filter options based on the current filtered places
  const analyzeAvailableFilters = useCallback(() => {
    // Use an intermediate filter state to determine available options
    // First filter by place types only to determine what options should be available for commodities/rules
    let placesFilteredByTypes = [...places];

    if (placeTypesSelected.length > 0) {
      placesFilteredByTypes = placesFilteredByTypes.filter((place) =>
        place.type.some((type) => placeTypesSelected.includes(type))
      );
    }

    // Then filter by commodities/rules to determine what options should be available for real-time data
    let placesFilteredByTypesAndCommodities = [...placesFilteredByTypes];

    if (commoditiesAndRulesSelected.length > 0) {
      placesFilteredByTypesAndCommodities =
        placesFilteredByTypesAndCommodities.filter((place) => {
          let isValid = true;
          commoditiesAndRulesSelected.forEach((filter) => {
            const currProperty = filter.property || filter.value;
            if (place.commodities && currProperty in place.commodities) {
              // Same filtering logic as in filteredPlaces
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
              // Same filtering logic as in filteredPlaces
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

    // Extract available commodities and rules
    const availableCommoditiesAndRules = new Map<string, PlaceFilter>();
    placesFilteredByTypes.forEach((place) => {
      // Extract commodities
      if (place.commodities) {
        Object.entries(place.commodities).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              const filterId = `${key}-${val}`;
              availableCommoditiesAndRules.set(filterId, {
                id: availableCommoditiesAndRules.size + 1, // Generate unique ID
                title: key,
                value: val,
                property: key,
              });
            });
          } else if (typeof value === "boolean" && value) {
            availableCommoditiesAndRules.set(key, {
              id: availableCommoditiesAndRules.size + 1,
              title: key,
              value: key,
            });
          } else {
            const filterId = `${key}-${value}`;
            availableCommoditiesAndRules.set(filterId, {
              id: availableCommoditiesAndRules.size + 1,
              title: key,
              value: String(value),
              property: key,
            });
          }
        });
      }

      // Extract rules
      if (place.rules) {
        Object.entries(place.rules).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              const filterId = `${key}-${val}`;
              availableCommoditiesAndRules.set(filterId, {
                id: availableCommoditiesAndRules.size + 1, // Generate unique ID
                title: key,
                value: val,
                property: key,
              });
            });
          } else if (typeof value === "boolean" && value) {
            availableCommoditiesAndRules.set(key, {
              id: availableCommoditiesAndRules.size + 1,
              title: key,
              value: key,
            });
          } else {
            const filterId = `${key}-${value}`;
            availableCommoditiesAndRules.set(filterId, {
              id: availableCommoditiesAndRules.size + 1,
              title: key,
              value: String(value),
              property: key,
            });
          }
        });
      }
    });

    // Extract available real-time insights
    const availableRealTimeData = new Map<string, PlaceFilter>();
    placesFilteredByTypesAndCommodities.forEach((place) => {
      if (place.realTimeInsights) {
        Object.entries(place.realTimeInsights).forEach(([key, value]) => {
          if (typeof value === "boolean" && value) {
            availableRealTimeData.set(key, {
              id: availableRealTimeData.size + 1,
              title: key,
              value: key,
            });
          } else {
            const filterId = `${key}-${value}`;
            availableRealTimeData.set(filterId, {
              id: availableRealTimeData.size + 1,
              title: key,
              value: String(value),
              property: key,
            });
          }
        });
      }
    });

    return {
      commoditiesAndRules: Array.from(availableCommoditiesAndRules.values()),
      realTimeData: Array.from(availableRealTimeData.values()),
    };
  }, [places, placeTypesSelected, commoditiesAndRulesSelected]);

  // Report available filters when relevant data changes
  useEffect(() => {
    if (onAvailableFiltersChange) {
      const availableFilters = analyzeAvailableFilters();
      onAvailableFiltersChange(availableFilters);
    }
  }, [
    placeTypesSelected,
    commoditiesAndRulesSelected,
    analyzeAvailableFilters,
    onAvailableFiltersChange,
  ]);

  // Determine if search has started - when user has selected at least one place type
  const hasSearchStarted = placeTypesSelected.length > 0;

  // Get all places with a matching flag - ensure we include all matching places
  const placesWithMatchingStatus = useMemo(() => {
    // Always include all places that match the filters
    const matchingPlaces = hasSearchStarted ? filteredPlaces : places;

    // Start with all matching places
    const placesToDisplay = [...matchingPlaces];

    // If we need more to reach 12 display places, add non-matching places
    if (placesToDisplay.length < 12) {
      const nonMatchingPlaces = places
        .filter((p) => !matchingPlaces.some((mp) => mp.id === p.id))
        .slice(0, 12 - placesToDisplay.length);

      placesToDisplay.push(...nonMatchingPlaces);
    } else if (placesToDisplay.length > 12) {
      // If we have more than 12 matching places, keep only the first 12
      placesToDisplay.length = 12;
    }

    const placesWithStatus = placesToDisplay.map((place) => {
      // Determine if this place matches the current filters
      const isMatching =
        !hasSearchStarted || filteredPlaces.some((p) => p.id === place.id);

      // Find previous state of this place
      const prevPlace = prevPositionsRef.current.find((p) => p.id === place.id);
      const wasMatching = prevPlace?.isMatching || false;

      // Flag if matching status changed
      const statusChanged = isMatching !== wasMatching;

      return {
        ...place,
        isMatching,
        statusChanged,
        key: `${place.id}-${
          isMatching ? "match" : "no-match"
        }-${filterChangeCount}`,
      };
    });

    // Only sort by matching status if search has started
    if (hasSearchStarted) {
      return placesWithStatus.sort((a, b) => {
        if (a.isMatching && !b.isMatching) return 1;
        if (!a.isMatching && b.isMatching) return -1;
        return 0;
      });
    }

    return placesWithStatus;
  }, [
    places,
    filteredPlaces,
    filterChangeCount,
    prevPositionsRef,
    hasSearchStarted,
  ]);

  // Generate positions for all place cards
  const placesWithPositions = useMemo(() => {
    // Count how many places match
    const matchingCount = hasSearchStarted
      ? placesWithMatchingStatus.filter((p) => p.isMatching).length
      : 0;

    const newPositions = placesWithMatchingStatus.map((place, index) => {
      // Create a grid-like positioning system that covers the space well
      const row = Math.floor(index / 4); // 4 cards per row
      const col = index % 4;

      // Calculate base positions with some randomness
      let xBase = col * 25 + 5;
      let yBase = row * 30 + 5;

      // Special positioning for matching places only if search has started
      if (hasSearchStarted && place.isMatching) {
        // If we have few matches, center them more prominently
        if (matchingCount <= 3) {
          // Center horizontally with some variation
          xBase = 35 + (index % Math.max(1, matchingCount)) * 15;
          // Center vertically
          yBase = 40 + (index % 2) * 20;
        } else {
          // With more matches, create a grid but in prime screen area
          const matchIndex = placesWithMatchingStatus
            .filter((p) => p.isMatching)
            .findIndex((p) => p.id === place.id);
          const matchRow = Math.floor(matchIndex / 3); // 3 cards per row for matches
          const matchCol = matchIndex % 3;

          xBase = 20 + matchCol * 25;
          yBase = 25 + matchRow * 30;
        }
      }

      // Add randomness to positions
      // Less randomness for matching places only if search has started
      const randomFactor = hasSearchStarted && place.isMatching ? 0.5 : 1;
      const xRand = (Math.random() * 15 - 7.5) * randomFactor;
      const yRand = (Math.random() * 15 - 7.5) * randomFactor;

      // Calculate final positions with constraints
      const x = Math.max(5, Math.min(95, xBase + xRand));
      const y = Math.max(5, Math.min(95, yBase + yRand));

      // Use matching status to influence depth only if search has started
      const depth = hasSearchStarted
        ? place.isMatching
          ? 0
          : Math.random() * 2
        : Math.random() * 0.5; // Less depth variation when search hasn't started

      // Find previous position of this place if it existed
      const prevPlace = prevPositionsRef.current.find((p) => p.id === place.id);

      return {
        ...place,
        position: {
          x: `${x}%`,
          y: `${y}%`,
        },
        previousPosition: prevPlace?.position,
        depth,
        layoutId: `place-${place.id}`,
      };
    });

    // Update reference for next render cycle
    prevPositionsRef.current = newPositions;

    return newPositions;
  }, [placesWithMatchingStatus, hasSearchStarted]);

  // Trigger confetti when exactly one place matches filters
  useEffect(() => {
    // Only trigger confetti if search has started
    if (!hasSearchStarted) return;

    const matchingCount = placesWithPositions.filter(
      (p) => p.isMatching
    ).length;

    if (matchingCount === 1 && prevMatchingCountRef.current > 1) {
      setShowConfetti(true);
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    prevMatchingCountRef.current = matchingCount;
  }, [placesWithPositions, hasSearchStarted]);

  return (
    <>
      <Confetti active={showConfetti} />
      <section className="relative w-full h-[300px] md:h-[510px]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Gradient Blob 1 */}
          <motion.div
            className="absolute rounded-full bg-coffi-purple/5 blur-3xl"
            style={{
              width: "50%",
              height: "40%",
              top: "10%",
              left: "10%",
            }}
            animate={{
              x: [0, "10%", "5%", "-5%", "0%"],
              y: [0, "15%", "5%", "10%", "0%"],
              scale: [1, 1.05, 0.97, 1.03, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          />

          {/* Gradient Blob 2 */}
          <motion.div
            className="absolute rounded-full bg-blue-400/3 blur-3xl"
            style={{
              width: "40%",
              height: "50%",
              bottom: "10%",
              right: "20%",
            }}
            animate={{
              x: [0, "-10%", "-5%", "5%", "0%"],
              y: [0, "-8%", "-12%", "-4%", "0%"],
              scale: [1, 0.95, 1.03, 0.98, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          />

          {/* Floating Dots */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute rounded-full bg-coffi-purple/10"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
                animate={{
                  y: [0, `${Math.random() * 50 - 25}px`],
                  x: [0, `${Math.random() * 50 - 25}px`],
                  opacity: [
                    Math.random() * 0.3 + 0.2,
                    Math.random() * 0.5 + 0.3,
                    Math.random() * 0.3 + 0.2,
                  ],
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Horizontal Lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute bg-gradient-to-r from-transparent via-coffi-purple/5 to-transparent"
                style={{
                  height: "1px",
                  width: "100%",
                  top: `${15 + i * 15}%`,
                  opacity: 0.4,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scaleY: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8 + i * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.5,
                }}
              />
            ))}
          </div>

          {/* Grid Pattern */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #6366f1 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Filter status indicator - only show after search has started */}
        {hasSearchStarted && (
          <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm shadow-sm rounded-lg px-3 py-1 text-sm z-[100]">
            <span className="font-medium text-gray-700">
              {placesWithPositions.filter((p) => p.isMatching).length}
              {placesWithPositions.filter((p) => p.isMatching).length === 1
                ? " " + t("utils.filterSystem.found.singular")
                : " " + t("utils.filterSystem.found.plural")}
            </span>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {placesWithPositions.map((place, i) => {
            // Create depth effect values - less pronounced if search hasn't started
            const scale = hasSearchStarted
              ? place.isMatching
                ? 1
                : 1 - place.depth * 0.15
              : 1 - place.depth * 0.05; // Minimal depth effect before search starts

            const blur = hasSearchStarted
              ? place.isMatching
                ? 0
                : place.depth * 1.5
              : place.depth * 0.3; // Minimal blur before search starts

            const zIndex = hasSearchStarted
              ? place.isMatching
                ? 50
                : 10 - Math.floor(place.depth)
              : 10 - Math.floor(place.depth);

            const opacity = hasSearchStarted
              ? place.isMatching
                ? 1
                : 0.8 - place.depth * 0.15
              : 1 - place.depth * 0.05; // All cards visible before search

            // Generate unique floating animation parameters for each card
            const baseFloatDuration = 20 + (i % 7) * 3; // Slightly longer base durations (20-41 seconds)

            const floatYAmount =
              hasSearchStarted && place.isMatching
                ? 8 + (i % 5) * 0.8 // Larger movement for matching
                : 3 + (i % 5) * 0.7; // Subtle movement for non-matching

            const floatXAmount =
              hasSearchStarted && place.isMatching
                ? 7 + (i % 4) * 1.1
                : 2.5 + (i % 4) * 0.9;

            // More natural rotation amounts
            const rotateAmount =
              hasSearchStarted && place.isMatching
                ? (i % 2 === 0 ? 1 : -1) * (0.8 + (i % 3) * 0.3)
                : (i % 2 === 0 ? 1 : -1) * (0.4 + (i % 3) * 0.2);

            const rotateXAmount =
              (i % 2 === 0 ? 0.3 : -0.3) *
              (hasSearchStarted && place.isMatching ? 1 : 0.5);
            const rotateYAmount =
              (i % 3 === 0 ? 0.4 : -0.3) *
              (hasSearchStarted && place.isMatching ? 1 : 0.5);

            // Create unique path patterns per card with more randomized offsets
            const xPathOffset = (i % 7) / 7; // More variation (0 to ~0.85)
            const yPathOffset = (i % 5) / 5;
            const rotatePathOffset = (i % 9) / 9;

            // Smoother easing curve for more natural movement
            const customEase = [0.33, 0.1, 0.25, 1];

            return (
              <motion.div
                key={place.key}
                initial={{
                  opacity: 0,
                  scale: scale * 0.8,
                  x: "-50%",
                  filter: `blur(${blur + 3}px)`,
                  left: place.position.x,
                  top: place.position.y,
                }}
                animate={{
                  opacity,
                  scale,
                  filter: `blur(${blur}px)`,
                  x: "-50%",
                  left: place.position.x,
                  top: place.position.y,
                }}
                exit={{
                  opacity: 0,
                  scale: scale * 0.8,
                  filter: `blur(${blur + 3}px)`,
                  x: "-50%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 16,
                  mass: 0.8,
                  duration: 0.6,
                }}
                className={`pointer-events-none absolute bg-white/90 backdrop-blur-sm ${
                  hasSearchStarted && place.isMatching
                    ? "shadow-md shadow-coffi-purple/30 ring-1 ring-coffi-purple/30"
                    : "shadow-sm"
                } rounded-xl w-[170px] h-14 flex flex-row items-center justify-start p-2 gap-2`}
                style={{
                  zIndex,
                  transformOrigin: "center center",
                  perspective: "1000px", // Add perspective for 3D effect
                }}
              >
                {/* Indicator dot - only show for matching places after search has started */}
                {hasSearchStarted && place.isMatching && (
                  <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-coffi-purple rounded-full border-2 border-white z-10" />
                )}

                {/* Zero gravity floating animation container */}
                <motion.div
                  className="w-full h-full absolute inset-0 rounded-xl overflow-hidden"
                  animate={{
                    y: [
                      0,
                      floatYAmount * 0.4,
                      -floatYAmount * 0.3,
                      floatYAmount * 0.8,
                      -floatYAmount * 0.6,
                      floatYAmount * 0.2,
                      0,
                    ],
                    x: [
                      0,
                      -floatXAmount * 0.5,
                      floatXAmount * 0.7,
                      -floatXAmount * 0.3,
                      floatXAmount * 0.5,
                      -floatXAmount * 0.2,
                      0,
                    ],
                    rotate: [
                      0,
                      rotateAmount * 0.3,
                      -rotateAmount * 0.5,
                      rotateAmount,
                      -rotateAmount * 0.8,
                      rotateAmount * 0.4,
                      0,
                    ],
                    rotateX: [
                      0,
                      rotateXAmount,
                      -rotateXAmount * 0.7,
                      rotateXAmount * 0.5,
                      -rotateXAmount,
                      0,
                    ],
                    rotateY: [
                      0,
                      -rotateYAmount * 0.8,
                      rotateYAmount,
                      -rotateYAmount * 0.6,
                      rotateYAmount * 0.4,
                      0,
                    ],
                    scale: [
                      1,
                      1 + (place.isMatching ? 0.015 : 0.008),
                      1 - (place.isMatching ? 0.008 : 0.004),
                      1 + (place.isMatching ? 0.01 : 0.006),
                      1,
                    ],
                  }}
                  transition={{
                    duration: baseFloatDuration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.16, 0.33, 0.56, 0.74, 0.91, 1], // More natural distribution
                    delay: i * 0.7, // Increased delay for more variety between cards
                    x: {
                      duration: baseFloatDuration + (i % 5) * 1.8,
                      ease: customEase,
                      offset: [
                        0,
                        0.15 + xPathOffset * 0.2,
                        0.35 + xPathOffset * 0.2,
                        0.6 + xPathOffset * 0.1,
                        0.8 + xPathOffset * 0.05,
                        0.9,
                        1,
                      ],
                    },
                    y: {
                      duration: baseFloatDuration + (i % 3) * 2.8,
                      ease: customEase,
                      offset: [
                        0,
                        0.2 + yPathOffset * 0.15,
                        0.4 + yPathOffset * 0.2,
                        0.6 + yPathOffset * 0.15,
                        0.75 + yPathOffset * 0.1,
                        0.9,
                        1,
                      ],
                    },
                    rotate: {
                      duration: baseFloatDuration + (i % 6) * 2.2,
                      ease: [0.34, 0.17, 0.26, 1],
                      offset: [
                        0,
                        0.15 + rotatePathOffset * 0.15,
                        0.38 + rotatePathOffset * 0.15,
                        0.6,
                        0.8,
                        0.92,
                        1,
                      ],
                    },
                    // Add variable timing for smoother 3D rotation
                    rotateX: {
                      duration: baseFloatDuration * 1.2,
                      ease: "easeInOut",
                    },
                    rotateY: {
                      duration: baseFloatDuration * 1.3,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {/* Status change effect */}
                  {hasSearchStarted && place.statusChanged && (
                    <motion.div
                      className={`absolute inset-0 rounded-xl ${
                        place.isMatching
                          ? "bg-coffi-purple/15"
                          : "bg-gray-200/15"
                      }`}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  )}
                </motion.div>

                {/* Content elements */}
                <motion.figure
                  className={`${
                    hasSearchStarted && place.isMatching
                      ? "bg-coffi-purple/20"
                      : "bg-gray-200/80"
                  } rounded-lg w-9 h-9 flex items-center justify-center z-10`}
                  animate={
                    hasSearchStarted && place.isMatching
                      ? {
                          opacity: [1, 0.85, 1],
                          scale: [1, 1.03, 1],
                        }
                      : {}
                  }
                  transition={
                    hasSearchStarted && place.isMatching
                      ? {
                          repeat: Infinity,
                          duration: 3.5,
                          ease: "easeInOut",
                          times: [0, 0.5, 1],
                        }
                      : {}
                  }
                >
                  <span
                    className={`text-sm ${
                      hasSearchStarted && place.isMatching
                        ? "text-coffi-purple"
                        : "text-gray-500"
                    }`}
                  >
                    {getPlaceEmoji(place.type[0])}
                  </span>
                </motion.figure>
                <div className="flex flex-col items-start overflow-hidden z-10">
                  <h3
                    className={`text-sm font-medium truncate ${
                      hasSearchStarted && place.isMatching
                        ? "text-coffi-purple"
                        : "text-gray-700"
                    }`}
                  >
                    {place.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {(Math.random() * 5 + 0.5).toFixed(1)}km
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>
    </>
  );
};

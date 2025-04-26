"use client";
import { SimpleButtonOutline } from "@/components/buttons";
import { PlaceCommunityInsightsFilterCard } from "@/components/filters/placeCommunityInsights";
import { PlaceRulesAndAmmenitiesFilterCard } from "@/components/filters/placeRulesAndAmmenities";
import { PlaceTypeFilterCard } from "@/components/filters/placeType";
import StepsThrough from "@/components/stepsThrough";
import { useState } from "react";
import {
  COMMODITY_QUALITY,
  FOOD_COMMODITY_ENUM,
  MINDSETS,
  MOBILE_SIGNAL_COMMODITY_ENUM,
  NOISE_LEVEL_ENUM,
  PARKING_COMMODITY_ENUM,
  PEOPLE_AMOUNT_ENUM,
  PLACE_TYPES,
  WIFI_SPEED_COMMODITY_ENUM,
} from "@/models/places";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FilteredPlacesZoneMap } from "../FilteredPlacesZoneMap";

export interface PlaceFilter {
  id: number;
  title: string;
  value: string;
  property?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      duration: 0.6,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const resultsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const HowItWorks: React.FC = () => {
  const t = useTranslations();
  const placeRulesAndAmmenities = [
    {
      id: 1,
      value: "petFriendly",
      title: "petFriendly",
    },
    {
      id: 2,
      value: "publicWifi",
      title: "publicWifi",
    },

    // {
    //   id: 4,
    //   value: "publicPlugs",
    //   title: "Power Outlets",
    // },
    {
      id: 5,
      value: "outdoorSeating",
      title: "outdoorSpace",
    },
    {
      id: 3,
      value: WIFI_SPEED_COMMODITY_ENUM.FAST,
      title: "highWifiSpeed",
      property: "wifiSpeed",
    },
    {
      id: 6,
      value: FOOD_COMMODITY_ENUM.VEGAN,
      title: "veganOptions",
      property: "food",
    },
    {
      id: 7,
      value: "alcoholAvailability",
      title: "alcoholAvailability",
    },
    {
      id: 8,
      value: PARKING_COMMODITY_ENUM.IN_PLACE,
      title: "parkingInPlace",
      property: "parking",
    },
    // {
    //   id: 9,
    //   value: "publicBathrooms",
    //   title: "Restrooms",
    // },
    // {
    //   id: 10,
    //   value: FOOD_COMMODITY_ENUM.VEGETARIAN,
    //   title: "Vegetarian Options",
    //   property: "food",
    // },
    {
      id: 11,
      value: PARKING_COMMODITY_ENUM.NEARBY,
      title: "nearbyParking",
      property: "parking",
    },
    {
      id: 12,
      value: "bakery",
      title: "bakeryService",
    },
    {
      id: 13,
      value: COMMODITY_QUALITY.GOOD,
      title: "goodCafeService",
      property: "cafeQuality",
    },
    {
      id: 14,
      value: "eventSpace",
      title: "spaceForEvents",
    },
    {
      id: 15,
      value: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      title: "strongMobileSignal",
      property: "mobileSignal",
    },
    {
      id: 16,
      value: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
      title: "veryHighWifiSpeed",
      property: "wifiSpeed",
    },
    {
      id: 17,
      value: "cafe",
      title: "cafeService",
    },
  ];
  const placeTypeOptions = [
    {
      id: 1,
      title: "cafe",
      value: PLACE_TYPES.COFFEE,
    },
    {
      id: 2,
      title: "library",
      value: PLACE_TYPES.LIBRARY,
    },
    {
      id: 3,
      title: "park",
      value: PLACE_TYPES.PARK,
    },
    {
      id: 4,
      title: "coworking",
      value: PLACE_TYPES.COWORK_ZONE,
    },
    {
      id: 5,
      title: "rooftop",
      value: PLACE_TYPES.ROOFTOP,
    },
  ];
  const communityRealTimeInsights = [
    {
      id: 1,
      title: "max25People",
      value: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
      property: "peopleAmount",
    },
    {
      id: 2,
      title: "max10People",
      value: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
      property: "peopleAmount",
    },
    {
      id: 3,
      title: "plus30People",
      value: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
      property: "peopleAmount",
    },
    {
      id: 4,
      title: "idealForWork",
      value: MINDSETS.WORK,
      property: "idealFor",
    },
    {
      id: 5,
      title: "idealForStudy",
      value: MINDSETS.STUDY,
      property: "idealFor",
    },
    {
      id: 6,
      title: "idealForMeetings",
      value: MINDSETS.SOCIAL,
      property: "idealFor",
    },
    {
      id: 7,
      title: "idealForDates",
      value: MINDSETS.ROMANTIC,
      property: "idealFor",
    },
    {
      id: 9,
      title: "veryQuietPlace",
      value: NOISE_LEVEL_ENUM.VERY_QUIET,
      property: "noiseLevel",
    },
    {
      id: 10,
      title: "quietPlace",
      value: NOISE_LEVEL_ENUM.QUIET,
      property: "noiseLevel",
    },
    {
      id: 11,
      title: "moderateNoise",
      value: NOISE_LEVEL_ENUM.MODERATE,
      property: "noiseLevel",
    },
  ];
  const [selectedPlaceRulesAndAmmenities, setSelectedPlaceRulesAndAmmenities] =
    useState<PlaceFilter[]>([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState<string[]>([]);
  const [selectedPlaceInsights, setSelectedPlaceInsights] = useState<
    PlaceFilter[]
  >([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleOnPlaceRuleAndAmmenity = (filter: PlaceFilter) => {
    if (selectedPlaceRulesAndAmmenities.find((f) => f.id === filter.id)) {
      setSelectedPlaceRulesAndAmmenities(
        selectedPlaceRulesAndAmmenities.filter((type) => type.id !== filter.id)
      );
    } else {
      setSelectedPlaceRulesAndAmmenities([
        ...selectedPlaceRulesAndAmmenities,
        filter,
      ]);
    }
  };

  const handleOnPlaceType = (filter: string) => {
    if (selectedPlaceTypes.includes(filter)) {
      setSelectedPlaceTypes(
        selectedPlaceTypes.filter((type) => type !== filter)
      );
    } else {
      setSelectedPlaceTypes([...selectedPlaceTypes, filter]);
    }
  };

  const handleOnPlaceInsight = (filter: PlaceFilter) => {
    if (selectedPlaceInsights.find((f) => f.id === filter.id)) {
      setSelectedPlaceInsights(
        selectedPlaceInsights.filter((type) => type.id !== filter.id)
      );
    } else {
      setSelectedPlaceInsights([...selectedPlaceInsights, filter]);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetFilters = () => {
    setSelectedPlaceRulesAndAmmenities([]);
    setSelectedPlaceTypes([]);
    setSelectedPlaceInsights([]);
    setCurrentStep(1);
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="flex flex-col items-center justify-start w-full min-h-screen h-auto text-center mx-auto px-6 xl:px-0 mb-12"
      id="features"
    >
      <motion.h1
        variants={titleVariants}
        className="font-bold text-4xl md:text-7xl mx-auto"
      >
        {t("home.howItWorks.thePathTo")} <br />
        {t("home.howItWorks.perfectSpot")}
      </motion.h1>
      <motion.p variants={titleVariants} className="text-lg font-light mt-2">
        {t("home.howItWorks.description")}
      </motion.p>
      <motion.p variants={titleVariants} className="font-light text-md my-1">
        {t("home.howItWorks.benefit")}
      </motion.p>

      <motion.section
        variants={containerVariants}
        className="relative w-full h-auto justify-between flex flex-col md:flex-row-reverse mt-9"
      >
        <motion.article
          variants={containerVariants}
          className="flex flex-col items-center justify-start md:items-start w-full md:w-2/3"
        >
          <motion.div
            variants={itemVariants}
            className="relative w-full flex flex-row flex-nowrap items-start justify-start mt-1 mb-3"
          >
            <div className="relative mr-2 mt-1 h-full">
              <StepsThrough step={{ id: 1 }} currentStep={currentStep} />
            </div>
            <PlaceTypeFilterCard
              filters={placeTypeOptions}
              selectedFilters={selectedPlaceTypes}
              onFilter={handleOnPlaceType}
              isOpen={currentStep === 1}
              showNext={currentStep === 1 && selectedPlaceTypes.length > 0}
              onNext={handleNextStep}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative h-auto flex flex-row flex-nowrap items-start justify-start mt-1 mb-3"
          >
            <div className="relative mr-2 mt-1 h-full">
              <StepsThrough step={{ id: 2 }} currentStep={currentStep} />
            </div>
            <PlaceRulesAndAmmenitiesFilterCard
              filters={placeRulesAndAmmenities}
              selectedFilters={selectedPlaceRulesAndAmmenities}
              onFilter={handleOnPlaceRuleAndAmmenity}
              isOpen={currentStep === 2}
              showNext={
                currentStep === 2 && selectedPlaceRulesAndAmmenities.length > 0
              }
              onNext={handleNextStep}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative h-auto flex flex-row flex-nowrap items-start justify-start mt-1 mb-3"
          >
            <div className="relative mr-2 mt-1 h-full">
              <StepsThrough step={{ id: 3 }} currentStep={currentStep} />
            </div>
            <PlaceCommunityInsightsFilterCard
              filters={communityRealTimeInsights}
              selectedFilters={selectedPlaceInsights}
              onFilter={handleOnPlaceInsight}
              isOpen={currentStep === 3}
              showNext={currentStep === 3 && selectedPlaceInsights.length > 0}
              onNext={handleNextStep}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
              currentStep > 3
                ? "translate-y-0  max-h-screen opacity-100"
                : "-translate-y-3 max-h-0 opacity-0"
            }`}
          >
            <SimpleButtonOutline
              text="Reset Filters"
              action={resetFilters}
              full
            />
          </motion.div>
        </motion.article>

        {/* <motion.article
          variants={resultsVariants}
          className="relative w-full h-auto md:h-[420px] mb-[180px] md:mb-0 mt-[240px] md:mt-[42px] flex justify-center"
        >
          <FilteredPlaces
            placeTypesSelected={selectedPlaceTypes as PLACE_TYPES[]}
            commoditiesAndRulesSelected={selectedPlaceRulesAndAmmenities}
            realTimeDataSelected={selectedPlaceInsights}
          />
        </motion.article> */}
        <motion.article
          variants={resultsVariants}
          className="relative w-full h-auto flex justify-center"
        >
          <FilteredPlacesZoneMap
            placeTypesSelected={selectedPlaceTypes as PLACE_TYPES[]}
            commoditiesAndRulesSelected={selectedPlaceRulesAndAmmenities}
            realTimeDataSelected={selectedPlaceInsights}
          />
        </motion.article>
      </motion.section>
    </motion.article>
  );
};

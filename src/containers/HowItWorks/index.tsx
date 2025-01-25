"use client";
import { SimpleButtonOutline } from "@/components/buttons";
import { PlaceCommunityInsightsFilterCard } from "@/components/filters/placeCommunityInsights";
import { PlaceRulesAndAmmenitiesFilterCard } from "@/components/filters/placeRulesAndAmmenities";
import { PlaceTypeFilterCard } from "@/components/filters/placeType";
import StepsThrough from "@/components/stepsThrough";
import { useState } from "react";
import { FilteredPlaces } from "../FilteredPlaces";
import { COMMODITY_QUALITY, FOOD_COMMODITY_ENUM, MINDSETS, MOBILE_SIGNAL_COMMODITY_ENUM, NOISE_LEVEL_ENUM, PARKING_COMMODITY_ENUM, PEOPLE_AMOUNT_ENUM, PLACE_TYPES, WIFI_SPEED_COMMODITY_ENUM } from "@/models/places";

export interface PlaceFilter {
  id: number
  title: string
  value: string
  property?: string
}

export const HowItWorks: React.FC = () => {
  const placeRulesAndAmmenities = [
    {
      id: 1,
      value: "petFriendly",
      title: "Pet Friendly",
    },
    {
      id: 2,
      value: "publicWifi",
      title: "Public Wifi",
    },
  
    // {
    //   id: 4,
    //   value: "publicPlugs",
    //   title: "Power Outlets",
    // },
    {
      id: 5,
      value: "outdoorSeating",
      title: "Outdoor Space",
    },
    {
      id: 3,
      value: WIFI_SPEED_COMMODITY_ENUM.FAST,
      title: "High Speed Wifi",
      property: "wifiSpeed",
    },
    {
      id: 6,
      value: FOOD_COMMODITY_ENUM.VEGAN,
      title: "Vegan Options",
      property: "food"
    },
    {
      id: 7,
      value: "alcoholAvailability",
      title: "Alcohol Available",
    },
    {
      id: 8,
      value: PARKING_COMMODITY_ENUM.IN_PLACE,
      title: "Parking in place",
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
      title: "Nearby Parking",
      property: "parking",
    },
    {
      id: 12,
      value: 'bakery',
      title: 'Bakery Service',
    },
    {
      id: 13,
      value: COMMODITY_QUALITY.GOOD,
      title: 'Good Cafe Service',
      property: 'cafeQuality'
    },
    {
      id: 14,
      value: 'eventSpave',
      title: 'Space for Events',
    },
    {
      id: 15,
      value: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      title: 'Strong Mobile Signal',
      property: 'mobileSignal'
    },
    {
      id: 16,
      value: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
      title: "Very High Speed Wifi",
      property: "wifiSpeed",
    },
    {
      id: 17,
      value: "cafe",
      title: "Cafe Service",
    },
    
  ];
  const placeTypeOptions = [
    {
      id: 1,
      title: "Cafe",
      value: PLACE_TYPES.COFFEE,
    },
    {
      id: 2,
      title: "Library",
      value: PLACE_TYPES.LIBRARY,
    },
    {
      id: 3,
      title: "Park",
      value: PLACE_TYPES.PARK,
    },
    {
      id: 4,
      title: "Coworking",
      value: PLACE_TYPES.COWORK_ZONE,
    },
    {
      id: 5,
      title: "Rooftop",
      value: PLACE_TYPES.ROOFTOP,
    },
  ];
  const communityRealTimeInsights = [
    {
      id: 1,
      title: "Max 25 People",
      value: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
      property: "peopleAmount"
    },
    {
      id: 2,
      title: "Max 10 People",
      value: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
      property: "peopleAmount"
    },
    {
      id: 3,
      title: "30+ People",
      value: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
      property: "peopleAmount"
    },
    {
      id: 4,
      title: "Ideal for Work",
      value: MINDSETS.WORK,
      property: 'idealFor'
    },
    {
      id: 5,
      title: "Ideal for Study",
      value: MINDSETS.STUDY,
      property: 'idealFor'
    },
    {
      id: 6,
      title: "Ideal for Meetings",
      value: MINDSETS.SOCIAL,
      property: 'idealFor'
    },
    {
      id: 7,
      title: "Ideal for Dates",
      value: MINDSETS.ROMANTIC,
      property: 'idealFor'
    },
    {
      id: 9,
      title: "Very Quiet Place",
      value: NOISE_LEVEL_ENUM.VERY_QUIET,
      property: 'noiseLevel'
    },
    {
      id: 10,
      title: "Quiet Place",
      value: NOISE_LEVEL_ENUM.QUIET,
      property: 'noiseLevel'
    },
    {
      id: 11,
      title: "Moderate Noise",
      value: NOISE_LEVEL_ENUM.MODERATE,
      property: 'noiseLevel'
    },
    {
      id: 12,
      title: "Loud Place",
      value: NOISE_LEVEL_ENUM.LOUD,
      property: 'noiseLevel'
    },
    
  ];
  const [selectedPlaceRulesAndAmmenities, setSelectedPlaceRulesAndAmmenities] =
    useState<PlaceFilter[]>([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState<string[]>([]);
  const [selectedPlaceInsights, setSelectedPlaceInsights] = useState<PlaceFilter[]>(
    []
  );
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleOnPlaceRuleAndAmmenity = (filter: PlaceFilter) => {
    if (selectedPlaceRulesAndAmmenities.find(f => f.id === filter.id)) {
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
    if (selectedPlaceInsights.find(f => f.id === filter.id)) {
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
  }

  return (
    <article className="flex flex-col items-center justify-start w-full min-h-screen h-auto text-center mx-auto px-6 xl:px-0 mb-12" id="features">
      <h1 className="font-bold text-4xl md:text-7xl mx-auto">
        The Path to your <br />
        Perfect Spot
      </h1>
      <p className="text-lg font-light mt-2">
        Experience the quick and ease way to locate your ideal spot
      </p>
      <p className="font-light text-md my-1">
        Save time and get back to what matters—your Coffi.
      </p>

      <section className="relative w-full h-auto justify-between flex flex-col md:flex-row-reverse mt-9">
        <article className="flex flex-col items-center justify-start md:items-end w-full md:w-2/3">
          <div className="relative flex flex-row flex-nowrap items-start justify-start mt-1 mb-3">
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
          </div>
          <div className="relative h-auto flex flex-row flex-nowrap items-start justify-start mt-1 mb-3">
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
          </div>
          <div className="relative h-auto flex flex-row flex-nowrap items-start justify-start mt-1 mb-3">
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
          </div>

          <div className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${currentStep > 3 ? "translate-y-0  max-h-screen opacity-100" : "-translate-y-3 max-h-0 opacity-0"}`}>
            <SimpleButtonOutline
              text="Reset Filters"
              action={resetFilters}
              full
            />
          </div>
        </article>

        <article className="relative w-full  h-auto md:h-[420px]  mb-[180px] md:mb-0  mt-[240px] md:mt-[42px]">
              <FilteredPlaces placeTypesSelected={selectedPlaceTypes as PLACE_TYPES[]} commoditiesAndRulesSelected={selectedPlaceRulesAndAmmenities} realTimeDataSelected={selectedPlaceInsights} />
        </article>
      </section>
    </article>
  );
};

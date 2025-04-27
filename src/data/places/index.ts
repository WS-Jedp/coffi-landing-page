import {
  AMBIENCE_TAG_ENUM,
  COMFORT_LEVEL_COMMODITY_ENUM,
  COMMODITY_QUALITY,
  CONSUMPTION_POLICY_RULE_ENUM,
  FOOD_COMMODITY_ENUM,
  LANGUAGE_ENUM,
  MINDSETS,
  MOBILE_SIGNAL_COMMODITY_ENUM,
  NOISE_LEVEL_ENUM,
  NOISE_POLICY_RULE_ENUM,
  PARKING_COMMODITY_ENUM,
  PEOPLE_AMOUNT_ENUM,
  Place,
  PLACE_APPROXIMATE_DAILY_CONST_ENUM,
  PLACE_TIME_LIMIT_RULE,
  PLACE_TYPES,
  PRIVACY_POLICY_RULE_ENUM,
  TEMPERATURE_CONTROL_COMMODITY_ENUM,
  THEME_TAG_ENUM,
  WIFI_SPEED_COMMODITY_ENUM,
} from "@/models/places";

export const dummyPlaces: Place[] = [
  {
    id: "place-1",
    name: "Café del Cielo",
    imageUrl: "/assets/images/places/coffi-place-1.jpeg",
    knownFor: MINDSETS.WORK,
    description:
      "A serene café with a breathtaking rooftop view of Medellín's skyline. Ideal for focused work sessions.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.MINIMALIST, AMBIENCE_TAG_ENUM.QUIET],
    themeTags: [THEME_TAG_ENUM.TECH_DRIVEN, THEME_TAG_ENUM.STARTUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    rules: {
      closedAt: "22:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: false,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: false,
      eventSpace: true,
      food: [
        FOOD_COMMODITY_ENUM.VEGAN,
        FOOD_COMMODITY_ENUM.VEGETARIAN,
        FOOD_COMMODITY_ENUM.RESTAURANT,
        FOOD_COMMODITY_ENUM.CARNIVORE,
      ],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.WEAK,
      outdoorSeating: true,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    type: [PLACE_TYPES.COFFEE],
    location: {
      latitude: 6.235,
      longitude: -75.575,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-2",
    name: "El Rincón Bohemio",
    imageUrl: "/assets/images/places/coffi-place-2.jpeg",
    knownFor: MINDSETS.VIBE,
    description:
      "A cozy, bohemian-themed café with live music and an eclectic menu that attracts creatives and artists.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.BOHEMIAN, AMBIENCE_TAG_ENUM.VIBRANT],
    themeTags: [
      THEME_TAG_ENUM.ART_AND_DESIGN,
      THEME_TAG_ENUM.CULTURAL_EXCHANGE,
    ],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: null,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: null,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: false,
      plugsAmount: 21,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    type: [PLACE_TYPES.COFFEE],
    location: {
      latitude: 6.228,
      longitude: -75.578,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-3",
    imageUrl: "/assets/images/places/coffi-place-3.jpeg",
    name: "Latte Lounge",
    knownFor: MINDSETS.STUDY,
    description:
      "Modern interiors and private study booths make this café a favorite for students and remote learners.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COZY, AMBIENCE_TAG_ENUM.QUIET],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "22:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: false,
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 30,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.231,
      longitude: -75.577,
      zone: "Belén",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-4",
    name: "El Paraíso del Espresso",
    imageUrl: "/assets/images/places/coffi-place-4.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "A romantic spot surrounded by lush greenery and an exceptional menu of handcrafted espresso drinks.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.FRENCH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.NATURE_INSPIRED,
      AMBIENCE_TAG_ENUM.ELEGANT,
    ],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK],
    rules: {
      closedAt: "20:00",
      openAt: "10:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: false,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: false,
      food: [
        FOOD_COMMODITY_ENUM.VEGAN,
        FOOD_COMMODITY_ENUM.VEGETARIAN,
        FOOD_COMMODITY_ENUM.RESTAURANT,
        FOOD_COMMODITY_ENUM.CARNIVORE,
      ],
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.226,
      longitude: -75.573,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-5",
    name: "Urban Grind",
    imageUrl: "/assets/images/places/coffi-place-5.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "A trendy coworking café with ultra-fast Wi-Fi, perfect for networking with fellow digital nomads.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.INDUSTRIAL],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.NOMAD_MEETUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "22:00",
      openAt: "07:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [],
      foodQuality: null,
      parking: null,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.229,
      longitude: -75.579,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-6",
    name: "Café Mirador",
    imageUrl: "/assets/images/places/coffi-place-6.jpeg",
    knownFor: MINDSETS.VIBE,
    description:
      "Nestled on a hillside, this café offers spectacular city views and an open-air vibe.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.TRAVEL_FOCUSED, THEME_TAG_ENUM.FOODIE_PARADISE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.LOOKOUT],
    rules: {
      closedAt: "21:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: true,
      food: [],
      foodQuality: null,
      parking: null,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: true,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: false,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.24,
      longitude: -75.58,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-7",
    name: "Nomad's Nook",
    imageUrl: "/assets/images/places/coffi-place-7.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "Designed for nomads, this café provides collaborative spaces and excellent coffee.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.COLLABORATIVE,
      AMBIENCE_TAG_ENUM.PROFESSIONAL,
    ],
    themeTags: [THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.NOMAD_MEETUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "19:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [
        PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE,
        PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS,
      ],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: false,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: true,
      eventSpace: false,
      food: [],
      foodQuality: null,
      parking: null,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.234,
      longitude: -75.571,
      zone: "Belén",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-8",
    name: "The Green Bean",
    imageUrl: "/assets/images/places/coffi-place-8.jpeg",
    knownFor: MINDSETS.WORK,
    description:
      "Eco-friendly café with organic coffee options and sustainable coworking spaces.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.HEALTH_AND_WELLNESS, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK],
    rules: {
      closedAt: "22:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [
        PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE,
        PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS,
      ],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: false,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: null,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: true,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.227,
      longitude: -75.572,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-9",
    name: "Java Junction",
    imageUrl: "/assets/images/places/coffi-place-9.jpg",
    knownFor: MINDSETS.SOCIAL,
    description:
      "A bustling café with group seating, trivia nights, and excellent pastries.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.EVENT_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE],
    rules: {
      closedAt: "23:00",
      openAt: "10:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: false,
      eventSpace: true,
      food: [],
      foodQuality: null,
      parking: null,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: false,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.232,
      longitude: -75.576,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-10",
    name: "Café Zen",
    imageUrl: "/assets/images/places/coffi-place-9.jpg",
    knownFor: MINDSETS.STUDY,
    description:
      "Peaceful atmosphere with a minimalist design, ideal for unwinding with a cup of tea.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ZEN, AMBIENCE_TAG_ENUM.QUIET],
    themeTags: [THEME_TAG_ENUM.HEALTH_AND_WELLNESS, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: false,
      food: null,
      foodQuality: null,
      parking: null,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 9,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.23,
      longitude: -75.574,
      zone: "Belén",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-11",
    name: "Skyline Haven",
    imageUrl: "/assets/images/places/coffi-place-10.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description:
      "A vibrant rooftop bar with stunning city views and an upbeat ambiance.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.VIBRANT],
    themeTags: [THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.CULTURAL_EXCHANGE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "23:00",
      openAt: "16:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: false,
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 5,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.244,
      longitude: -75.581,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-12",
    name: "Starlight Rooftop",
    imageUrl: "/assets/images/places/coffi-place-11.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "An elegant rooftop with fairy lights, cozy seating, and a romantic vibe.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ELEGANT, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "22:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 3,
      publicBathrooms: true,
      publicPlugs: false,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.252,
      longitude: -75.563,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-13",
    name: "Aurora's Horizon",
    imageUrl: "/assets/images/places/coffi-place-12.jpeg",
    knownFor: MINDSETS.VIBE,
    description:
      "A rooftop with artistic decor, offering breathtaking sunsets and creative vibes.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CREATIVE, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.CREATIVE_STUDIO],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "22:30",
      openAt: "12:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: false,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD],
      foodQuality: COMMODITY_QUALITY.REGULAR,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 6,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.258,
      longitude: -75.579,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-14",
    name: "Knowledge Nook",
    imageUrl: "/assets/images/places/coffi-place-13.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A quiet library tucked away with ample natural lighting and cozy seating.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.MINIMALIST],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: true,
      eventSpace: false,
      food: null,
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 8,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.228,
      longitude: -75.579,
      zone: "Itagüí",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-15",
    name: "Scholar's Retreat",
    imageUrl: "/assets/images/places/coffi-place-14.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A modern library with digital resources and ergonomic study spaces for students and professionals.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CREATIVE, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.CULTURAL_EXCHANGE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "21:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: null,
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.237,
      longitude: -75.566,
      zone: "Sabaneta",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-16",
    name: "Book Haven",
    imageUrl: "/assets/images/places/coffi-place-15.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A timeless library with an extensive collection of books and peaceful surroundings.",
    languages: [LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COZY, AMBIENCE_TAG_ENUM.ZEN],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "18:00",
      openAt: "10:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: true,
      eventSpace: false,
      food: null,
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: false,
      plugsAmount: 7,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.251,
      longitude: -75.567,
      zone: "San Javier",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-17",
    name: "The Coffee Atelier",
    imageUrl: "/assets/images/places/coffi-place-16.jpeg",
    knownFor: MINDSETS.WORK,
    description:
      "A chic café combining art and productivity with a calming ambiance.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.MINIMALIST,
      AMBIENCE_TAG_ENUM.PROFESSIONAL,
    ],
    themeTags: [THEME_TAG_ENUM.ART_AND_DESIGN, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "20:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.VERY_GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.223,
      longitude: -75.575,
      zone: "Belén",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-18",
    name: "Rooftop Solace",
    imageUrl: "/assets/images/places/coffi-place-17.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "An upscale rooftop offering sunset views with fine dining and live music.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ELEGANT, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "22:00",
      openAt: "18:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 5,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.245,
      longitude: -75.576,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-19",
    name: "Digital Den Library",
    imageUrl: "/assets/images/places/coffi-place-18.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "Modern library with interactive spaces for tech enthusiasts and professionals.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.CREATIVE],
    themeTags: [THEME_TAG_ENUM.TECH_DRIVEN, THEME_TAG_ENUM.STARTUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "21:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 20,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.232,
      longitude: -75.582,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-20",
    name: "The Loft Cafe",
    imageUrl: "/assets/images/places/coffi-place-19.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "A cozy loft café with ergonomic seating and high-speed Wi-Fi.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE, PLACE_TYPES.COFFEE],
    rules: {
      closedAt: "20:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.VERY_GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 12,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.234,
      longitude: -75.573,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-21",
    name: "Skyline Serenity",
    imageUrl: "/assets/images/places/coffi-place-20.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "A romantic rooftop with candlelit seating and stunning views.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ELEGANT, AMBIENCE_TAG_ENUM.ZEN],
    themeTags: [THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "23:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: false,
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 5,
      publicBathrooms: true,
      publicPlugs: false,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.244,
      longitude: -75.583,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-22",
    name: "Study Sphere",
    imageUrl: "/assets/images/places/coffi-place-21.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A modern library with ample seating and natural lighting for deep study sessions.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CREATIVE, AMBIENCE_TAG_ENUM.MINIMALIST],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: true,
      eventSpace: false,
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.223,
      longitude: -75.57,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-23",
    name: "Rooftop Bliss",
    imageUrl: "/assets/images/places/coffi-place-22.jpeg",
    knownFor: MINDSETS.VIBE,
    description:
      "An energetic rooftop space with live music and weekend dance events.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.EVENT_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "01:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: false,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 6,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.246,
      longitude: -75.582,
      zone: "Sabaneta",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-24",
    name: "Panorama Vista",
    imageUrl: "/assets/images/places/coffi-place-23.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "A rooftop café with candlelit dinners and breathtaking city views.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.ELEGANT,
      AMBIENCE_TAG_ENUM.NATURE_INSPIRED,
    ],
    themeTags: [THEME_TAG_ENUM.LUXURY_AND_COMFORT, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "23:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 8,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.242,
      longitude: -75.574,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-25",
    name: "Library Nest",
    imageUrl: "/assets/images/places/coffi-place-24.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A serene library with private study rooms and lush indoor plants.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.MINIMALIST, AMBIENCE_TAG_ENUM.ZEN],
    themeTags: [THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.LIBRARY_INSPIRED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: true,
      eventSpace: false,
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.234,
      longitude: -75.572,
      zone: "Belén",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-26",
    name: "Urban Hive",
    imageUrl: "/assets/images/places/coffi-place-25.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "A bustling coworking café with vibrant decor and a diverse community of professionals.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.INDUSTRIAL, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.STARTUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE, PLACE_TYPES.COFFEE],
    rules: {
      closedAt: "22:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.VEGAN],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 15,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.246,
      longitude: -75.573,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-27",
    name: "Open Sky Lounge",
    imageUrl: "/assets/images/places/coffi-place-26.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description:
      "An open-air rooftop lounge with live DJ events every weekend.",
    languages: [LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.EVENT_DRIVEN, THEME_TAG_ENUM.NOMAD_MEETUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "01:00",
      openAt: "18:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: false,
    },
    commodities: {
      accessibility: false,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: false,
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 4,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.251,
      longitude: -75.58,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-28",
    name: "The Cozy Loft",
    imageUrl: "/assets/images/places/coffi-place-1.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A small loft café with warm lighting and comfortable armchairs, perfect for long study sessions.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COZY, AMBIENCE_TAG_ENUM.MINIMALIST],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: false,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.VEGAN],
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.227,
      longitude: -75.568,
      zone: "San Javier",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-29",
    name: "The Industrial Corner",
    imageUrl: "/assets/images/places/coffi-place-2.jpeg",
    knownFor: MINDSETS.WORK,
    description:
      "A rustic yet modern coworking café with industrial decor and great coffee options.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.INDUSTRIAL, AMBIENCE_TAG_ENUM.CREATIVE],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "21:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 12,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.245,
      longitude: -75.582,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-30",
    name: "Quiet Horizon",
    imageUrl: "/assets/images/places/coffi-place-3.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A spacious library with individual desks, soundproof zones, and free workshops on weekends.",
    languages: [LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ZEN, AMBIENCE_TAG_ENUM.MINIMALIST],
    themeTags: [
      THEME_TAG_ENUM.LIBRARY_INSPIRED,
      THEME_TAG_ENUM.CULTURAL_EXCHANGE,
    ],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "19:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: false,
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: false,
      eventSpace: false,
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: false,
      plugsAmount: 8,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.229,
      longitude: -75.571,
      zone: "Itagüí",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-31",
    name: "The Vibrant Loft",
    imageUrl: "/assets/images/places/coffi-place-4.jpeg",
    knownFor: MINDSETS.VIBE,
    description:
      "A rooftop venue featuring live DJs, art installations, and creative cocktails.",
    languages: [LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.CREATIVE_STUDIO],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "23:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT, FOOD_COMMODITY_ENUM.VEGAN],
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 5,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.244,
      longitude: -75.579,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-32",
    name: "The Hidden Garden",
    imageUrl: "/assets/images/places/coffi-place-5.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "A serene outdoor café nestled in lush greenery, perfect for intimate conversations.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.FRENCH],
    ambianceTags: [AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK],
    rules: {
      closedAt: "20:00",
      openAt: "10:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: false,
    },
    commodities: {
      accessibility: false,
      alcoholAvailability: true,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 8,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.247,
      longitude: -75.582,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-33",
    name: "Digital Nomad Base",
    imageUrl: "/assets/images/places/coffi-place-6.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "A coworking space tailored for digital nomads, offering collaborative desks and private booths.",
    languages: [LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.PROFESSIONAL,
      AMBIENCE_TAG_ENUM.INDUSTRIAL,
    ],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.NOMAD_MEETUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "21:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT],
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 15,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.249,
      longitude: -75.57,
      zone: "San Javier",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-34",
    name: "The Quiet Corner",
    imageUrl: "/assets/images/places/coffi-place-7.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A serene library with private booths and a fantastic collection of academic resources.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ZEN, AMBIENCE_TAG_ENUM.CREATIVE],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: true,
      eventSpace: false,
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.225,
      longitude: -75.567,
      zone: "El Centro",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-35",
    name: "Skyline Serenity",
    imageUrl: "/assets/images/places/coffi-place-10.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "A rooftop haven offering candlelit dinners and breathtaking views of the city skyline.",
    languages: [LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ELEGANT, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP],
    rules: {
      closedAt: "23:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: false,
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 3,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30,
    },
    location: {
      latitude: 6.235,
      longitude: -75.567,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-36",
    name: "TechNest",
    imageUrl: "/assets/images/places/coffi-place-11.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "A coworking space tailored for tech enthusiasts, offering high-speed internet and ergonomic desks.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.TECHNOLOGICAL,
      AMBIENCE_TAG_ENUM.MINIMALIST,
    ],
    themeTags: [THEME_TAG_ENUM.TECH_DRIVEN, THEME_TAG_ENUM.STARTUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "22:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD],
      foodQuality: COMMODITY_QUALITY.REGULAR,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 15,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.245,
      longitude: -75.58,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-37",
    name: "Digital Oasis",
    imageUrl: "/assets/images/places/coffi-place-12.jpeg",
    knownFor: MINDSETS.WORK,
    description:
      "A tech-focused workspace with lightning-fast internet and ergonomic seating for productive workdays.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.TECHNOLOGICAL,
      AMBIENCE_TAG_ENUM.PROFESSIONAL,
    ],
    themeTags: [THEME_TAG_ENUM.TECH_DRIVEN, THEME_TAG_ENUM.STARTUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE, PLACE_TYPES.COFFEE],
    rules: {
      closedAt: "22:00",
      openAt: "07:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [
        PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE,
        PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS,
      ],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 20,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [
        TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING,
        TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING,
      ],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.243,
      longitude: -75.57,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-38",
    name: "Vegan Haven",
    imageUrl: "/assets/images/places/coffi-place-13.jpeg",
    knownFor: MINDSETS.VIBE,
    description:
      "A plant-based café with exceptional vegan options and a relaxed atmosphere for health-conscious nomads.",
    languages: [LANGUAGE_ENUM.ENGLISH, LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.ZEN],
    themeTags: [
      THEME_TAG_ENUM.HEALTH_AND_WELLNESS,
      THEME_TAG_ENUM.ECO_FRIENDLY,
    ],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK],
    rules: {
      closedAt: "21:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: true,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 15,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.238,
      longitude: -75.571,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-39",
    name: "Nightowl Workspace",
    imageUrl: "/assets/images/places/coffi-place-14.jpeg",
    knownFor: MINDSETS.WORK,
    description:
      "A 24-hour coworking space catering to night owls and international remote workers on different time zones.",
    languages: [LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.TECHNOLOGICAL,
      AMBIENCE_TAG_ENUM.INDUSTRIAL,
    ],
    themeTags: [THEME_TAG_ENUM.TECH_DRIVEN, THEME_TAG_ENUM.NIGTH_OWL],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "00:00",
      openAt: "00:00", // 24 hours
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [
        PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS,
        PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM,
      ],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD],
      foodQuality: COMMODITY_QUALITY.REGULAR,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 30,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.231,
      longitude: -75.582,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-40",
    name: "Pet Paradise Café",
    imageUrl: "/assets/images/places/coffi-place-15.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description:
      "A pet-friendly café where nomads can bring their furry friends while enjoying quality coffee and snacks.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.HEALTH_AND_WELLNESS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: true,
      food: [
        FOOD_COMMODITY_ENUM.VEGAN,
        FOOD_COMMODITY_ENUM.VEGETARIAN,
        FOOD_COMMODITY_ENUM.CARNIVORE,
      ],
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: true,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.237,
      longitude: -75.576,
      zone: "Sabaneta",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-41",
    name: "Modern Research Library",
    imageUrl: "/assets/images/places/coffi-place-16.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A modern library with extensive digital resources, private study rooms, and ultra-fast internet.",
    languages: [
      LANGUAGE_ENUM.SPANISH,
      LANGUAGE_ENUM.ENGLISH,
      LANGUAGE_ENUM.FRENCH,
    ],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.MINIMALIST,
      AMBIENCE_TAG_ENUM.PROFESSIONAL,
    ],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "22:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: false,
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 25,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [
        TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING,
        TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING,
      ],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.241,
      longitude: -75.578,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-42",
    name: "Sunset Lounge Rooftop",
    imageUrl: "/assets/images/places/coffi-place-17.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description:
      "A romantic rooftop spot with spectacular sunset views, perfect for evening dates and intimate conversations.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ELEGANT, AMBIENCE_TAG_ENUM.SOPHISTICATED],
    themeTags: [THEME_TAG_ENUM.LUXURY_AND_COMFORT, THEME_TAG_ENUM.NIGTH_OWL],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP, PLACE_TYPES.RESTAURANT],
    rules: {
      closedAt: "23:59",
      openAt: "16:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true,
      food: [
        FOOD_COMMODITY_ENUM.VEGAN,
        FOOD_COMMODITY_ENUM.VEGETARIAN,
        FOOD_COMMODITY_ENUM.CARNIVORE,
        FOOD_COMMODITY_ENUM.RESTAURANT,
      ],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 8,
      publicBathrooms: true,
      publicPlugs: false,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.236,
      longitude: -75.569,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-43",
    name: "Family Park Café",
    imageUrl: "/assets/images/places/coffi-place-18.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description:
      "A family-friendly café in a park setting with playground areas and activities for children.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.NATURE_INSPIRED],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.ECO_FRIENDLY],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.PARK, PLACE_TYPES.COFFEE],
    rules: {
      closedAt: "19:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.VERY_GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 5,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.256,
      longitude: -75.59,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-44",
    name: "Creative Connections",
    imageUrl: "/assets/images/places/coffi-place-19.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "An art-focused coworking space that hosts regular creative workshops and networking events.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CREATIVE, AMBIENCE_TAG_ENUM.BOHEMIAN],
    themeTags: [THEME_TAG_ENUM.ART_AND_DESIGN, THEME_TAG_ENUM.CREATIVE_STUDIO],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "21:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [
        PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS,
        PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE,
      ],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 18,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.234,
      longitude: -75.581,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-45",
    name: "Wellness Library",
    imageUrl: "/assets/images/places/coffi-place-20.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "A wellness-focused library with meditation spaces, ergonomic furniture, and health resources.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ZEN, AMBIENCE_TAG_ENUM.MINIMALIST],
    themeTags: [
      THEME_TAG_ENUM.HEALTH_AND_WELLNESS,
      THEME_TAG_ENUM.LIBRARY_INSPIRED,
    ],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "20:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.VEGAN],
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: true,
      plugsAmount: 15,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.238,
      longitude: -75.577,
      zone: "Sabaneta",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-46",
    name: "Local Business Hub",
    imageUrl: "/assets/images/places/coffi-place-21.jpeg",
    knownFor: MINDSETS.COWORK,
    description:
      "A coworking space tailored for local entrepreneurs with networking events and mentorship opportunities.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [
      AMBIENCE_TAG_ENUM.PROFESSIONAL,
      AMBIENCE_TAG_ENUM.COLLABORATIVE,
    ],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "21:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: true,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD],
      foodQuality: COMMODITY_QUALITY.REGULAR,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 22,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.25,
      longitude: -75.578,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-47",
    name: "La Esquina del Arte",
    imageUrl: "/assets/images/places/coffi-place-22.jpeg",
    knownFor: MINDSETS.VIBE,
    description:
      "Un café bohemio con exposiciones de arte locales y música en vivo los fines de semana.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.BOHEMIAN, AMBIENCE_TAG_ENUM.CREATIVE],
    themeTags: [THEME_TAG_ENUM.ART_AND_DESIGN, THEME_TAG_ENUM.CULTURAL_EXCHANGE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.RESTAURANT],
    rules: {
      closedAt: "23:00",
      openAt: "10:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: true,
      food: [FOOD_COMMODITY_ENUM.VEGETARIAN, FOOD_COMMODITY_ENUM.FAST_FOOD],
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: true,
      plugsAmount: 7,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.255,
      longitude: -75.568,
      zone: "Manrique",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-48",
    name: "Biblioteca Central",
    imageUrl: "/assets/images/places/coffi-place-23.jpeg",
    knownFor: MINDSETS.STUDY,
    description:
      "Una biblioteca pública grande con múltiples salas de estudio, computadoras y acceso a bases de datos académicas.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Typically free access
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "19:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [
        PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM,
        PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE,
      ],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: false, // Usually no cafe inside, maybe vending machines
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: true, // Designated study areas act like this
      eventSpace: true, // Often have auditoriums or meeting rooms
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 40, // Typically many plugs
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Can get busy
    },
    location: {
      latitude: 6.248,
      longitude: -75.565,
      zone: "El Centro",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-49",
    name: "Parque Natural El Salado",
    imageUrl: "/assets/images/places/coffi-place-24.jpeg",
    knownFor: MINDSETS.SOCIAL, // Good for relaxing, walking
    description:
      "Un parque ecológico extenso con senderos, áreas de picnic y espacios tranquilos junto al río.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.ECO_FRIENDLY, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Park entrance fee might apply
    type: [PLACE_TYPES.PARK, PLACE_TYPES.LOOKOUT],
    rules: {
      closedAt: "17:00", // Parks often close early
      openAt: "07:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // Picnics allowed
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Generally quiet but can have groups
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // It's an open public space
      smoking: false, // Usually prohibited in ecological parks
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: false, // Trails might not be accessible
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: false, // Might have small kiosks
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Benches, grass
      coworkSpace: false,
      eventSpace: false, // Maybe designated picnic areas
      food: [], // Bring your own
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Often has parking
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.WEAK, // Can be spotty in nature areas
      outdoorSeating: true, // Benches, picnic spots
      plugsAmount: 0, // No plugs typically
      publicBathrooms: true, // Usually available
      publicPlugs: false,
      publicWifi: false,
      temperatureControl: null, // Outdoors
      wifiSpeed: null,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE, // Relaxing nature vibe
      noiseLevel: NOISE_LEVEL_ENUM.QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25, // Can vary greatly
    },
    location: {
      latitude: 6.178, // Example coordinates for Envigado area
      longitude: -75.591,
      zone: "Envigado", // El Salado is in Envigado
      city: "Medellín", // Metropolitan Area
      country: "Colombia",
    },
  },
  {
    id: "place-50",
    name: "Cielo Nocturno Rooftop",
    imageUrl: "/assets/images/places/coffi-place-25.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description:
      "Un rooftop moderno con DJ, cocteles de autor y una vista panorámica nocturna de la ciudad.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.SOPHISTICATED],
    themeTags: [THEME_TAG_ENUM.EVENT_DRIVEN, THEME_TAG_ENUM.NIGTH_OWL, THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP, PLACE_TYPES.RESTAURANT], // Often combine bar/restaurant
    rules: {
      closedAt: "02:00", // Open late
      openAt: "18:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Expect loud music
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Social setting
      smoking: true, // Often allowed in designated areas
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: false, // Age restriction typical for bars
    },
    commodities: {
      accessibility: true, // Usually accessible via elevator
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: false, // Focus is on bar/food
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true, // Can be booked for events
      food: [FOOD_COMMODITY_ENUM.RESTAURANT], // Often serves tapas or full meals
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY, // Valet or nearby lots common
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 5, // Few plugs, not for working
      publicBathrooms: true,
      publicPlugs: false,
      publicWifi: true, // Often available but maybe not primary focus
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING], // Heaters for cool nights
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Usually crowded
    },
    location: {
      latitude: 6.211, // Example for El Poblado
      longitude: -75.568,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  // Start of 40 new places
  {
    id: "place-51",
    name: "Estación Cowork Belén",
    imageUrl: "/assets/images/places/coffi-place-8.jpeg",
    knownFor: MINDSETS.COWORK,
    description: "Espacio de coworking moderno y funcional en Belén, ideal para startups y freelancers.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.MINIMALIST, AMBIENCE_TAG_ENUM.TECHNOLOGICAL],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.TECH_DRIVEN, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "20:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true, // Meeting rooms
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 50,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.224,
      longitude: -75.601,
      zone: "Belén",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-52",
    name: "Mirador Las Palmas",
    imageUrl: "/assets/images/places/coffi-place-6.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description: "Mirador popular en la vía Las Palmas con vistas espectaculares y ambiente nocturno.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.NIGTH_OWL, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Mostly for drinks/snacks
    type: [PLACE_TYPES.LOOKOUT, PLACE_TYPES.RESTAURANT], // Often have small eateries
    rules: {
      closedAt: "01:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED, // From vendors
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Can be noisy
      petFriendly: true, // Generally open space
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true, // Public space access
    },
    commodities: {
      accessibility: false, // Terrain might be uneven
      alcoholAvailability: true, // Common from vendors
      bakery: false,
      bakeryQuality: null,
      cafe: true, // Kiosks
      cafeQuality: COMMODITY_QUALITY.REGULAR,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Standing, some benches
      coworkSpace: false,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD],
      foodQuality: COMMODITY_QUALITY.REGULAR,
      parking: PARKING_COMMODITY_ENUM.IN_STREET, // Along the road
      greenAreas: false, // More pavement
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.MEDIUM,
      outdoorSeating: true, // Mostly standing or informal
      plugsAmount: 0,
      publicBathrooms: false, // Often lacking
      publicPlugs: false,
      publicWifi: false,
      temperatureControl: null, // Outdoors
      wifiSpeed: null,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Very popular spot
    },
    location: {
      latitude: 6.19, // Approximate location on Las Palmas road
      longitude: -75.54,
      zone: "El Poblado", // Boundary area
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-53",
    name: "Café Silencio (Biblioteca)",
    imageUrl: "/assets/images/places/coffi-place-14.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Un pequeño café dentro de una biblioteca universitaria, perfecto para estudiar en calma.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.MINIMALIST, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.LIBRARY], // Embedded within library
    rules: {
      closedAt: "18:00", // Library hours
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED, // Cafe's own policy
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Strict due to library setting
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Cafe area is open
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED, // While consuming
      underAge: true,
    },
    commodities: {
      accessibility: true, // Libraries usually are
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false, // But library has study spaces
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.VEGETARIAN], // Limited snacks
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY, // University parking
      greenAreas: false, // Inside building
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 8, // Some plugs in cafe area
      publicBathrooms: true, // Library bathrooms
      publicPlugs: true,
      publicWifi: true, // Library Wifi
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST, // University network
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10, // Small cafe area
    },
    location: {
      latitude: 6.266, // Example near UdeA
      longitude: -75.568,
      zone: "Aranjuez", // Near university campuses
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-54",
    name: "Parque Lleras Nocturno",
    imageUrl: "/assets/images/places/coffi-place-9.jpg",
    knownFor: MINDSETS.SOCIAL,
    description: "El corazón de la vida nocturna de El Poblado, rodeado de bares y restaurantes.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.TRENDY],
    themeTags: [THEME_TAG_ENUM.EVENT_DRIVEN, THEME_TAG_ENUM.NIGTH_OWL, THEME_TAG_ENUM.TRAVEL_FOCUSED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE, // Prices in the area
    type: [PLACE_TYPES.PARK, PLACE_TYPES.RESTAURANT], // Park surrounded by venues
    rules: {
      closedAt: "04:00", // Area stays active late
      openAt: "00:00", // It's a public park, always open, but vibe is pm
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED, // In venues
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Very loud area
      petFriendly: true, // In the park itself
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Public park
      smoking: true, // Common in outdoor areas
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true, // In the park, not in bars
    },
    commodities: {
      accessibility: true, // Paved area
      alcoholAvailability: true, // Everywhere around
      bakery: true, // Nearby cafes
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true, // Many cafes around
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Park benches
      coworkSpace: false,
      eventSpace: false, // The park itself is an event space
      food: [FOOD_COMMODITY_ENUM.RESTAURANT, FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.CARNIVORE], // All types around
      foodQuality: COMMODITY_QUALITY.VERY_GOOD, // Wide range
      parking: PARKING_COMMODITY_ENUM.NEARBY, // Difficult, paid parking
      greenAreas: true, // The park itself
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true, // Park benches, venue terraces
      plugsAmount: 0, // None in park
      publicBathrooms: false, // Need to use venue's
      publicPlugs: false,
      publicWifi: false, // Need venue's wifi
      temperatureControl: null, // Outdoors
      wifiSpeed: null,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Always crowded at night
    },
    location: {
      latitude: 6.209,
      longitude: -75.567,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-55",
    name: "Terraza Verde Cowork",
    imageUrl: "/assets/images/places/coffi-place-26.jpeg",
    knownFor: MINDSETS.WORK,
    description: "Coworking con una amplia terraza exterior, ideal para trabajar al aire libre.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.ZEN, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.ECO_FRIENDLY, THEME_TAG_ENUM.STARTUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE, PLACE_TYPES.ROOFTOP], // Cowork with rooftop/terrace feature
    rules: {
      closedAt: "19:00",
      openAt: "08:30",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Quieter indoors
      petFriendly: true, // On the terrace
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS, PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true, // Allowed on terrace only
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR, // Or daily/monthly passes
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false, // Typically no alcohol in coworks
      bakery: false,
      bakeryQuality: null,
      cafe: true, // Basic coffee/tea station
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC, // Indoors
      coworkSpace: true,
      eventSpace: true, // Can host small events on terrace
      food: [], // Bring your own or nearby options
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: true, // The terrace itself
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true, // Main feature
      plugsAmount: 30, // Good amount of plugs inside and some outside
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING], // Indoors
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.COWORK,
      noiseLevel: NOISE_LEVEL_ENUM.QUIET, // Indoors, moderate outside
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.233,
      longitude: -75.588,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-56",
    name: "Café Libro Envigado",
    imageUrl: "/assets/images/places/coffi-place-1.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Acogedor café-librería en Envigado, perfecto para leer o trabajar tranquilamente.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COZY, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.CULTURAL],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.COFFEE_CULTURE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.LIBRARY], // Cafe with books
    rules: {
      closedAt: "20:00",
      openAt: "10:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED, // While consuming
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.VERY_GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false, // Informal work possible
      eventSpace: false, // Maybe small book clubs
      food: [FOOD_COMMODITY_ENUM.VEGETARIAN], // Pastries, light snacks
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 12,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
      latitude: 6.176,
      longitude: -75.584,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-57",
    name: "Restaurante Mirador San Felix",
    imageUrl: "/assets/images/places/coffi-place-18.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description: "Restaurante con vista espectacular cerca a la zona de parapente, ideal para ocasiones especiales.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.ELEGANT, AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.SOPHISTICATED],
    themeTags: [THEME_TAG_ENUM.LUXURY_AND_COMFORT, THEME_TAG_ENUM.FOODIE_PARADISE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.RESTAURANT, PLACE_TYPES.LOOKOUT],
    rules: {
      closedAt: "22:00",
      openAt: "12:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Restaurant ambiance
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM], // Tables offer privacy
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT, // During meal
      underAge: true, // Families welcome
    },
    commodities: {
      accessibility: false, // Can be difficult to access
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: true, // Serves coffee
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: true, // Can host events
      food: [FOOD_COMMODITY_ENUM.RESTAURANT, FOOD_COMMODITY_ENUM.CARNIVORE], // Full menu
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE,
      greenAreas: true, // Surrounding nature
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.WEAK, // Often poor signal outside city
      outdoorSeating: true, // Often terraces with views
      plugsAmount: 3, // Very few
      publicBathrooms: true,
      publicPlugs: false,
      publicWifi: false, // Unlikely or poor quality
      temperatureControl: null, // Can be cool
      wifiSpeed: null,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25, // Busy on weekends
    },
    location: {
      latitude: 6.33, // Approx location for San Felix area
      longitude: -75.63,
      zone: "Bello", // San Felix belongs to Bello, north of Medellín
      city: "Medellín", // Metropolitan Area
      country: "Colombia",
    },
  },
   {
    id: "place-58",
    name: "Biblioteca Pública Piloto",
    imageUrl: "/assets/images/places/coffi-place-23.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Importante biblioteca pública en Carlos E. Restrepo, con amplias colecciones y espacios de estudio.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.CULTURAL_EXCHANGE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Free access
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "19:30",
      openAt: "08:30",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD, // Strict rules
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM], // Various areas
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: false, // May have vending machines
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Standard library furniture
      coworkSpace: true, // Study desks
      eventSpace: true, // Auditorium, exhibition spaces
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: true, // Located in a pleasant area
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true, // Benches outside
      plugsAmount: 45, // Good availability
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING], // In some areas
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Popular library
    },
    location: {
      latitude: 6.256,
      longitude: -75.578,
      zone: "Laureles-Estadio", // Carlos E. Restrepo area
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-59",
    name: "Café Revolución",
    imageUrl: "/assets/images/places/coffi-place-2.jpeg",
    knownFor: MINDSETS.WORK,
    description: "Popular café en Laureles conocido por su excelente café y ambiente propicio para trabajar.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.COFFEE_CULTURE, THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.STARTUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE],
    rules: {
      closedAt: "19:00", // Closes relatively early
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Can get busy
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false, // Inside
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED, // Generally accepted for work
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT, // Known for good coffee
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL, // Mix of seating
      coworkSpace: false, // Popular for working but not a dedicated cowork
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.VEGETARIAN, FOOD_COMMODITY_ENUM.FAST_FOOD], // Light meals, sandwiches
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_STREET, // Difficult in Laureles
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true, // Some tables outside
      plugsAmount: 15, // Decent availability
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST, // Usually reliable
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE, // Can become Loud
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25, // Often full
    },
    location: {
      latitude: 6.236,
      longitude: -75.591,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
  {
    id: "place-60",
    name: "Parque Arví",
    imageUrl: "/assets/images/places/coffi-place-24.jpeg",
    knownFor: MINDSETS.VIBE, // Nature, relaxation
    description: "Extenso parque ecoturístico accesible por Metrocable, ideal para caminar, picnic y disfrutar de la naturaleza.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.RUSTIC],
    themeTags: [THEME_TAG_ENUM.ECO_FRIENDLY, THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.TRAVEL_FOCUSED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE, // Transport + potential entrance/activities
    type: [PLACE_TYPES.PARK, PLACE_TYPES.LOOKOUT],
    rules: {
      closedAt: "18:00", // Park hours
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // Picnics encouraged
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Quiet in most areas
      petFriendly: true, // With restrictions
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Public park
      smoking: false, // Strictly prohibited
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: false, // Many trails are not accessible
      alcoholAvailability: false, // Not allowed
      bakery: false, // Small shops near entrance
      bakeryQuality: null,
      cafe: true, // Cafes and small restaurants near entrance/market
      cafeQuality: COMMODITY_QUALITY.REGULAR,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Natural terrain, some benches
      coworkSpace: false,
      eventSpace: false, // Designated areas maybe
      food: [FOOD_COMMODITY_ENUM.RESTAURANT], // Near entrance/market
      foodQuality: COMMODITY_QUALITY.GOOD, // Local food options
      parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Parking available
      greenAreas: true, // Massive green areas
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.WEAK, // Very spotty
      outdoorSeating: true, // Picnic areas, benches
      plugsAmount: 0,
      publicBathrooms: true, // Available at key points
      publicPlugs: false,
      publicWifi: false, // Very unlikely
      temperatureControl: null, // Outdoors, cooler climate
      wifiSpeed: null,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET, // Deep in the park
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Busy near entrance/weekends
    },
    location: {
      latitude: 6.29, // Approximate area of Parque Arví
      longitude: -75.51,
      zone: "Santa Elena", // Corregimiento where Arví is located
      city: "Medellín",
      country: "Colombia",
    },
  },
  // Adding 30 more places...
  {
    id: "place-61",
    name: "Rooftop Envy",
    imageUrl: "/assets/images/places/coffi-place-11.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description: "Rooftop bar en Envigado con ambiente relajado, buena música y cócteles.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.VIBRANT],
    themeTags: [THEME_TAG_ENUM.NIGTH_OWL, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.ROOFTOP, PLACE_TYPES.RESTAURANT],
    rules: {
      closedAt: "01:00",
      openAt: "17:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Music and chatter
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true, // Designated area likely
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: false,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true,
      bakery: false,
      bakeryQuality: null,
      cafe: false,
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD], // Tapas, picadas
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 4,
      publicBathrooms: true,
      publicPlugs: false,
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.173,
      longitude: -75.588,
      zone: "Envigado",
      city: "Medellín",
      country: "Colombia",
    },
  },
    {
    id: "place-62",
    name: "Biblioteca Belén",
    imageUrl: "/assets/images/places/coffi-place-16.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Biblioteca de barrio en Belén, tranquila y con recursos básicos para estudio y lectura.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Free
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "18:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: false,
      cafeQuality: null,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
      coworkSpace: true, // Study tables
      eventSpace: false, // Maybe small community events
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_STREET,
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 10,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: null, // May lack AC
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE, // Public network
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10, // Usually not crowded
    },
    location: {
      latitude: 6.217,
      longitude: -75.605,
      zone: "Belén",
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-63",
    name: "Café Pergamino (Provenza)",
    imageUrl: "/assets/images/places/coffi-place-5.jpeg",
    knownFor: MINDSETS.WORK,
    description: "Sucursal de Pergamino en Provenza, ambiente animado, excelente café y popular entre extranjeros.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.RUSTIC],
    themeTags: [THEME_TAG_ENUM.COFFEE_CULTURE, THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.TRAVEL_FOCUSED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE],
    rules: {
      closedAt: "20:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Very busy usually
      petFriendly: true, // Outdoor seating
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false, // Inside
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED, // Tolerated but busy
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: true,
      bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.EXCELLENT,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false, // Very difficult to work due to noise/crowd
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.VEGETARIAN], // Pastries, cakes, some brunch items
      foodQuality: COMMODITY_QUALITY.VERY_GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY, // Very difficult in Provenza
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 8, // Limited plugs
      publicBathrooms: true,
      publicPlugs: true, // Where available
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL, // Better for socializing than deep work
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Usually packed
    },
    location: {
      latitude: 6.210,
      longitude: -75.566,
      zone: "El Poblado", // Provenza area
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-64",
    name: "Parque de Sabaneta",
    imageUrl: "/assets/images/places/coffi-place-43.jpeg", // Assuming a generic park image
    knownFor: MINDSETS.SOCIAL,
    description: "Parque principal de Sabaneta, centro de la vida social del municipio, rodeado de iglesia y comercio.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.CULTURAL],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.FOODIE_PARADISE], // Many food stalls nearby
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.PARK, PLACE_TYPES.RESTAURANT], // Park with surrounding food options
    rules: {
      closedAt: "00:00", // Park is always open
      openAt: "00:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // In park, venues have own rules
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Very active, especially evenings/weekends
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true, // Common in open areas
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true, // Paved park
      alcoholAvailability: true, // Nearby bars/stores
      bakery: true, // Nearby
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true, // Nearby
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Benches
      coworkSpace: false,
      eventSpace: true, // Public events often held here
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.RESTAURANT], // Many options around
      foodQuality: COMMODITY_QUALITY.GOOD, // Famous for buñuelos, etc.
      parking: PARKING_COMMODITY_ENUM.NEARBY, // Street and paid parking
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true, // Benches
      plugsAmount: 0,
      publicBathrooms: false, // Need to use venues
      publicPlugs: false,
      publicWifi: false, // Unlikely public wifi
      temperatureControl: null,
      wifiSpeed: null,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Very busy hub
    },
    location: {
      latitude: 6.152,
      longitude: -75.616,
      zone: "Sabaneta",
      city: "Medellín", // Metropolitan Area
      country: "Colombia",
    },
  },
   {
    id: "place-65",
    name: "WorkHub Itagüí",
    imageUrl: "/assets/images/places/coffi-place-20.jpeg",
    knownFor: MINDSETS.COWORK,
    description: "Espacio de coworking moderno en Itagüí, enfocado en comodidad y productividad.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.MINIMALIST, AMBIENCE_TAG_ENUM.TECHNOLOGICAL],
    themeTags: [THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "19:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Focus on quiet work
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR, // Flexible plans
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true, // Coffee station
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true, // Meeting rooms
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE, // May have dedicated parking
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 60,
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.180,
      longitude: -75.610,
      zone: "Itagüí",
      city: "Medellín", // Metropolitan Area
      country: "Colombia",
    },
  },
  {
    id: "place-66",
    name: "Café Zeppelin",
    imageUrl: "/assets/images/places/coffi-place-2.jpeg",
    knownFor: MINDSETS.VIBE,
    description: "Café clásico en el centro con ambiente retro y cultural.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.RETRO, AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.CULTURAL_EXCHANGE, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.RESTAURANT], // Often serves meals too
    rules: {
      closedAt: "21:00",
      openAt: "09:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
      underAge: true,
    },
    commodities: {
      accessibility: false, // Older building maybe
      alcoholAvailability: true, // Often serve beer/wine
      bakery: false,
      bakeryQuality: null,
      cafe: true,
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
      coworkSpace: false,
      eventSpace: false, // Maybe poetry readings etc.
      food: [FOOD_COMMODITY_ENUM.RESTAURANT], // Traditional Colombian food
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY, // Difficult in Centro
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 5, // Few plugs
      publicBathrooms: true,
      publicPlugs: true, // Where available
      publicWifi: true,
      temperatureControl: null,
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.VIBE,
      noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
      latitude: 6.251, // Example for El Centro
      longitude: -75.566,
      zone: "La Candelaria", // El Centro
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-67",
    name: "Terraza Chill Laureles",
    imageUrl: "/assets/images/places/coffi-place-17.jpeg",
    knownFor: MINDSETS.ROMANTIC,
    description: "Rooftop tranquilo en Laureles con ambiente íntimo, ideal para parejas.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COZY, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.ELEGANT],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.LUXURY_AND_COMFORT],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE,
    type: [PLACE_TYPES.ROOFTOP, PLACE_TYPES.RESTAURANT],
    rules: {
      closedAt: "23:00",
      openAt: "18:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Focus on quiet ambiance
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM], // Intimate seating
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: false, // Likely adult-oriented
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: true, // Wine, cocktails
      bakery: false,
      bakeryQuality: null,
      cafe: true, // Coffee available
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.LUXURIOUS,
      coworkSpace: false,
      eventSpace: false,
      food: [FOOD_COMMODITY_ENUM.RESTAURANT, FOOD_COMMODITY_ENUM.VEGAN], // Gourmet options
      foodQuality: COMMODITY_QUALITY.EXCELLENT,
      parking: PARKING_COMMODITY_ENUM.NEARBY,
      greenAreas: false, // Potted plants maybe
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true,
      plugsAmount: 2, // Not for working
      publicBathrooms: true,
      publicPlugs: false,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.HEATING], // For cool nights
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
      idealFor: MINDSETS.ROMANTIC,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10, // Intimate space
    },
    location: {
      latitude: 6.240,
      longitude: -75.595,
      zone: "Laureles",
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-68",
    name: "Biblioteca Comfenalco La Playa",
    imageUrl: "/assets/images/places/coffi-place-14.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Biblioteca céntrica con buena infraestructura, salas de estudio y programación cultural.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.CULTURAL_EXCHANGE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Free access (may require affiliation for some services)
    type: [PLACE_TYPES.LIBRARY],
    rules: {
      closedAt: "20:00",
      openAt: "08:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true, // Often have a small cafe inside or nearby
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL, // Functional furniture
      coworkSpace: true, // Study areas
      eventSpace: true, // Auditoriums, classrooms
      food: [],
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.NEARBY, // Centro parking challenges
      greenAreas: false, // Located on a busy avenue
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 50, // Good plug availability
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
      idealFor: MINDSETS.STUDY,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Can be busy
    },
    location: {
      latitude: 6.252,
      longitude: -75.567,
      zone: "La Candelaria", // El Centro, Av. La Playa
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-69",
    name: "Parque El Poblado",
    imageUrl: "/assets/images/places/coffi-place-43.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description: "Parque principal de El Poblado, punto de encuentro social y cultural, cerca a la iglesia.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.CULTURAL],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.TRAVEL_FOCUSED],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Park is free, surrounding area varies
    type: [PLACE_TYPES.PARK, PLACE_TYPES.RESTAURANT], // Surrounded by cafes/restaurants
    rules: {
      closedAt: "00:00",
      openAt: "00:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // In park
      noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Active area
      petFriendly: true,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
      smoking: true, // Common in park
      timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
      underAge: true,
    },
    commodities: {
      accessibility: true, // Paved
      alcoholAvailability: true, // Nearby
      bakery: true, // Nearby
      bakeryQuality: COMMODITY_QUALITY.GOOD,
      cafe: true, // Many nearby
      cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Benches
      coworkSpace: false,
      eventSpace: true, // Occasional events
      food: [FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.RESTAURANT], // Many options
      foodQuality: COMMODITY_QUALITY.GOOD,
      parking: PARKING_COMMODITY_ENUM.NEARBY, // Paid lots
      greenAreas: true,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: true, // Benches
      plugsAmount: 0,
      publicBathrooms: false, // Use venues
      publicPlugs: false,
      publicWifi: false, // Use venues
      temperatureControl: null,
      wifiSpeed: null,
    },
    realTimeInsights: {
      idealFor: MINDSETS.SOCIAL,
      noiseLevel: NOISE_LEVEL_ENUM.LOUD,
      peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Busy meeting point
    },
    location: {
      latitude: 6.210,
      longitude: -75.571,
      zone: "El Poblado",
      city: "Medellín",
      country: "Colombia",
    },
  },
   {
    id: "place-70",
    name: "Coworking 24/7 Sabaneta",
    imageUrl: "/assets/images/places/coffi-place-39.jpeg",
    knownFor: MINDSETS.WORK,
    description: "Espacio de coworking abierto 24 horas en Sabaneta, ideal para trabajadores nocturnos o con horarios flexibles.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.TECHNOLOGICAL, AMBIENCE_TAG_ENUM.QUIET],
    themeTags: [THEME_TAG_ENUM.NIGTH_OWL, THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE, // Likely subscription based
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
      closedAt: "00:00", // 24 hours
      openAt: "00:00",
      consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // Kitchenette likely
      noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Expected for 24h space
      petFriendly: false,
      privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
      smoking: false,
      timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR, // Or longer passes
      underAge: true, // If accompanied or specific policy
    },
    commodities: {
      accessibility: true,
      alcoholAvailability: false,
      bakery: false,
      bakeryQuality: null,
      cafe: true, // Automated machine or basic station
      cafeQuality: COMMODITY_QUALITY.GOOD,
      comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
      coworkSpace: true,
      eventSpace: true, // Meeting rooms
      food: [], // Kitchenette for self-catering
      foodQuality: null,
      parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Important for 24h access
      greenAreas: false,
      mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
      outdoorSeating: false,
      plugsAmount: 70, // High density needed
      publicBathrooms: true,
      publicPlugs: true,
      publicWifi: true,
      temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
      wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST, // Essential
    },
    realTimeInsights: {
      idealFor: MINDSETS.WORK,
      noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET, // Especially off-peak hours
      peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10, // Variable, quiet at night
    },
    location: {
      latitude: 6.155,
      longitude: -75.618,
      zone: "Sabaneta",
      city: "Medellín", // Metropolitan Area
      country: "Colombia",
    },
  },
  // ... Continue adding places 71-90 following the pattern ...
  {
    id: "place-71",
    name: "Café Botánico",
    imageUrl: "/assets/images/places/coffi-place-8.jpeg",
    knownFor: MINDSETS.VIBE,
    description: "Café tranquilo cerca al Jardín Botánico, rodeado de naturaleza y ambiente relajado.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.ZEN, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.ECO_FRIENDLY, THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.HEALTH_AND_WELLNESS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK], // Cafe near a park setting
    rules: {
        closedAt: "19:00",
        openAt: "09:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
        petFriendly: true, // Likely due to proximity to park
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
        underAge: true,
    },
    commodities: {
        accessibility: true,
        alcoholAvailability: false,
        bakery: true,
        bakeryQuality: COMMODITY_QUALITY.GOOD,
        cafe: true,
        cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
        coworkSpace: false,
        eventSpace: false,
        food: [FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN], // Health-focused options
        foodQuality: COMMODITY_QUALITY.VERY_GOOD,
        parking: PARKING_COMMODITY_ENUM.NEARBY, // Near Jardin Botanico parking
        greenAreas: true, // Proximity to park
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Likely has a terrace/patio
        plugsAmount: 10,
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true,
        temperatureControl: null,
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
        idealFor: MINDSETS.STUDY, // Quiet and relaxed
        noiseLevel: NOISE_LEVEL_ENUM.QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10,
    },
    location: {
        latitude: 6.270, // Near Jardin Botanico
        longitude: -75.565,
        zone: "Aranjuez",
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-72",
    name: "Mirador La Catedral",
    imageUrl: "/assets/images/places/coffi-place-18.jpeg",
    knownFor: MINDSETS.VIBE, // Controversial history, views
    description: "Mirador en las montañas de Envigado con vista panorámica y una historia particular.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.RUSTIC, AMBIENCE_TAG_ENUM.NATURE_INSPIRED],
    themeTags: [THEME_TAG_ENUM.TRAVEL_FOCUSED, THEME_TAG_ENUM.CULTURAL_EXCHANGE], // Due to its history
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Access is free, maybe vendors
    type: [PLACE_TYPES.LOOKOUT],
    rules: {
        closedAt: "18:00", // Daylight hours recommended
        openAt: "08:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Generally quiet
        petFriendly: true,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: true, // Open area
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true,
    },
    commodities: {
        accessibility: false, // Difficult mountain access
        alcoholAvailability: false, // Unlikely vendors sell alcohol
        bakery: false,
        bakeryQuality: null,
        cafe: false, // Maybe informal vendors
        cafeQuality: null,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Natural terrain
        coworkSpace: false,
        eventSpace: false,
        food: [], // Bring your own
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.IN_STREET, // Limited parking nearby
        greenAreas: true, // Mountain setting
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.WEAK, // Poor signal expected
        outdoorSeating: false, // Natural seating (rocks, etc.)
        plugsAmount: 0,
        publicBathrooms: false, // Unlikely
        publicPlugs: false,
        publicWifi: false,
        temperatureControl: null,
        wifiSpeed: null,
    },
    realTimeInsights: {
        idealFor: MINDSETS.VIBE,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_5, // Usually few visitors
    },
    location: {
        latitude: 6.13, // Approx location high in Envigado mountains
        longitude: -75.56,
        zone: "Envigado",
        city: "Medellín", // Metropolitan Area
        country: "Colombia",
    },
  },
  {
    id: "place-73",
    name: "Biblioteca EPM",
    imageUrl: "/assets/images/places/coffi-place-19.jpeg", // Modern library look
    knownFor: MINDSETS.STUDY,
    description: "Moderna biblioteca interactiva en Plaza Cisneros (Parque de las Luces), con enfoque tecnológico.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TECHNOLOGICAL, AMBIENCE_TAG_ENUM.MINIMALIST, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.TECH_DRIVEN, THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Free access
    type: [PLACE_TYPES.LIBRARY],
    rules: {
        closedAt: "19:00",
        openAt: "08:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Inside library areas
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM], // Various zones
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true,
    },
    commodities: {
        accessibility: true, // Modern building
        alcoholAvailability: false,
        bakery: false,
        bakeryQuality: null,
        cafe: true, // Often has a cafe
        cafeQuality: COMMODITY_QUALITY.GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC, // Modern furniture
        coworkSpace: true, // Excellent study/work facilities
        eventSpace: true, // Auditorium, interactive rooms
        food: [], // Cafe might have snacks
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.NEARBY, // Difficult, paid parking in Centro
        greenAreas: false, // Located in a plaza
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false, // Benches in the plaza outside
        plugsAmount: 80, // Very good plug availability
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true,
        temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST, // Good infrastructure
    },
    realTimeInsights: {
        idealFor: MINDSETS.STUDY,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET, // Inside study zones
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Popular and central
    },
    location: {
        latitude: 6.247, // Plaza Cisneros
        longitude: -75.570,
        zone: "La Candelaria", // El Centro
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-74",
    name: "Rituales Café (Laureles)",
    imageUrl: "/assets/images/places/coffi-place-1.jpeg",
    knownFor: MINDSETS.WORK,
    description: "Café de especialidad en Laureles, ambiente tranquilo ideal para concentrarse y disfrutar buen café.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.MINIMALIST, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.PROFESSIONAL],
    themeTags: [THEME_TAG_ENUM.COFFEE_CULTURE, THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE],
    rules: {
        closedAt: "19:00",
        openAt: "08:30",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Encourages quiet work
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED, // Welcomes workers
        underAge: true,
    },
    commodities: {
        accessibility: true,
        alcoholAvailability: false,
        bakery: true,
        bakeryQuality: COMMODITY_QUALITY.VERY_GOOD,
        cafe: true,
        cafeQuality: COMMODITY_QUALITY.EXCELLENT, // Specialty coffee focus
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC, // Good seating for work
        coworkSpace: false, // Informal work setting
        eventSpace: false,
        food: [], // Primarily coffee and pastries
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.IN_STREET, // Laureles parking challenge
        greenAreas: false,
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false, // Limited or none
        plugsAmount: 20, // Good plug availability
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true,
        temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST, // Reliable for work
    },
    realTimeInsights: {
        idealFor: MINDSETS.WORK,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10, // Calm atmosphere
    },
    location: {
        latitude: 6.238,
        longitude: -75.593,
        zone: "Laureles",
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-75",
    name: "Parque de los Deseos",
    imageUrl: "/assets/images/places/coffi-place-43.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description: "Parque público interactivo junto al Planetario y Parque Explora, con pantalla de cine al aire libre.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TECHNOLOGICAL, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.CULTURAL_EXCHANGE, THEME_TAG_ENUM.EVENT_DRIVEN, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Free access
    type: [PLACE_TYPES.PARK, PLACE_TYPES.LOOKOUT], // Lookout towards Ruta N, etc.
    rules: {
        closedAt: "00:00", // Public space
        openAt: "00:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Can be noisy during events
        petFriendly: true,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: true, // Common in open areas
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true,
    },
    commodities: {
        accessibility: true, // Paved, ramps
        alcoholAvailability: false, // In the park itself
        bakery: false,
        bakeryQuality: null,
        cafe: true, // Nearby options (Explora, Planetario)
        cafeQuality: COMMODITY_QUALITY.GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Concrete seating, sand area
        coworkSpace: false,
        eventSpace: true, // Open-air cinema, events
        food: [FOOD_COMMODITY_ENUM.FAST_FOOD], // Vendors, nearby options
        foodQuality: COMMODITY_QUALITY.REGULAR,
        parking: PARKING_COMMODITY_ENUM.NEARBY, // Paid parking at Explora/Botanico
        greenAreas: false, // More hardscape, some trees
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Concrete steps, benches
        plugsAmount: 0,
        publicBathrooms: true, // Nearby facilities likely charge
        publicPlugs: false,
        publicWifi: true, // Often has public EPM wifi hotspots
        temperatureControl: null,
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
        idealFor: MINDSETS.SOCIAL,
        noiseLevel: NOISE_LEVEL_ENUM.MODERATE, // Variable
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Popular area, especially evenings
    },
    location: {
        latitude: 6.270,
        longitude: -75.566,
        zone: "Aranjuez", // Near Universidad metro station
        city: "Medellín",
        country: "Colombia",
    },
  },
    {
    id: "place-76",
    name: "Al Alma Café (Poblado)",
    imageUrl: "/assets/images/places/coffi-place-4.jpeg",
    knownFor: MINDSETS.SOCIAL, // Brunch spot
    description: "Popular café en El Poblado famoso por su brunch, ambiente animado y decoración agradable.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.COZY, AMBIENCE_TAG_ENUM.VIBRANT],
    themeTags: [THEME_TAG_ENUM.FOODIE_PARADISE, THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.COFFEE_CULTURE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.RESTAURANT], // Strong focus on food/brunch
    rules: {
        closedAt: "18:00", // Primarily daytime/brunch
        openAt: "08:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Usually very busy and noisy
        petFriendly: true,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Tables are close
        smoking: false, // Inside
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT, // But high turnover expected
        underAge: true,
    },
    commodities: {
        accessibility: true,
        alcoholAvailability: false, // Primarily coffee/juices
        bakery: true,
        bakeryQuality: COMMODITY_QUALITY.EXCELLENT,
        cafe: true,
        cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
        coworkSpace: false, // Not suitable for work due to noise/crowd
        eventSpace: false,
        food: [FOOD_COMMODITY_ENUM.RESTAURANT, FOOD_COMMODITY_ENUM.VEGAN, FOOD_COMMODITY_ENUM.VEGETARIAN], // Extensive brunch menu
        foodQuality: COMMODITY_QUALITY.EXCELLENT, // Known for its food
        parking: PARKING_COMMODITY_ENUM.NEARBY, // Poblado parking issues
        greenAreas: false, // Indoor plants
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Often has patio seating
        plugsAmount: 5, // Very few, not for working
        publicBathrooms: true,
        publicPlugs: false,
        publicWifi: true,
        temperatureControl: null,
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
        idealFor: MINDSETS.SOCIAL, // Ideal for brunch with friends
        noiseLevel: NOISE_LEVEL_ENUM.LOUD,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Always busy, queues common
    },
    location: {
        latitude: 6.212,
        longitude: -75.570,
        zone: "El Poblado",
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-77",
    name: "Mirador Cerro Nutibara (Pueblito Paisa)",
    imageUrl: "/assets/images/places/coffi-place-6.jpeg",
    knownFor: MINDSETS.VIBE, // Tourist spot, views
    description: "Cerro en medio de la ciudad con réplica de pueblo antioqueño, museos y vistas 360.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.RUSTIC, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.TRAVEL_FOCUSED, THEME_TAG_ENUM.CULTURAL_EXCHANGE, THEME_TAG_ENUM.FOODIE_PARADISE], // Typical snacks
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Access is free, museum/food extra
    type: [PLACE_TYPES.LOOKOUT, PLACE_TYPES.PARK, PLACE_TYPES.RESTAURANT], // Has restaurants/cafes
    rules: {
        closedAt: "22:00", // Restaurants might close earlier
        openAt: "06:00", // Popular for exercise early
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // In park areas
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Can be busy with tourists
        petFriendly: true,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Public space
        smoking: true, // In open areas
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true,
    },
    commodities: {
        accessibility: false, // Steep climb, limited accessibility
        alcoholAvailability: true, // Restaurants/bars on top
        bakery: true, // Snack shops
        bakeryQuality: COMMODITY_QUALITY.REGULAR,
        cafe: true, // Cafes on top
        cafeQuality: COMMODITY_QUALITY.GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Benches, restaurant seating
        coworkSpace: false,
        eventSpace: true, // Open areas can host events
        food: [FOOD_COMMODITY_ENUM.RESTAURANT, FOOD_COMMODITY_ENUM.FAST_FOOD], // Typical Colombian food
        foodQuality: COMMODITY_QUALITY.GOOD,
        parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Parking on top (can be limited)
        greenAreas: true, // The hill is a park
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG, // Good signal due to central location
        outdoorSeating: true, // Extensive outdoor areas
        plugsAmount: 2, // Only inside venues if any
        publicBathrooms: true, // Available, likely paid
        publicPlugs: false,
        publicWifi: false, // Unlikely public wifi
        temperatureControl: null,
        wifiSpeed: null,
    },
    realTimeInsights: {
        idealFor: MINDSETS.SOCIAL,
        noiseLevel: NOISE_LEVEL_ENUM.MODERATE, // Busy during day/weekends
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Very popular tourist spot
    },
    location: {
        latitude: 6.237,
        longitude: -75.581,
        zone: "Belén", // Borders Laureles
        city: "Medellín",
        country: "Colombia",
    },
  },
   {
    id: "place-78",
    name: "Biblioteca ITM Robledo",
    imageUrl: "/assets/images/places/coffi-place-14.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Biblioteca del Instituto Tecnológico Metropolitano en Robledo, enfocada en recursos académicos y tecnológicos.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.TECHNOLOGICAL, AMBIENCE_TAG_ENUM.QUIET],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Access policies vary, likely free for students
    type: [PLACE_TYPES.LIBRARY],
    rules: {
        closedAt: "20:00", // University hours
        openAt: "07:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM], // Cubicles/group rooms
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true, // Student focus
    },
    commodities: {
        accessibility: true, // Modern campus facilities
        alcoholAvailability: false,
        bakery: false,
        bakeryQuality: null,
        cafe: false, // University cafeteria nearby
        cafeQuality: null,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC, // Designed for study
        coworkSpace: true, // Excellent study facilities
        eventSpace: true, // Within the university
        food: [],
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Campus parking
        greenAreas: true, // Campus setting
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false, // Inside library
        plugsAmount: 100, // High availability expected
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true, // Eduroam or campus network
        temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST, // University network
    },
    realTimeInsights: {
        idealFor: MINDSETS.STUDY,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25, // Busy during semester
    },
    location: {
        latitude: 6.280, // Approx ITM Robledo campus
        longitude: -75.587,
        zone: "Robledo",
        city: "Medellín",
        country: "Colombia",
    },
  },
   {
    id: "place-79",
    name: "Café Otraparte",
    imageUrl: "/assets/images/places/coffi-place-32.jpeg",
    knownFor: MINDSETS.VIBE, // Cultural, historical
    description: "Café en la Casa Museo Otraparte (Envigado), hogar del filósofo Fernando González. Ambiente cultural y jardines.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.RUSTIC],
    themeTags: [THEME_TAG_ENUM.CULTURAL_EXCHANGE, THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.LIBRARY_INSPIRED], // Associated with writer
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.PARK, PLACE_TYPES.RESTAURANT], // Cafe in museum garden
    rules: {
        closedAt: "20:00", // Museum/cafe hours
        openAt: "10:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED, // In cafe
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Respectful atmosphere
        petFriendly: true, // In garden areas
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Cafe seating
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
        underAge: true,
    },
    commodities: {
        accessibility: true, // Main areas likely accessible
        alcoholAvailability: true, // Often serve wine/beer
        bakery: true,
        bakeryQuality: COMMODITY_QUALITY.GOOD,
        cafe: true,
        cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL, // Garden seating
        coworkSpace: false, // Not ideal for focused work
        eventSpace: true, // Cultural events held at museum
        food: [FOOD_COMMODITY_ENUM.RESTAURANT, FOOD_COMMODITY_ENUM.VEGETARIAN], // Light meals, snacks
        foodQuality: COMMODITY_QUALITY.GOOD,
        parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Limited parking
        greenAreas: true, // Beautiful gardens
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Main feature
        plugsAmount: 5, // Limited
        publicBathrooms: true,
        publicPlugs: true, // Where available
        publicWifi: true,
        temperatureControl: null,
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.FAST,
    },
    realTimeInsights: {
        idealFor: MINDSETS.VIBE, // Cultural, relaxed vibe
        noiseLevel: NOISE_LEVEL_ENUM.QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
        latitude: 6.175,
        longitude: -75.592,
        zone: "Envigado",
        city: "Medellín", // Metropolitan Area
        country: "Colombia",
    },
  },
   {
    id: "place-80",
    name: "Parque Norte",
    imageUrl: "/assets/images/places/coffi-place-43.jpeg", // Generic amusement park image
    knownFor: MINDSETS.SOCIAL, // Amusement park
    description: "Parque de atracciones mecánicas cerca a la Universidad de Antioquia.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.EVENT_DRIVEN], // Amusement rides
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.EXPENSIVE, // Entrance fee + food
    type: [PLACE_TYPES.PARK], // Amusement park type
    rules: {
        closedAt: "18:00", // Operating hours
        openAt: "10:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD, // Typical park policy
        noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Amusement park noise
        petFriendly: false, // Not allowed
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Public within park
        smoking: false, // Designated areas if any
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT, // Within opening hours
        underAge: true, // Family oriented
    },
    commodities: {
        accessibility: true, // Designed for crowds
        alcoholAvailability: false, // Unlikely
        bakery: false,
        bakeryQuality: null,
        cafe: false,
        cafeQuality: null,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Benches, ride queues
        coworkSpace: false,
        eventSpace: true, // Can host group events
        food: [FOOD_COMMODITY_ENUM.FAST_FOOD], // Park food stalls
        foodQuality: COMMODITY_QUALITY.REGULAR,
        parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Dedicated parking
        greenAreas: true, // Landscaped areas
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Benches, picnic tables
        plugsAmount: 0,
        publicBathrooms: true, // Available throughout park
        publicPlugs: false,
        publicWifi: false,
        temperatureControl: null,
        wifiSpeed: null,
    },
    realTimeInsights: {
        idealFor: MINDSETS.SOCIAL,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_LOUD,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Busy on weekends/holidays
    },
    location: {
        latitude: 6.272,
        longitude: -75.565,
        zone: "Aranjuez",
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-81",
    name: "Azotea Laureles",
    imageUrl: "/assets/images/places/coffi-place-12.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description: "Rooftop bar popular en Laureles con música en vivo y ambiente juvenil.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.TRENDY, AMBIENCE_TAG_ENUM.CASUAL],
    themeTags: [THEME_TAG_ENUM.EVENT_DRIVEN, THEME_TAG_ENUM.NIGTH_OWL, THEME_TAG_ENUM.NOMAD_MEETUPS],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.ROOFTOP, PLACE_TYPES.RESTAURANT],
    rules: {
        closedAt: "02:00",
        openAt: "17:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Live music, crowd
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Social setting
        smoking: true, // Likely allowed
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: false,
    },
    commodities: {
        accessibility: true,
        alcoholAvailability: true,
        bakery: false,
        bakeryQuality: null,
        cafe: false,
        cafeQuality: null,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL, // Mix of seating
        coworkSpace: false,
        eventSpace: true, // Live music setup
        food: [FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.RESTAURANT], // Bar food, tapas
        foodQuality: COMMODITY_QUALITY.GOOD,
        parking: PARKING_COMMODITY_ENUM.IN_STREET, // Difficult
        greenAreas: false,
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true,
        plugsAmount: 3,
        publicBathrooms: true,
        publicPlugs: false,
        publicWifi: true,
        temperatureControl: null,
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
        idealFor: MINDSETS.SOCIAL,
        noiseLevel: NOISE_LEVEL_ENUM.LOUD,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Popular spot
    },
    location: {
        latitude: 6.235,
        longitude: -75.590,
        zone: "Laureles",
        city: "Medellín",
        country: "Colombia",
    },
  },
   {
    id: "place-82",
    name: "Biblioteca Pública La Floresta",
    imageUrl: "/assets/images/places/coffi-place-16.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Biblioteca de barrio en La Floresta, espacio comunitario para lectura y consulta.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.CULTURAL],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Free
    type: [PLACE_TYPES.LIBRARY],
    rules: {
        closedAt: "18:00",
        openAt: "09:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true,
    },
    commodities: {
        accessibility: true,
        alcoholAvailability: false,
        bakery: false,
        bakeryQuality: null,
        cafe: false,
        cafeQuality: null,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC,
        coworkSpace: true, // Study tables
        eventSpace: false, // Limited community activities
        food: [],
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.IN_STREET,
        greenAreas: false,
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false,
        plugsAmount: 8, // Limited
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true, // Basic public wifi maybe
        temperatureControl: null,
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.SLOW, // Potentially slow
    },
    realTimeInsights: {
        idealFor: MINDSETS.STUDY,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_5, // Usually quiet
    },
    location: {
        latitude: 6.265, // Approx La Floresta area
        longitude: -75.608,
        zone: "La América",
        city: "Medellín",
        country: "Colombia",
    },
  },
   {
    id: "place-83",
    name: "Café Cliché",
    imageUrl: "/assets/images/places/coffi-place-15.jpeg",
    knownFor: MINDSETS.VIBE,
    description: "Pequeño café con temática francesa en El Poblado, ambiente íntimo y decoración particular.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.FRENCH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COZY, AMBIENCE_TAG_ENUM.RETRO, AMBIENCE_TAG_ENUM.CULTURAL],
    themeTags: [THEME_TAG_ENUM.ART_AND_DESIGN, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COFFEE],
    rules: {
        closedAt: "21:00",
        openAt: "11:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Small space, chatter
        petFriendly: false, // Likely too small
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Small, open area
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
        underAge: true,
    },
    commodities: {
        accessibility: false, // Might be small entrance
        alcoholAvailability: true, // Often serve wine
        bakery: true,
        bakeryQuality: COMMODITY_QUALITY.GOOD, // French pastries maybe
        cafe: true,
        cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL,
        coworkSpace: false, // Not suitable for work
        eventSpace: false,
        food: [FOOD_COMMODITY_ENUM.VEGETARIAN], // Crepes, quiches
        foodQuality: COMMODITY_QUALITY.GOOD,
        parking: PARKING_COMMODITY_ENUM.NEARBY, // Poblado parking
        greenAreas: false,
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false, // Or very limited
        plugsAmount: 2, // Very few
        publicBathrooms: true,
        publicPlugs: false,
        publicWifi: true,
        temperatureControl: null,
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.MODERATE,
    },
    realTimeInsights: {
        idealFor: MINDSETS.ROMANTIC, // Intimate setting
        noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_10, // Small capacity
    },
    location: {
        latitude: 6.214,
        longitude: -75.568,
        zone: "El Poblado",
        city: "Medellín",
        country: "Colombia",
    },
  },
   {
    id: "place-84",
    name: "Parque de Bello",
    imageUrl: "/assets/images/places/coffi-place-43.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description: "Parque principal del municipio de Bello, centro neurálgico con comercio y actividad constante.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.VIBRANT],
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.FOODIE_PARADISE], // Local food stalls
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.PARK, PLACE_TYPES.RESTAURANT], // Surrounded by commerce
    rules: {
        closedAt: "00:00",
        openAt: "00:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // In park
        noisePolicy: NOISE_POLICY_RULE_ENUM.NO_NOISE_RESTRICTION, // Busy town center
        petFriendly: true,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: true,
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true,
    },
    commodities: {
        accessibility: true, // Paved
        alcoholAvailability: true, // Nearby bars/stores
        bakery: true, // Nearby
        bakeryQuality: COMMODITY_QUALITY.GOOD,
        cafe: true, // Nearby
        cafeQuality: COMMODITY_QUALITY.GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Benches
        coworkSpace: false,
        eventSpace: true, // Public events
        food: [FOOD_COMMODITY_ENUM.FAST_FOOD, FOOD_COMMODITY_ENUM.RESTAURANT], // Local eateries
        foodQuality: COMMODITY_QUALITY.GOOD,
        parking: PARKING_COMMODITY_ENUM.NEARBY, // Street parking, lots
        greenAreas: true,
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Benches
        plugsAmount: 0,
        publicBathrooms: false, // Use venues
        publicPlugs: false,
        publicWifi: false,
        temperatureControl: null,
        wifiSpeed: null,
    },
    realTimeInsights: {
        idealFor: MINDSETS.SOCIAL,
        noiseLevel: NOISE_LEVEL_ENUM.LOUD,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Very busy
    },
    location: {
        latitude: 6.334,
        longitude: -75.557,
        zone: "Bello",
        city: "Medellín", // Metropolitan Area
        country: "Colombia",
    },
  },
   {
    id: "place-85",
    name: "Co-Work La 70",
    imageUrl: "/assets/images/places/coffi-place-7.jpeg",
    knownFor: MINDSETS.COWORK,
    description: "Espacio de coworking en el corredor turístico de La 70, combinando trabajo y acceso a entretenimiento.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.TECHNOLOGICAL],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.TECH_DRIVEN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE],
    rules: {
        closedAt: "21:00", // May close earlier than bars on 70
        openAt: "08:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Potential noise bleed from outside
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR, // Daily/monthly plans
        underAge: true,
    },
    commodities: {
        accessibility: true,
        alcoholAvailability: false, // Inside cowork
        bakery: false,
        bakeryQuality: null,
        cafe: true, // Coffee station
        cafeQuality: COMMODITY_QUALITY.GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
        coworkSpace: true,
        eventSpace: true, // Meeting rooms
        food: [],
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.NEARBY, // La 70 parking can be tricky
        greenAreas: false,
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false, // Likely none
        plugsAmount: 55,
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true,
        temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
        idealFor: MINDSETS.COWORK,
        noiseLevel: NOISE_LEVEL_ENUM.MODERATE, // Due to location
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
        latitude: 6.248,
        longitude: -75.589,
        zone: "Laureles-Estadio", // La 70 area
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-86",
    name: "Café Vallejo",
    imageUrl: "/assets/images/places/coffi-place-21.jpeg", // Traditional look
    knownFor: MINDSETS.VIBE,
    description: "Café tradicional en El Centro, punto de encuentro de intelectuales y artistas locales.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.RETRO, AMBIENCE_TAG_ENUM.RUSTIC],
    themeTags: [THEME_TAG_ENUM.CULTURAL_EXCHANGE, THEME_TAG_ENUM.ART_AND_DESIGN],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP,
    type: [PLACE_TYPES.COFFEE, PLACE_TYPES.RESTAURANT],
    rules: {
        closedAt: "20:00",
        openAt: "07:00", // Opens early for 'tinto'
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Lively conversation
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: false, // Inside
        timeLimit: PLACE_TIME_LIMIT_RULE.UNLIMITED,
        underAge: true,
    },
    commodities: {
        accessibility: false, // Old building
        alcoholAvailability: true, // Aguardiente, beer
        bakery: true, // Pandebono, buñuelo
        bakeryQuality: COMMODITY_QUALITY.GOOD,
        cafe: true,
        cafeQuality: COMMODITY_QUALITY.GOOD, // Traditional 'tinto'
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Simple chairs/tables
        coworkSpace: false,
        eventSpace: false,
        food: [FOOD_COMMODITY_ENUM.RESTAURANT], // Basic meals ('corrientazo')
        foodQuality: COMMODITY_QUALITY.GOOD,
        parking: PARKING_COMMODITY_ENUM.NEARBY, // Difficult Centro parking
        greenAreas: false,
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false,
        plugsAmount: 1, // Maybe one old plug
        publicBathrooms: true,
        publicPlugs: false,
        publicWifi: false, // Unlikely
        temperatureControl: null,
        wifiSpeed: null,
    },
    realTimeInsights: {
        idealFor: MINDSETS.VIBE, // Cultural immersion
        noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
        latitude: 6.250,
        longitude: -75.568,
        zone: "La Candelaria", // El Centro
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-87",
    name: "El Castillo Museo y Jardines",
    imageUrl: "/assets/images/places/coffi-place-32.jpeg", // Castle/Garden image
    knownFor: MINDSETS.ROMANTIC,
    description: "Museo estilo castillo medieval con extensos jardines, ideal para paseos y picnics románticos.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH], // Tours may be available
    ambianceTags: [AMBIENCE_TAG_ENUM.ELEGANT, AMBIENCE_TAG_ENUM.NATURE_INSPIRED, AMBIENCE_TAG_ENUM.CULTURAL, AMBIENCE_TAG_ENUM.QUIET],
    themeTags: [THEME_TAG_ENUM.ART_AND_DESIGN, THEME_TAG_ENUM.LUXURY_AND_COMFORT, THEME_TAG_ENUM.CHILL_ZONES],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE, // Entrance fee
    type: [PLACE_TYPES.PARK, PLACE_TYPES.LOOKOUT], // Lookout from gardens
    rules: {
        closedAt: "17:00", // Museum hours
        openAt: "09:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED, // Picnics in designated areas
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY, // Respectful atmosphere
        petFriendly: false, // Usually not allowed inside museum/formal gardens
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE], // Gardens are open
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT, // Within opening hours
        underAge: true,
    },
    commodities: {
        accessibility: false, // Gardens may have difficult paths
        alcoholAvailability: false, // Unlikely
        bakery: false,
        bakeryQuality: null,
        cafe: true, // Small cafe often present
        cafeQuality: COMMODITY_QUALITY.GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.CASUAL, // Benches in garden
        coworkSpace: false,
        eventSpace: true, // Weddings, events hosted
        food: [], // Cafe has snacks
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Dedicated parking
        greenAreas: true, // Main feature
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Garden benches
        plugsAmount: 0,
        publicBathrooms: true,
        publicPlugs: false,
        publicWifi: false, // Unlikely
        temperatureControl: null,
        wifiSpeed: null,
    },
    realTimeInsights: {
        idealFor: MINDSETS.ROMANTIC,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25, // Can get busy weekends
    },
    location: {
        latitude: 6.198,
        longitude: -75.561,
        zone: "El Poblado", // Loma de los Balsos area
        city: "Medellín",
        country: "Colombia",
    },
  },
   {
    id: "place-88",
    name: "Biblioteca León de Greiff (UdeA)",
    imageUrl: "/assets/images/places/coffi-place-23.jpeg",
    knownFor: MINDSETS.STUDY,
    description: "Biblioteca principal de la Universidad de Antioquia, vastos recursos y ambiente académico.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.QUIET, AMBIENCE_TAG_ENUM.CULTURAL],
    themeTags: [THEME_TAG_ENUM.LIBRARY_INSPIRED, THEME_TAG_ENUM.FOCUS_ZONE, THEME_TAG_ENUM.CULTURAL_EXCHANGE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Primarily for students/academics, visitor policies vary
    type: [PLACE_TYPES.LIBRARY],
    rules: {
        closedAt: "21:00", // University hours
        openAt: "07:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.NO_OUTSIDE_FOOD,
        noisePolicy: NOISE_POLICY_RULE_ENUM.QUIET_ONLY,
        petFriendly: false,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true, // Students
    },
    commodities: {
        accessibility: true, // University campus
        alcoholAvailability: false,
        bakery: false,
        bakeryQuality: null,
        cafe: false, // Cafeterias elsewhere on campus
        cafeQuality: null,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Functional library furniture
        coworkSpace: true, // Extensive study areas
        eventSpace: true, // Within university
        food: [],
        foodQuality: null,
        parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Campus parking
        greenAreas: true, // University campus
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false, // Inside library
        plugsAmount: 200, // Very high availability expected
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true, // Eduroam / Campus network
        temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING], // Likely
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST, // University network
    },
    realTimeInsights: {
        idealFor: MINDSETS.STUDY,
        noiseLevel: NOISE_LEVEL_ENUM.VERY_QUIET,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Very busy library
    },
    location: {
        latitude: 6.267,
        longitude: -75.567,
        zone: "Aranjuez", // UdeA Campus
        city: "Medellín",
        country: "Colombia",
    },
  },
  {
    id: "place-89",
    name: "Semilla Café Coworking",
    imageUrl: "/assets/images/places/coffi-place-7.jpeg",
    knownFor: MINDSETS.COWORK,
    description: "Coworking y café en Laureles con enfoque en comunidad y ambiente productivo.",
    languages: [LANGUAGE_ENUM.SPANISH, LANGUAGE_ENUM.ENGLISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.COLLABORATIVE, AMBIENCE_TAG_ENUM.PROFESSIONAL, AMBIENCE_TAG_ENUM.COZY],
    themeTags: [THEME_TAG_ENUM.STARTUPS, THEME_TAG_ENUM.NOMAD_MEETUPS, THEME_TAG_ENUM.FOCUS_ZONE],
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.MODERATE,
    type: [PLACE_TYPES.COWORK_ZONE, PLACE_TYPES.COFFEE],
    rules: {
        closedAt: "20:00",
        openAt: "08:00",
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.PURCHASE_REQUIRED, // Cafe section, cowork may allow outside
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Separate quiet zones likely
        petFriendly: true, // Check policy, maybe in cafe area
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.SHARED_DESKS, PRIVACY_POLICY_RULE_ENUM.PRIVATE_ROOM],
        smoking: false,
        timeLimit: PLACE_TIME_LIMIT_RULE.PER_HOUR, // Various plans
        underAge: true,
    },
    commodities: {
        accessibility: true,
        alcoholAvailability: false,
        bakery: true,
        bakeryQuality: COMMODITY_QUALITY.GOOD,
        cafe: true,
        cafeQuality: COMMODITY_QUALITY.VERY_GOOD,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.ERGONOMIC,
        coworkSpace: true,
        eventSpace: true, // Workshops, meeting rooms
        food: [FOOD_COMMODITY_ENUM.VEGETARIAN], // Light meals from cafe
        foodQuality: COMMODITY_QUALITY.GOOD,
        parking: PARKING_COMMODITY_ENUM.IN_STREET,
        greenAreas: false, // Indoor plants
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: false, // Maybe small balcony
        plugsAmount: 40,
        publicBathrooms: true,
        publicPlugs: true,
        publicWifi: true,
        temperatureControl: [TEMPERATURE_CONTROL_COMMODITY_ENUM.AIR_CONDITIONING],
        wifiSpeed: WIFI_SPEED_COMMODITY_ENUM.VERY_FAST,
    },
    realTimeInsights: {
        idealFor: MINDSETS.COWORK,
        noiseLevel: NOISE_LEVEL_ENUM.QUIET, // In designated work areas
        peopleAmount: PEOPLE_AMOUNT_ENUM.MAX_PEOPLE_AMOUNT_25,
    },
    location: {
        latitude: 6.239,
        longitude: -75.592,
        zone: "Laureles",
        city: "Medellín",
        country: "Colombia",
    },
  },
   {
    id: "place-90",
    name: "Parque de las Chimeneas",
    imageUrl: "/assets/images/places/coffi-place-43.jpeg",
    knownFor: MINDSETS.SOCIAL,
    description: "Gran parque público en Itagüí con zonas verdes, canchas deportivas y las icónicas chimeneas.",
    languages: [LANGUAGE_ENUM.SPANISH],
    ambianceTags: [AMBIENCE_TAG_ENUM.CASUAL, AMBIENCE_TAG_ENUM.VIBRANT, AMBIENCE_TAG_ENUM.INDUSTRIAL], // Chimneys
    themeTags: [THEME_TAG_ENUM.CHILL_ZONES, THEME_TAG_ENUM.EVENT_DRIVEN], // Sports, events
    approximateDailyCost: PLACE_APPROXIMATE_DAILY_CONST_ENUM.CHEAP, // Free access
    type: [PLACE_TYPES.PARK],
    rules: {
        closedAt: "22:00", // Park lighting/security hours
        openAt: "06:00", // For exercise
        consumptionPolicy: CONSUMPTION_POLICY_RULE_ENUM.OUTSIDE_PURCHASE_ALLOWED,
        noisePolicy: NOISE_POLICY_RULE_ENUM.MODERATE_NOISE_ALLOWED, // Sports, families
        petFriendly: true,
        privacyPolicy: [PRIVACY_POLICY_RULE_ENUM.OPEN_WORKSPACE],
        smoking: true, // In open areas
        timeLimit: PLACE_TIME_LIMIT_RULE.NO_LIMIT,
        underAge: true,
    },
    commodities: {
        accessibility: true, // Main paths
        alcoholAvailability: false, // Not sold in park
        bakery: false, // Vendors outside maybe
        bakeryQuality: null,
        cafe: false, // Vendors outside maybe
        cafeQuality: null,
        comfortLevel: COMFORT_LEVEL_COMMODITY_ENUM.BASIC, // Benches
        coworkSpace: false,
        eventSpace: true, // Sports events, concerts sometimes
        food: [FOOD_COMMODITY_ENUM.FAST_FOOD], // Street vendors often nearby
        foodQuality: COMMODITY_QUALITY.REGULAR,
        parking: PARKING_COMMODITY_ENUM.IN_PLACE, // Parking available
        greenAreas: true, // Large park
        mobileSignal: MOBILE_SIGNAL_COMMODITY_ENUM.STRONG,
        outdoorSeating: true, // Benches
        plugsAmount: 0,
        publicBathrooms: true, // Park bathrooms
        publicPlugs: false,
        publicWifi: false, // Unlikely
        temperatureControl: null,
        wifiSpeed: null,
    },
    realTimeInsights: {
        idealFor: MINDSETS.SOCIAL,
        noiseLevel: NOISE_LEVEL_ENUM.MODERATE,
        peopleAmount: PEOPLE_AMOUNT_ENUM.MIN_PEOPLE_AMOUNT_30, // Busy park, especially weekends
    },
    location: {
        latitude: 6.190,
        longitude: -75.600,
        zone: "Itagüí",
        city: "Medellín", // Metropolitan Area
        country: "Colombia",
    },
  }
];

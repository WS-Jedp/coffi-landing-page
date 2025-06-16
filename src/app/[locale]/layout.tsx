import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/containers/Footer";
import { loadMessages } from "@/i18n/utils";
import StructuredData from "@/components/StructuredData";
import HreflangLinks from "@/components/HreflangLinks";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import "../globals.css";

export const metadata: Metadata = {
  title: "Coffi – Coworking Spaces & Work-Friendly Cafés in Medellín, Colombia | Be Where You Thrive",
  description:
    "Find the perfect coworking space, work-friendly café, or productivity hub in Medellín, Colombia. Real-time insights from digital nomads. Join Colombia's thriving remote work community with Coffi.",
  applicationName: "Coffi",
  generator: "Next.js",
  keywords: [
    // Core Brand
    "Coffi",
    "Coffi app",
    "Be where you thrive",
    
    // Primary Location Keywords
    "coworking Medellín",
    "coworking spaces Medellín",
    "work cafés Medellín",
    "remote work Medellín",
    "digital nomad Medellín",
    "coworking Colombia",
    "workspace finder Medellín",
    "El Poblado coworking",
    "Laureles workspace",
    "Envigado cafés",
    
    // Core Services
    "coworking spaces",
    "work-friendly cafés",
    "remote work spaces",
    "digital nomad platform",
    "productivity spaces",
    "workspace finder",
    "coworking near me",
    "best coworking spaces",
    
    // Coffee & Café Keywords
    "coffee shops",
    "work cafés",
    "café con wifi",
    "study cafés",
    "laptop-friendly cafés",
    "quiet cafés",
    "specialty coffee Medellín",
    
    // Target Audience
    "digital nomads",
    "remote workers",
    "freelancers",
    "entrepreneurs",
    "students",
    "professionals",
    "startups",
    "creatives",
    
    // Features & Benefits
    "real-time workspace data",
    "community insights",
    "wifi speed tracking",
    "noise level monitoring",
    "workspace reviews",
    "coworking community",
    "productivity tracking",
    
    // Location Specific
    "Colombia digital nomads",
    "LATAM coworking",
    "South America remote work",
    "Antioquia workspace",
    "Medellín startup community",
    
    // Activity Types
    "study spaces",
    "meeting rooms",
    "networking events",
    "focus zones",
    "collaboration spaces",
    "quiet work areas",
    
    // Tech & Innovation
    "workspace technology",
    "smart coworking",
    "workspace analytics",
    "coworking 2.0",
    "next-generation coworking",
  ],
  authors: [{ name: "J-Studio", url: "https://j-studio.coffi.com.co" }],
  creator: "J-Studio",
  publisher: "J-Studio",
  metadataBase: new URL("https://coffi.com.co"),

  // Enhanced Open Graph metadata
  openGraph: {
    title: "Coffi – Find Perfect Coworking Spaces & Work Cafés in Medellín, Colombia",
    description:
      "Discover coworking spaces, work-friendly cafés, and productivity hubs in Medellín with real-time insights. Built by and for the digital nomad community in Colombia.",
    url: "https://coffi.com.co",
    siteName: "Coffi - Coworking Spaces Medellín",
    images: [
      {
        url: "/assets/images/screenshots/desktop/coffi-landing-screenshot-1.jpeg",
        width: 1200,
        height: 630,
        alt: "Coffi - Coworking spaces and work cafés in Medellín, Colombia",
      },
      {
        url: "/assets/images/screenshots/desktop/coffi-landing-screenshot-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Real-time workspace insights for digital nomads in Medellín",
      },
      {
        url: "/assets/images/screenshots/desktop/coffi-landing-screenshot-3.jpeg",
        width: 1200,
        height: 630,
        alt: "Community-driven workspace finder for remote workers",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Colombia",
  },
  
  // Enhanced Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Coffi – Coworking Spaces & Work Cafés in Medellín | Digital Nomad Hub",
    description: "Find perfect workspaces in Medellín with real-time insights from digital nomads. Join Colombia's thriving remote work community.",
    images: ["/assets/images/screenshots/desktop/coffi-landing-screenshot-1.jpeg"],
    creator: "@coffiapp",
    site: "@coffiapp",
  },

  // Enhanced icons and manifest
  icons: {
    icon: [
      { url: "/assets/icons/icon.png", sizes: "any" },
      { url: "/assets/icons/icon.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/icons/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/assets/icons/icon.png",
    apple: "/assets/icons/icon.png",
  },
  
  // Enhanced manifest and app info
  manifest: "/manifest.json",
  category: "productivity",
  classification: "business",
  
  // Enhanced robot and indexing directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Enhanced alternates
  alternates: {
    canonical: "https://coffi.com.co",
    languages: {
      'en': 'https://coffi.com.co/en',
      'es': 'https://coffi.com.co/es',
    },
  },
  
  // Enhanced verification and other metadata
  verification: {
    google: "google-site-verification-code", // You'll need to add your actual verification code
  },
  
  // Additional SEO metadata
  other: {
    "geo.region": "CO-ANT",
    "geo.placename": "Medellín, Colombia", 
    "geo.position": "6.2442;-75.5812",
    "ICBM": "6.2442, -75.5812",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#533FFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function LocalLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Fallback to `en` if locale is missing or unsupported
  const supportedLocales = ["en", "es"];
  const currentLocale =
    locale && supportedLocales.includes(locale) ? locale : "en";

  const messages = await loadMessages(currentLocale);

  return (
    <>
      <NextIntlClientProvider locale={currentLocale} messages={messages}>
        {/* Analytics and Tracking */}
        <GoogleTagManager GTM_ID={process.env.NEXT_PUBLIC_GTM_ID} />
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        
        {/* SEO Components */}
        <HreflangLinks />
        <StructuredData />
        
        {/* Site Layout */}
        <Header />
        <main className="w-full mx-auto">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}

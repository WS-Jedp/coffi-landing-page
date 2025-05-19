import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/containers/Footer";
import { loadMessages } from "@/i18n/utils";
import "../globals.css";

export const metadata: Metadata = {
  title: "Coffi – Be Where You Thrive",
  description:
    "Discover the best places to work, study, or connect — powered by real-time insights from the Coffi community. Built for digital nomads, remote workers, and students worldwide.",
  applicationName: "Coffi",
  generator: "Next.js",
  keywords: [
    "Coffi",
    "Cafe",
    "Cafes",
    "Coffee",
    "Coffee Shops",
    "Coffee Shop",
    "Coffeeshop",
    "Coffeeshops",
    "digital nomads",
    "remote work",
    "coworking",
    "work-friendly cafes",
    "study spaces",
    "real-time place insights",
    "Medellín",
    "coworking Colombia",
    "networking",
    "community",
    "community-driven",
    "community insights",
  ],
  authors: [{ name: "J-Studio", url: "https://j-studio.coffi.com.co" }],
  creator: "J-Studio",
  publisher: "J-Studio",
  metadataBase: new URL("https://coffi.com.co"),

  // Open Graph metadata
  openGraph: {
    title: "Coffi – Be Where You Thrive",
    description:
      "Work-friendly places. Real-time vibes. Built by and for digital nomads.",
    url: "https://coffi.com.co",
    siteName: "Coffi",
    images: [
      "/assets/images/screenshots/desktop/coffi-landing-screenshot-1.jpeg",
      "/assets/images/screenshots/desktop/coffi-landing-screenshot-2.jpeg",
      "/assets/images/screenshots/desktop/coffi-landing-screenshot-3.jpeg",
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/assets/icons/icon.png",
    shortcut: "/assets/icons/shortcut-icon.png",
  },
  themeColor: "#533FFF",
  colorScheme: "light",
  category: "productivity",
  alternates: {
    canonical: "https://coffi.com.co",
  },
};

export default async function LocalLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = params;

  // Fallback to `en` if locale is missing or unsupported
  const supportedLocales = ["en", "es"];
  const currentLocale =
    locale && supportedLocales.includes(locale) ? locale : "en";

  const messages = await loadMessages(currentLocale);

  return (
    <>
      <NextIntlClientProvider locale={currentLocale} messages={messages}>
        <Header />
        <main className="w-full mx-auto">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}

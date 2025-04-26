import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/containers/Footer";
import { loadMessages } from "@/i18n/utils";
import "../globals.css";

export const metadata: Metadata = {
  title: "Coffi - Be where you thrive",
  description: "Next gen platform to be productive",
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

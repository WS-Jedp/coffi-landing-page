import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@/i18n/utils";

// Configure SF Pro font
const sfPro = localFont({
  src: [
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Semibold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Ultralight.otf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Thin.otf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Heavy.otf',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../../public/assets/fonts/sf-pro/SF-Pro-Text-Black.otf',
      weight: '900',
      style: 'normal'
    },
  ],
  display: 'swap', // Use 'swap' to show text immediately with fallback until font loads
  preload: true,
  variable: '--font-sf-pro', // Optional: define a CSS variable
});

export const metadata: Metadata = {
  title: "Coffi - Be where you thrive",
  description: "Next gen platform to be productive"
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  // Fallback to `en` if locale is missing or unsupported
  const supportedLocales = ["en", "es"];
  const locale = params?.locale;
  const currentLocale = locale && supportedLocales.includes(locale) ? locale : "en";
  
  // Load messages if locale is available
  const messages = locale ? await loadMessages(currentLocale) : {};
 
  return (
    <html lang={currentLocale}>
      <body className={`${sfPro.className} font-sf antialiased text-coffi-black bg-coffi-white`}>
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

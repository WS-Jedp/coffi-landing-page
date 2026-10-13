import type { Metadata } from "next";
import { pageAlternates, toSiteLocale } from "@/lib/seo/routes";
import Home from "./HomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(toSiteLocale(locale), "/") };
}

export default function HomePage() {
  return <Home />;
}

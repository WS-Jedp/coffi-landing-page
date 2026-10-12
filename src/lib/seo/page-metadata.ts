import type { Metadata } from "next";
import { pageAlternates, toSiteLocale } from "./routes";

// `generateMetadata` for a static page that only sets canonical + hreflang.
// Title, description and the rest stay inherited from the [locale] layout.
export function staticPageMetadata(path: string) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    return { alternates: pageAlternates(toSiteLocale(locale), path) };
  };
}

import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { medellinMetadata, MedellinJsonLd } from "../_medellin-2026-donde-tu-ritmo-encuentra-su-lugar/seo";
import { medellinPath } from "../_medellin-2026-donde-tu-ritmo-encuentra-su-lugar/content";

// en version of the EN/ES pair. The es version lives at medellinPath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return medellinMetadata(locale === "es" ? "es" : "en");
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale === "es") {
    permanentRedirect(medellinPath("es"));
  }

  return (
    <>
      <MedellinJsonLd lang="en" />
      {children}
    </>
  );
}

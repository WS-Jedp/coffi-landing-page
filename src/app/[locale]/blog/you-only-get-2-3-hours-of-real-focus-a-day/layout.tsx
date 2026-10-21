import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { focoMetadata, FocoJsonLd } from "../_solo-tienes-2-3-horas-de-foco-real-al-dia/seo";
import { focoPath } from "../_solo-tienes-2-3-horas-de-foco-real-al-dia/content";

// en version of the EN/ES pair. The es version lives at focoPath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return focoMetadata(locale === "es" ? "es" : "en");
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
    permanentRedirect(focoPath("es"));
  }

  return (
    <>
      <FocoJsonLd lang="en" />
      {children}
    </>
  );
}

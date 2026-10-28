import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { rightPlaceMetadata, RightPlaceJsonLd } from "../_el-lugar-correcto-hoy-no-es-el-de-siempre/seo";
import { rightPlacePath } from "../_el-lugar-correcto-hoy-no-es-el-de-siempre/content";

// en version of the EN/ES pair. The es version lives at rightPlacePath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return rightPlaceMetadata(locale === "es" ? "es" : "en");
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
    permanentRedirect(rightPlacePath("es"));
  }

  return (
    <>
      <RightPlaceJsonLd lang="en" />
      {children}
    </>
  );
}

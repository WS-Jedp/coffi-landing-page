import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { rightPlaceMetadata, RightPlaceJsonLd } from "../_el-lugar-correcto-hoy-no-es-el-de-siempre/seo";
import { rightPlacePath } from "../_el-lugar-correcto-hoy-no-es-el-de-siempre/content";

// es version of the EN/ES pair. The en version lives at rightPlacePath("en").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return rightPlaceMetadata(locale === "en" ? "en" : "es");
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale === "en") {
    permanentRedirect(rightPlacePath("en"));
  }

  return (
    <>
      <RightPlaceJsonLd lang="es" />
      {children}
    </>
  );
}

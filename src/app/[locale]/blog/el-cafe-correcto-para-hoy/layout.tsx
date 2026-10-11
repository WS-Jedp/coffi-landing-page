import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cafePostMetadata, CafePostJsonLd } from "../_cafe-correcto-para-hoy/seo";
import { cafePostPath } from "../_cafe-correcto-para-hoy/content";

// es version of the EN/ES pair. The en version lives at cafePostPath("en").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return cafePostMetadata(locale === "en" ? "en" : "es");
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
    redirect(cafePostPath("en"));
  }

  return (
    <>
      <CafePostJsonLd lang="es" />
      {children}
    </>
  );
}

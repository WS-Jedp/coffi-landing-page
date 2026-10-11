import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cafePostMetadata, CafePostJsonLd } from "../_cafe-correcto-para-hoy/seo";
import { cafePostPath } from "../_cafe-correcto-para-hoy/content";

// en version of the EN/ES pair. The es version lives at cafePostPath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return cafePostMetadata(locale === "es" ? "es" : "en");
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
    redirect(cafePostPath("es"));
  }

  return (
    <>
      <CafePostJsonLd lang="en" />
      {children}
    </>
  );
}

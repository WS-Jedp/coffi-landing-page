import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { soledadMetadata, SoledadJsonLd } from "../_trabajo-remoto-y-soledad/seo";
import { soledadPath } from "../_trabajo-remoto-y-soledad/content";

// en version of the EN/ES pair. The es version lives at soledadPath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return soledadMetadata(locale === "es" ? "es" : "en");
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
    redirect(soledadPath("es"));
  }

  return (
    <>
      <SoledadJsonLd lang="en" />
      {children}
    </>
  );
}

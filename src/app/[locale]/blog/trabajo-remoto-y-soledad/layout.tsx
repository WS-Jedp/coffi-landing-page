import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { soledadMetadata, SoledadJsonLd } from "../_trabajo-remoto-y-soledad/seo";
import { soledadPath } from "../_trabajo-remoto-y-soledad/content";

// es version of the EN/ES pair. The en version lives at soledadPath("en").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return soledadMetadata(locale === "en" ? "en" : "es");
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
    redirect(soledadPath("en"));
  }

  return (
    <>
      <SoledadJsonLd lang="es" />
      {children}
    </>
  );
}

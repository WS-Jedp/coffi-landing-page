import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { medellinHubMetadata, MedellinHubJsonLd } from "../_medellin-2026-el-hub-donde-el-ritmo-si-importa/seo";
import { medellinHubPath } from "../_medellin-2026-el-hub-donde-el-ritmo-si-importa/content";

// es version of the EN/ES pair. The en version lives at medellinHubPath("en").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return medellinHubMetadata(locale === "en" ? "en" : "es");
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
    permanentRedirect(medellinHubPath("en"));
  }

  return (
    <>
      <MedellinHubJsonLd lang="es" />
      {children}
    </>
  );
}

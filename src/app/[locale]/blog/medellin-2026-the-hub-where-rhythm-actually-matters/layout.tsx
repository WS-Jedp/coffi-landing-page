import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { medellinHubMetadata, MedellinHubJsonLd } from "../_medellin-2026-el-hub-donde-el-ritmo-si-importa/seo";
import { medellinHubPath } from "../_medellin-2026-el-hub-donde-el-ritmo-si-importa/content";

// en version of the EN/ES pair. The es version lives at medellinHubPath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return medellinHubMetadata(locale === "es" ? "es" : "en");
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
    permanentRedirect(medellinHubPath("es"));
  }

  return (
    <>
      <MedellinHubJsonLd lang="en" />
      {children}
    </>
  );
}

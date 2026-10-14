import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { espacioMetadata, EspacioJsonLd } from "../_el-espacio-que-eliges-hoy/seo";
import { espacioPath } from "../_el-espacio-que-eliges-hoy/content";

// en version of the EN/ES pair. The es version lives at espacioPath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return espacioMetadata(locale === "es" ? "es" : "en");
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
    permanentRedirect(espacioPath("es"));
  }

  return (
    <>
      <EspacioJsonLd lang="en" />
      {children}
    </>
  );
}

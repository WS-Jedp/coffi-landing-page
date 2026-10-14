import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { espacioMetadata, EspacioJsonLd } from "../_el-espacio-que-eliges-hoy/seo";
import { espacioPath } from "../_el-espacio-que-eliges-hoy/content";

// es version of the EN/ES pair. The en version lives at espacioPath("en").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return espacioMetadata(locale === "en" ? "en" : "es");
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
    permanentRedirect(espacioPath("en"));
  }

  return (
    <>
      <EspacioJsonLd lang="es" />
      {children}
    </>
  );
}

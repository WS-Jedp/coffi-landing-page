import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { contactosMetadata, ContactosJsonLd } from "../_500-contactos-y-nadie-a-quien-llamar/seo";
import { contactosPath } from "../_500-contactos-y-nadie-a-quien-llamar/content";

// es version of the EN/ES pair. The en version lives at contactosPath("en").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return contactosMetadata(locale === "en" ? "en" : "es");
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
    permanentRedirect(contactosPath("en"));
  }

  return (
    <>
      <ContactosJsonLd lang="es" />
      {children}
    </>
  );
}

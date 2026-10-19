import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { contactosMetadata, ContactosJsonLd } from "../_500-contactos-y-nadie-a-quien-llamar/seo";
import { contactosPath } from "../_500-contactos-y-nadie-a-quien-llamar/content";

// en version of the EN/ES pair. The es version lives at contactosPath("es").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return contactosMetadata(locale === "es" ? "es" : "en");
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
    permanentRedirect(contactosPath("es"));
  }

  return (
    <>
      <ContactosJsonLd lang="en" />
      {children}
    </>
  );
}

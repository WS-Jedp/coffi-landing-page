import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import {
  SOLEDAD_BASE_URL,
  SOLEDAD_META_TITLE,
  soledadBlogData,
  soledadLocalePrefix,
  soledadUrl,
  SOLEDAD_COPY,
  SOLEDAD_IMAGES,
  type SoledadLang,
} from "./content";

export function soledadMetadata(lang: SoledadLang): Metadata {
  const blogData = soledadBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = soledadUrl(lang);
  const title = SOLEDAD_META_TITLE[lang];

  return {
    ...base,
    // Short <title> (< 60 chars) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: {
      canonical: url,
      languages: {
        en: soledadUrl("en"),
        es: soledadUrl("es"),
        "x-default": soledadUrl("en"),
      },
    },
    openGraph: {
      ...base.openGraph,
      url,
      images: [
        {
          url: blogData.image as string,
          width: SOLEDAD_IMAGES.og.width,
          height: SOLEDAD_IMAGES.og.height,
          alt: SOLEDAD_COPY[lang].alt.hero,
        },
      ],
      alternateLocale: lang === "es" ? ["en_US"] : ["es_CO"],
    },
    twitter: {
      ...base.twitter,
      title,
      images: [blogData.image as string],
    },
  };
}

export function SoledadJsonLd({ lang }: { lang: SoledadLang }) {
  const blogData = soledadBlogData(lang);
  const url = soledadUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${SOLEDAD_BASE_URL}${soledadLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SOLEDAD_BASE_URL}${soledadLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SOLEDAD_BASE_URL}${soledadLocalePrefix(lang)}/blog` },
      { "@type": "ListItem", position: 3, name: blogData.title[lang], item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

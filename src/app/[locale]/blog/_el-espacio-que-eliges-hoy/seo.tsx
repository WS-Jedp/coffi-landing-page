import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import { getBlogPost, postAlternates } from "@/lib/seo/routes";
import {
  ESPACIO_BASE_URL,
  ESPACIO_META_TITLE,
  espacioBlogData,
  espacioLocalePrefix,
  espacioUrl,
  ESPACIO_COPY,
  ESPACIO_IMAGES,
  type EspacioLang,
} from "./content";

export function espacioMetadata(lang: EspacioLang): Metadata {
  const blogData = espacioBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = espacioUrl(lang);
  const title = ESPACIO_META_TITLE[lang];

  return {
    ...base,
    // Approved meta title, used as-is (absolute) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: postAlternates(getBlogPost("the-space-you-choose-today"), lang),
    openGraph: {
      ...base.openGraph,
      url,
      images: [
        {
          url: blogData.image as string,
          width: ESPACIO_IMAGES.og.width,
          height: ESPACIO_IMAGES.og.height,
          alt: ESPACIO_COPY[lang].alt.hero,
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

export function EspacioJsonLd({ lang }: { lang: EspacioLang }) {
  const blogData = espacioBlogData(lang);
  const url = espacioUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${ESPACIO_BASE_URL}${espacioLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ESPACIO_BASE_URL}${espacioLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${ESPACIO_BASE_URL}${espacioLocalePrefix(lang)}/blog` },
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

import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import { getBlogPost, postAlternates } from "@/lib/seo/routes";
import {
  MEDELLIN_HUB_BASE_URL,
  MEDELLIN_HUB_META_TITLE,
  medellinHubBlogData,
  medellinHubLocalePrefix,
  medellinHubUrl,
  MEDELLIN_HUB_COPY,
  MEDELLIN_HUB_IMAGES,
  type MedellinHubLang,
} from "./content";

export function medellinHubMetadata(lang: MedellinHubLang): Metadata {
  const blogData = medellinHubBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = medellinHubUrl(lang);
  const title = MEDELLIN_HUB_META_TITLE[lang];

  return {
    ...base,
    // Approved meta title, used as-is (absolute) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: postAlternates(getBlogPost("medellin-2026-the-hub-where-rhythm-actually-matters"), lang),
    openGraph: {
      ...base.openGraph,
      title,
      url,
      images: [
        {
          url: blogData.image as string,
          width: MEDELLIN_HUB_IMAGES.og.width,
          height: MEDELLIN_HUB_IMAGES.og.height,
          alt: MEDELLIN_HUB_COPY[lang].alt.hero,
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

export function MedellinHubJsonLd({ lang }: { lang: MedellinHubLang }) {
  const blogData = medellinHubBlogData(lang);
  const url = medellinHubUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${MEDELLIN_HUB_BASE_URL}${medellinHubLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${MEDELLIN_HUB_BASE_URL}${medellinHubLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${MEDELLIN_HUB_BASE_URL}${medellinHubLocalePrefix(lang)}/blog` },
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

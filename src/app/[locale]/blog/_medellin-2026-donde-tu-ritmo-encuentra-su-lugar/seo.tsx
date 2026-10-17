import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import { getBlogPost, postAlternates } from "@/lib/seo/routes";
import {
  MEDELLIN_BASE_URL,
  MEDELLIN_META_TITLE,
  medellinBlogData,
  medellinLocalePrefix,
  medellinUrl,
  MEDELLIN_COPY,
  MEDELLIN_IMAGES,
  type MedellinLang,
} from "./content";

export function medellinMetadata(lang: MedellinLang): Metadata {
  const blogData = medellinBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = medellinUrl(lang);
  const title = MEDELLIN_META_TITLE[lang];

  return {
    ...base,
    // Approved meta title, used as-is (absolute) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: postAlternates(getBlogPost("medellin-2026-where-your-rhythm-finds-its-place"), lang),
    openGraph: {
      ...base.openGraph,
      title,
      url,
      images: [
        {
          url: blogData.image as string,
          width: MEDELLIN_IMAGES.og.width,
          height: MEDELLIN_IMAGES.og.height,
          alt: MEDELLIN_COPY[lang].alt.hero,
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

export function MedellinJsonLd({ lang }: { lang: MedellinLang }) {
  const blogData = medellinBlogData(lang);
  const url = medellinUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${MEDELLIN_BASE_URL}${medellinLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${MEDELLIN_BASE_URL}${medellinLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${MEDELLIN_BASE_URL}${medellinLocalePrefix(lang)}/blog` },
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

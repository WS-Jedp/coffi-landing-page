import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import { getBlogPost, postAlternates } from "@/lib/seo/routes";
import {
  CAFE_POST_BASE_URL,
  CAFE_POST_META_TITLE,
  cafePostBlogData,
  cafePostLocalePrefix,
  cafePostUrl,
  type CafePostLang,
} from "./content";

export function cafePostMetadata(lang: CafePostLang): Metadata {
  const blogData = cafePostBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = cafePostUrl(lang);
  const title = CAFE_POST_META_TITLE[lang];

  return {
    ...base,
    // Short <title> (< 60 chars) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: postAlternates(getBlogPost("the-right-cafe-for-today"), lang),
    openGraph: {
      ...base.openGraph,
      url,
      images: [
        {
          url: blogData.image as string,
          width: 1200,
          height: 630,
          alt: blogData.title[lang],
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

export function CafePostJsonLd({ lang }: { lang: CafePostLang }) {
  const blogData = cafePostBlogData(lang);
  const url = cafePostUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${CAFE_POST_BASE_URL}${cafePostLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${CAFE_POST_BASE_URL}${cafePostLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${CAFE_POST_BASE_URL}${cafePostLocalePrefix(lang)}/blog` },
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

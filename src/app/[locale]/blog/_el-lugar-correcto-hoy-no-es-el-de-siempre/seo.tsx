import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import { getBlogPost, postAlternates } from "@/lib/seo/routes";
import {
  RIGHT_PLACE_BASE_URL,
  RIGHT_PLACE_META_TITLE,
  rightPlaceBlogData,
  rightPlaceLocalePrefix,
  rightPlaceUrl,
  RIGHT_PLACE_COPY,
  RIGHT_PLACE_IMAGES,
  type RightPlaceLang,
} from "./content";

export function rightPlaceMetadata(lang: RightPlaceLang): Metadata {
  const blogData = rightPlaceBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = rightPlaceUrl(lang);
  const title = RIGHT_PLACE_META_TITLE[lang];

  return {
    ...base,
    // Approved meta title, used as-is (absolute) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: postAlternates(getBlogPost("the-right-place-today-isnt-the-usual-one"), lang),
    openGraph: {
      ...base.openGraph,
      title,
      url,
      images: [
        {
          url: blogData.image as string,
          width: RIGHT_PLACE_IMAGES.og.width,
          height: RIGHT_PLACE_IMAGES.og.height,
          alt: RIGHT_PLACE_COPY[lang].alt.hero,
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

export function RightPlaceJsonLd({ lang }: { lang: RightPlaceLang }) {
  const blogData = rightPlaceBlogData(lang);
  const url = rightPlaceUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${RIGHT_PLACE_BASE_URL}${rightPlaceLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${RIGHT_PLACE_BASE_URL}${rightPlaceLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${RIGHT_PLACE_BASE_URL}${rightPlaceLocalePrefix(lang)}/blog` },
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

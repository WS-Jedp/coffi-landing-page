import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import { getBlogPost, postAlternates } from "@/lib/seo/routes";
import {
  FOCO_BASE_URL,
  FOCO_META_TITLE,
  focoBlogData,
  focoLocalePrefix,
  focoUrl,
  FOCO_COPY,
  FOCO_IMAGES,
  type FocoLang,
} from "./content";

export function focoMetadata(lang: FocoLang): Metadata {
  const blogData = focoBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = focoUrl(lang);
  const title = FOCO_META_TITLE[lang];

  return {
    ...base,
    // Approved meta title, used as-is (absolute) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: postAlternates(getBlogPost("you-only-get-2-3-hours-of-real-focus-a-day"), lang),
    openGraph: {
      ...base.openGraph,
      title,
      url,
      images: [
        {
          url: blogData.image as string,
          width: FOCO_IMAGES.og.width,
          height: FOCO_IMAGES.og.height,
          alt: FOCO_COPY[lang].alt.hero,
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

export function FocoJsonLd({ lang }: { lang: FocoLang }) {
  const blogData = focoBlogData(lang);
  const url = focoUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${FOCO_BASE_URL}${focoLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${FOCO_BASE_URL}${focoLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${FOCO_BASE_URL}${focoLocalePrefix(lang)}/blog` },
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

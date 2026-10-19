import type { Metadata } from "next";
import { generateBlogMetadata, generateBlogStructuredData } from "@/lib/blog-seo";
import { getBlogPost, postAlternates } from "@/lib/seo/routes";
import {
  CONTACTOS_BASE_URL,
  CONTACTOS_META_TITLE,
  contactosBlogData,
  contactosLocalePrefix,
  contactosUrl,
  CONTACTOS_COPY,
  CONTACTOS_IMAGES,
  type ContactosLang,
} from "./content";

export function contactosMetadata(lang: ContactosLang): Metadata {
  const blogData = contactosBlogData(lang);
  const base = generateBlogMetadata(blogData, lang);
  const url = contactosUrl(lang);
  const title = CONTACTOS_META_TITLE[lang];

  return {
    ...base,
    // Approved meta title, used as-is (absolute) instead of the generic "| Coffi Blog - Coworking Medellín" suffix.
    title: { absolute: title },
    // EN and ES live under different slugs, so hreflang must point at each real URL.
    alternates: postAlternates(getBlogPost("500-contacts-and-no-one-to-call"), lang),
    openGraph: {
      ...base.openGraph,
      title,
      url,
      images: [
        {
          url: blogData.image as string,
          width: CONTACTOS_IMAGES.og.width,
          height: CONTACTOS_IMAGES.og.height,
          alt: CONTACTOS_COPY[lang].alt.hero,
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

export function ContactosJsonLd({ lang }: { lang: ContactosLang }) {
  const blogData = contactosBlogData(lang);
  const url = contactosUrl(lang);
  const article = {
    ...generateBlogStructuredData(blogData, lang),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Coffi Blog",
      url: `${CONTACTOS_BASE_URL}${contactosLocalePrefix(lang)}/blog`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${CONTACTOS_BASE_URL}${contactosLocalePrefix(lang) || "/"}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${CONTACTOS_BASE_URL}${contactosLocalePrefix(lang)}/blog` },
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

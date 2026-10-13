import type { MetadataRoute } from "next";
import {
  BLOG_POSTS,
  SITE_LOCALES,
  STATIC_ROUTES,
  absoluteUrl,
  blogPostUrl,
} from "@/lib/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.flatMap((path) =>
    SITE_LOCALES.map((locale) => ({
      url: absoluteUrl(locale, path),
      alternates: {
        languages: {
          en: absoluteUrl("en", path),
          es: absoluteUrl("es", path),
          "x-default": absoluteUrl("en", path),
        },
      },
    }))
  );

  const postEntries = BLOG_POSTS.flatMap((post) =>
    SITE_LOCALES.map((locale) => ({
      url: blogPostUrl(post, locale),
      lastModified: post.lastModified,
      alternates: {
        languages: {
          en: blogPostUrl(post, "en"),
          es: blogPostUrl(post, "es"),
          "x-default": blogPostUrl(post, "en"),
        },
      },
    }))
  );

  return [...staticEntries, ...postEntries];
}

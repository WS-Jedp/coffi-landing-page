import type { Metadata } from "next";
import { generateBlogListMetadata } from "@/lib/blog-seo";

export async function generateMetadata({ params }: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  return generateBlogListMetadata(locale);
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

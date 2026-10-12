import { staticPageMetadata } from "@/lib/seo/page-metadata";

export const generateMetadata = staticPageMetadata("/about-us");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

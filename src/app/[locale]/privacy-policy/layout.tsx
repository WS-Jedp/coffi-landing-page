import { staticPageMetadata } from "@/lib/seo/page-metadata";

export const generateMetadata = staticPageMetadata("/privacy-policy");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

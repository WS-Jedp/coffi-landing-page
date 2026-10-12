import { staticPageMetadata } from "@/lib/seo/page-metadata";

export const generateMetadata = staticPageMetadata("/terms-of-service");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

// Checkout flow: not part of the sitemap and kept out of the index.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

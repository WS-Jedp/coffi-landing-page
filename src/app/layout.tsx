import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/containers/Footer";

export const metadata: Metadata = {
  title: "Coffi - Be where you thrive",
  description: "Next gen platform to be productive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sf antialiased text-coffi-black bg-coffi-white`}>
        <Header />
        <main className="w-full mx-auto">{children}</main>

        <Footer />
      </body>
    </html>
  );
}

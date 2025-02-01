import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coffi - Be where you thrive",
  description: "Next gen platform to be productive",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body className={`font-sf antialiased text-coffi-black bg-coffi-white`}>
          {children}
      </body>
    </html>
  );
}

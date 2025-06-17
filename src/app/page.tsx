import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// This page serves the root URL and redirects based on detected locale
// But only when necessary for better UX, not for SEO
export default async function RootPage() {
  const headersList = await headers();
  const detectedLocale = headersList.get('x-detected-locale') || 'en';
  
  // For non-English users who might benefit from Spanish content,
  // we can optionally redirect them, but this should be minimal
  // and only when we're confident they prefer Spanish
  const userAgent = headersList.get('user-agent') || '';
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  
  // Never redirect bots - let them index the English content
  if (isBot) {
    // Let the middleware handle the rewrite to /en
    return null;
  }
  
  // For real users, you could optionally redirect to Spanish
  // but for SEO purposes, it's better to serve content directly
  return null;
}

// SEO-optimized metadata for the root page
export const metadata: Metadata = {
  title: "Coffi – Coworking Spaces & Work-Friendly Cafés in Medellín, Colombia | Be Where You Thrive",
  description: "Find the perfect coworking space, work-friendly café, or productivity hub in Medellín, Colombia. Real-time insights from digital nomads. Join Colombia's thriving remote work community with Coffi.",
  
  // Canonical URL points to root
  alternates: {
    canonical: "https://coffi.com.co",
    languages: {
      'en': 'https://coffi.com.co/en',
      'es': 'https://coffi.com.co/es',
      'x-default': 'https://coffi.com.co'
    },
  },
  
  // Open Graph for root
  openGraph: {
    title: "Coffi – Find Perfect Coworking Spaces & Work Cafés in Medellín, Colombia",
    description: "Discover coworking spaces, work-friendly cafés, and productivity hubs in Medellín with real-time insights. Built by and for the digital nomad community in Colombia.",
    url: "https://coffi.com.co",
    siteName: "Coffi - Coworking Spaces Medellín",
    locale: "en_US",
    type: "website",
  },
  
  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Coffi – Coworking Spaces & Work Cafés in Medellín | Digital Nomad Hub",
    description: "Find perfect workspaces in Medellín with real-time insights from digital nomads. Join Colombia's thriving remote work community.",
  },
  
  // Enhanced robot directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

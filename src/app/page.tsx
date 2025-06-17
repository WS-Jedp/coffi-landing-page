import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// This page serves the root URL without immediate redirect for better SEO
export default async function RootPage() {
  // This component will be rewritten by middleware to show /en content
  // but the URL remains as / for SEO purposes
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

export default function HreflangLinks() {
  // hreflang and canonical are emitted per page through the Metadata API
  // (see src/lib/seo/routes.ts). This component only holds resource hints.
  return (
    <>
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//app.coffi.com.co" />
      <link rel="dns-prefetch" href="//j-studio.coffi.com.co" />
    </>
  )
}

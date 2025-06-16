import { useLocale } from 'next-intl'

export default function HreflangLinks() {
  const locale = useLocale()
  
  const hreflangData = [
    { hreflang: 'en', href: 'https://coffi.com.co/en' },
    { hreflang: 'es', href: 'https://coffi.com.co/es' },
    { hreflang: 'x-default', href: 'https://coffi.com.co' },
  ]

  return (
    <>
      {hreflangData.map(({ hreflang, href }) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
      
      {/* Canonical link */}
      <link
        rel="canonical"
        href={`https://coffi.com.co/${locale}`}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//app.coffi.com.co" />
      <link rel="dns-prefetch" href="//j-studio.coffi.com.co" />
    </>
  )
}

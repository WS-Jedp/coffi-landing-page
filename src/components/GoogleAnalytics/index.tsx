import Script from 'next/script'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID?: string;
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'coworking_search',
                'custom_parameter_2': 'workspace_finder'
              }
            });
            
            // Enhanced ecommerce tracking for subscription events
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'custom_map': {
                'custom_parameter_subscription': 'nomad_plan'
              }
            });
          `,
        }}
      />
    </>
  );
}

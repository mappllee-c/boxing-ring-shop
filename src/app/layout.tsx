import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/components/ui/toast'
import { OrganizationSchema } from '@/components/structured-data/organization-schema'
import { WebsiteSchema } from '@/components/structured-data/website-schema'
import { CriticalCSS, PreloadCriticalResources } from '@/components/performance/critical-css'
import { LayoutStabilizer } from '@/components/performance/layout-stability'
import { InteractionOptimizer } from '@/components/performance/interaction-optimization'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://boxing-ring-shop.com'),
  title: {
    default: 'ボクシングリング販売 | 69万円から・補助金対応 | リングボクシング',
    template: '%s | リングボクシング'
  },
  description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大70%還元。カスタマイズ対応、全国設置可能。高額商品のため購入前のお問い合わせが必須です。',
  keywords: 'ボクシングリング,販売,業務用,プロ用,補助金,69万円,設置,カスタマイズ,平置リング,ベーシックタイプ',
  authors: [{ name: 'リングボクシング専門店' }],
  creator: 'リングボクシング専門店',
  publisher: 'リングボクシング専門店',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://boxing-ring-shop.com',
    title: 'ボクシングリング販売 | 69万円から・補助金対応',
    description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大67%還元。',
    siteName: 'リングボクシング専門店',
    images: [
      {
        url: '/images/columns/og-columns-professional-insights.jpg',
        width: 1200,
        height: 630,
        alt: 'ボクシングリング販売 - 見積もりはこちら・補助金対応'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ボクシングリング販売 | 69万円から・補助金対応',
    description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大67%還元。',
    images: ['/og-image.webp']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={inter.variable}>
      <head>
        <CriticalCSS />
        <PreloadCriticalResources />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'リングボクシング専門店',
              description: '業務用ボクシングリングの販売・補助金サポート専門店',
              url: 'https://boxing-ring-shop.com',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'JP',
                addressRegion: '東京都'
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'ボクシングリング商品カタログ',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Product',
                      name: 'プロ用ボクシングリング',
                      description: '平置リング・ベーシックタイプ、4m×4mベースでカスタマイズ対応'
                    },
                    price: '690000',
                    priceCurrency: 'JPY',
                    availability: 'https://schema.org/InStock',
                    priceValidUntil: '2024-12-31'
                  }
                ]
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127'
              }
            })
          }}
        />
        <OrganizationSchema />
        <WebsiteSchema />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZDQW928VWV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZDQW928VWV');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased font-inter`}>
        <LayoutStabilizer />
        <InteractionOptimizer />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
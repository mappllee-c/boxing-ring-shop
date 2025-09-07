export function WebsiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://boxing-ring-shop.com/#website',
    name: 'リングボクシング専門店',
    description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大70%還元。全国設置対応。',
    url: 'https://boxing-ring-shop.com',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://boxing-ring-shop.com/#organization'
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://boxing-ring-shop.com/products?search={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    ],
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://boxing-ring-shop.com/#organization'
    },
    about: [
      {
        '@type': 'Thing',
        name: 'ボクシングリング',
        description: '業務用ボクシングリングの製造・販売'
      },
      {
        '@type': 'Thing',
        name: '補助金申請',
        description: '設備投資補助金の申請サポート'
      },
      {
        '@type': 'Thing',
        name: 'スポーツ設備',
        description: 'ボクシング・格闘技用設備'
      }
    ],
    keywords: [
      'ボクシングリング',
      '販売',
      '業務用',
      'プロ用',
      '補助金',
      '69万円',
      '設置',
      'カスタマイズ',
      '平置リング',
      'ベーシックタイプ',
      '全国対応'
    ],
    inLanguage: 'ja-JP',
    datePublished: '2004-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      '@id': 'https://boxing-ring-shop.com/#organization'
    },
    license: 'https://boxing-ring-shop.com/terms',
    isAccessibleForFree: true,
    hasPart: [
      {
        '@type': 'WebPage',
        '@id': 'https://boxing-ring-shop.com/products',
        name: '商品一覧',
        description: 'ボクシングリング商品一覧ページ'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://boxing-ring-shop.com/subsidy',
        name: '補助金サポート',
        description: '補助金申請サポートサービス'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://boxing-ring-shop.com/blog',
        name: 'ブログ',
        description: 'ボクシングリング専門情報ブログ'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://boxing-ring-shop.com/contact',
        name: 'お問い合わせ',
        description: '無料相談・見積もり依頼'
      }
    ],
    primaryImageOfPage: {
      '@type': 'ImageObject',
      '@id': 'https://boxing-ring-shop.com/og-image.webp',
      url: 'https://boxing-ring-shop.com/og-image.webp',
      width: 1200,
      height: 630
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ホーム',
          item: 'https://boxing-ring-shop.com'
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url?: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url })
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

export function FAQSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'ボクシングリングの価格はいくらですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ベーシックモデルは69万円から、プロ仕様は180万円からとなっています。補助金を活用することで最大70%の還元が可能です。'
        }
      },
      {
        '@type': 'Question',
        name: '補助金申請のサポートはありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、専門スタッフが無料で補助金申請をサポートいたします。IT導入補助金、小規模事業者持続化補助金、ものづくり補助金などが活用可能です。'
        }
      },
      {
        '@type': 'Question',
        name: '設置工事は対応していますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '全国対応で設置工事を承っています。専門技術者が安全に設置いたします。設置費用は商品により異なりますので、お気軽にお問い合わせください。'
        }
      },
      {
        '@type': 'Question',
        name: 'カスタマイズは可能ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、サイズ、カラー、ロゴ入れなど様々なカスタマイズに対応しています。お客様のご要望に合わせてオーダーメイドも承ります。'
        }
      },
      {
        '@type': 'Question',
        name: '納期はどのくらいですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'スタンダードモデルで2-3週間、プロ仕様で4-6週間、カスタムオーダーで8-16週間となっています。詳細は商品ページをご確認ください。'
        }
      },
      {
        '@type': 'Question',
        name: '保証期間はありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '商品により1年から10年の保証期間を設けています。定期メンテナンスサービスもご利用いただけます。'
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}
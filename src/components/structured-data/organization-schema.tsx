export function OrganizationSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://boxing-ring-shop.com/#organization',
    name: 'リングボクシング専門店',
    alternateName: 'Boxing Ring Shop',
    description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大70%還元。20年以上の実績を持つ専門店です。',
    url: 'https://boxing-ring-shop.com',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://boxing-ring-shop.com/logo.png',
      url: 'https://boxing-ring-shop.com/logo.png',
      width: 300,
      height: 120,
      caption: 'リングボクシング専門店ロゴ'
    },
    image: [
      'https://boxing-ring-shop.com/logo.png',
      'https://boxing-ring-shop.com/images/company/showroom.jpg',
      'https://boxing-ring-shop.com/images/company/factory.jpg'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+81-3-1234-5678',
        contactType: 'customer service',
        areaServed: 'JP',
        availableLanguage: ['Japanese'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      },
      {
        '@type': 'ContactPoint',
        telephone: '+81-3-1234-5679',
        contactType: 'technical support',
        areaServed: 'JP',
        availableLanguage: ['Japanese'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      },
      {
        '@type': 'ContactPoint',
        email: 'info@boxing-ring-shop.com',
        contactType: 'customer service',
        areaServed: 'JP'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '東京都渋谷区1-2-3',
      addressLocality: '渋谷区',
      addressRegion: '東京都',
      postalCode: '150-0001',
      addressCountry: 'JP'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.6594,
      longitude: 139.7016
    },
    sameAs: [
      'https://www.facebook.com/boxingringshop',
      'https://twitter.com/boxingringshop',
      'https://www.instagram.com/boxingringshop',
      'https://www.youtube.com/boxingringshop'
    ],
    foundingDate: '2004',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 25
    },
    legalName: 'リングボクシング株式会社',
    taxID: '1234567890',
    vatID: 'JP1234567890',
    areaServed: {
      '@type': 'Country',
      name: 'Japan'
    },
    serviceArea: {
      '@type': 'Country',
      name: 'Japan'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ボクシングリング商品カタログ',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'スタンダードリング',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'コンパクトリング ベーシック',
                description: '69万円からの高品質ボクシングリング'
              },
              price: '690000',
              priceCurrency: 'JPY'
            }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'プロフェッショナルリング',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'プロフェッショナルリング トーナメント',
                description: 'プロ仕様の最高品質ボクシングリング'
              },
              price: '1980000',
              priceCurrency: 'JPY'
            }
          ]
        }
      ]
    },
    knowsAbout: [
      'ボクシングリング製造',
      '補助金申請サポート',
      'スポーツ設備設置',
      'ボクシング用品',
      'フィットネス機器'
    ],
    slogan: '人類の健康とスポーツ発展に貢献する世界屈指のボクシングリング製造',
    award: [
      '品質優秀賞（2023年）',
      '顧客満足度No.1（2022年）',
      '技術革新賞（2021年）'
    ],
    seeks: {
      '@type': 'Demand',
      name: 'ボクシングリング需要への対応'
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '補助金申請サポート',
          description: '最大70%還元の補助金申請を無料サポート'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service', 
          name: '設置工事サービス',
          description: '専門技術者による安全な設置工事'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'メンテナンスサービス',
          description: '長期使用をサポートする定期メンテナンス'
        }
      }
    ],
    employee: [
      {
        '@type': 'Person',
        name: '専門技術スタッフ',
        jobTitle: '設置・メンテナンス責任者',
        worksFor: {
          '@type': 'Organization',
          name: 'リングボクシング専門店'
        }
      }
    ],
    department: [
      {
        '@type': 'Organization',
        name: '営業部',
        description: '商品相談・見積もり対応'
      },
      {
        '@type': 'Organization',
        name: '技術部',
        description: '設置・メンテナンス・カスタマイズ対応'
      },
      {
        '@type': 'Organization',
        name: '補助金サポート部',
        description: '補助金申請の専門サポート'
      }
    ],
    parentOrganization: {
      '@type': 'Corporation',
      name: 'リングボクシング株式会社'
    },
    owns: [
      {
        '@type': 'Product',
        name: 'ボクシングリング製造技術'
      },
      {
        '@type': 'IntellectualProperty',
        name: '独自設計技術'
      }
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO9001認証',
        credentialCategory: '品質管理'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'JBA認定',
        credentialCategory: 'ボクシング協会認定'
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
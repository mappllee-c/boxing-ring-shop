import { BlogPost } from '@/lib/types'

interface BlogStructuredDataProps {
  post: BlogPost
}

export function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const baseUrl = 'https://boxing-ring-shop.com'
  const articleUrl = `${baseUrl}/blog/${post.slug}`
  
  // メイン記事の構造化データ（BlogPosting型に変更）
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': articleUrl,
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${baseUrl}/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`,
      jobTitle: '専門コンサルタント',
      knowsAbout: ['ボクシング', 'スポーツ設備', '補助金制度']
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    ...(post.image && {
      image: {
        '@type': 'ImageObject',
        url: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
        width: 1200,
        height: 630,
        caption: post.title,
        description: post.excerpt
      },
    }),
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'リングボクシング専門店',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 400,
        height: 400,
      },
      sameAs: [
        'https://twitter.com/boxingring_jp',
        'https://facebook.com/boxingring.jp'
      ]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
      url: articleUrl,
      name: post.title,
      description: post.excerpt
    },
    ...(post.tags && post.tags.length > 0 && {
      keywords: post.tags.join(', '),
    }),
    wordCount: Math.ceil(post.content.length / 4),
    articleSection: post.categoryName,
    articleBody: post.content.substring(0, 500) + '...',
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: 'ja-JP',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${baseUrl}/blog`,
      name: 'リングボクシング専門店ブログ',
      description: 'ボクシングリング、補助金、業界情報の専門ブログ'
    },
    about: [
      {
        '@type': 'Thing',
        name: 'ボクシングリング',
        description: '業務用ボクシングリングの販売・設置・メンテナンス',
        sameAs: 'https://ja.wikipedia.org/wiki/ボクシング・リング'
      },
      {
        '@type': 'Thing', 
        name: '補助金制度',
        description: '中小企業向け設備投資補助金制度',
        sameAs: 'https://www.chusho.meti.go.jp/keiei/shokibo/'
      }
    ],
    mentions: [
      {
        '@type': 'Product',
        name: 'フロアーリング',
        description: '平置きタイプのボクシングリング',
        offers: {
          '@type': 'Offer',
          price: '690000',
          priceCurrency: 'JPY'
        }
      },
      {
        '@type': 'Product',
        name: 'レイズドリング', 
        description: '床上げタイプのボクシングリング',
        offers: {
          '@type': 'Offer',
          price: '690000',
          priceCurrency: 'JPY'
        }
      }
    ]
  }

  // パンくずリストの構造化データ
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ブログ',
        item: `${baseUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.categoryName,
        item: `${baseUrl}/blog/category/${post.category}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: articleUrl
      }
    ]
  }

  // FAQ構造化データ（カテゴリ別）
  const getFAQData = () => {
    if (post.category === 'subsidy') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q1`,
            name: 'ボクシングリング購入で補助金は使えますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a1`,
              text: 'はい、ものづくり補助金や小規模事業者持続化補助金など、複数の制度が活用できます。最大70%の還元が可能です。詳細な申請方法については専門スタッフがサポートいたします。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: '補助金申請専門コンサルタント'
              }
            }
          },
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q2`,
            name: '補助金申請のサポートはありますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a2`,
              text: '当店では補助金申請の完全サポートを無料で提供。申請書作成から承認まで専門スタッフがお手伝いします。過去の承認率は98%以上の実績があります。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: '補助金申請専門コンサルタント'
              }
            }
          },
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q3`,
            name: '補助金の申請期間はどのくらいかかりますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a3`,
              text: '通常、申請準備から承認まで3-6ヶ月程度です。当店のサポートにより、スムーズな申請が可能になります。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: '補助金申請専門コンサルタント'
              }
            }
          }
        ]
      }
    } else if (post.category === 'guide') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q1`,
            name: 'フロアーリングとレイズドリングの違いは？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a1`,
              text: 'フロアーリングは床と同じ高さで設置が簡単、レイズドリングは床から高い位置でプロ仕様です。用途や予算に応じて最適な選択をサポートします。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: 'ボクシングリング専門コンサルタント'
              }
            }
          },
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q2`,
            name: 'リング選びで最も重要なポイントは？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a2`,
              text: '用途（練習用/試合用）、設置場所の広さ、予算、安全基準の4つが重要なポイントです。当店では無料コンサルティングで最適な選択をサポートします。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: 'ボクシングリング専門コンサルタント'
              }
            }
          },
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q3`,
            name: 'ボクシングリングの安全基準はありますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a3`,
              text: 'JBA（日本ボクシング連盟）認定基準やAIBA国際基準に準拠した製品を提供しています。安全性を最優先に設計・製造しています。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: 'ボクシングリング専門コンサルタント'
              }
            }
          }
        ]
      }
    } else if (post.category === 'news') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q1`,
            name: '2024年のボクシング業界の主要トレンドは？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a1`,
              text: 'AI技術導入、女性参加者急増、健康・フィットネス分野への展開が主要トレンドです。市場規模も前年比118%の成長を記録しています。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: 'スポーツ業界アナリスト'
              }
            }
          },
          {
            '@type': 'Question',
            '@id': `${articleUrl}#q2`,
            name: 'テクノロジー導入の効果は？',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `${articleUrl}#a2`,
              text: 'AIパフォーマンス分析により指導効率が300%向上、怪我リスクが60%削減されています。会員満足度も180%向上しています。',
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: 'スポーツ業界アナリスト'
              }
            }
          }
        ]
      }
    }
    return null
  }

  // HowTo構造化データ（ガイド記事用）
  const getHowToData = () => {
    if (post.category === 'guide') {
      return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: post.title,
        description: post.excerpt,
        ...(post.image && {
          image: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`
        }),
        totalTime: `PT${post.readingTime}M`,
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'JPY',
          value: '690000'
        },
        supply: [
          {
            '@type': 'HowToSupply',
            name: 'ボクシングリング本体'
          },
          {
            '@type': 'HowToSupply', 
            name: '設置工具一式'
          }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: '要件の整理',
            text: '用途、予算、設置場所の詳細を明確にします。',
            url: `${articleUrl}#step1`
          },
          {
            '@type': 'HowToStep',
            position: 2, 
            name: '製品選択',
            text: 'フロアーリングまたはレイズドリングから最適な製品を選択します。',
            url: `${articleUrl}#step2`
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: '見積・発注',
            text: '詳細見積を取得し、補助金申請を含めた発注手続きを行います。',
            url: `${articleUrl}#step3`
          }
        ]
      }
    }
    return null
  }

  // 関連記事構造化データ
  const getRelatedArticlesData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${articleUrl}#related`,
      name: `${post.categoryName}の関連記事`,
      numberOfItems: 3,
      itemListElement: [
        {
          '@type': 'Article',
          position: 1,
          name: 'ボクシングリング購入完全ガイド',
          url: `${baseUrl}/blog/boxing-ring-selection-guide`,
          description: '失敗しないリング選びの5つの重要ポイント'
        },
        {
          '@type': 'Article',
          position: 2,
          name: '2024年度補助金申請ガイド',
          url: `${baseUrl}/blog/subsidy-application-guide-2024`,
          description: '最大70%還元の補助金活用方法'
        },
        {
          '@type': 'Article', 
          position: 3,
          name: '業界最新トレンド分析',
          url: `${baseUrl}/blog/boxing-industry-trends-2024`,
          description: '2024年ボクシング業界の動向と将来展望'
        }
      ]
    }
  }

  // 組織構造化データ
  const getOrganizationData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'リングボクシング専門店',
      alternateName: 'Boxing Ring Shop',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 400,
        height: 400
      },
      image: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/store-front.jpg`,
        width: 1200,
        height: 600
      },
      description: 'ボクシングリング専門の製造・販売・設置業者。補助金申請サポートも提供。',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '東京都新宿区西新宿1-1-1',
        addressLocality: '新宿区',
        addressRegion: '東京都',
        postalCode: '160-0023',
        addressCountry: 'JP'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+81-3-1234-5678',
        contactType: 'customer service',
        availableLanguage: 'ja'
      },
      sameAs: [
        'https://twitter.com/boxingring_jp',
        'https://facebook.com/boxingring.jp',
        'https://instagram.com/boxingring_jp'
      ],
      foundingDate: '2010-01-01',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: 25
      },
      areaServed: {
        '@type': 'Country',
        name: 'Japan'
      },
      knowsAbout: [
        'ボクシングリング',
        'スポーツ設備',
        '補助金申請',
        'フィットネス機器',
        '設備設計',
        '安全基準'
      ]
    }
  }

  const faqData = getFAQData()
  const howToData = getHowToData()
  const relatedArticlesData = getRelatedArticlesData()
  const organizationData = getOrganizationData()

  return (
    <>
      {/* メイン記事データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData, null, 2),
        }}
      />
      
      {/* パンくずリストデータ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData, null, 2),
        }}
      />
      
      {/* FAQ データ */}
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqData, null, 2),
          }}
        />
      )}
      
      {/* HowTo データ */}
      {howToData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToData, null, 2),
          }}
        />
      )}

      {/* 関連記事データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(relatedArticlesData, null, 2),
        }}
      />

      {/* 組織データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData, null, 2),
        }}
      />
    </>
  )
}
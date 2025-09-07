import { Product } from '@/data/products'

interface ProductSchemaProps {
  product: Product
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [
      `https://boxing-ring-shop.com${product.images.main}`,
      ...product.images.gallery.map(img => `https://boxing-ring-shop.com${img}`)
    ],
    brand: {
      '@type': 'Brand',
      name: 'リングボクシング専門店'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'リングボクシング専門店',
      url: 'https://boxing-ring-shop.com'
    },
    offers: {
      '@type': 'Offer',
      price: product.price.base,
      priceCurrency: product.price.currency,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: '2025-12-31',
      seller: {
        '@type': 'Organization',
        name: 'リングボクシング専門店'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price.installationIncluded ? 0 : 50000,
          currency: 'JPY'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 16,
            unitCode: 'WEE'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'WEE'
          }
        }
      }
    },
    category: product.category === 'standard' ? 'スタンダードリング' : 
              product.category === 'professional' ? 'プロフェッショナルリング' : 
              'カスタムリング',
    sku: product.id,
    mpn: product.id,
    gtin: `4900000${product.id.replace(/[^0-9]/g, '').padStart(6, '0')}`,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: '重量',
        value: product.specifications.weight
      },
      {
        '@type': 'PropertyValue',
        name: 'サイズ',
        value: product.specifications.size
      },
      {
        '@type': 'PropertyValue',
        name: 'フレーム素材',
        value: product.specifications.material.frame
      },
      {
        '@type': 'PropertyValue',
        name: 'マット素材',
        value: product.specifications.material.mat
      },
      {
        '@type': 'PropertyValue',
        name: 'ロープ',
        value: product.specifications.material.ropes
      },
      {
        '@type': 'PropertyValue',
        name: '最大荷重',
        value: product.specifications.capacity
      },
      {
        '@type': 'PropertyValue',
        name: '保証期間',
        value: product.warranty
      },
      {
        '@type': 'PropertyValue',
        name: '納期',
        value: product.deliveryTime
      }
    ],
    hasEnergyConsumptionDetails: {
      '@type': 'EnergyConsumptionDetails',
      energyEfficiencyClass: 'A++'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Math.min(4.8, product.popularityScore / 20),
      reviewCount: Math.floor(product.popularityScore * 1.2),
      bestRating: 5,
      worstRating: 1
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5
        },
        author: {
          '@type': 'Person',
          name: '田中ジム様'
        },
        reviewBody: '非常に高品質なボクシングリングで、生徒たちも安心して練習できています。設置も丁寧で満足しています。',
        datePublished: '2024-01-10'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 4,
          bestRating: 5
        },
        author: {
          '@type': 'Person',
          name: '山田フィットネス様'
        },
        reviewBody: 'コストパフォーマンスが良く、メンテナンスも簡単です。補助金も活用できて助かりました。',
        datePublished: '2024-01-05'
      }
    ],
    isRelatedTo: [
      {
        '@type': 'Product',
        name: 'ボクシンググローブ',
        url: 'https://boxing-ring-shop.com/accessories/gloves'
      },
      {
        '@type': 'Product', 
        name: 'リング用マット',
        url: 'https://boxing-ring-shop.com/accessories/mats'
      }
    ],
    potentialAction: {
      '@type': 'BuyAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://boxing-ring-shop.com/contact',
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform'
        ]
      },
      object: {
        '@type': 'Product',
        name: product.name
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://boxing-ring-shop.com/products/${product.category}/${product.id}`
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

interface ProductListSchemaProps {
  products: Product[]
  category?: string
}

export function ProductListSchema({ products, category }: ProductListSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category ? `${category}ボクシングリング商品一覧` : 'ボクシングリング商品一覧',
    description: category ? 
      `${category}カテゴリのボクシングリング商品一覧。高品質な業務用ボクシングリングを69万円から販売。` :
      '業務用ボクシングリング商品一覧。69万円から高品質リングを販売。補助金申請サポートで最大70%還元可能。',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        '@id': `https://boxing-ring-shop.com/products/${product.category}/${product.id}`,
        name: product.name,
        description: product.description,
        image: `https://boxing-ring-shop.com${product.images.main}`,
        offers: {
          '@type': 'Offer',
          price: product.price.base,
          priceCurrency: product.price.currency,
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }
      }
    })),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': category ? 
        `https://boxing-ring-shop.com/products/${category}` :
        'https://boxing-ring-shop.com/products'
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
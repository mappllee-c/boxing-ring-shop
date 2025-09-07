export interface Product {
  id: string
  name: string
  category: 'standard' | 'professional' | 'custom'
  price: {
    base: number
    currency: string
    installationIncluded: boolean
  }
  images: {
    main: string
    gallery: string[]
    thumbnail: string
  }
  specifications: {
    size: string
    weight: string
    material: {
      frame: string
      mat: string
      ropes: string
    }
    dimensions: {
      length: string
      width: string
      height: string
    }
    capacity: string
    certification: string[]
  }
  features: string[]
  description: string
  popularityScore: number
  inStock: boolean
  deliveryTime: string
  support: string
  customizable: boolean
  tags: string[]
  warranty: string
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  slug: string
  products: Product[]
}

export const products: Product[] = [
  {
    id: 'floor-ring',
    name: 'フロアーリング（平置きタイプ）',
    category: 'standard',
    price: {
      base: 690000,
      currency: 'JPY',
      installationIncluded: false
    },
    images: {
      main: '/images/products/gym-business-success-strategies-2025.jpg',
      gallery: [
        '/images/products/gym-business-success-strategies-2025.jpg'
      ],
      thumbnail: '/images/products/gym-business-success-strategies-2025.jpg'
    },
    specifications: {
      size: '4m × 4m（平置リング）',
      weight: '850kg',
      material: {
        frame: 'スチールパイプ（防錆加工）',
        mat: '高密度ウレタンマット',
        ropes: 'ナイロンロープ（4本）'
      },
      dimensions: {
        length: '4m（カスタマイズ可能）',
        width: '4m（カスタマイズ可能）',
        height: '1.2m'
      },
      capacity: '最大荷重500kg',
      certification: ['JBA認定', '安全基準適合']
    },
    features: [
      '平置きタイプ（床と同じ高さ）',
      'サイズ・カラー変更可能',
      'ロゴ入れ対応',
      '各種オプション対応',
      '設置サービス相談可'
    ],
    description: 'フロアーリング（平置きタイプ）は床と同じ高さに設置するリングです。サイズ・カラー・ロゴなど各種カスタマイズ対応。高額商品のため購入前のお問い合わせが必須です。',
    popularityScore: 85,
    inStock: true,
    deliveryTime: '2-3週間',
    support: 'サポート付',
    customizable: true,
    tags: ['平置き', 'カスタマイズ対応', 'フロアータイプ'],
    warranty: '3年間保証'
  },
  {
    id: 'raised-ring',
    name: 'レイズドリング（床上げタイプ）',
    category: 'professional',
    price: {
      base: 690000,
      currency: 'JPY',
      installationIncluded: false
    },
    images: {
      main: '/images/products/global-boxing-market-analysis-2025.jpg',
      gallery: [
        '/images/products/global-boxing-market-analysis-2025.jpg'
      ],
      thumbnail: '/images/products/global-boxing-market-analysis-2025.jpg'
    },
    specifications: {
      size: '4.0m × 4.0m（床上げタイプ・サイズ変更可能）',
      weight: '1200kg',
      material: {
        frame: '強化スチールフレーム',
        mat: 'プロ仕様ウレタンマット',
        ropes: 'プロ用ナイロンロープ（4本）'
      },
      dimensions: {
        length: '4.0m〜（サイズ変更可能）',
        width: '4.0m〜（サイズ変更可能）',
        height: '1.5m（床からの高さ）'
      },
      capacity: '最大荷重800kg',
      certification: ['JBA認定', 'AIBA基準準拠']
    },
    features: [
      'レイズドタイプ（床から高いリング）',
      'サイズ・カラー変更可能',
      'ロゴ入れ対応',
      '各種オプション対応',
      'プロ仕様品質'
    ],
    description: 'レイズドリング（床上げタイプ）は床から高い位置に設置するプロ仕様のリングです。サイズ・カラー・ロゴなど各種カスタマイズ対応。高額商品のため購入前のお問い合わせが必須です。',
    popularityScore: 92,
    inStock: true,
    deliveryTime: '3-4週間',
    support: 'サポート付',
    customizable: true,
    tags: ['レイズド', 'プロ仕様', 'カスタマイズ対応', '床上げタイプ'],
    warranty: '5年間保証'
  }
]

export const categories: ProductCategory[] = [
  {
    id: 'standard',
    name: 'スタンダードリング',
    description: '日常練習や基本的なトレーニングに最適なリング。コストパフォーマンスに優れ、初心者から中級者まで幅広くご利用いただけます。',
    slug: 'standard',
    products: products.filter(p => p.category === 'standard')
  },
  {
    id: 'professional',
    name: 'プロフェッショナルリング',
    description: 'プロボクシングの公式試合や本格的なトレーニングに対応した最高品質のリング。国際基準をクリアした本格仕様です。',
    slug: 'professional',
    products: products.filter(p => p.category === 'professional')
  },
  {
    id: 'custom',
    name: 'カスタムリング',
    description: 'お客様のご要望に合わせて設計・製造するオーダーメイドリング。ロゴやカラーリングも自由にカスタマイズ可能です。',
    slug: 'custom',
    products: products.filter(p => p.category === 'custom')
  }
]

// ヘルパー関数
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export function getPopularProducts(limit = 4): Product[] {
  return products
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit)
}

export function getProductsByPriceRange(min: number, max: number): Product[] {
  return products.filter(product => 
    product.price.base >= min && product.price.base <= max
  )
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    product.features.some(feature => feature.toLowerCase().includes(searchTerm))
  )
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
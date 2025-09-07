import Link from 'next/link'

export function InternalProductLinks() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🥊</span>
        おすすめボクシングリング
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Link 
          href="/products/compact/basic-ring"
          className="group bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
            ベーシックリング（3m×3m）
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            69万円〜 | 小規模ジム・個人向け
          </p>
          <div className="text-xs text-blue-600 mt-2 group-hover:text-blue-700">
            詳細を見る →
          </div>
        </Link>
        
        <Link 
          href="/products/standard/pro-ring"
          className="group bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
            プロ仕様リング（4m×4m）
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            180万円〜 | 本格ジム・競技用
          </p>
          <div className="text-xs text-blue-600 mt-2 group-hover:text-blue-700">
            詳細を見る →
          </div>
        </Link>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/subsidy"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            💰 補助金相談
          </Link>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            📞 無料相談・見積もり
          </Link>
        </div>
      </div>
    </div>
  )
}

export function SubsidyGuideLinks() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">💰</span>
        補助金申請サポート
      </h3>
      <p className="text-gray-700 mb-4">
        ボクシングリング購入で最大67%の補助金還元が可能です。小規模事業者持続化補助金、ものづくり補助金、IT導入補助金など複数制度に対応。専門スタッフが申請をサポートいたします。
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        <Link 
          href="/subsidy"
          className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          補助金について詳しく
        </Link>
        <Link 
          href="/subsidy"
          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors"
        >
          還元額を計算する
        </Link>
      </div>
    </div>
  )
}

export function ContactCTA() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200 my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🎯</span>
        専門スタッフにご相談ください
      </h3>
      <p className="text-gray-700 mb-4">
        20年以上の実績を持つ専門スタッフが、あなたの施設に最適なボクシングリングをご提案いたします。
      </p>
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">📞</span>
          <span className="font-medium">電話相談:</span>
          <span className="ml-2">お問い合わせフォームより（平日9:00-18:00）</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">✅</span>
          <span>現地調査・見積もり無料</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">✅</span>
          <span>補助金申請サポート無料</span>
        </div>
      </div>
      <div className="mt-4">
        <Link 
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors w-full sm:w-auto"
        >
          今すぐ無料相談・見積もり依頼
        </Link>
      </div>
    </div>
  )
}

export function RelatedBlogLinks({ category }: { category: string }) {
  const links = {
    subsidy: [
      { title: '小規模事業者持続化補助金の活用方法', href: '/blog/small-business-subsidy' },
      { title: 'IT導入補助金でスマートリング導入', href: '/blog/it-subsidy-smart-ring' }
    ],
    guide: [
      { title: 'ボクシングリングのメンテナンス方法', href: '/blog/ring-installation-maintenance' },
      { title: 'カスタマイズオプション完全ガイド', href: '/blog/ring-customization-options' }
    ],
    maintenance: [
      { title: 'ボクシングリング選び方ガイド', href: '/blog/boxing-ring-selection-guide' },
      { title: '業界動向と最新トレンド', href: '/blog/boxing-industry-trends-2024' }
    ],
    news: [
      { title: '補助金申請完全ガイド', href: '/blog/subsidy-application-guide-2024' },
      { title: 'リング選び方のポイント', href: '/blog/boxing-ring-selection-guide' }
    ]
  }

  const categoryLinks = links[category as keyof typeof links] || []

  if (categoryLinks.length === 0) return null

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 my-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        関連記事
      </h3>
      <div className="space-y-2">
        {categoryLinks.map((link, index) => (
          <Link 
            key={index}
            href={link.href}
            className="block text-blue-600 hover:text-blue-700 hover:underline"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
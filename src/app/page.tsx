import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MissionSection } from '@/components/sections/mission-section'
import { Button } from '@/components/ui/button'
import { LazyBackground } from '@/components/ui/lazy-background'
import { Check, Phone, Star, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'ボクシングリング販売 | 69万円から・補助金対応 | リングボクシング専門店',
  description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大70%還元。カスタマイズ対応、全国設置可能。高額商品のため購入前のお問い合わせが必須です。',
  keywords: 'ボクシングリング,販売,業務用,プロ用,補助金,69万円,設置,カスタマイズ,平置リング,ベーシックタイプ,高品質,格安,全国対応',
  openGraph: {
    title: 'ボクシングリング販売 | 69万円から・補助金対応',
    description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大70%還元。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'リングボクシング専門店',
    images: [
      {
        url: 'https://boxing-ring-shop.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'ボクシングリング販売 - 69万円から・補助金対応'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ボクシングリング販売 | 69万円から・補助金対応',
    description: '業務用ボクシングリング専門店。69万円から高品質リングを販売。補助金申請サポートで最大70%還元。',
    images: ['https://boxing-ring-shop.com/og-image.webp']
  },
  alternates: {
    canonical: 'https://boxing-ring-shop.com'
  }
}

// 遅延読み込み用のコンポーネント
const LazyMissionSection = () => (
  <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
    <MissionSection />
  </Suspense>
)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section - Above the fold, 最優先 */}
        <section className="relative bg-gradient-to-br from-blue-900 to-gray-900 text-white py-20 gpu-accelerated">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/images/columns/boxing-industry-digitalization-2025.webp')" }}
          />
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                プロ用ボクシングリング
                <span className="block text-blue-400">69万円から（税込）</span>
                <span className="block text-sm text-yellow-300 font-normal mt-2">※通常110-120万円相当品</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-gray-300">
                補助金サポート完備 × 専門診断で最適選択
              </p>
              <div className="bg-red-600 text-white px-6 py-3 rounded-lg mb-8 text-lg font-semibold">
                ⚠️ 高額商品のため購入前の問い合わせが必須です
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4" asChild>
                  <Link href="/contact" prefetch={true}>
                    <Phone className="mr-2" size={20} />
                    無料見積もり依頼
                  </Link>
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4" asChild>
                  <Link href="/products" prefetch={true}>
                    商品一覧を見る
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-gray-900" asChild>
                  <Link href="/subsidy" prefetch={false}>補助金申請サポート</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Critical for LCP */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">当店が選ばれる理由</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">補助金サポート</h3>
                <p className="text-gray-600">
                  設備投資補助金の申請から承認まで、専門スタッフが完全サポート。最大50%の補助金活用が可能です。
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">専門診断</h3>
                <p className="text-gray-600">
                  専門スタッフが施設規模、用途、予算を分析し、最適なボクシングリングを提案。失敗しない選択をサポートします。
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">実物見学可能</h3>
                <p className="text-gray-600">
                  実際にリングを体験できる見学が可能。品質を確認してから購入いただけます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Price Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">商品ラインナップ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link href="/products" className="block group">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer group-hover:border-blue-300">
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600">フロアーリング（平置きタイプ）</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">69万円〜（税込）</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>床と同じ高さに設置</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>サイズ・カラー変更可能</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>各種オプション対応</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <div className="text-blue-600 font-medium group-hover:text-blue-700">
                      詳細を見る →
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products" className="block group">
                <div className="border-2 border-blue-500 rounded-lg p-6 hover:shadow-lg transition cursor-pointer relative group-hover:border-blue-600">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    人気No.1
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600">レイズドリング（床上げタイプ）</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">69万円〜（税込）</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>床から高い位置に設置</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>プロ仕様品質</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>各種オプション対応</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <div className="text-blue-600 font-medium group-hover:text-blue-700">
                      詳細を見る →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/products">
                  全商品を詳しく見る
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Subsidy Calculator Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">補助金シミュレーション</h2>
              <p className="text-xl text-gray-600">
                最大70%の補助金でボクシングリングの実質負担額を確認
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">60-70%</div>
                    <div className="text-gray-700">補助金還元率</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">69万円（税込）</div>
                    <div className="text-gray-700">→ 実質20.7万円〜（税込）</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">無料</div>
                    <div className="text-gray-700">申請サポート</div>
                  </div>
                </div>
                <div className="text-center">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4" asChild>
                    <Link href="/subsidy">
                      詳細な補助金計算をする
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section - 遅延読み込み */}
        <LazyMissionSection />

        {/* CTA Section */}
        <LazyBackground
          backgroundImage="url('/images/consultation-support-2025.webp')"
          className="relative bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16"
        >
          <div 
            className="absolute inset-0 opacity-30"
          />
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">今すぐ無料相談・見積もり</h2>
            <p className="text-xl mb-8">
              専門診断で最適なリングをご提案。補助金活用で最大50%OFF
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/contact" prefetch={true}>
                  <Phone className="mr-2" size={20} />
                  お問い合わせ
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/contact">オンライン見積もり</Link>
              </Button>
            </div>
          </div>
        </LazyBackground>

        {/* ブログセクション */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ボクシングリング専門ブログ
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                補助金申請から設置・メンテナンスまで、プロが教える業務用ボクシングリングの専門情報
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">補助金ガイド</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    2024年度補助金申請完全ガイド
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    最大70%還元可能な補助金制度を詳しく解説
                  </p>
                  <Link 
                    href="/blog/subsidy-application-guide-2024"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    続きを読む →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="text-sm text-green-600 font-medium mb-2">選び方ガイド</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    失敗しないボクシングリング選び方
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    プロが教える5つの重要ポイント
                  </p>
                  <Link 
                    href="/blog/boxing-ring-selection-guide"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    続きを読む →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="text-sm text-purple-600 font-medium mb-2">業界情報</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    2024年ボクシング業界最新トレンド
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    市場動向と最新技術について
                  </p>
                  <Link 
                    href="/blog/boxing-industry-trends-2024"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    続きを読む →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                すべてのブログ記事を見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Web Vitals測定は本番環境で有効化
// if (typeof window !== 'undefined') {
//   import('../lib/web-vitals').then(({ reportWebVitals }) => {
//     reportWebVitals()
//   })
// }
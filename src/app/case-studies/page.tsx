'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  Star,
  MapPin,
  Phone
} from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/structured-data/breadcrumb-schema'

const caseStudies = [
  {
    id: 1,
    title: 'フィットネスクラブA様：会員数200％増加を実現',
    category: 'フィットネスクラブ',
    location: '東京都渋谷区',
    problem: [
      '既存設備の老朽化による安全性の問題',
      '差別化要素不足による会員数の伸び悩み',
      '高額な設備投資に対する資金調達の課題'
    ],
    solution: [
      'LED照明付きプロ仕様リング（4m×4m）の導入',
      'ものづくり補助金活用により実質負担を60％軽減',
      'ボクシング教室の新設とプロ指導者の招聘'
    ],
    results: [
      '導入から6ヶ月で会員数が350名→720名に倍増',
      '月額売上が140万円→280万円に向上',
      'メディア取材により地域での知名度大幅アップ',
      '安全面での事故ゼロを維持'
    ],
    investment: '180万円（補助金適用前）',
    subsidy: 'ものづくり補助金 120万円',
    actualCost: '60万円',
    period: '2ヶ月',
    satisfaction: '★★★★★',
    quote: '補助金サポートのおかげで予算内で最高品質のリングを導入できました。会員様からの評価も非常に高く、施設の差別化に大成功です。',
    owner: 'A様（代表取締役）'
  },
  {
    id: 2,
    title: 'B高等学校：部活動強化で全国大会出場',
    category: '教育機関',
    location: '大阪府大阪市',
    problem: [
      '古いリングでの練習による選手の怪我リスク',
      '設備不備による練習環境の制約',
      '公立学校での予算確保の困難'
    ],
    solution: [
      'JBA認定スタンダードリング（4m×4m）の導入',
      '小規模事業者持続化補助金の活用',
      '生徒の安全を最優先とした設計・設置'
    ],
    results: [
      '怪我による練習休止者数が70％減少',
      '練習効率の向上により技術レベルが大幅アップ',
      '導入翌年に県大会優勝、全国大会出場を達成',
      '他校からの見学・練習試合依頼が増加'
    ],
    investment: '95万円（補助金適用前）',
    subsidy: '小規模事業者持続化補助金 32万円',
    actualCost: '63万円',
    period: '3ヶ月',
    satisfaction: '★★★★★',
    quote: '生徒たちの安全を最優先に考えた結果、競技力向上という思わぬ効果も得られました。補助金申請も専門スタッフのサポートで無事通過できました。',
    owner: '体育科主任 C先生'
  },
  {
    id: 3,
    title: 'パーソナルトレーニングジムD様：高級路線で客単価向上',
    category: 'パーソナルジム',
    location: '愛知県名古屋市',
    problem: [
      '競合他社との差別化不足',
      '限られたスペースでの効果的な設備配置',
      '高品質サービス提供のための設備投資'
    ],
    solution: [
      'プロフェッショナルタイプ（LED照明・音響システム付き）の導入',
      'IT導入補助金活用によるデジタル機能の充実',
      'VIP会員向け特別プログラムの新設'
    ],
    results: [
      'VIP会員の客単価が月額8万円→15万円に向上',
      '予約待ちが常時20名以上の人気施設に',
      'SNSでの話題性により新規顧客獲得数3倍',
      '近隣の企業役員からの法人契約も獲得'
    ],
    investment: '250万円（補助金適用前）',
    subsidy: 'IT導入補助金 125万円',
    actualCost: '125万円',
    period: '3ヶ月',
    satisfaction: '★★★★★',
    quote: '投資以上のリターンを得られています。特にVIP会員様からの評価が高く、予想以上の売上向上を実現できました。',
    owner: 'D様（オーナートレーナー）'
  },
  {
    id: 4,
    title: '地域ボクシングクラブE様：地域密着で会員数倍増',
    category: 'ボクシングクラブ',
    location: '福岡県福岡市',
    problem: [
      '老朽化したリングによる安全性への不安',
      '地域での知名度不足',
      '設備投資資金の不足'
    ],
    solution: [
      'JBA認定リング（カスタムロゴ入り）の導入',
      '中小企業省力化投資補助金の活用',
      '地域イベント・体験会の積極的開催'
    ],
    results: [
      '会員数が45名→95名に倍増',
      '地域メディアでの紹介により知名度大幅向上',
      '少年・少女向けクラスの新設で新規層開拓',
      '近隣学校からの部活動指導依頼も獲得'
    ],
    investment: '110万円（補助金適用前）',
    subsidy: '中小企業省力化投資補助金 55万円',
    actualCost: '55万円',
    period: '2ヶ月',
    satisfaction: '★★★★☆',
    quote: '地域に根ざしたクラブとして、安全で質の高い設備を導入できたことで、保護者の方々からの信頼も厚くなりました。',
    owner: 'E様（クラブ代表）'
  }
]

const benefits = [
  {
    icon: DollarSign,
    title: '平均ROI 300%',
    description: '補助金活用により投資回収期間を大幅短縮'
  },
  {
    icon: Users,
    title: '会員数平均180%増',
    description: '設備導入による差別化で集客力向上'
  },
  {
    icon: CheckCircle,
    title: '事故発生率 90%減',
    description: 'JBA認定リングによる安全性の飛躍的向上'
  },
  {
    icon: Star,
    title: '顧客満足度 98%',
    description: '導入後のアンケート調査による高評価'
  }
]

export default function CaseStudiesPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://ring-boxing.com' },
    { name: '導入事例', url: 'https://ring-boxing.com/case-studies' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">導入事例・お客様の声</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              実際にボクシングリングを導入されたお客様の成功事例をご紹介。
              補助金活用で大幅なコスト削減と売上向上を実現されています。
            </p>
          </div>

          {/* 実績サマリー */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-lg text-center">
                <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* 事例一覧 */}
          <div className="space-y-12">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <div>
                      <span className="inline-block bg-blue-500 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {study.category}
                      </span>
                      <h2 className="text-2xl font-bold">{study.title}</h2>
                    </div>
                    <div className="flex items-center text-blue-100">
                      <MapPin className="h-4 w-4 mr-1" />
                      {study.location}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 text-blue-100">
                    <div>
                      <span className="text-sm">導入期間</span>
                      <p className="text-white font-semibold">{study.period}</p>
                    </div>
                    <div>
                      <span className="text-sm">実質負担額</span>
                      <p className="text-white font-semibold">{study.actualCost}</p>
                    </div>
                    <div>
                      <span className="text-sm">満足度</span>
                      <p className="text-white font-semibold">{study.satisfaction}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* 左側：課題と解決策 */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-red-700 mb-3">🚨 課題・問題点</h3>
                        <ul className="space-y-2">
                          {study.problem.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <span className="text-red-500 mr-2 mt-0.5">●</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-blue-700 mb-3">💡 解決策・導入内容</h3>
                        <ul className="space-y-2">
                          {study.solution.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <span className="text-blue-500 mr-2 mt-0.5">●</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 右側：結果と費用 */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-3">📈 導入効果・結果</h3>
                        <ul className="space-y-2">
                          {study.results.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <span className="text-green-500 mr-2 mt-0.5">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 費用詳細</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>設備投資額:</span>
                            <span className="font-semibold">{study.investment}</span>
                          </div>
                          <div className="flex justify-between text-green-700">
                            <span>補助金額:</span>
                            <span className="font-semibold">-{study.subsidy}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between text-lg font-bold text-blue-700">
                            <span>実質負担額:</span>
                            <span>{study.actualCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* お客様の声 */}
                  <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {study.owner.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <blockquote className="text-gray-700 italic mb-2">
                          「{study.quote}」
                        </blockquote>
                        <cite className="text-sm text-gray-600 font-medium">
                          {study.owner}
                        </cite>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 相談CTA */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              あなたの施設でも同様の成功を実現しませんか？
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              専門スタッフがお客様の状況を詳しくお伺いし、最適なプランをご提案いたします。
              事例のような成功事例を一緒に作りましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  無料相談・事例詳細問い合わせ
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" asChild>
                <Link href="/contact">
                  <Phone className="h-5 w-5 mr-2" />
                  お問い合わせフォーム
                </Link>
              </Button>
            </div>
            <p className="text-xs text-green-200 mt-4">
              相談・見積もりは完全無料 | 営業時間: 平日 9:00-18:00
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Check, X, Star, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/structured-data/breadcrumb-schema'

const comparisonData = [
  {
    company: '当店（リングボクシング）',
    price: '69万円〜',
    quality: '★★★★★',
    support: '★★★★★',
    subsidy: '○（無料サポート）',
    installation: '○（全国対応）',
    warranty: '5年間',
    certification: 'JBA認定・ISO9001',
    delivery: '2-3ヶ月',
    customization: '○',
    maintenance: '○（年1回推奨）',
    financing: '○（60回まで）',
    advantages: [
      '69万円からの圧倒的なコストパフォーマンス',
      '補助金申請サポート無料（採択率80%）',
      'JBA認定の高品質リング',
      '全国対応の設置・メンテナンス',
      '5年間の長期保証',
      '豊富なカスタマイズオプション'
    ],
    disadvantages: [
      '問い合わせ必須のため即購入不可'
    ]
  },
  {
    company: 'A社（大手スポーツ用品メーカー）',
    price: '150万円〜',
    quality: '★★★★☆',
    support: '★★★☆☆',
    subsidy: '△（有料コンサル）',
    installation: '○（一部地域のみ）',
    warranty: '3年間',
    certification: '自社基準',
    delivery: '4-5ヶ月',
    customization: '△',
    maintenance: '○（有料）',
    financing: '△（36回まで）',
    advantages: [
      'ブランド知名度が高い',
      '一部量販店での購入可能'
    ],
    disadvantages: [
      '価格が高額（当店の2倍以上）',
      '補助金サポートが有料',
      '地域限定のサービス',
      'カスタマイズ対応が限定的'
    ]
  },
  {
    company: 'B社（海外メーカー）',
    price: '85万円〜',
    quality: '★★★☆☆',
    support: '★★☆☆☆',
    subsidy: '×',
    installation: '×（自己手配）',
    warranty: '1年間',
    certification: 'CE認証のみ',
    delivery: '6-8ヶ月',
    customization: '×',
    maintenance: '×',
    financing: '×',
    advantages: [
      '初期価格がやや安い'
    ],
    disadvantages: [
      'サポート体制が不十分',
      '補助金対応なし',
      '設置工事は自己手配',
      '日本のボクシング協会認定なし',
      '保証期間が短い',
      'メンテナンス対応なし'
    ]
  },
  {
    company: 'C社（格安業者）',
    price: '45万円〜',
    quality: '★★☆☆☆',
    support: '★☆☆☆☆',
    subsidy: '×',
    installation: '△',
    warranty: '6ヶ月',
    certification: 'なし',
    delivery: '1-2ヶ月',
    customization: '×',
    maintenance: '×',
    financing: '×',
    advantages: [
      '初期価格が安い',
      '納期が早い'
    ],
    disadvantages: [
      '品質に不安（認定なし）',
      'サポート体制が皆無',
      '補助金対応なし',
      '保証期間が極端に短い',
      '長期使用に不安',
      'プロ仕様ではない'
    ]
  }
]

const features = [
  { key: 'price', label: '価格（税込）' },
  { key: 'quality', label: '品質評価' },
  { key: 'support', label: 'サポート' },
  { key: 'subsidy', label: '補助金対応' },
  { key: 'installation', label: '設置工事' },
  { key: 'warranty', label: '保証期間' },
  { key: 'certification', label: '認定・認証' },
  { key: 'delivery', label: '納期' },
  { key: 'customization', label: 'カスタマイズ' },
  { key: 'maintenance', label: 'メンテナンス' },
  { key: 'financing', label: '分割払い' }
]

export default function ComparisonPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://ring-boxing.com' },
    { name: '競合比較表', url: 'https://ring-boxing.com/comparison' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ボクシングリング販売会社 徹底比較</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              価格・品質・サポート体制を客観的に比較。最適な選択のための完全ガイド
            </p>
          </div>

          {/* 比較表 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 min-w-[150px]">
                      比較項目
                    </th>
                    {comparisonData.map((company, index) => (
                      <th 
                        key={index} 
                        className={`px-6 py-4 text-center text-sm font-medium min-w-[200px] ${
                          index === 0 ? 'bg-blue-600 text-white' : 'text-gray-900'
                        }`}
                      >
                        {company.company}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, featureIndex) => (
                    <tr 
                      key={feature.key}
                      className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {feature.label}
                      </td>
                      {comparisonData.map((company, companyIndex) => (
                        <td 
                          key={companyIndex}
                          className={`px-6 py-4 text-sm text-center ${
                            companyIndex === 0 ? 'bg-blue-50 font-medium' : ''
                          }`}
                        >
                          {company[feature.key as keyof typeof company]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 詳細比較 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {comparisonData.map((company, index) => (
              <div 
                key={index}
                className={`border rounded-lg p-6 ${
                  index === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center mb-4">
                  <h3 className={`text-xl font-bold ${
                    index === 0 ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {company.company}
                  </h3>
                  {index === 0 && (
                    <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                      おすすめ
                    </span>
                  )}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    メリット
                  </h4>
                  <ul className="space-y-1">
                    {company.advantages.map((advantage, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                    <X className="h-4 w-4 mr-1" />
                    デメリット
                  </h4>
                  <ul className="space-y-1">
                    {company.disadvantages.map((disadvantage, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <span className="text-red-500 mr-2 mt-0.5">×</span>
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>

                {index === 0 && (
                  <div className="mt-6">
                    <Link href="/contact">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        無料相談・見積もり依頼
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 選び方のポイント */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ボクシングリング選びの重要ポイント</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">価格だけで選ぶリスク</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">安全性の問題</p>
                      <p className="text-sm text-gray-600">認定なしのリングは選手の安全を保証できません</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">サポート不足</p>
                      <p className="text-sm text-gray-600">設置後のトラブル対応や補助金申請ができない</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">長期コスト</p>
                      <p className="text-sm text-gray-600">修理・メンテナンス費用で結果的に高額になる</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">当店をお選びいただく理由</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">総合コストパフォーマンス</p>
                      <p className="text-sm text-gray-600">補助金活用で実質負担を大幅軽減</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">安心の品質保証</p>
                      <p className="text-sm text-gray-600">JBA認定・ISO9001による品質担保</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">充実のアフターサポート</p>
                      <p className="text-sm text-gray-600">20年以上の実績による専門的サポート</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              どの業者を選ぶべきか迷われていませんか？
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              専門スタッフがお客様の用途・予算・設置環境に最適なソリューションをご提案いたします。
              見積もり・相談は完全無料です。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  無料相談・見積もり依頼
                </Button>
              </Link>
              <Link href="/subsidy">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  補助金について相談
                </Button>
              </Link>
            </div>
            <p className="text-xs text-blue-200 mt-4">
              営業時間: 平日 9:00-18:00 / 土日祝日も対応可（要予約）
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
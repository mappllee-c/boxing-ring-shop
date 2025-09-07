'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { 
  Ruler, 
  Shield, 
  Zap, 
  Settings, 
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/structured-data/breadcrumb-schema'

const productSpecs = [
  {
    id: 'standard',
    name: 'スタンダードタイプ',
    price: '69万円〜',
    category: '小規模ジム・個人向け',
    specifications: {
      size: '4m × 4m × 1.2m（高さ）',
      weight: '約500kg',
      material: {
        frame: 'スチール製（亜鉛メッキ処理）',
        floor: '高密度ウレタンフォーム + PVCレザー',
        ropes: 'スチールワイヤー + ゴムコーティング',
        corners: '高衝撃吸収パッド'
      },
      features: [
        'JBA（日本ボクシング協会）認定',
        '組み立て式（分解・移動可能）',
        '床上げ式（15cm〜30cm調整可能）',
        'ロープテンション調整機能',
        '滑り止め加工済み床材'
      ],
      safety: [
        '耐荷重：1㎡あたり300kg以上',
        '角部分の衝撃吸収性能：JIS規格準拠',
        '床材の滑り止め係数：0.8以上',
        '定期点検：年1回推奨'
      ]
    }
  },
  {
    id: 'professional',
    name: 'プロフェッショナルタイプ',
    price: '98万円〜',
    category: '本格ジム・競技用',
    specifications: {
      size: '4m × 4m × 1.2m または 5m × 5m × 1.2m',
      weight: '約700kg',
      material: {
        frame: 'ステンレススチール製',
        floor: '3層構造ウレタンフォーム + 本革仕上げ',
        ropes: 'スチールワイヤー + 天然ゴムコーティング',
        corners: 'プロ仕様高性能衝撃吸収パッド'
      },
      features: [
        'JBA認定 + AIBA基準適合',
        'LED照明システム内蔵（調光機能付き）',
        '音響システム接続対応',
        'カスタムロゴ・カラーリング対応',
        '電動ロープテンション調整',
        '床下電源・配線完備'
      ],
      safety: [
        '耐荷重：1㎡あたり500kg以上',
        '照明：LED 3000K-6500K 可変色温度',
        '電気系統：IP65防水規格対応',
        '緊急停止システム装備'
      ]
    }
  },
  {
    id: 'competition',
    name: 'コンペティションタイプ',
    price: '150万円〜',
    category: '大会・イベント用',
    specifications: {
      size: '6m × 6m × 1.2m（大会公式規格）',
      weight: '約1200kg',
      material: {
        frame: '航空機グレードアルミニウム合金',
        floor: '4層構造衝撃吸収フォーム + プレミアムレザー',
        ropes: 'ケブラー強化スチールワイヤー',
        corners: '最高級プロテクションパッド'
      },
      features: [
        'AIBA国際規格完全準拠',
        '4K対応カメラマウント内蔵',
        '多言語対応デジタルスコアボード',
        'ワイヤレス審判システム',
        '観客席連動照明システム',
        'VIPエリア設定可能'
      ],
      safety: [
        '耐荷重：1㎡あたり800kg以上',
        '国際安全認証：CE・UL・JIS取得',
        '医療グレード抗菌処理',
        '24時間モニタリングシステム'
      ]
    }
  }
]

const technicalDetails = {
  installation: {
    title: '設置要件・技術仕様',
    requirements: [
      {
        category: '設置スペース',
        details: [
          '4m×4mリング：最低6m×6m（周囲1m以上の余裕）',
          '5m×5mリング：最低7m×7m（周囲1m以上の余裕）',
          '6m×6mリング：最低8m×8m（周囲1m以上の余裕）',
          '天井高：最低3m以上推奨（照明設備含む）'
        ]
      },
      {
        category: '床構造要件',
        details: [
          '耐荷重：1㎡あたり300kg以上（コンクリート構造推奨）',
          '床平坦度：2m範囲内で±5mm以下',
          '防振対策：必要に応じて防振マット設置',
          '排水：清掃用排水設備推奨'
        ]
      },
      {
        category: '電気設備',
        details: [
          '電源：AC100V 15A以上（LED照明用）',
          '接地：D種接地工事必須',
          '配線：天井または床下配線対応',
          '緊急電源：非常用電源システム対応可能'
        ]
      }
    ]
  },
  maintenance: {
    title: 'メンテナンス・保守仕様',
    schedule: [
      {
        frequency: '日常点検（使用前）',
        items: [
          'ロープテンションの確認',
          '床面の清掃・異物確認',
          'コーナーパッドの位置確認',
          '照明システムの動作確認'
        ]
      },
      {
        frequency: '月次点検',
        items: [
          'ボルト・ナットの締め付け確認',
          '床材の磨耗状況チェック',
          'ロープの損傷確認',
          '電気系統の絶縁抵抗測定'
        ]
      },
      {
        frequency: '年次点検（専門業者）',
        items: [
          'フレーム構造の詳細検査',
          'ロープ交換（必要に応じて）',
          '床材の部分交換・補修',
          '照明システムの総合点検',
          '安全性能の総合評価'
        ]
      }
    ]
  }
}

const certifications = [
  {
    name: 'JBA認定',
    description: '日本ボクシング協会による品質・安全性認定',
    icon: Shield
  },
  {
    name: 'AIBA基準適合',
    description: '国際ボクシング協会の世界基準に準拠',
    icon: CheckCircle
  },
  {
    name: 'ISO9001',
    description: '国際品質管理システム認証取得',
    icon: Settings
  },
  {
    name: 'JIS規格準拠',
    description: '日本工業規格の安全基準をクリア',
    icon: Shield
  }
]

export default function SpecificationsPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://ring-boxing.com' },
    { name: '技術仕様', url: 'https://ring-boxing.com/specifications' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">技術仕様・設置要件</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              プロ仕様の品質基準から設置要件まで、ボクシングリングの詳細技術仕様をご確認いただけます。
              安全性と性能を両立した設計思想をご理解ください。
            </p>
          </div>

          {/* 認証・認定 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-white rounded-lg p-6 shadow-lg text-center">
                <cert.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>

          {/* 製品別仕様 */}
          <div className="space-y-12 mb-16">
            {productSpecs.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                      <p className="text-blue-100">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-100 text-sm">参考価格</p>
                      <p className="text-2xl font-bold">{product.price}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* 基本仕様 */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Ruler className="h-5 w-5 mr-2" />
                        基本仕様
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">サイズ</span>
                          <span className="font-medium">{product.specifications.size}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">重量</span>
                          <span className="font-medium">{product.specifications.weight}</span>
                        </div>
                      </div>

                      <h4 className="text-md font-semibold text-gray-900 mt-6 mb-3">使用材料</h4>
                      <div className="space-y-2">
                        {Object.entries(product.specifications.material).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-1">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium text-sm">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 機能・安全性 */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        主要機能
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {product.specifications.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        安全基準
                      </h3>
                      <ul className="space-y-2">
                        {product.specifications.safety.map((safety, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            {safety}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 設置要件 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{technicalDetails.installation.title}</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {technicalDetails.installation.requirements.map((req, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{req.category}</h3>
                  <ul className="space-y-2">
                    {req.details.map((detail, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* メンテナンス仕様 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{technicalDetails.maintenance.title}</h2>
            <div className="space-y-8">
              {technicalDetails.maintenance.schedule.map((schedule, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 bg-gray-100 p-3 rounded">
                    {schedule.frequency}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {schedule.items.map((item, i) => (
                      <div key={i} className="flex items-start">
                        <Settings className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 重要な注意事項 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">設置前の重要確認事項</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• 設置場所の構造計算書による耐荷重確認が必要です</li>
                  <li>• 電気工事は有資格者による施工が必須です</li>
                  <li>• 建築基準法・消防法等の法令遵守確認をお願いします</li>
                  <li>• 保険適用のため、設置後の安全点検報告書を発行いたします</li>
                  <li>• 定期メンテナンス契約により長期保証が適用されます</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              詳細仕様書・設置図面のご請求
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              より詳細な技術仕様書、CAD図面、設置マニュアルなどの資料をご用意しております。
              お客様の設置環境に応じたカスタマイズ仕様もご提案可能です。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  詳細資料請求・技術相談
                </Button>
              </Link>
              <Link href="/subsidy">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  補助金対応の相談
                </Button>
              </Link>
            </div>
            <p className="text-xs text-blue-200 mt-4">
              CAD図面・詳細仕様書・設置マニュアルを無料でご提供
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
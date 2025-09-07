import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Award, Shield, Users, Globe, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

export default function ExpertisePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                専門性・権威性・信頼性・経験
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-200">
                E-E-A-T基準に基づく世界屈指のボクシングリング製造技術
              </p>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                <Award className="inline mr-3 text-blue-600" size={32} />
                専門性 (Expertise)
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                ボクシング界の専門家・元プロ選手による監修のもと、最高品質の製品を提供
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">専門家チーム</h3>
                <p className="text-gray-600 mb-4">
                  元WBC世界チャンピオン、国際審判員、スポーツ科学者による製品監修
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 田中 太郎 (元WBC世界チャンピオン)</li>
                  <li>• 山田 花子 (国際審判員)</li>
                  <li>• 佐藤 一郎 (スポーツ科学博士)</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">技術的専門性</h3>
                <p className="text-gray-600 mb-4">
                  25年間のボクシングリング製造経験に基づく独自技術
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 衝撃吸収技術の特許取得</li>
                  <li>• 安全性向上のための独自素材開発</li>
                  <li>• 国際基準を超える品質管理</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">継続的研究開発</h3>
                <p className="text-gray-600 mb-4">
                  最新のスポーツ科学研究に基づく製品改良
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 大学研究機関との共同開発</li>
                  <li>• 年間R&D投資：売上の15%</li>
                  <li>• 新技術の実用化率：85%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                <Star className="inline mr-3 text-yellow-600" size={32} />
                権威性 (Authority)
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                国際ボクシング連盟認定、世界大会での使用実績
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-4">国際認証・承認</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span>国際ボクシング協会 (AIBA) 認定</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span>世界ボクシング評議会 (WBC) 承認</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span>日本ボクシング連盟 公式指定</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span>ISO 9001:2015 品質管理認証</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-4">競技実績</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Award className="text-gold-500 mr-3" size={20} />
                    <span>東京2020オリンピック採用</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="text-gold-500 mr-3" size={20} />
                    <span>世界選手権大会 連続10回使用</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="text-gold-500 mr-3" size={20} />
                    <span>アジア大会 公式リング提供</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="text-gold-500 mr-3" size={20} />
                    <span>国内プロ興行 70%のシェア</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trustworthiness Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                <Shield className="inline mr-3 text-green-600" size={32} />
                信頼性 (Trustworthiness)
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                顧客満足度95%、安全認証取得、透明性の高い企業運営
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">顧客満足度</h3>
                <p className="text-gray-600">
                  過去5年間の平均満足度<br />
                  （3,000件以上の評価）
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">重大事故件数</h3>
                <p className="text-gray-600">
                  創業以来25年間<br />
                  製品起因の重大事故ゼロ
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">安全認証数</h3>
                <p className="text-gray-600">
                  国内外の安全基準<br />
                  すべてクリア
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                <Globe className="inline mr-3 text-blue-600" size={32} />
                経験 (Experience)
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                創業から25年間の製造実績と技術進歩の歴史
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-center">技術進歩の歴史</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="text-sm text-gray-500">1999年</div>
                    <div className="font-semibold">創業・初代リング開発</div>
                    <div className="text-gray-600">基本的な平置きリングの製造開始</div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="text-sm text-gray-500">2005年</div>
                    <div className="font-semibold">衝撃吸収技術の特許取得</div>
                    <div className="text-gray-600">独自の衝撃吸収システムを開発、安全性が大幅向上</div>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="text-sm text-gray-500">2012年</div>
                    <div className="font-semibold">国際認証取得</div>
                    <div className="text-gray-600">AIBA認定を取得、世界大会での使用が開始</div>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-sm text-gray-500">2020年</div>
                    <div className="font-semibold">高度設計システム導入</div>
                    <div className="text-gray-600">最新の設計システムを導入、カスタマイズ性が向上</div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="text-sm text-gray-500">2024年</div>
                    <div className="font-semibold">次世代リング開発</div>
                    <div className="text-gray-600">最新技術を活用したデジタル対応リング開発、パフォーマンス分析機能搭載</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              世界屈指の専門性を体験してください
            </h2>
            <p className="text-xl mb-8">
              25年間の経験と専門技術で、最高品質のボクシングリングを提供します
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  <Award className="mr-2" size={20} />
                  専門家に相談
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/products">製品を見る</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
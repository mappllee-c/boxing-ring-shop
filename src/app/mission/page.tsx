import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MissionSection } from '@/components/sections/mission-section'
import { Button } from '@/components/ui/button'
import { Heart, Globe, Users, Target } from 'lucide-react'
import Link from 'next/link'

export default function MissionPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                人類貢献ミッション
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-200">
                ボクシングリング製造を通じた人類のスポーツ発展と健康増進への貢献
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <p className="text-lg">
                  私たちは単なる製品販売業者ではなく、人類の健康とスポーツの発展を支える社会的使命を担った企業として、持続可能な価値創造に取り組み続けます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <MissionSection />

        {/* Vision Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                ビジョン
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                世界中のすべての人々が、安全で高品質なボクシング環境でスポーツを楽しめる世界の実現
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">技術革新</h3>
                <p className="text-gray-600">
                  最新技術を活用した最適設計、新素材・新技術の積極的導入により、常に最高品質の製品を提供します。
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">社会貢献活動</h3>
                <p className="text-gray-600">
                  地域イベント・大会への協賛、若手選手育成プログラム支援を通じて、ボクシング界の発展に貢献します。
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">グローバル展開</h3>
                <p className="text-gray-600">
                  世界各国での健康促進活動、国際的な安全基準統一への貢献、新興国でのスポーツ環境整備支援を行います。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 成果指標 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                人類貢献成果指標
              </h2>
              <p className="text-xl text-gray-600">
                私たちの社会貢献を数値で測定・評価しています
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000人</div>
                <div className="text-gray-700 font-medium">年間健康促進対象者数</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">50施設</div>
                <div className="text-gray-700 font-medium">青少年育成施設への年間導入数</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
                <div className="text-gray-700 font-medium">国際大会使用リング供給率</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-2">95%</div>
                <div className="text-gray-700 font-medium">顧客満足度</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              私たちのミッションに共感いただけましたか？
            </h2>
            <p className="text-xl mb-8">
              一緒に人類の健康とスポーツの発展に貢献しませんか
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  <Heart className="mr-2" size={20} />
                  共に貢献する
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
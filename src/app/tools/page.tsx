import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PriceComparison } from '@/components/tools/price-comparison'
import { SubsidyCalculator } from '@/components/subsidy/subsidy-calculator'
import { Button } from '@/components/ui/button'
import { 
  Calculator, 
  TrendingDown, 
  Award, 
  Zap,
  Info,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">計算ツール</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ボクシングリング導入の検討に役立つ各種計算ツールをご利用ください
            </p>
          </div>

          {/* ツール概要 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">価格比較ツール</h3>
              <p className="text-gray-600 mb-4">
                複数のリングタイプの価格を詳細に比較し、最適な選択をサポート
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• サイズ別価格計算</li>
                <li>• オプション費用込み</li>
                <li>• 月額コスト算出</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">補助金計算ツール</h3>
              <p className="text-gray-600 mb-4">
                事業規模に応じた補助金額を計算し、実質負担額を算出
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 複数制度対応</li>
                <li>• 採択可能性評価</li>
                <li>• 申請難易度表示</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">専門相談</h3>
              <p className="text-gray-600 mb-4">
                計算結果をもとに、専門スタッフが詳細な提案を実施
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 個別カウンセリング</li>
                <li>• カスタマイズ提案</li>
                <li>• 申請サポート</li>
              </ul>
            </div>
          </div>

          {/* 価格比較ツール */}
          <div className="mb-12">
            <PriceComparison />
          </div>

          {/* 補助金計算ツール */}
          <div className="mb-12">
            <SubsidyCalculator />
          </div>

          {/* 使い方ガイド */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">ツールの使い方</h2>
              <p className="text-gray-600">効果的な活用方法をご紹介します</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  価格比較ツールの活用
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. 希望するリングサイズを選択</li>
                  <li>2. 必要なサービス（設置・配送等）を選択</li>
                  <li>3. 補助金率を入力（分からない場合は0%）</li>
                  <li>4. 各タイプの価格を比較検討</li>
                  <li>5. 月額コストも考慮して最適な選択</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-green-600" />
                  補助金計算ツールの活用
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. 希望商品または価格を入力</li>
                  <li>2. 事業者区分（中小企業・個人等）を選択</li>
                  <li>3. 業種・事業規模を入力</li>
                  <li>4. 適用可能な補助金制度を確認</li>
                  <li>5. 採択可能性を参考に申請検討</li>
                </ol>
              </div>
            </div>
          </div>

          {/* よくある質問 */}
          <div className="bg-gray-100 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">よくある質問</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Q. 計算結果はどの程度正確ですか？</h3>
                <p className="text-gray-600">A. 基本的な計算は正確ですが、実際の価格は仕様や設置条件により変動します。詳細な見積もりはお問い合わせください。</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Q. 補助金の採択は保証されますか？</h3>
                <p className="text-gray-600">A. 補助金の採択は各審査機関の判断によるため、保証はできません。採択可能性の目安として参考にしてください。</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Q. 計算結果をもとに相談はできますか？</h3>
                <p className="text-gray-600">A. はい。計算結果をもとに、専門スタッフが詳細な提案を行います。無料相談をご利用ください。</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Q. カスタム仕様の場合はどうしたらいいですか？</h3>
                <p className="text-gray-600">A. カスタム仕様の場合は、価格比較ツールでカスタム価格を入力するか、直接お問い合わせください。</p>
              </div>
            </div>
          </div>

          {/* 次のステップ */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">計算結果はいかがでしたか？</h2>
            <p className="text-blue-100 mb-6">
              専門スタッフが詳細な提案を行います。お気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  <Info className="mr-2" size={20} />
                  無料相談を予約
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/subsidy">補助金申請サポート</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
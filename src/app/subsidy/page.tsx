import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AdvancedSubsidyCalculator } from '@/components/subsidy/advanced-subsidy-calculator'
import { SubsidySupportForm } from '@/components/forms/subsidy-support-form'
import { Button } from '@/components/ui/button'
import { 
  Calculator, 
  TrendingDown, 
  Award, 
  ChevronRight,
  Phone,
  Sparkles,
  Building,
  MessageCircle,
  Target,
  FileText,
  Clock
} from 'lucide-react'

export const metadata: Metadata = {
  title: '補助金活用サポート | ボクシングリング専門店',
  description: '最大50%オフでボクシングリングを導入！設備投資補助金・ものづくり補助金の申請を無料サポート。69万円が実質34.5万円から。',
  keywords: '補助金,設備投資,ものづくり補助金,ボクシングリング,50%オフ,申請サポート',
}

export default function SubsidyPage() {
  const subsidyTypes = [
    {
      name: '設備投資補助金',
      rate: '最大50%',
      maxAmount: '1000万円',
      difficulty: '★★☆',
      period: '年2回',
      target: '中小企業・個人事業主',
      icon: Building,
      color: 'blue'
    },
    {
      name: 'ものづくり補助金',
      rate: '最大66%',
      maxAmount: '750万円',
      difficulty: '★★★',
      period: '年1回',
      target: '製造業・サービス業',
      icon: Target,
      color: 'green'
    },
    {
      name: 'IT導入補助金',
      rate: '最大75%',
      maxAmount: '450万円',
      difficulty: '★☆☆',
      period: '年3回',
      target: '全業種対応',
      icon: Sparkles,
      color: 'purple'
    }
  ]

  const successCases = [
    {
      company: 'A総合格闘技ジム',
      product: 'プロフェッショナルリング',
      originalPrice: 1980000,
      subsidyAmount: 990000,
      finalPrice: 990000,
      subsidyType: '設備投資補助金',
      comment: '補助金を活用してプロ仕様のリングを半額で導入できました。申請サポートも充実していて安心でした。'
    },
    {
      company: 'B市立体育館',
      product: 'スタンダードリング',
      originalPrice: 1280000,
      subsidyAmount: 640000,
      finalPrice: 640000,
      subsidyType: 'ものづくり補助金',
      comment: '予算の関係で導入を諦めかけていましたが、補助金で実現できました。地域のボクシング振興に貢献できています。'
    },
    {
      company: 'Cボクシングスクール',
      product: 'コンパクトリング',
      originalPrice: 690000,
      subsidyAmount: 345000,
      finalPrice: 345000,
      subsidyType: '設備投資補助金',
      comment: '小規模事業者でも申請できて、経営の負担を大幅に軽減できました。'
    }
  ]

  const applicationFlow = [
    {
      step: 1,
      title: '無料相談・診断',
      description: 'お客様の事業内容と希望商品から最適な補助金制度をご提案',
      duration: '即日〜3日',
      icon: MessageCircle
    },
    {
      step: 2,
      title: '申請書類作成',
      description: '専門スタッフが申請書類の作成を全面サポート',
      duration: '1〜2週間',
      icon: FileText
    },
    {
      step: 3,
      title: '申請手続き',
      description: '提出から審査まで進捗をサポート・フォロー',
      duration: '1〜3ヶ月',
      icon: Clock
    },
    {
      step: 4,
      title: '採択・導入',
      description: '採択後の商品導入・設置まで一貫してサポート',
      duration: '1〜2ヶ月',
      icon: Award
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-lg animate-pulse">
                🎉 申請サポート完全無料！
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              補助金活用で
              <span className="block text-yellow-300 text-5xl md:text-7xl">最大50%オフ！</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
69万円のボクシングリングが実質<span className="font-bold text-yellow-300">20.7万円</span>から導入可能<br />
              設備投資補助金・ものづくり補助金の申請を専門スタッフが無料サポート
            </p>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              <p className="font-bold">【重要】補助金に関する免責事項</p>
              <p>• 補助金の採択・支給は各審査機関の判断によるものです</p>
              <p>• 申請の採択を保証するものではありません</p>
              <p>• 制度変更により内容が変更される場合があります</p>
            </div>
            
            {/* 価格比較 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/20 rounded-lg p-6">
                  <div className="text-red-200 line-through text-xl mb-2">通常価格</div>
                  <div className="text-3xl font-bold">69万円</div>
                </div>
                <div className="flex items-center justify-center">
                  <TrendingDown className="h-12 w-12 text-yellow-300" />
                </div>
                <div className="bg-yellow-400 text-black rounded-lg p-6">
                  <div className="text-green-800 text-xl mb-2">補助金活用後</div>
                  <div className="text-3xl font-bold">20.7万円〜</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-4">
                <Calculator className="mr-2 h-6 w-6" />
                補助金額を無料計算
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg px-8 py-4">
                <Phone className="mr-2 h-6 w-6" />
                無料相談を予約
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 補助金制度一覧 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">活用可能な補助金制度</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              お客様の事業規模・業種に合わせて、最適な補助金制度をご提案いたします
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {subsidyTypes.map((subsidy, index) => {
              const IconComponent = subsidy.icon
              return (
                <div key={index} className={`bg-${subsidy.color}-50 border border-${subsidy.color}-200 rounded-lg p-6 hover:shadow-lg transition`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-${subsidy.color}-600 rounded-full flex items-center justify-center mr-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{subsidy.name}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">補助率</span>
                      <span className={`font-bold text-${subsidy.color}-600`}>{subsidy.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">上限額</span>
                      <span className="font-medium">{subsidy.maxAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">難易度</span>
                      <span className="font-medium">{subsidy.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">募集</span>
                      <span className="font-medium">{subsidy.period}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm text-gray-600">対象: {subsidy.target}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 補助金計算機 */}
      <section id="calculator" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">補助金額シミュレーター</h2>
              <p className="text-gray-600">
                ご希望の商品と事業規模を選択すると、活用可能な補助金額を即座に計算できます
              </p>
            </div>
            <AdvancedSubsidyCalculator />
          </div>
        </div>
      </section>

      {/* 申請フロー */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">申請サポートの流れ</h2>
            <p className="text-gray-600">専門スタッフが申請から導入まで全工程をサポートします</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {applicationFlow.map((flow, index) => {
                const IconComponent = flow.icon
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {flow.step}
                      </div>
                      {index < applicationFlow.length - 1 && (
                        <ChevronRight className="hidden md:block absolute top-6 -right-12 h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{flow.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{flow.description}</p>
                    <span className="text-blue-600 text-sm font-medium">{flow.duration}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 成功事例 */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">補助金活用成功事例</h2>
            <p className="text-gray-600">多くのお客様が補助金を活用してボクシングリングを導入されています</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((case_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-lg">{case_.company}</h3>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">導入商品</span>
                    <span className="font-medium">{case_.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">定価</span>
                    <span className="line-through text-gray-500">
                      {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }).format(case_.originalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">補助金額</span>
                    <span className="font-bold text-green-600">
                      -{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }).format(case_.subsidyAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-900 font-medium">実質負担額</span>
                    <span className="font-bold text-blue-600 text-xl">
                      {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }).format(case_.finalPrice)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-700 italic">&ldquo;{case_.comment}&rdquo;</p>
                  <p className="text-xs text-gray-500 mt-2">活用制度: {case_.subsidyType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サポート申請フォーム */}
      <section id="support-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">無料申請サポートのご依頼</h2>
              <p className="text-gray-600">
                専門スタッフがお客様に最適な補助金制度をご提案し、申請をサポートいたします
              </p>
            </div>
            <SubsidySupportForm />
          </div>
        </div>
      </section>

      {/* 実績アピール */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">補助金申請サポート実績</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-2">98%</div>
                <p className="text-blue-100">申請成功率</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-2">150+</div>
                <p className="text-blue-100">サポート実績</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-2">2.8億円</div>
                <p className="text-blue-100">総支援額</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-2">無料</div>
                <p className="text-blue-100">サポート費用</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">よくある質問</h2>
            <div className="space-y-6">
              {[
                {
                  q: '本当に申請サポートは無料ですか？',
                  a: 'はい、申請書類の作成から提出まで、すべて無料でサポートいたします。成功報酬なども一切ございません。'
                },
                {
                  q: '申請が不採択になった場合はどうなりますか？',
                  a: '不採択の場合でも費用は一切発生しません。また、次回の公募に向けて改善点をアドバイスさせていただきます。'
                },
                {
                  q: '個人事業主でも補助金は活用できますか？',
                  a: 'はい、多くの補助金制度で個人事業主も対象となります。事業内容を確認して最適な制度をご提案します。'
                },
                {
                  q: '申請から採択まではどのくらい時間がかかりますか？',
                  a: '制度により異なりますが、一般的に申請から採択通知まで1〜3ヶ月程度です。その後、商品導入・設置となります。'
                },
                {
                  q: '必要な書類は何ですか？',
                  a: '事業計画書、決算書、見積書などが基本となります。詳細は無料相談時にご説明いたします。'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Q. {faq.q}</h3>
                  <p className="text-gray-600">A. {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">補助金で賢くボクシングリング導入</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            69万円が実質20.7万円から！専門スタッフが申請を無料サポート<br />
            まずはお気軽にご相談ください。
          </p>
          <div className="bg-green-800 border border-green-700 text-green-200 px-4 py-3 rounded-lg mb-6 text-sm max-w-2xl mx-auto">
            <p className="font-bold">補助金申請に関するご注意</p>
            <p>補助金の採択・支給は各審査機関の判断によるものです。申請の採択を保証するものではありません。</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              <Calculator className="mr-2 h-5 w-5" />
              補助金額を計算する
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 font-bold">
              <MessageCircle className="mr-2 h-5 w-5" />
              無料相談を申し込む
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 font-bold" asChild>
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                お問い合わせ
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
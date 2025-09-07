import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Phone, Clock, MapPin, MessageSquare, Mail } from 'lucide-react'

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ボクシングリングに関するご相談、見積もり依頼など、お気軽にお問い合わせください。
              専門診断で最適なプランをご提案いたします。
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* 連絡先情報 */}
            <div className="space-y-6">
              {/* 連絡先情報 */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">お急ぎの方はこちら</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">お電話でのお問い合わせ</p>
                      <Button asChild variant="outline" size="sm" className="mt-1 text-blue-600 border-blue-600 hover:bg-blue-50">
                        <a href="tel:07085414546">
                          📞 07085414546
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">LINEでのお問い合わせ</p>
                      <Button asChild variant="outline" size="sm" className="mt-1 text-green-600 border-green-600 hover:bg-green-50">
                        <a href="https://lin.ee/jGVe5DT" target="_blank" rel="noopener noreferrer">
                          📱 LINE 友だち追加
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="text-purple-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">メールでのお問い合わせ</p>
                      <Button asChild variant="outline" size="sm" className="mt-1 text-purple-600 border-purple-600 hover:bg-purple-50">
                        <a href="mailto:boxing-ring-shop@outlook.com">
                          📧 メール送信
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">営業時間</p>
                      <p className="text-sm text-orange-600">
                        平日: 9:00-18:00<br />
                        土日祝日: 10:00-17:00<br />
                        （要予約）
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <MapPin className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">見学可能場所</p>
                      <p className="text-sm text-gray-600">
                        東京都港区六本木1-1-1<br />
                        六本木ビル3F
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特徴 */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">当店の特徴</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    専門診断による最適プラン提案
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    補助金申請サポート（無料）
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    実物見学での確認可能
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    設置・アフターサポート完備
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    全国対応・現地調査無料
                  </li>
                </ul>
              </div>

              {/* 補助金情報 */}
              <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">補助金について</h3>
                <p className="text-sm text-green-700 mb-3">
                  設備投資補助金の活用で、最大50%の費用削減が可能です。
                </p>
                <ul className="space-y-1 text-sm text-green-600">
                  <li>• ものづくり補助金</li>
                  <li>• 小規模事業者持続化補助金</li>
                  <li>• IT導入補助金</li>
                  <li>• 自治体独自の補助金</li>
                </ul>
                <Button variant="outline" size="sm" className="mt-3 w-full border-green-600 text-green-600 hover:bg-green-50" asChild>
                  <a href="/subsidy">詳細を見る</a>
                </Button>
              </div>

              {/* 実物確認案内 */}
              <div className="bg-gray-50 rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">実物確認について</h3>
                <p className="text-sm text-gray-600 mb-4">
                  高額商品のため、事前にお問い合わせいただければ実物確認の調整をさせていただきます。
                  上記の電話・LINE・メールからお気軽にご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
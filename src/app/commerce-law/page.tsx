import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function CommerceLawPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>
            
            <div className="space-y-6 text-gray-700">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h2 className="font-bold text-red-800 mb-2">重要なお知らせ</h2>
                <p className="text-red-700">当商品は高額商品のため、購入前のお問い合わせが必須となります。必ずご相談の上、ご検討ください。</p>
              </div>

              <section>
                <h2 className="text-xl font-semibold mb-3">販売業者</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>ボクシングリング専門店</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">運営責任者</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>代表取締役 田中太郎</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">所在地</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>〒106-0032 東京都港区六本木1-1-1</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">連絡先</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>お問い合わせフォーム：/contact</p>
                  <p>LINE：<a href="https://lin.ee/jGVe5DT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://lin.ee/jGVe5DT</a></p>
                  <p>受付時間：平日 9:00-18:00（土日祝日は要予約）</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">商品・サービス</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>ボクシングリングの販売、設置サービス、補助金申請サポート</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">商品代金・サービス料金</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>スタンダード：69万円〜（税込）</p>
                  <p>プロフェッショナル：128万円〜（税込）</p>
                  <p>カスタム：応相談</p>
                  <p>※配送料は別途申し受けます</p>
                  <p>※価格は予告なく変更される場合があります</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">支払い方法</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>銀行振込、その他応相談</p>
                  <p>※分割払いについてはご相談ください</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">支払い時期</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>ご注文確定後、請求書発行いたします。</p>
                  <p>お支払い期限は請求書記載の通りとなります。</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">商品の引渡し時期</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>ご注文・お支払い確認後、1〜2ヶ月程度</p>
                  <p>※在庫状況により変動いたします</p>
                  <p>※詳細は個別にご案内いたします</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">返品・交換・キャンセル</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>オーダーメイド商品のため、原則として返品・交換は承っておりません。</p>
                  <p>ただし、以下の場合は返品・交換を承ります：</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>商品に瑕疵があった場合</li>
                    <li>ご注文と異なる商品が届いた場合</li>
                    <li>配送中の事故による破損があった場合</li>
                  </ul>
                  <p className="mt-2">返品・交換をご希望の場合は、商品到着後7日以内にご連絡ください。</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">保証について</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>スタンダード：1年保証</p>
                  <p>プロフェッショナル：3年保証</p>
                  <p>カスタム：5年保証</p>
                  <p>保証期間内は無料修理・交換いたします。</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">免責事項</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>以下の場合、当社は責任を負いません：</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>天災地変等の不可抗力による納期遅延・損害</li>
                    <li>お客様の使用方法に起因する故障・事故</li>
                    <li>補助金申請の採択を保証するものではありません</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">個人情報の取扱い</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>個人情報の取扱いについては、別途定める「プライバシーポリシー」によるものとします。</p>
                </div>
              </section>

              <div className="mt-8 text-right text-gray-500">
                <p>制定日：2024年1月1日</p>
                <p>最終更新日：2024年1月1日</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
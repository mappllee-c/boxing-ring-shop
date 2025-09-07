import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">利用規約</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold mb-3">第1条（適用）</h2>
                <p>本規約は、ボクシングリング専門店（以下「当社」といいます）が提供するサービスの利用条件を定めるものです。お客様は、当社サービスを利用することにより、本規約に同意したものとみなします。</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第2条（サービス内容）</h2>
                <p>当社は、以下のサービスを提供いたします。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>ボクシングリングの販売</li>
                  <li>見積もり・相談サービス</li>
                  <li>補助金申請サポートサービス</li>
                  <li>設置・アフターサービス</li>
                  <li>その他関連サービス</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第3条（注文・契約）</h2>
                <p>商品の注文は、事前のお問い合わせと見積もりを経て行うものとします。高額商品のため、購入前の相談は必須となります。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>すべての商品は事前問い合わせが必要です</li>
                  <li>見積もり確認後、正式なご注文となります</li>
                  <li>在庫状況により、お届けまでお時間をいただく場合があります</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第4条（価格・支払い）</h2>
                <p>商品価格は税込価格で表示しております。配送料は別途申し受けます。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>価格は予告なく変更される場合があります</li>
                  <li>お支払い方法は銀行振込、その他応相談</li>
                  <li>分割払いについてはご相談ください</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第5条（配送・設置）</h2>
                <p>商品の配送・設置については、別途調整いたします。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>配送料は地域により異なります</li>
                  <li>設置サービスを提供いたします</li>
                  <li>配送時期は在庫状況により変動します</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第6条（保証・アフターサービス）</h2>
                <p>当社製品には保証期間を設けております。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>スタンダード：1年保証</li>
                  <li>プロフェッショナル：3年保証</li>
                  <li>カスタム：5年保証</li>
                  <li>保証期間内の修理・交換は無料</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第7条（免責事項）</h2>
                <p>当社は、以下の事項について責任を負いません。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>天災地変等の不可抗力による納期遅延</li>
                  <li>お客様の使用方法に起因する故障・事故</li>
                  <li>補助金申請の採択を保証するものではありません</li>
                  <li>第三者による当サイトの情報の利用</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第8条（個人情報）</h2>
                <p>個人情報の取扱いについては、別途定める「プライバシーポリシー」によるものとします。</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第9条（規約の変更）</h2>
                <p>当社は、必要に応じて本規約を変更することがあります。変更後の規約は、当サイトに掲載した時点で効力を生じるものとします。</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">第10条（準拠法・管轄）</h2>
                <p>本規約は日本法に準拠し、本規約に関する紛争は東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
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
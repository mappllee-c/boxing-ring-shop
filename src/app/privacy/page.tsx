import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. 個人情報の収集について</h2>
                <p>当サイトでは、お客様からのお問い合わせ、見積もり依頼、補助金申請サポート等のサービス提供のため、以下の個人情報を収集いたします。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>氏名、会社名・施設名</li>
                  <li>電話番号、LINE連絡先</li>
                  <li>住所（必要に応じて）</li>
                  <li>サービス利用に関する情報</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. 個人情報の利用目的</h2>
                <p>収集した個人情報は以下の目的で利用いたします。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>お問い合わせ・見積もり依頼への対応</li>
                  <li>補助金申請サポートサービスの提供</li>
                  <li>商品・サービスの案内</li>
                  <li>アフターサービス・メンテナンス</li>
                  <li>その他、サービス向上のための利用</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. 個人情報の第三者提供</h2>
                <p>当社は、以下の場合を除き、個人情報を第三者に提供いたしません。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>ご本人の同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>補助金申請に必要な機関への情報提供（お客様の同意を得た場合）</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. 個人情報の保護</h2>
                <p>当社は、個人情報の漏洩、滅失、毀損の防止その他の個人情報の安全管理のため、必要かつ適切な措置を講じます。</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. 個人情報の開示・訂正・削除</h2>
                <p>お客様は、当社が保有する個人情報について、開示、訂正、削除を求めることができます。お申し出がございましたら、速やかに対応いたします。</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. お問い合わせ窓口</h2>
                <p>個人情報に関するお問い合わせは、以下までご連絡ください。</p>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p>ボクシングリング専門店</p>
                  <p>お問い合わせフォーム：/contact</p>
                  <p>LINE：<a href="https://lin.ee/jGVe5DT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://lin.ee/jGVe5DT</a></p>
                  <p>受付時間：平日 9:00-18:00</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. プライバシーポリシーの変更</h2>
                <p>当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。</p>
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
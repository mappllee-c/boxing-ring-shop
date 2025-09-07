import Link from 'next/link'
import { MessageSquare, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ボクシングリング専門店</h3>
            <p className="text-gray-300 mb-4">
              プロ用ボクシングリングの専門販売店。69万円からの高品質リングを提供。
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin size={16} />
              <span>東京都港区六本木1-1-1</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">商品・サービス</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/products" className="hover:text-white transition">ボクシングリング</Link></li>
              <li><Link href="/products" className="hover:text-white transition">フロアーリング</Link></li>
              <li><Link href="/products" className="hover:text-white transition">レイズドリング</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">カスタマイズ相談</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">サポート</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/mission" className="hover:text-white transition">ミッション</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">よくあるご質問</Link></li>
              <li><Link href="/subsidy" className="hover:text-white transition">補助金申請サポート</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">お問い合わせ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">見積もり依頼</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <MessageSquare size={16} />
                <a href="https://lin.ee/jGVe5DT" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  LINE でお問い合わせ
                </a>
              </div>
              <p className="text-sm">
                営業時間: 平日 9:00-18:00<br />
                土日祝日も対応可（要予約）
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div className="text-center md:text-left">
              <p>&copy; 2024 ボクシングリング専門店. All rights reserved.</p>
              <p className="mt-2 text-sm">高額商品のため購入前のお問い合わせが必須です</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0 text-sm">
              <Link href="/privacy" className="hover:text-white transition">プライバシーポリシー</Link>
              <Link href="/terms" className="hover:text-white transition">利用規約</Link>
              <Link href="/commerce-law" className="hover:text-white transition">特定商取引法</Link>
              <Link href="/faq" className="hover:text-white transition">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
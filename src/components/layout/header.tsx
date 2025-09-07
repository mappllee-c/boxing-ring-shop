'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* 人類貢献ミッションバー */}
      <div className="bg-blue-600 text-white py-1">
        <div className="container mx-auto px-4 text-center text-sm">
          🌟 人類の健康とスポーツ発展に貢献 - 世界屈指のボクシングリング製造
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ボクシングリング専門店
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              ホーム
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              商品一覧
            </Link>
            <Link href="/tools" className="text-gray-700 hover:text-blue-600 transition">
              計算ツール
            </Link>
            <Link href="/mission" className="text-gray-700 hover:text-blue-600 transition">
              ミッション
            </Link>
            <Link href="/subsidy" className="text-gray-700 hover:text-blue-600 transition">
              補助金サポート
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition">
              よくある質問
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
              ブログ
            </Link>
            <Link href="/columns" className="text-gray-700 hover:text-blue-600 transition">
              コラム
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              お問い合わせ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/contact">
                <Mail size={16} className="mr-2" />
                見積もり依頼
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
import type { Metadata } from 'next'
import { FAQSchema } from '@/components/structured-data/faq-schema'
import { FAQContent } from './faq-content'

const faqs = [
  {
    id: 1,
    question: "ボクシングリングの価格はいくらですか？",
    answer: "当店のボクシングリングは69万円（税込）からご提供しています。フロアーリング（平置きタイプ）・レイズドリング（床上げタイプ）ともに同価格からスタートし、サイズやオプションによって価格が変動します。補助金を活用すると実質20万円台からの購入も可能です。"
  },
  {
    id: 2,
    question: "補助金を使うとどのくらい安くなりますか？",
    answer: "設備投資補助金を活用すると、最大70%の補助を受けることができます。69万円のリングの場合、実質20.7万円から購入可能です。当店では補助金申請の完全サポートを無料で行っており、申請から承認まで専門スタッフがお手伝いします。"
  },
  {
    id: 3,
    question: "フロアーリングとレイズドリングの違いは何ですか？",
    answer: "フロアーリング（平置きタイプ）は床と同じ高さに設置するタイプで、設置が簡単で費用を抑えられます。レイズドリング（床上げタイプ）は床から1.5m高い位置に設置するプロ仕様で、本格的な試合や練習に適しています。どちらも69万円からの同価格で、用途に応じてお選びいただけます。"
  }
]

export const metadata: Metadata = {
  title: 'よくある質問（FAQ）| ボクシングリング販売・補助金・設置について',
  description: 'ボクシングリング購入に関するよくある質問と回答。価格、補助金、設置、カスタマイズ、フロアーリングとレイズドリングの違いなど詳しく解説。',
  keywords: 'ボクシングリング,よくある質問,FAQ,価格,費用,補助金,設置期間,カスタマイズ,フロアーリング,レイズドリング,違い,選び方',
  openGraph: {
    title: 'ボクシングリング購入FAQ | よくある質問と回答',
    description: 'ボクシングリング購入に関するよくある質問にお答えします。価格、補助金、設置について詳しく解説。',
    type: 'article'
  }
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs} />
      <FAQContent />
    </div>
  )
}
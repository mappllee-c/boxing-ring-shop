'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { products, formatPrice } from '@/data/products'
import { 
  Calculator, 
  TrendingDown, 
  CheckCircle, 
  AlertCircle,
  Info,
  Sparkles
} from 'lucide-react'

interface SubsidyCalculationResult {
  subsidyType: string
  subsidyRate: number
  maxSubsidyAmount: number
  estimatedSubsidyAmount: number
  finalPrice: number
  savings: number
  eligibility: 'high' | 'medium' | 'low'
  notes: string[]
}

export function SubsidyCalculator() {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [annualRevenue, setAnnualRevenue] = useState('')
  const [employeeCount, setEmployeeCount] = useState('')
  const [customPrice, setCustomPrice] = useState('')
  const [results, setResults] = useState<SubsidyCalculationResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const productOptions = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price.base,
    category: product.category
  }))

  const calculateSubsidy = () => {
    const price = selectedProduct ? 
      productOptions.find(p => p.id === selectedProduct)?.price || 0 :
      parseInt(customPrice) || 0

    if (price === 0) return

    const calculationResults: SubsidyCalculationResult[] = []

    // 小規模事業者持続化補助金
    if (companyType === 'sme' || companyType === 'individual') {
      const rate = 0.67 // 2/3
      const maxAmount = 500000 // 50万円（通常枠）
      const subsidyAmount = Math.min(price * rate, maxAmount)
      
      if (subsidyAmount > 0) {
        calculationResults.push({
          subsidyType: '小規模事業者持続化補助金',
          subsidyRate: rate,
          maxSubsidyAmount: maxAmount,
          estimatedSubsidyAmount: subsidyAmount,
          finalPrice: price - subsidyAmount,
          savings: subsidyAmount,
          eligibility: companyType === 'individual' ? 'high' : getEligibility(companyType, businessType),
          notes: [
            '小規模事業者が対象（商業・サービス業：従業員5人以下）',
            '販路開拓・生産性向上の取組みが条件',
            '年4回程度の公募',
            '申請から採択まで約2～3ヶ月'
          ]
        })
      }
    }

    // ものづくり補助金
    if (businessType === 'manufacturing' || businessType === 'service') {
      // 基本補助率1/2、小規模事業者・最低賃金引上げ特例で2/3
      const isSmallScale = companyType === 'individual' || 
        (companyType === 'sme' && businessType === 'service')
      const rate = isSmallScale ? 0.67 : 0.5
      
      // 従業員数に応じた上限額（簡易計算として750万円～2500万円）
      const maxAmount = price > 5000000 ? 25000000 : 7500000
      const subsidyAmount = Math.min(price * rate, maxAmount)
      
      if (subsidyAmount > 0) {
        calculationResults.push({
          subsidyType: 'ものづくり補助金',
          subsidyRate: rate,
          maxSubsidyAmount: maxAmount,
          estimatedSubsidyAmount: subsidyAmount,
          finalPrice: price - subsidyAmount,
          savings: subsidyAmount,
          eligibility: getEligibility(companyType, businessType),
          notes: [
            '革新的な設備・システム投資が対象',
            '事業計画書の作成と審査が必要',
            '年1回の公募（4月頃予定）',
            `補助率：${rate === 0.67 ? '2/3（小規模事業者等）' : '1/2（基本）'}`,
            '2025年より収益納付なし'
          ]
        })
      }
    }

    // IT導入補助金（デジタル機能付きリングの場合）
    if (selectedProduct && productOptions.find(p => p.id === selectedProduct)?.category === 'professional') {
      // 通常枠：1/2、最低賃金近傍事業者：2/3
      const isMinWageNear = companyType === 'individual' // 簡易判定
      const rate = isMinWageNear ? 0.67 : 0.5
      const maxAmount = 4500000 // 450万円
      const subsidyAmount = Math.min(price * rate, maxAmount)
      
      if (subsidyAmount > 0) {
        calculationResults.push({
          subsidyType: 'IT導入補助金（通常枠）',
          subsidyRate: rate,
          maxSubsidyAmount: maxAmount,
          estimatedSubsidyAmount: subsidyAmount,
          finalPrice: price - subsidyAmount,
          savings: subsidyAmount,
          eligibility: 'medium',
          notes: [
            'ITツール導入による業務効率化が対象',
            'LED照明システム等のデジタル機能が該当',
            `補助率：${rate === 0.67 ? '2/3（最低賃金近傍事業者）' : '1/2（通常）'}`,
            '2025年3月31日から受付開始予定',
            '全業種対応'
          ]
        })
      }
    }

    // 中小企業省力化投資補助金
    if ((companyType === 'sme' || companyType === 'individual') && price >= 1000000) {
      const rate = 0.5 // 1/2
      // 従業員数に応じた上限（簡易計算）
      const maxAmount = price > 10000000 ? 100000000 : 10000000
      const subsidyAmount = Math.min(price * rate, maxAmount)
      
      if (subsidyAmount > 0) {
        calculationResults.push({
          subsidyType: '中小企業省力化投資補助金',
          subsidyRate: rate,
          maxSubsidyAmount: maxAmount,
          estimatedSubsidyAmount: subsidyAmount,
          finalPrice: price - subsidyAmount,
          savings: subsidyAmount,
          eligibility: getEligibility(companyType, businessType),
          notes: [
            '省力化効果のある設備投資が対象',
            'カタログに掲載された製品が基本',
            '補助率：1/2',
            '2025年実施期間18ヶ月以内に延長',
            '人手不足解決に向けた投資を支援'
          ]
        })
      }
    }

    // 結果をソート（補助金額の大きい順）
    calculationResults.sort((a, b) => b.estimatedSubsidyAmount - a.estimatedSubsidyAmount)
    
    setResults(calculationResults)
    setShowResults(true)
  }

  const getEligibility = (companyType: string, businessType: string): 'high' | 'medium' | 'low' => {
    if (companyType === 'sme' && businessType === 'manufacturing') return 'high'
    if (companyType === 'sme' && businessType === 'service') return 'high'
    if (companyType === 'individual') return 'medium'
    return 'low'
  }

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getEligibilityText = (eligibility: string) => {
    switch (eligibility) {
      case 'high': return '採択可能性：高'
      case 'medium': return '採択可能性：中'
      case 'low': return '採択可能性：低'
      default: return '要確認'
    }
  }

  const resetCalculator = () => {
    setSelectedProduct('')
    setCompanyType('')
    setBusinessType('')
    setAnnualRevenue('')
    setEmployeeCount('')
    setCustomPrice('')
    setResults([])
    setShowResults(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center mb-2">
          <Calculator className="h-6 w-6 mr-2" />
          <h3 className="text-xl font-bold">補助金額シミュレーター</h3>
        </div>
        <p className="text-blue-100">簡単な質問に答えるだけで、活用可能な補助金額を算出します</p>
      </div>

      <div className="p-6 space-y-6">
        {!showResults ? (
          <>
            {/* 商品選択 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">ご希望の商品</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-select">商品を選ぶ</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="商品を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - {formatPrice(product.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="custom-price">または価格を直接入力</Label>
                  <Input
                    id="custom-price"
                    type="number"
                    placeholder="例: 1000000"
                    value={customPrice}
                    onChange={(e) => {
                      setCustomPrice(e.target.value)
                      setSelectedProduct('')
                    }}
                    disabled={!!selectedProduct}
                  />
                </div>
              </div>
            </div>

            {/* 会社情報 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">事業者情報</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-type">事業者区分</Label>
                  <Select value={companyType} onValueChange={setCompanyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sme">中小企業</SelectItem>
                      <SelectItem value="individual">個人事業主</SelectItem>
                      <SelectItem value="large">大企業</SelectItem>
                      <SelectItem value="npo">NPO・社団法人</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="business-type">業種</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sports">スポーツ施設</SelectItem>
                      <SelectItem value="education">教育・学校</SelectItem>
                      <SelectItem value="manufacturing">製造業</SelectItem>
                      <SelectItem value="service">サービス業</SelectItem>
                      <SelectItem value="retail">小売業</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 詳細情報 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">事業規模（任意）</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="revenue">年間売上高</Label>
                  <Select value={annualRevenue} onValueChange={setAnnualRevenue}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_10m">1,000万円未満</SelectItem>
                      <SelectItem value="10m_50m">1,000万円〜5,000万円</SelectItem>
                      <SelectItem value="50m_100m">5,000万円〜1億円</SelectItem>
                      <SelectItem value="100m_500m">1億円〜5億円</SelectItem>
                      <SelectItem value="over_500m">5億円以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employees">従業員数</Label>
                  <Select value={employeeCount} onValueChange={setEmployeeCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1名（個人事業主）</SelectItem>
                      <SelectItem value="2_10">2〜10名</SelectItem>
                      <SelectItem value="11_50">11〜50名</SelectItem>
                      <SelectItem value="51_100">51〜100名</SelectItem>
                      <SelectItem value="over_100">100名以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 計算ボタン */}
            <div className="pt-4">
              <Button 
                onClick={calculateSubsidy}
                disabled={(!selectedProduct && !customPrice) || !companyType || !businessType}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3"
              >
                <Calculator className="mr-2 h-5 w-5" />
                補助金額を計算する
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* 計算結果 */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">計算結果</h3>
                <p className="text-gray-600">あなたの事業で活用可能な補助金制度</p>
              </div>

              {results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-900">{result.subsidyType}</h4>
                    <span className={`text-sm font-medium ${getEligibilityColor(result.eligibility)}`}>
                      {getEligibilityText(result.eligibility)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">商品価格</span>
                        <span className="font-medium">
                          {formatPrice(result.finalPrice + result.savings)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">補助率</span>
                        <span className="font-medium">{Math.round(result.subsidyRate * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">補助金額</span>
                        <span className="font-bold text-green-600">
                          -{formatPrice(result.estimatedSubsidyAmount)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">実質負担額</div>
                        <div className="text-3xl font-bold text-blue-600">
                          {formatPrice(result.finalPrice)}
                        </div>
                        <div className="text-sm text-green-600 mt-1 flex items-center justify-center">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          {formatPrice(result.savings)}の削減
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      制度の特徴
                    </h5>
                    <ul className="space-y-1">
                      {result.notes.map((note, noteIndex) => (
                        <li key={noteIndex} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {results.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    申請可能な補助金制度が見つかりませんでした
                  </h3>
                  <p className="text-gray-600 mb-4">
                    入力条件では該当する制度がありませんが、<br />
                    他の制度や条件変更で対象となる可能性があります。
                  </p>
                  <Button variant="outline" className="text-blue-600 border-blue-600">
                    専門スタッフに相談する
                  </Button>
                </div>
              )}

              {/* アクションボタン */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button onClick={resetCalculator} variant="outline" className="flex-1">
                  条件を変更して再計算
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Sparkles className="mr-2 h-4 w-4" />
                  無料申請サポートを依頼
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 注意事項 */}
      <div className="bg-yellow-50 border-t border-yellow-200 p-4 rounded-b-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">ご注意事項</p>
            <ul className="space-y-1 text-xs">
              <li>• 本計算は2025年度制度に基づく概算であり、実際の採択を保証するものではありません</li>
              <li>• 補助金は審査により採択が決定され、申請すれば必ず受給できるものではありません</li>
              <li>• 各制度には詳細な要件があり、事前の事業計画策定や書類準備が必要です</li>
              <li>• 補助対象経費や申請スケジュールは制度により異なります</li>
              <li>• 地方自治体の独自制度については別途ご確認ください</li>
              <li>• 詳細な診断と申請サポートは専門スタッフまでご相談ください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
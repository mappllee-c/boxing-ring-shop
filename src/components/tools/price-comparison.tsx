'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  CheckCircle,
  Info,
  Truck,
  Wrench,
  Shield
} from 'lucide-react'

interface PriceBreakdown {
  basePrice: number
  installation: number
  delivery: number
  warranty: number
  subsidyDiscount: number
  totalBeforeSubsidy: number
  totalAfterSubsidy: number
  monthlyCost: number
  annualCost: number
}

interface ComparisonOption {
  name: string
  type: 'standard' | 'professional' | 'custom'
  basePrice: number
  features: string[]
  warranty: number
  popular?: boolean
}

export function PriceComparison() {
  const [selectedSize, setSelectedSize] = useState('')
  const [includeInstallation, setIncludeInstallation] = useState(true)
  const [includeDelivery, setIncludeDelivery] = useState(true)
  const [includeWarranty, setIncludeWarranty] = useState(false)
  const [subsidyRate, setSubsidyRate] = useState(0)
  const [customPrice, setCustomPrice] = useState('')
  const [showResults, setShowResults] = useState(false)

  const options: ComparisonOption[] = [
    {
      name: 'スタンダード',
      type: 'standard',
      basePrice: 690000,
      features: ['基本サイズ 4m×4m', '標準マット仕様', '基本照明', '1年保証'],
      warranty: 1,
    },
    {
      name: 'プロフェッショナル',
      type: 'professional',
      basePrice: 1280000,
      features: ['プロ仕様 6m×6m', '高品質マット', 'LED照明システム', '3年保証', '設置サポート込み'],
      warranty: 3,
      popular: true,
    },
    {
      name: 'カスタム',
      type: 'custom',
      basePrice: customPrice ? parseInt(customPrice) : 1500000,
      features: ['完全オーダーメイド', 'ロゴ・カラー自由', 'プレミアム素材', '5年保証', 'アフターサポート込み'],
      warranty: 5,
    },
  ]

  const calculatePrice = (option: ComparisonOption): PriceBreakdown => {
    const sizeMultiplier = selectedSize === '5x5' ? 1 : 
                          selectedSize === '6x6' ? 1.2 : 
                          selectedSize === '7x7' ? 1.4 : 1

    const basePrice = option.basePrice * sizeMultiplier
    const installation = includeInstallation ? basePrice * 0.15 : 0
    const delivery = includeDelivery ? 50000 : 0
    const warranty = includeWarranty ? basePrice * 0.05 : 0
    
    const totalBeforeSubsidy = basePrice + installation + delivery + warranty
    const subsidyDiscount = totalBeforeSubsidy * (subsidyRate / 100)
    const totalAfterSubsidy = totalBeforeSubsidy - subsidyDiscount
    
    const monthlyCost = totalAfterSubsidy / (option.warranty * 12)
    const annualCost = monthlyCost * 12

    return {
      basePrice,
      installation,
      delivery,
      warranty,
      subsidyDiscount,
      totalBeforeSubsidy,
      totalAfterSubsidy,
      monthlyCost,
      annualCost
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(price)
  }

  const results = useMemo(() => {
    return options.map(option => ({
      ...option,
      breakdown: calculatePrice(option)
    }))
  }, [selectedSize, includeInstallation, includeDelivery, includeWarranty, subsidyRate, customPrice, calculatePrice, options])

  const handleCalculate = () => {
    setShowResults(true)
  }

  const resetCalculator = () => {
    setSelectedSize('')
    setIncludeInstallation(true)
    setIncludeDelivery(true)
    setIncludeWarranty(false)
    setSubsidyRate(0)
    setCustomPrice('')
    setShowResults(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center mb-2">
          <Calculator className="h-6 w-6 mr-2" />
          <h3 className="text-xl font-bold">価格比較ツール</h3>
        </div>
        <p className="text-blue-100">リングタイプ別の詳細な価格比較と実質負担額を計算</p>
      </div>

      <div className="p-6 space-y-6">
        {!showResults ? (
          <>
            {/* 基本設定 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">基本設定</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size-select">リングサイズ</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="サイズを選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4x4">4m × 4m（標準）</SelectItem>
                      <SelectItem value="5x5">5m × 5m</SelectItem>
                      <SelectItem value="6x6">6m × 6m（プロ仕様）</SelectItem>
                      <SelectItem value="7x7">7m × 7m（大型）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subsidy-rate">補助金率（%）</Label>
                  <Select value={subsidyRate.toString()} onValueChange={(value) => setSubsidyRate(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="補助金率を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">補助金なし</SelectItem>
                      <SelectItem value="30">30%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="67">67%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* オプション選択 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">含めるサービス</Label>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="installation"
                    checked={includeInstallation}
                    onCheckedChange={(checked) => setIncludeInstallation(checked === true)}
                  />
                  <Label htmlFor="installation" className="text-sm font-normal flex items-center">
                    <Wrench className="h-4 w-4 mr-1" />
                    設置サービス
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delivery"
                    checked={includeDelivery}
                    onCheckedChange={(checked) => setIncludeDelivery(checked === true)}
                  />
                  <Label htmlFor="delivery" className="text-sm font-normal flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    配送サービス
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="warranty"
                    checked={includeWarranty}
                    onCheckedChange={(checked) => setIncludeWarranty(checked === true)}
                  />
                  <Label htmlFor="warranty" className="text-sm font-normal flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    延長保証
                  </Label>
                </div>
              </div>
            </div>

            {/* カスタム価格 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">カスタム価格設定</Label>
              <div>
                <Label htmlFor="custom-price">カスタムリングの価格（円）</Label>
                <Input
                  id="custom-price"
                  type="number"
                  placeholder="例: 1500000"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                />
              </div>
            </div>

            {/* 計算ボタン */}
            <div className="pt-4">
              <Button 
                onClick={handleCalculate}
                disabled={!selectedSize}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-3"
              >
                <Calculator className="mr-2 h-5 w-5" />
                価格を比較する
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* 比較結果 */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">価格比較結果</h3>
                <p className="text-gray-600">
                  リングサイズ: {selectedSize?.replace('x', ' × ')} 
                  {subsidyRate > 0 && (
                    <span className="text-green-600 font-medium ml-2">
                      （補助金 {subsidyRate}%適用）
                    </span>
                  )}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {results.map((result, index) => (
                  <div key={index} className={`relative border-2 rounded-lg p-6 ${
                    result.popular 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  } hover:shadow-lg transition`}>
                    {result.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        人気No.1
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{result.name}</h4>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {formatPrice(result.breakdown.totalAfterSubsidy)}
                      </div>
                      {result.breakdown.subsidyDiscount > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(result.breakdown.totalBeforeSubsidy)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">基本価格</span>
                        <span>{formatPrice(result.breakdown.basePrice)}</span>
                      </div>
                      {result.breakdown.installation > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">設置費用</span>
                          <span>{formatPrice(result.breakdown.installation)}</span>
                        </div>
                      )}
                      {result.breakdown.delivery > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">配送費用</span>
                          <span>{formatPrice(result.breakdown.delivery)}</span>
                        </div>
                      )}
                      {result.breakdown.warranty > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">延長保証</span>
                          <span>{formatPrice(result.breakdown.warranty)}</span>
                        </div>
                      )}
                      {result.breakdown.subsidyDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">補助金割引</span>
                          <span className="text-green-600 font-medium">
                            -{formatPrice(result.breakdown.subsidyDiscount)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">主な特徴</h5>
                      <ul className="space-y-1">
                        {result.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">実質月額コスト</div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatPrice(result.breakdown.monthlyCost)}
                        </div>
                        <div className="text-xs text-gray-500">
                          （{result.warranty}年保証期間で算出）
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 詳細比較表 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">詳細比較</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">項目</th>
                        {results.map((result, index) => (
                          <th key={index} className="text-center py-2">{result.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">年間コスト</td>
                        {results.map((result, index) => (
                          <td key={index} className="text-center py-2">
                            {formatPrice(result.breakdown.annualCost)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">保証期間</td>
                        {results.map((result, index) => (
                          <td key={index} className="text-center py-2">
                            {result.warranty}年
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">コストパフォーマンス</td>
                        {results.map((result, index) => {
                          const costPerYear = result.breakdown.annualCost
                          const isHighest = costPerYear === Math.max(...results.map(r => r.breakdown.annualCost))
                          const isLowest = costPerYear === Math.min(...results.map(r => r.breakdown.annualCost))
                          return (
                            <td key={index} className="text-center py-2">
                              {isLowest && <TrendingDown className="h-4 w-4 text-green-500 mx-auto" />}
                              {isHighest && <TrendingUp className="h-4 w-4 text-red-500 mx-auto" />}
                              {!isLowest && !isHighest && <span className="text-gray-400">-</span>}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button onClick={resetCalculator} variant="outline" className="flex-1">
                  条件を変更して再計算
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Info className="mr-2 h-4 w-4" />
                  詳細見積もりを依頼
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 注意事項 */}
      <div className="bg-blue-50 border-t border-blue-200 p-4 rounded-b-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">価格について</p>
            <ul className="space-y-1 text-xs">
              <li>• 表示価格は税込価格です</li>
              <li>• 実際の価格は仕様・設置条件により変動します</li>
              <li>• 正確な見積もりは個別にお問い合わせください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
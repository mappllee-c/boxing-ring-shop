'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Select } from '@/components/ui/select'
import { Calculator, TrendingUp, CheckCircle } from 'lucide-react'

interface SubsidyResult {
  subsidyAmount: number
  subsidyRate: number
  actualCost: number
  eligiblePrograms: string[]
  requirements: string[]
}

export function AdvancedSubsidyCalculator() {
  const [businessType, setBusinessType] = useState('')
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [location, setLocation] = useState('')
  const [businessHistory, setBusinessHistory] = useState('')
  const [result, setResult] = useState<SubsidyResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateSubsidy = async () => {
    setIsCalculating(true)
    
    // シミュレート計算（実際はAPIコール）
    setTimeout(() => {
      const amount = parseInt(investmentAmount) || 0
      let subsidyRate = 0.6 // 基本60%
      
      // ビジネスタイプによる調整
      if (businessType === 'new-business') subsidyRate = 0.7
      if (businessType === 'expansion') subsidyRate = 0.65
      if (businessType === 'renovation') subsidyRate = 0.6
      
      // 地域による調整
      if (['tokyo', 'osaka', 'aichi'].includes(location)) subsidyRate += 0.05
      
      const subsidyAmount = Math.min(amount * subsidyRate, 10000000) // 上限1000万円
      const actualCost = amount - subsidyAmount
      
      const eligiblePrograms = [
        '小規模事業者持続化補助金',
        'ものづくり補助金',
        '事業再構築補助金'
      ]
      
      const requirements = [
        '法人または個人事業主であること',
        '補助事業実施期間内に設備導入を完了すること',
        '事業計画書の提出と承認',
        '実績報告書の提出'
      ]
      
      setResult({
        subsidyAmount,
        subsidyRate: subsidyRate * 100,
        actualCost,
        eligiblePrograms,
        requirements
      })
      setIsCalculating(false)
    }, 1500)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Calculator className="text-blue-600 mr-3" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">補助金シミュレーター</h2>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          あなたの事業に最適な補助金を計算し、実質負担額を算出します。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
              事業形態
            </Label>
            <select 
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              <option value="new-business">新規開業</option>
              <option value="expansion">事業拡大</option>
              <option value="renovation">設備更新</option>
              <option value="conversion">事業転換</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              都道府県
            </Label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              <option value="tokyo">東京都</option>
              <option value="osaka">大阪府</option>
              <option value="aichi">愛知県</option>
              <option value="other">その他</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="investmentAmount" className="text-sm font-medium text-gray-700">
              投資予定額（円）
            </Label>
            <Input
              id="investmentAmount"
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder="例: 1000000"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="businessHistory" className="text-sm font-medium text-gray-700">
              事業歴
            </Label>
            <select
              id="businessHistory"
              value={businessHistory}
              onChange={(e) => setBusinessHistory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              <option value="new">新規（1年未満）</option>
              <option value="1-3years">1-3年</option>
              <option value="3-5years">3-5年</option>
              <option value="5years+">5年以上</option>
            </select>
          </div>
        </div>
        
        <Button 
          onClick={calculateSubsidy}
          disabled={!businessType || !investmentAmount || !location || isCalculating}
          className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700"
        >
          {isCalculating ? '計算中...' : '補助金を計算する'}
        </Button>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-green-600 mr-2" size={24} />
              <h3 className="text-xl font-bold text-gray-900">計算結果</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-700">予想補助金額</div>
                <div className="text-3xl font-bold text-green-800">
                  {formatPrice(result.subsidyAmount)}
                </div>
                <div className="text-sm text-green-600">
                  補助率: {result.subsidyRate.toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-700">実質負担額</div>
                <div className="text-2xl font-bold text-blue-800">
                  {formatPrice(result.actualCost)}
                </div>
                <div className="text-sm text-blue-600">
                  投資額: {formatPrice(parseInt(investmentAmount))}
                </div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-800">
                  最大 {formatPrice(result.subsidyAmount)} の補助金で
                </div>
                <div className="text-lg font-semibold text-yellow-800">
                  ボクシングリングが実質 {formatPrice(result.actualCost)} に！
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">対象補助金制度</h3>
            <div className="space-y-3 mb-6">
              {result.eligiblePrograms.map((program, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  <span className="text-gray-700">{program}</span>
                </div>
              ))}
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-3">主な要件</h4>
            <div className="space-y-2">
              {result.requirements.map((req, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 text-sm">{req}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>注意:</strong> 
                実際の補助金額は審査結果により異なります。
                詳細な申請サポートは弊社までご相談ください。
              </p>
            </div>
          </div>
        </div>
      )}
      
      {result && (
        <div className="mt-8 text-center">
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
            <a href="/contact">
              専門スタッフに無料相談する
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
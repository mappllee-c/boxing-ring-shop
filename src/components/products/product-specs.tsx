'use client'

import { Product } from '@/data/products'
import { 
  Ruler, 
  Package, 
  Shield, 
  Award, 
  Clock, 
  Wrench,
  CheckCircle,
  Info,
  Download,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductSpecsProps {
  product: Product
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const { specifications, features, warranty, deliveryTime } = product

  return (
    <div className="space-y-6">
      {/* 基本仕様 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Ruler className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">基本仕様</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">リングサイズ</span>
              <span className="font-medium">{specifications.size}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">総重量</span>
              <span className="font-medium">{specifications.weight}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">最大荷重</span>
              <span className="font-medium">{specifications.capacity}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">長さ</span>
              <span className="font-medium">{specifications.dimensions.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">幅</span>
              <span className="font-medium">{specifications.dimensions.width}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">高さ</span>
              <span className="font-medium">{specifications.dimensions.height}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 材質・構造 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Package className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">材質・構造</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">フレーム</h4>
            <p className="text-sm text-gray-600">{specifications.material.frame}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">マット</h4>
            <p className="text-sm text-gray-600">{specifications.material.mat}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">ロープ</h4>
            <p className="text-sm text-gray-600">{specifications.material.ropes}</p>
          </div>
        </div>
      </div>

      {/* 認証・規格 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Award className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">認証・規格</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {specifications.certification.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 特徴・機能 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">特徴・機能</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 py-1">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 配送・保証 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Shield className="h-5 w-5 text-orange-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">配送・保証・サポート</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <span className="text-sm font-medium text-gray-900">納期</span>
                <p className="text-sm text-gray-600">{deliveryTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <span className="text-sm font-medium text-gray-900">保証期間</span>
                <p className="text-sm text-gray-600">{warranty}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Wrench className="h-4 w-4 text-purple-600" />
              <div>
                <span className="text-sm font-medium text-gray-900">設置サービス</span>
                <p className="text-sm text-gray-600">
                  {product.price.installationIncluded ? '設置費込み' : '別途お見積り'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <div>
                <span className="text-sm font-medium text-gray-900">カスタマイズ</span>
                <p className="text-sm text-gray-600">
                  {product.customizable ? '対応可能' : '標準仕様のみ'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* タグ・用途 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Info className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">用途・適用場面</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 資料ダウンロード */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Download className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">資料ダウンロード</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            詳細仕様書をダウンロード
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            設置マニュアルをダウンロード
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            CADデータをダウンロード
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            補助金申請用資料
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          ※CADデータや詳細資料をご希望の場合は、お問い合わせフォームよりご連絡ください。
        </p>
      </div>

      {/* 重要な注意事項 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">ご注意事項</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 設置には十分なスペースと床の耐荷重をご確認ください</li>
              <li>• 組立・設置は専門業者による作業をおすすめします</li>
              <li>• カスタマイズをご希望の場合は、別途お見積りとなります</li>
              <li>• 納期は在庫状況により変動する場合があります</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
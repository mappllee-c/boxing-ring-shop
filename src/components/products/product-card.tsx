'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Product, formatPrice } from '@/data/products'
import { 
  Star, 
  Eye, 
  ShoppingCart, 
  MessageCircle, 
  Truck, 
  Shield,
  Badge
} from 'lucide-react'

interface ProductCardProps {
  product: Product
  showCategory?: boolean
  variant?: 'default' | 'compact' | 'featured'
}

export function ProductCard({ 
  product, 
  showCategory = false, 
  variant = 'default' 
}: ProductCardProps) {
  const categoryLabels = {
    standard: 'スタンダード',
    professional: 'プロフェッショナル',
    custom: 'カスタム'
  }

  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  return (
    <div className={`
      bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 
      border border-gray-100 hover:border-blue-200 group relative overflow-hidden
      ${isFeatured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
    `}>
      {/* 人気・おすすめバッジ */}
      {product.popularityScore >= 90 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current" />
            人気
          </span>
        </div>
      )}
      
      {/* 在庫状況バッジ */}
      {!product.inStock && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
            受注生産
          </span>
        </div>
      )}

      {/* 商品画像 */}
      <div className={`relative ${isCompact ? 'h-48' : 'h-64'} bg-gray-100 overflow-hidden`}>
        <Image
          src={product.images.main}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* ホバー時のクイックアクション */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary" className="bg-white hover:bg-gray-100">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white hover:bg-gray-100">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 商品情報 */}
      <div className={`p-4 ${isCompact ? 'p-3' : 'p-6'}`}>
        {/* カテゴリ表示 */}
        {showCategory && (
          <div className="mb-2">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {categoryLabels[product.category]}
            </span>
          </div>
        )}

        {/* 商品名 */}
        <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 ${
          isCompact ? 'text-sm' : 'text-lg'
        }`}>
          {product.name}
        </h3>

        {/* 商品説明 */}
        {!isCompact && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* 高額商品注意 */}
        {!isCompact && (
          <div className="bg-yellow-50 border border-yellow-200 p-2 rounded mb-3">
            <p className="text-yellow-800 text-xs">
              ⚠️ 高額商品のため事前相談必須
            </p>
          </div>
        )}

        {/* 主要スペック */}
        <div className={`${isCompact ? 'mb-2' : 'mb-4'} space-y-1`}>
          <div className="flex items-center text-sm text-gray-600">
            <Badge className="h-4 w-4 mr-2 text-blue-600" />
            <span>サイズ: {product.specifications.size}</span>
          </div>
          {!isCompact && (
            <>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-4 w-4 mr-2 text-green-600" />
                <span>納期: {product.deliveryTime}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-purple-600" />
                <span>保証: {product.warranty}</span>
              </div>
            </>
          )}
        </div>

        {/* 特徴タグ（非コンパクト時） */}
        {!isCompact && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 価格表示 */}
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className={`font-bold text-blue-600 ${
              isCompact ? 'text-lg' : 'text-2xl'
            }`}>
              {formatPrice(product.price.base)}
            </span>
            <span className="text-gray-500 text-sm ml-1">〜</span>
          </div>
          {product.price.installationIncluded && (
            <span className="text-green-600 text-xs font-medium">
              設置費込み
            </span>
          )}
          {!product.price.installationIncluded && (
            <span className="text-gray-500 text-xs">
              設置費別途
            </span>
          )}
          <div className="text-xs text-gray-500 mt-1">
            <p>※参考価格・要相談</p>
          </div>
        </div>

        {/* カスタマイズ可能性 */}
        {product.customizable && (
          <div className="mb-4">
            <span className="text-orange-600 text-xs font-medium bg-orange-50 px-2 py-1 rounded">
              カスタマイズ対応
            </span>
          </div>
        )}

        {/* アクションボタン */}
        <div className="space-y-2">
          <Link href={`/products/${product.category}/${product.id}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Eye className="h-4 w-4 mr-2" />
              詳細を見る
            </Button>
          </Link>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
              <MessageCircle className="h-4 w-4 mr-1" />
              見積もり
            </Button>
            <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
              <ShoppingCart className="h-4 w-4 mr-1" />
              お問合せ
            </Button>
          </div>
        </div>

        {/* 人気度表示（フィーチャード時） */}
        {isFeatured && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>人気度</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${product.popularityScore}%` }}
                  ></div>
                </div>
                <span>{product.popularityScore}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 商品カードリスト用のコンポーネント
interface ProductCardListProps {
  products: Product[]
  showCategory?: boolean
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function ProductCardList({ 
  products, 
  showCategory = false, 
  variant = 'default',
  className = ''
}: ProductCardListProps) {
  const gridCols = variant === 'compact' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid ${gridCols} gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          showCategory={showCategory}
          variant={variant}
        />
      ))}
    </div>
  )
}
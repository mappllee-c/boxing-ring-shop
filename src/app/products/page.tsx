'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCardList } from '@/components/products/product-card'
import { ProductFilter, applyFilters, FilterOptions } from '@/components/products/product-filter'
import { Button } from '@/components/ui/button'
import { products, categories, getPopularProducts } from '@/data/products'
import { 
  Grid3X3, 
  List, 
  Star, 
  TrendingUp, 
  Award, 
  ArrowRight,
  Sparkles,
  Target,
  Shield
} from 'lucide-react'

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    priceRange: [0, 3000000],
    inStock: null,
    customizable: null,
    sortBy: 'popularity',
    searchQuery: ''
  })

  const filteredProducts = useMemo(() => {
    return applyFilters(products, filters)
  }, [filters])

  const popularProducts = getPopularProducts(3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-blue-900 to-gray-900 text-white py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/images/products/boxing-industry-digitalization-2025.webp')" }}
        />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              プロ用ボクシングリング
              <span className="block text-yellow-300">商品カタログ</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              69万円から始められる本格的なボクシングリング。<br />
              スタンダードからプロ仕様まで、豊富なラインナップをご用意。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Target className="mr-2 h-5 w-5" />
                用途別に選ぶ
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Shield className="mr-2 h-5 w-5" />
                補助金について
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* サイドバー - フィルター */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <ProductFilter 
                onFilterChange={setFilters}
                totalCount={filteredProducts.length}
              />
              
              {/* 人気商品 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">人気商品</h3>
                </div>
                <div className="space-y-3">
                  {popularProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.category}/${product.id}`}
                      className="block p-3 border rounded hover:bg-gray-50 transition"
                    >
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-blue-600 font-semibold text-sm">
                        {new Intl.NumberFormat('ja-JP', {
                          style: 'currency',
                          currency: 'JPY',
                          minimumFractionDigits: 0,
                        }).format(product.price.base)}〜
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* カテゴリクイックリンク */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">カテゴリから選ぶ</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products/${category.slug}`}
                      className="block p-3 border rounded hover:bg-blue-50 hover:border-blue-200 transition group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {category.products.length}商品
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            {/* 検索結果ヘッダー */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    商品一覧
                    {filters.category && (
                      <span className="text-blue-600"> - {categories.find(c => c.id === filters.category)?.name}</span>
                    )}
                  </h2>
                  <p className="text-gray-600">
                    {filteredProducts.length}件の商品が見つかりました
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 特別なお知らせ */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">補助金活用で最大50%オフ！</h3>
                  <p className="text-green-700 text-sm mb-3">
                    設備投資補助金・ものづくり補助金を活用すれば、69万円のリングが実質34.5万円から導入可能です。
                  </p>
                  <Link href="/subsidy">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      補助金について詳しく見る
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 商品表示 */}
            {filteredProducts.length > 0 ? (
              <ProductCardList 
                products={filteredProducts}
                showCategory={!filters.category}
                variant={viewMode === 'list' ? 'default' : 'default'}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="max-w-md mx-auto">
                  <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    条件に合う商品が見つかりませんでした
                  </h3>
                  <p className="text-gray-600 mb-6">
                    検索条件を変更するか、フィルターをリセットしてお試しください。
                  </p>
                  <Button onClick={() => setFilters({
                    category: '',
                    priceRange: [0, 3000000],
                    inStock: null,
                    customizable: null,
                    sortBy: 'popularity',
                    searchQuery: ''
                  })}>
                    フィルターをリセット
                  </Button>
                </div>
              </div>
            )}

            {/* おすすめセクション */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <Award className="h-6 w-6 text-yellow-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    こちらの商品もおすすめです
                  </h3>
                </div>
                <ProductCardList 
                  products={popularProducts}
                  showCategory={true}
                  variant="compact"
                  className="grid-cols-1 md:grid-cols-3"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA セクション */}
      <section className="relative bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/images/consultation-support-2025.webp')" }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">お探しの商品が見つからない場合</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            カスタムオーダーやご相談も承っております。<br />
            専門スタッフがお客様のご要望に最適な商品をご提案いたします。
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                専門スタッフに相談する
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Product, categories } from '@/data/products'
import { Filter, X, Search, SlidersHorizontal } from 'lucide-react'

export interface FilterOptions {
  category: string
  priceRange: [number, number]
  inStock: boolean | null
  customizable: boolean | null
  sortBy: 'popularity' | 'price-low' | 'price-high' | 'name'
  searchQuery: string
}

interface ProductFilterProps {
  onFilterChange: (filters: FilterOptions) => void
  totalCount?: number
  className?: string
}

export function ProductFilter({ onFilterChange, totalCount, className = '' }: ProductFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: [0, 3000000],
    inStock: null,
    customizable: null,
    sortBy: 'popularity',
    searchQuery: ''
  })

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      category: 'all',
      priceRange: [0, 3000000],
      inStock: null,
      customizable: null,
      sortBy: 'popularity',
      searchQuery: ''
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = 
    filters.category !== '' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 3000000 ||
    filters.inStock !== null ||
    filters.customizable !== null ||
    filters.searchQuery !== ''

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {/* フィルターヘッダー */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">絞り込み検索</h3>
            {totalCount !== undefined && (
              <span className="text-sm text-gray-500">({totalCount}件)</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-4 w-4 mr-1" />
                リセット
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 検索バー（常に表示） */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="商品名・特徴で検索..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      {/* フィルター詳細（展開可能） */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 space-y-6">
          {/* 並び順 */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">並び順</Label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value as FilterOptions['sortBy'] })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">人気順</SelectItem>
                <SelectItem value="price-low">価格の安い順</SelectItem>
                <SelectItem value="price-high">価格の高い順</SelectItem>
                <SelectItem value="name">商品名順</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* カテゴリ */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">カテゴリ</Label>
            <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="すべてのカテゴリ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのカテゴリ</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 価格帯 */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">価格帯（万円）</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="number"
                  placeholder="最低価格"
                  value={filters.priceRange[0] / 10000}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) * 10000 || 0
                    updateFilters({ priceRange: [value, filters.priceRange[1]] })
                  }}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="最高価格"
                  value={filters.priceRange[1] / 10000}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) * 10000 || 3000000
                    updateFilters({ priceRange: [filters.priceRange[0], value] })
                  }}
                />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>69万円〜</span>
              <span>300万円</span>
            </div>
          </div>

          {/* 在庫状況 */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">在庫状況</Label>
            <Select 
              value={filters.inStock === null ? '' : filters.inStock.toString()} 
              onValueChange={(value) => {
                const inStock = value === '' ? null : value === 'true'
                updateFilters({ inStock })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="すべて" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="true">在庫あり</SelectItem>
                <SelectItem value="false">受注生産</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* カスタマイズ対応 */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">カスタマイズ</Label>
            <Select 
              value={filters.customizable === null ? '' : filters.customizable.toString()} 
              onValueChange={(value) => {
                const customizable = value === '' ? null : value === 'true'
                updateFilters({ customizable })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="すべて" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="true">カスタマイズ対応</SelectItem>
                <SelectItem value="false">標準仕様のみ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 価格帯のクイックフィルター */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">価格帯（クイック選択）</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={filters.priceRange[0] === 0 && filters.priceRange[1] === 1000000 ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ priceRange: [0, 1000000] })}
                className="text-xs"
              >
                100万円以下
              </Button>
              <Button
                variant={filters.priceRange[0] === 1000000 && filters.priceRange[1] === 2000000 ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ priceRange: [1000000, 2000000] })}
                className="text-xs"
              >
                100-200万円
              </Button>
              <Button
                variant={filters.priceRange[0] === 2000000 && filters.priceRange[1] === 3000000 ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ priceRange: [2000000, 3000000] })}
                className="text-xs"
              >
                200万円以上
              </Button>
              <Button
                variant={filters.priceRange[0] === 690000 && filters.priceRange[1] === 1000000 ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ priceRange: [690000, 1000000] })}
                className="text-xs"
              >
                69-100万円
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// フィルター適用ロジック
export function applyFilters(products: Product[], filters: FilterOptions): Product[] {
  let filtered = [...products]

  // 検索クエリ
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query)) ||
      product.features.some(feature => feature.toLowerCase().includes(query))
    )
  }

  // カテゴリ
  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category)
  }

  // 価格帯
  filtered = filtered.filter(product => 
    product.price.base >= filters.priceRange[0] && 
    product.price.base <= filters.priceRange[1]
  )

  // 在庫状況
  if (filters.inStock !== null) {
    filtered = filtered.filter(product => product.inStock === filters.inStock)
  }

  // カスタマイズ対応
  if (filters.customizable !== null) {
    filtered = filtered.filter(product => product.customizable === filters.customizable)
  }

  // ソート
  switch (filters.sortBy) {
    case 'popularity':
      filtered.sort((a, b) => b.popularityScore - a.popularityScore)
      break
    case 'price-low':
      filtered.sort((a, b) => a.price.base - b.price.base)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price.base - a.price.base)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'ja'))
      break
  }

  return filtered
}
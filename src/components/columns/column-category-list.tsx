import Link from 'next/link'
import { getAllColumnCategories } from '@/lib/columns'

interface ColumnCategoryListProps {
  currentCategory?: string
  showAll?: boolean
}

export function ColumnCategoryList({ currentCategory, showAll = true }: ColumnCategoryListProps) {
  const categories = getAllColumnCategories()

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">カテゴリ別コラム</h3>
      
      <div className="space-y-2">
        {showAll && (
          <Link
            href="/columns"
            className={`block px-4 py-3 rounded-lg transition-colors ${
              !currentCategory 
                ? 'bg-blue-100 text-blue-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>すべてのコラム</span>
            </div>
          </Link>
        )}
        
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/columns/category/${category.id}`}
            className={`block px-4 py-3 rounded-lg transition-colors ${
              currentCategory === category.id
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{category.icon}</span>
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {category.description}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
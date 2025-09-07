import Link from 'next/link'
import { ColumnPost } from '@/lib/types'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { getColumnCategoryInfo } from '@/lib/columns'

interface ColumnCardProps {
  post: ColumnPost
  featured?: boolean
  compact?: boolean
}

export function ColumnCard({ post, featured = false, compact = false }: ColumnCardProps) {
  const categoryInfo = getColumnCategoryInfo(post.category)

  if (featured) {
    return (
      <article className="group">
        <Link href={`/columns/${post.slug}`} className="block">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            {post.image && (
              <div className="aspect-video overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={340}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  categoryInfo?.color || 'bg-gray-100 text-gray-800'
                }`}>
                  {categoryInfo?.icon && <span>{categoryInfo.icon}</span>}
                  {post.categoryName}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs ${
                    post.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    post.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {post.difficulty === 'beginner' ? '初級' : 
                     post.difficulty === 'intermediate' ? '中級' : '上級'}
                  </span>
                  <span>{post.readingTime}分で読める</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <div className="font-medium text-gray-700">{post.author}</div>
                  <div>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</div>
                </div>
                <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  詳細を読む
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (compact) {
    return (
      <article className="group">
        <Link href={`/columns/${post.slug}`} className="block">
          <div className="flex gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            {post.image && (
              <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  categoryInfo?.color || 'bg-gray-100 text-gray-800'
                }`}>
                  {post.categoryName}
                </span>
                <span className="text-xs text-gray-500">{post.readingTime}分</span>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                {post.excerpt}
              </p>
              
              <div className="text-xs text-gray-500">
                {post.author} • {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group">
      <Link href={`/columns/${post.slug}`} className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
          {post.image && (
            <div className="aspect-video overflow-hidden">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                width={400}
                height={225}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                categoryInfo?.color || 'bg-gray-100 text-gray-800'
              }`}>
                {categoryInfo?.icon && <span>{categoryInfo.icon}</span>}
                {post.categoryName}
              </span>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className={`px-2 py-1 rounded text-xs ${
                  post.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  post.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {post.difficulty === 'beginner' ? '初級' : 
                   post.difficulty === 'intermediate' ? '中級' : '上級'}
                </span>
                <span>{post.readingTime}分</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div>
                <div className="font-medium text-gray-700">{post.author}</div>
                <div>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</div>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-gray-400">+{post.tags.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
import Link from 'next/link'
import { BlogPost } from '@/lib/types'
import { getCategoryInfo } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const categoryInfo = getCategoryInfo(post.category)
  
  return (
    <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden ${
      featured ? 'lg:col-span-1' : ''
    }`}>
      {post.image && (
        <div className="aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {categoryInfo && (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
              {categoryInfo.name}
            </span>
          )}
          <time dateTime={post.publishedAt} className="text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
          </time>
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-3 leading-tight ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>著者: {post.author}</span>
            <span>{post.readingTime}分で読める</span>
          </div>
          
          {post.featured && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
              注目記事
            </span>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            続きを読む
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
import { ColumnPost } from '@/lib/types'
import { ColumnCard } from './column-card'

interface RelatedColumnsProps {
  posts: ColumnPost[]
  title?: string
  maxPosts?: number
}

export function RelatedColumns({ 
  posts, 
  title = "関連コラム",
  maxPosts = 3 
}: RelatedColumnsProps) {
  if (posts.length === 0) return null

  const displayPosts = posts.slice(0, maxPosts)

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {title}
      </h2>
      
      <div className={`grid gap-8 ${
        displayPosts.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' :
        displayPosts.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
        'md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {displayPosts.map((post) => (
          <ColumnCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
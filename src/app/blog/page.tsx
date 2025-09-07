import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/blog-card'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'ボクシングリング選び方、補助金申請ガイド、メンテナンス方法など、業務用ボクシングリングに関する専門情報をお届けします。',
  openGraph: {
    title: 'ブログ | リングボクシング専門店',
    description: 'ボクシングリング選び方、補助金申請ガイド、メンテナンス方法など、業務用ボクシングリングに関する専門情報',
  }
}

const categories = [
  { id: 'subsidy', name: '補助金・助成金情報', description: '最新の補助金情報と申請方法' },
  { id: 'guide', name: 'ボクシングリング選び方', description: 'リング選びのポイントとおすすめ' },
  { id: 'maintenance', name: '設置・メンテナンス', description: '設置方法と日常のお手入れ' },
  { id: 'news', name: '業界ニュース', description: 'ボクシング業界の最新情報' }
]

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ボクシングリング専門ブログ
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              補助金申請から設置・メンテナンスまで、プロが教える業務用ボクシングリングのすべて
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* カテゴリ一覧 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            カテゴリ別記事
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.id}`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 注目記事 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            注目記事
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>

        {/* 最新記事 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            最新記事
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          
          {posts.length > 6 && (
            <div className="text-center mt-12">
              <Link
                href="/blog/all"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                すべての記事を見る
              </Link>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
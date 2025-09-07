import type { Metadata } from 'next'
import Link from 'next/link'
import { getColumnPosts, getFeaturedColumnPosts, getAllColumnCategories } from '@/lib/columns'
import { OptimizedImage } from '@/components/ui/optimized-image'

export const metadata: Metadata = {
  title: 'プロフェッショナルコラム | ボクシング業界の専門知識と洞察',
  description: 'ボクシング業界の専門家による深い洞察と分析。業界トレンド、ビジネス戦略、技術革新、グローバル市場動向など、プロが語る専門知識をお届けします。',
  keywords: 'ボクシング業界,専門コラム,業界分析,ビジネス戦略,技術革新,市場動向,プロフェッショナル',
  openGraph: {
    title: 'プロフェッショナルコラム | リングボクシング専門店',
    description: 'ボクシング業界の専門家による深い洞察と分析。業界の最新動向と専門知識をプロの視点で解説',
    type: 'website',
    images: [
      {
        url: '/images/columns/og-columns-professional-insights.jpg',
        width: 1200,
        height: 630,
        alt: 'ボクシング業界プロフェッショナルコラム'
      }
    ]
  },
  alternates: {
    canonical: '/columns'
  }
}

export default async function ColumnsPage() {
  const allPosts = await getColumnPosts()
  const featuredPosts = await getFeaturedColumnPosts()
  const categories = getAllColumnCategories()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'ボクシング業界プロフェッショナルコラム',
            description: 'ボクシング業界の専門家による深い洞察と分析コラム集',
            url: 'https://boxing-ring-shop.com/columns',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: allPosts.length,
              itemListElement: allPosts.slice(0, 10).map((post, index) => ({
                '@type': 'Article',
                position: index + 1,
                name: post.title,
                description: post.excerpt,
                author: {
                  '@type': 'Person',
                  name: post.author
                },
                datePublished: post.publishedAt,
                url: `https://boxing-ring-shop.com/columns/${post.slug}`
              }))
            },
            publisher: {
              '@type': 'Organization',
              name: 'リングボクシング専門店',
              url: 'https://boxing-ring-shop.com'
            }
          })
        }}
      />

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              プロフェッショナルコラム
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              ボクシング業界の専門家が語る深い洞察と分析。<br />
              技術革新・市場動向・経営戦略の最前線をお届けします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                月2-3本の新着コラム
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                業界専門家による執筆
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                データ・事例に基づく分析
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* カテゴリ一覧 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              専門分野別コラム
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              各分野の専門家が、深い知識と豊富な経験をもとに業界の最新動向を解説
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 注目コラム */}
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                注目のコラム
              </h2>
              <p className="text-gray-600 text-lg">
                専門家が厳選した必読コラム
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {featuredPosts.slice(0, 2).map((post) => (
                <article key={post.slug} className="group">
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
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            categories.find(c => c.id === post.category)?.color || 'bg-gray-100 text-gray-800'
                          }`}>
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
              ))}
            </div>
          </section>
        )}

        {/* 最新コラム */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              最新コラム
            </h2>
            <p className="text-gray-600 text-lg">
              業界の最新動向を専門家の視点で解説
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group">
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          categories.find(c => c.id === post.category)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.categoryName}
                        </span>
                        <span className="text-xs text-gray-500">{post.readingTime}分</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="text-xs text-gray-500">
                        <div className="font-medium">{post.author}</div>
                        <div>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
        </section>

        {/* ブログとの相互リンク */}
        <section className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              実践的な情報をお探しですか？
            </h3>
            <p className="text-gray-600 mb-6">
              補助金申請方法や設置・メンテナンス情報は専門ブログで詳しく解説しています
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-md"
            >
              実践ブログを見る
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
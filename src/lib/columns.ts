import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { ColumnPost, ColumnCategory, ColumnCategoryInfo, ColumnMetadata } from './types'

// Gray-matter equivalent function for parsing frontmatter
function parseFrontmatter(content: string) {
  const lines = content.split('\n')
  const data: Record<string, unknown> = {}
  let inFrontmatter = false
  let frontmatterEnd = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim() || ''
    
    if (line === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true
        continue
      } else {
        frontmatterEnd = i + 1
        break
      }
    }
    
    if (inFrontmatter && line.includes(':')) {
      const [key, ...valueParts] = line.split(':')
      if (!key) continue
      
      const value = valueParts.join(':').trim()
      
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '')
      
      // Handle arrays (tags)
      if (key.trim() === 'tags' && value.startsWith('[')) {
        data[key.trim()] = value.slice(1, -1).split(',').map(tag => tag.trim().replace(/^["']|["']$/g, ''))
      } else if (cleanValue === 'true') {
        data[key.trim()] = true
      } else if (cleanValue === 'false') {
        data[key.trim()] = false
      } else {
        data[key.trim()] = cleanValue
      }
    }
  }
  
  const bodyContent = lines.slice(frontmatterEnd).join('\n')
  
  return {
    data,
    content: bodyContent
  }
}

const columnsDirectory = join(process.cwd(), 'content/columns')

const categoryInfo: Record<ColumnCategory, ColumnCategoryInfo> = {
  'industry-trends': {
    id: 'industry-trends',
    name: '業界トレンド',
    description: 'ボクシング・格闘技業界の最新動向と将来展望を専門家が解説',
    color: 'bg-purple-100 text-purple-800',
    icon: '📈'
  },
  'business-insights': {
    id: 'business-insights',
    name: 'ビジネス洞察',
    description: 'ジム経営・スポーツビジネスの成功事例と戦略的アプローチ',
    color: 'bg-blue-100 text-blue-800',
    icon: '💡'
  },
  'technical-deep-dive': {
    id: 'technical-deep-dive',
    name: '技術深堀り',
    description: 'ボクシングリング製造技術・材料科学の専門知識を詳細解説',
    color: 'bg-green-100 text-green-800',
    icon: '🔬'
  },
  'global-market': {
    id: 'global-market',
    name: 'グローバル市場',
    description: '世界のボクシング市場動向・国際規格・輸出入トレンド分析',
    color: 'bg-orange-100 text-orange-800',
    icon: '🌍'
  },
  'innovation': {
    id: 'innovation',
    name: 'イノベーション',
    description: '最新技術・デジタル化・サステナビリティの業界革新事例',
    color: 'bg-red-100 text-red-800',
    icon: '🚀'
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 350 // 専門コラムは少し時間をかけて読む想定
  const wordCount = content.length
  return Math.ceil(wordCount / wordsPerMinute)
}

function parseMarkdown(fileContents: string, slug: string): ColumnPost {
  const { data, content } = parseFrontmatter(fileContents)
  const metadata = data as unknown as ColumnMetadata

  if (!metadata.title || !metadata.excerpt || !metadata.category || !metadata.author || !metadata.publishedAt) {
    throw new Error(`Missing required metadata in ${slug}`)
  }

  const categoryData = categoryInfo[metadata.category]
  if (!categoryData) {
    throw new Error(`Invalid category in ${slug}: ${metadata.category}`)
  }

  return {
    id: slug,
    slug,
    title: metadata.title,
    excerpt: metadata.excerpt,
    content,
    category: metadata.category,
    categoryName: categoryData.name,
    author: metadata.author,
    publishedAt: metadata.publishedAt,
    updatedAt: (metadata.updatedAt || metadata.publishedAt) as string,
    image: metadata.image || '',
    tags: metadata.tags || [],
    readingTime: calculateReadingTime(content),
    featured: metadata.featured || false,
    difficulty: metadata.difficulty || 'intermediate',
    createdAt: new Date(metadata.publishedAt as string)
  }
}

export async function getColumnPosts(): Promise<ColumnPost[]> {
  if (!existsSync(columnsDirectory)) {
    return []
  }

  const fileNames = readdirSync(columnsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = join(columnsDirectory, fileName)
      const fileContents = readFileSync(fullPath, 'utf8')
      
      return parseMarkdown(fileContents, slug)
    })

  return allPostsData.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getColumnPost(slug: string): Promise<ColumnPost | null> {
  try {
    const fullPath = join(columnsDirectory, `${slug}.md`)
    
    if (!existsSync(fullPath)) {
      return null
    }

    const fileContents = readFileSync(fullPath, 'utf8')
    return parseMarkdown(fileContents, slug)
  } catch (error) {
    console.error(`Error reading column post ${slug}:`, error)
    return null
  }
}

export async function getColumnPostsByCategory(category: ColumnCategory): Promise<ColumnPost[]> {
  const allPosts = await getColumnPosts()
  return allPosts.filter(post => post.category === category)
}

export function getColumnCategoryInfo(category: string): ColumnCategoryInfo | null {
  return categoryInfo[category as ColumnCategory] || null
}

export function getAllColumnCategories(): ColumnCategoryInfo[] {
  return Object.values(categoryInfo)
}

export async function getFeaturedColumnPosts(): Promise<ColumnPost[]> {
  const allPosts = await getColumnPosts()
  return allPosts.filter(post => post.featured)
}

export async function getRelatedColumnPosts(currentSlug: string, category: ColumnCategory, limit = 3): Promise<ColumnPost[]> {
  const categoryPosts = await getColumnPostsByCategory(category)
  return categoryPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit)
}

export async function getColumnPostsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<ColumnPost[]> {
  const allPosts = await getColumnPosts()
  return allPosts.filter(post => post.difficulty === difficulty)
}

export async function getTrendingColumnPosts(limit = 5): Promise<ColumnPost[]> {
  const allPosts = await getColumnPosts()
  // 実際の実装では viewCount でソートするが、サンプルでは日付順
  return allPosts
    .filter(post => post.featured || post.tags?.includes('トレンド'))
    .slice(0, limit)
}
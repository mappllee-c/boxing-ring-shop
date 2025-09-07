import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { BlogPost, BlogCategory, BlogCategoryInfo, BlogMetadata } from './types'

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

const postsDirectory = join(process.cwd(), 'content/blog')

const categoryInfo: Record<BlogCategory, BlogCategoryInfo> = {
  subsidy: {
    id: 'subsidy',
    name: '補助金・助成金情報',
    description: '最新の補助金情報と申請方法について詳しく解説',
    color: 'bg-green-100 text-green-800'
  },
  guide: {
    id: 'guide',
    name: 'ボクシングリング選び方',
    description: 'リング選びのポイントとおすすめ商品をご紹介',
    color: 'bg-blue-100 text-blue-800'
  },
  maintenance: {
    id: 'maintenance',
    name: '設置・メンテナンス',
    description: '設置方法と日常のお手入れについて',
    color: 'bg-orange-100 text-orange-800'
  },
  news: {
    id: 'news',
    name: '業界ニュース',
    description: 'ボクシング業界の最新情報をお届け',
    color: 'bg-purple-100 text-purple-800'
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 400 // 日本語の場合の目安
  const wordCount = content.length
  return Math.ceil(wordCount / wordsPerMinute)
}

function parseMarkdown(fileContents: string, slug: string): BlogPost {
  const { data, content } = parseFrontmatter(fileContents)
  const metadata = data as unknown as BlogMetadata

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
    createdAt: new Date(metadata.publishedAt as string)
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!existsSync(postsDirectory)) {
    return []
  }

  const fileNames = readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = join(postsDirectory, fileName)
      const fileContents = readFileSync(fullPath, 'utf8')
      
      return parseMarkdown(fileContents, slug)
    })

  return allPostsData.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`)
    
    if (!existsSync(fullPath)) {
      return null
    }

    const fileContents = readFileSync(fullPath, 'utf8')
    return parseMarkdown(fileContents, slug)
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export async function getBlogPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts()
  return allPosts.filter(post => post.category === category)
}

export function getCategoryInfo(category: string): BlogCategoryInfo | null {
  return categoryInfo[category as BlogCategory] || null
}

export function getAllCategories(): BlogCategoryInfo[] {
  return Object.values(categoryInfo)
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts()
  return allPosts.filter(post => post.featured)
}

export async function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): Promise<BlogPost[]> {
  const categoryPosts = await getBlogPostsByCategory(category)
  return categoryPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit)
}
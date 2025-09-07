/**
 * 共通型定義
 * アプリケーション全体で使用される型の定義
 */

// 基本的なエンティティの型定義
export interface BaseEntity {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

// API レスポンスの型定義
export interface ApiResponse<T = unknown> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
  readonly message?: string
}

export interface ApiError {
  readonly error: string
  readonly message?: string
  readonly details?: unknown
}

// フォーム送信結果の型定義
export interface FormSubmissionResult {
  readonly success: boolean
  readonly message: string
  readonly error?: string
}

// 製品関連の型定義
export interface ProductImage {
  readonly url: string
  readonly alt: string
  readonly width?: number
  readonly height?: number
}

export interface ProductSpec {
  readonly label: string
  readonly value: string
  readonly unit?: string
}

export interface Product extends BaseEntity {
  readonly name: string
  readonly category: ProductCategory
  readonly price: number
  readonly description: string
  readonly images: readonly ProductImage[]
  readonly specs: readonly ProductSpec[]
  readonly features: readonly string[]
  readonly isAvailable: boolean
  readonly warranty: string
}

// 製品カテゴリの型定義
export type ProductCategory = 
  | 'compact'
  | 'training'
  | 'standard'
  | 'youth'
  | 'professional'
  | 'custom'

// 補助金関連の型定義
export interface SubsidyType {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly maxAmount: number
  readonly rate: number
  readonly eligibility: readonly string[]
}

// ユーザー関連の型定義
export interface ContactInfo {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly company?: string
}

// フォーム状態の型定義
export interface FormState<T> {
  readonly data: T
  readonly errors: Partial<Record<keyof T, string>>
  readonly isSubmitting: boolean
  readonly isValid: boolean
}

// ページネーション関連の型定義
export interface PaginationParams {
  readonly page: number
  readonly limit: number
}

export interface PaginatedResponse<T> {
  readonly items: readonly T[]
  readonly total: number
  readonly page: number
  readonly limit: number
  readonly hasNext: boolean
  readonly hasPrev: boolean
}

// 検索・フィルター関連の型定義
export interface SearchParams {
  readonly query?: string
  readonly category?: ProductCategory
  readonly minPrice?: number
  readonly maxPrice?: number
  readonly sortBy?: 'price' | 'name' | 'createdAt'
  readonly sortOrder?: 'asc' | 'desc'
}

// セキュリティ関連の型定義
export interface RateLimitInfo {
  readonly allowed: boolean
  readonly remainingRequests: number
  readonly resetTime: number
  readonly message?: string
}

// 設定関連の型定義
export interface AppConfig {
  readonly apiBaseUrl: string
  readonly rateLimit: {
    readonly windowMs: number
    readonly maxRequests: number
  }
  readonly features: {
    readonly enableToasts: boolean
    readonly enableAnalytics: boolean
  }
}

// ユーティリティ型
export type NonEmptyArray<T> = readonly [T, ...T[]]

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// 型ガード
export function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    typeof (obj as ApiError).error === 'string'
  )
}

export function isProduct(obj: unknown): obj is Product {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'category' in obj &&
    'price' in obj &&
    typeof (obj as Product).id === 'string' &&
    typeof (obj as Product).name === 'string' &&
    typeof (obj as Product).price === 'number'
  )
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function isValidEmail(email: unknown): email is string {
  if (typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: unknown): phone is string {
  if (typeof phone !== 'string') return false
  const phoneRegex = /^[\d\-\(\)\s]+$/
  return phoneRegex.test(phone) && phone.replace(/[\D]/g, '').length >= 10
}

// 型変換ユーティリティ
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`)
}

export function ensureArray<T>(value: T | readonly T[]): readonly T[] {
  return Array.isArray(value) ? value : [value as T]
}

export function parseNumber(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? null : parsed
  }
  return null
}

// ブログ関連の型定義
export interface BlogPost extends Omit<BaseEntity, 'updatedAt'> {
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly content: string
  readonly category: BlogCategory
  readonly categoryName: string
  readonly author: string
  readonly publishedAt: string
  readonly updatedAt: string
  readonly image?: string
  readonly tags?: readonly string[]
  readonly readingTime: number
  readonly featured: boolean
}

export type BlogCategory = 'subsidy' | 'guide' | 'maintenance' | 'news'

export interface BlogCategoryInfo {
  readonly id: BlogCategory
  readonly name: string
  readonly description: string
  readonly color: string
}

export interface BlogMetadata {
  readonly title: string
  readonly excerpt: string
  readonly category: BlogCategory
  readonly author: string
  readonly publishedAt: string
  readonly updatedAt?: string
  readonly image?: string
  readonly tags?: readonly string[]
  readonly featured?: boolean
}

// コラム関連の型定義
export interface ColumnPost extends Omit<BaseEntity, 'updatedAt'> {
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly content: string
  readonly category: ColumnCategory
  readonly categoryName: string
  readonly author: string
  readonly publishedAt: string
  readonly updatedAt: string
  readonly image?: string
  readonly tags?: readonly string[]
  readonly readingTime: number
  readonly featured: boolean
  readonly viewCount?: number
  readonly difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export type ColumnCategory = 'industry-trends' | 'business-insights' | 'technical-deep-dive' | 'global-market' | 'innovation'

export interface ColumnCategoryInfo {
  readonly id: ColumnCategory
  readonly name: string
  readonly description: string
  readonly color: string
  readonly icon: string
}

export interface ColumnMetadata {
  readonly title: string
  readonly excerpt: string
  readonly category: ColumnCategory
  readonly author: string
  readonly publishedAt: string
  readonly updatedAt?: string
  readonly image?: string
  readonly tags?: readonly string[]
  readonly featured?: boolean
  readonly difficulty?: 'beginner' | 'intermediate' | 'advanced'
}
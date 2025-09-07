/**
 * レート制限機能
 * DoS攻撃やスパム防止のための制限機能
 */

interface RateLimitData {
  count: number
  resetTime: number
}

// メモリベースのレート制限ストレージ（本番環境ではRedisなどを使用）
const rateLimitStore = new Map<string, RateLimitData>()

export interface RateLimitOptions {
  windowMs: number  // 時間窓（ミリ秒）
  maxRequests: number  // 最大リクエスト数
  keyGenerator?: (req: Request) => string  // キー生成関数
}

export interface RateLimitResult {
  allowed: boolean
  remainingRequests: number
  resetTime: number
  message?: string
}

/**
 * レート制限チェック
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now()
  
  // 古いエントリを削除
  cleanupExpiredEntries()
  
  let rateLimitData = rateLimitStore.get(key)
  
  if (!rateLimitData || rateLimitData.resetTime <= now) {
    // 新しい時間窓の開始
    rateLimitData = {
      count: 1,
      resetTime: now + options.windowMs
    }
    rateLimitStore.set(key, rateLimitData)
    
    return {
      allowed: true,
      remainingRequests: options.maxRequests - 1,
      resetTime: rateLimitData.resetTime
    }
  }
  
  if (rateLimitData.count >= options.maxRequests) {
    // 制限に達している
    return {
      allowed: false,
      remainingRequests: 0,
      resetTime: rateLimitData.resetTime,
      message: `Rate limit exceeded. Try again in ${Math.ceil((rateLimitData.resetTime - now) / 1000)} seconds.`
    }
  }
  
  // カウントを増加
  rateLimitData.count++
  rateLimitStore.set(key, rateLimitData)
  
  return {
    allowed: true,
    remainingRequests: options.maxRequests - rateLimitData.count,
    resetTime: rateLimitData.resetTime
  }
}

/**
 * IPアドレスベースのレート制限
 */
export function rateLimitByIP(
  request: Request,
  options: Partial<RateLimitOptions> = {}
): RateLimitResult {
  const defaultOptions: RateLimitOptions = {
    windowMs: 15 * 60 * 1000, // 15分
    maxRequests: 100, // 15分間に100リクエスト
    ...options
  }
  
  const ip = getClientIP(request)
  const key = `ip:${ip}`
  
  return checkRateLimit(key, defaultOptions)
}

/**
 * フォーム送信用のレート制限（より厳しい制限）
 */
export function rateLimitFormSubmission(
  request: Request,
  formType: string,
  options: Partial<RateLimitOptions> = {}
): RateLimitResult {
  const defaultOptions: RateLimitOptions = {
    windowMs: 60 * 1000, // 1分
    maxRequests: 5, // 1分間に5回まで
    ...options
  }
  
  const ip = getClientIP(request)
  const key = `form:${formType}:${ip}`
  
  return checkRateLimit(key, defaultOptions)
}

/**
 * ユーザー単位のレート制限
 */
export function rateLimitByUser(
  userEmail: string,
  options: Partial<RateLimitOptions> = {}
): RateLimitResult {
  const defaultOptions: RateLimitOptions = {
    windowMs: 60 * 60 * 1000, // 1時間
    maxRequests: 50, // 1時間に50リクエスト
    ...options
  }
  
  const key = `user:${userEmail}`
  
  return checkRateLimit(key, defaultOptions)
}

/**
 * クライアントIPアドレスを取得
 */
function getClientIP(request: Request): string {
  // Next.jsの場合、複数のヘッダーをチェック
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddr = request.headers.get('x-forwarded-for')
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown'
  }
  
  if (realIP) {
    return realIP
  }
  
  if (remoteAddr) {
    return remoteAddr
  }
  
  // フォールバック
  return 'unknown'
}

/**
 * 期限切れのエントリを削除
 */
function cleanupExpiredEntries(): void {
  const now = Date.now()
  
  const keysToDelete: string[] = []
  
  rateLimitStore.forEach((data, key) => {
    if (data.resetTime <= now) {
      keysToDelete.push(key)
    }
  })
  
  keysToDelete.forEach(key => {
    rateLimitStore.delete(key)
  })
}

/**
 * レート制限をリセット（テスト用）
 */
export function resetRateLimit(key?: string): void {
  if (key) {
    rateLimitStore.delete(key)
  } else {
    rateLimitStore.clear()
  }
}

/**
 * 現在のレート制限状況を取得（デバッグ用）
 */
export function getRateLimitStatus(): Map<string, RateLimitData> {
  return new Map(rateLimitStore)
}

/**
 * レート制限エラーのレスポンス生成
 */
export function createRateLimitResponse(result: RateLimitResult): Response {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-RateLimit-Limit': '100',
    'X-RateLimit-Remaining': result.remainingRequests.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
    'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString()
  })
  
  return new Response(
    JSON.stringify({
      error: 'Rate limit exceeded',
      message: result.message || 'Too many requests',
      retryAfter: result.resetTime
    }),
    {
      status: 429,
      headers
    }
  )
}
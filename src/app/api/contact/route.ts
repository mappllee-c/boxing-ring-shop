import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema, estimateFormSchema, type EstimateFormData, type ContactFormData } from '@/lib/validations'
import { sanitizeFormData } from '@/lib/sanitize'
import { rateLimitFormSubmission, createRateLimitResponse, type RateLimitResult } from '@/lib/rate-limit'
import { 
  isObject, 
  isString, 
  isNonEmptyString, 
  isContactFormData, 
  isEstimateFormData, 
  assertIsDefined 
} from '@/lib/type-guards'
import { ZodError } from 'zod'

// API レスポンス型定義
interface ApiSuccessResponse {
  success: true
  message: string
  data?: unknown
}

interface ApiErrorResponse {
  success: false
  error: string
  message?: string
  details?: unknown
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse

// フォーム種別の厳密な型定義
type FormType = 'contact' | 'estimate'

// リクエストボディの型定義
interface RequestBody {
  type: FormType
  [key: string]: unknown
}

// 型ガード: リクエストボディの検証
function isValidRequestBody(body: unknown): body is RequestBody {
  if (!isObject(body)) return false
  
  if (!('type' in body)) return false
  
  const type = body.type
  if (!isString(type) || (type !== 'contact' && type !== 'estimate')) {
    return false
  }
  
  return true
}

// 安全なJSONパースヘルパー
async function parseJsonSafely(request: NextRequest): Promise<unknown> {
  try {
    const text = await request.text()
    
    if (!text || text.trim() === '') {
      throw new Error('Empty request body')
    }
    
    return JSON.parse(text)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format')
    }
    throw error
  }
}

// エラーレスポンス生成ヘルパー
function createErrorResponse(
  error: string, 
  status: number, 
  details?: unknown
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { 
      success: false, 
      error, 
      details: process.env.NODE_ENV === 'development' ? details : undefined 
    },
    { status }
  )
}

// 成功レスポンス生成ヘルパー
function createSuccessResponse(
  message: string, 
  data?: unknown
): NextResponse<ApiSuccessResponse> {
  return NextResponse.json(
    { 
      success: true, 
      message, 
      data 
    },
    { status: 200 }
  )
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // リクエストオブジェクトの基本検証
    assertIsDefined(request, 'Request object is required')
    
    // レート制限チェック
    const rateLimitResult: RateLimitResult = rateLimitFormSubmission(request, 'contact', {
      windowMs: 60 * 1000, // 1分
      maxRequests: 3 // 1分間に3回まで
    })
    
    if (!rateLimitResult.allowed) {
      return createRateLimitResponse(rateLimitResult) as NextResponse<ApiResponse>
    }
    
    // 安全なJSONパース
    const body = await parseJsonSafely(request)
    
    // リクエストボディの型検証
    if (!isValidRequestBody(body)) {
      return createErrorResponse(
        '無効なリクエスト形式です。正しいフォーマットでデータを送信してください。',
        400,
        { receivedType: typeof body, hasType: 'type' in (body as object) }
      )
    }
    
    const { type, ...rawData } = body
    
    // 入力値のサニタイゼーション
    const sanitizedData = sanitizeFormData(rawData)
    assertIsDefined(sanitizedData, 'Sanitized data is required')

    // フォームタイプに応じた厳密な型検証とバリデーション
    let validatedData: EstimateFormData | ContactFormData
    
    if (type === 'estimate') {
      // 事前の型ガードチェック
      if (!isEstimateFormData(sanitizedData)) {
        return createErrorResponse(
          '見積もりフォームのデータ形式が正しくありません。',
          400,
          { formType: type, missingFields: getMissingEstimateFields(sanitizedData) }
        )
      }
      
      try {
        validatedData = estimateFormSchema.parse(sanitizedData)
      } catch (error) {
        if (error instanceof ZodError) {
          return createErrorResponse(
            '見積もりフォームのバリデーションに失敗しました。',
            400,
            { validationErrors: error.errors }
          )
        }
        throw error
      }
    } else if (type === 'contact') {
      // 事前の型ガードチェック
      if (!isContactFormData(sanitizedData)) {
        return createErrorResponse(
          'お問い合わせフォームのデータ形式が正しくありません。',
          400,
          { formType: type, missingFields: getMissingContactFields(sanitizedData) }
        )
      }
      
      try {
        validatedData = contactFormSchema.parse(sanitizedData)
      } catch (error) {
        if (error instanceof ZodError) {
          return createErrorResponse(
            'お問い合わせフォームのバリデーションに失敗しました。',
            400,
            { validationErrors: error.errors }
          )
        }
        throw error
      }
    } else {
      // TypeScriptの型システムにより、ここには到達しないはず
      return createErrorResponse(
        '無効なフォームタイプです。',
        400,
        { receivedType: type }
      )
    }

    // LINE送信処理
    try {
      const { sendContactToLine, isLineConfigured } = await import('@/lib/line')
      
      if (isLineConfigured()) {
        await sendContactToLine(type, validatedData)
      } else {
        console.warn('LINE設定が不完全です。環境変数を確認してください。')
        // 開発環境では警告のみ、本番環境ではメール送信等のフォールバック処理を実装
        if (process.env.NODE_ENV === 'production') {
          // 本番環境ではメール送信をフォールバックとして使用
          try {
            const { sendEmail } = await import('@/lib/email')
            await sendEmail(type, validatedData)
          } catch (emailError) {
            console.error('フォールバックメール送信エラー:', emailError)
          }
        }
      }
    } catch (lineError) {
      console.error('LINE送信エラー:', lineError)
      // LINE送信に失敗した場合のフォールバック処理
      try {
        const { sendEmail } = await import('@/lib/email')
        await sendEmail(type, validatedData)
        console.log('メール送信でフォールバック完了')
      } catch (emailError) {
        console.error('フォールバックメール送信エラー:', emailError)
      }
    }
    
    // データベース保存処理（将来の実装用）
    // await saveToDatabase(type, validatedData)
    
    // 開発環境でのデータ確認用
    if (process.env.NODE_ENV === 'development') {
      console.log('フォームデータ:', JSON.stringify(validatedData, null, 2))
    }
    
    // タイプに応じた成功メッセージ
    const successMessage = type === 'estimate' 
      ? '見積もり依頼を受付ました。1営業日以内にご連絡いたします。'
      : 'お問い合わせを受付ました。1営業日以内にご連絡いたします。'
    
    return createSuccessResponse(successMessage, {
      type,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    // 詳細なエラーハンドリング
    console.error('Contact API Error:', error)
    
    if (error instanceof ZodError) {
      return createErrorResponse(
        'バリデーションエラーが発生しました。入力内容を確認してください。',
        400,
        { validationErrors: error.errors }
      )
    }
    
    if (error instanceof Error) {
      // レート制限エラーの場合
      if (error.message.includes('Rate limit')) {
        return createErrorResponse(
          '送信頻度が高すぎます。しばらく時間をおいてから再度お試しください。',
          429,
          { errorType: 'rate_limit' }
        )
      }
      
      // JSON パースエラー
      if (error.message.includes('Invalid JSON') || error.message.includes('Empty request body')) {
        return createErrorResponse(
          'リクエストの形式が正しくありません。',
          400,
          { errorType: 'json_parse', originalError: error.message }
        )
      }
      
      // 型アサーションエラー
      if (error.message.includes('Type assertion') || error.message.includes('undefined or null')) {
        return createErrorResponse(
          '必須データが不足しています。',
          400,
          { errorType: 'type_assertion', originalError: error.message }
        )
      }
    }

    // 未知のエラー
    return createErrorResponse(
      'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。',
      500,
      { errorType: 'unknown', originalError: error instanceof Error ? error.message : 'Unknown error' }
    )
  }
}

// 不足しているフィールドを特定するヘルパー関数
function getMissingEstimateFields(data: unknown): string[] {
  if (!isObject(data)) return ['Invalid data format']
  
  const required = ['name', 'phone', 'ringType', 'ringSize', 'budget', 'usage']
  const missing: string[] = []
  
  for (const field of required) {
    if (!(field in data) || !isNonEmptyString(data[field])) {
      missing.push(field)
    }
  }
  
  return missing
}

function getMissingContactFields(data: unknown): string[] {
  if (!isObject(data)) return ['Invalid data format']
  
  const required = ['name', 'phone', 'subject', 'message', 'contactMethod']
  const missing: string[] = []
  
  for (const field of required) {
    if (!(field in data) || !isNonEmptyString(data[field])) {
      missing.push(field)
    }
  }
  
  return missing
}

// 将来のメール送信機能用（現在は未使用）
// 
// generateEmailContent 関数は将来のメール送信機能実装時に使用予定
// 現在は型安全性の向上を優先し、未使用の関数は削除
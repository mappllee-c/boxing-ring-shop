import { NextRequest, NextResponse } from 'next/server'
import { subsidySupportSchema, type SubsidySupportData } from '@/lib/validations'
import { sanitizeFormData } from '@/lib/sanitize'
import { rateLimitFormSubmission, createRateLimitResponse, type RateLimitResult } from '@/lib/rate-limit'
import { 
  isObject, 
  isSubsidySupportData, 
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

// 不足しているフィールドを特定するヘルパー関数
function getMissingSubsidyFields(data: unknown): string[] {
  if (!isObject(data)) return ['Invalid data format']
  
  const required = ['name', 'email', 'phone', 'company', 'companyType', 'businessType', 'interestedProduct', 'expectedInstallation', 'preferredContact']
  const missing: string[] = []
  
  for (const field of required) {
    if (!(field in data)) {
      missing.push(field)
    }
  }
  
  return missing
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // リクエストオブジェクトの基本検証
    assertIsDefined(request, 'Request object is required')
    
    // レート制限チェック
    const rateLimitResult: RateLimitResult = rateLimitFormSubmission(request, 'subsidy-support', {
      windowMs: 60 * 1000, // 1分
      maxRequests: 2 // 1分間に2回まで
    })
    
    if (!rateLimitResult.allowed) {
      return createRateLimitResponse(rateLimitResult) as NextResponse<ApiResponse>
    }
    
    // 安全なJSONパース
    const body = await parseJsonSafely(request)
    
    // リクエストボディの型検証
    if (!isObject(body)) {
      return createErrorResponse(
        '無効なリクエスト形式です。正しいフォーマットでデータを送信してください。',
        400,
        { receivedType: typeof body }
      )
    }
    
    // 入力値のサニタイゼーション
    const sanitizedData = sanitizeFormData(body)
    assertIsDefined(sanitizedData, 'Sanitized data is required')
    
    // 事前の型ガードチェック
    if (!isSubsidySupportData(sanitizedData)) {
      return createErrorResponse(
        '補助金申請サポートフォームのデータ形式が正しくありません。',
        400,
        { missingFields: getMissingSubsidyFields(sanitizedData) }
      )
    }
    
    // 厳密なバリデーション
    let validatedData: SubsidySupportData
    
    try {
      validatedData = subsidySupportSchema.parse(sanitizedData)
    } catch (error) {
      if (error instanceof ZodError) {
        return createErrorResponse(
          '補助金申請サポートフォームのバリデーションに失敗しました。',
          400,
          { validationErrors: error.errors }
        )
      }
      throw error
    }

    // メール送信処理
    // const emailContent = generateEmailContent(validatedData)
    
    // 実際のメール送信処理はここに実装
    // await sendEmail(emailContent)
    
    // データベース保存処理
    // await saveSubsidySupportToDatabase(validatedData)
    
    // 一時的な確認用（本番環境では削除）
    void validatedData
    
    return createSuccessResponse(
      '補助金申請サポートのご依頼を受付ました。専門スタッフより1営業日以内にご連絡いたします。',
      {
        applicationId: `subsidy-${Date.now()}`,
        timestamp: new Date().toISOString(),
        companyType: validatedData.companyType,
        businessType: validatedData.businessType
      }
    )

  } catch (error) {
    // 詳細なエラーハンドリング
    console.error('Subsidy Support API Error:', error)
    
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

// 将来のメール送信機能用（現在は未使用）
// 
// generateEmailContent 関数は将来のメール送信機能実装時に使用予定
// 現在は型安全性の向上を優先し、未使用の関数は削除
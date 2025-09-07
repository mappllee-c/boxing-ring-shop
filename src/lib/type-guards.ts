/**
 * 型ガード関数集
 * runtime時の型安全性を保証するための関数群
 */

import type { 
  EstimateFormData, 
  ContactFormData, 
  SubsidySupportData 
} from './validations'

// 基本的な型ガード
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}

// 文字列関連の型ガード
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0
}

export function isValidEmail(value: unknown): value is string {
  if (!isString(value)) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export function isValidPhone(value: unknown): value is string {
  if (!isString(value)) return false
  // 日本の電話番号形式（ハイフン、括弧、スペースを含む）
  const phoneRegex = /^[\d\-\(\)\s+]+$/
  const digitsOnly = value.replace(/[\D]/g, '')
  return phoneRegex.test(value) && digitsOnly.length >= 10 && digitsOnly.length <= 15
}

export function isValidUrl(value: unknown): value is string {
  if (!isString(value)) return false
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

// 数値関連の型ガード
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0
}

export function isNonNegativeNumber(value: unknown): value is number {
  return isNumber(value) && value >= 0
}

export function isValidPrice(value: unknown): value is number {
  return isPositiveNumber(value) && value <= 100000000 // 1億円以下
}

// 配列関連の型ガード
export function isNonEmptyArray<T>(value: unknown): value is [T, ...T[]] {
  return isArray(value) && value.length > 0
}

export function isStringArray(value: unknown): value is string[] {
  return isArray(value) && value.every(isString)
}

// フォームデータの型ガード
export function isEstimateFormData(value: unknown): value is EstimateFormData {
  if (!isObject(value)) return false
  
  const required = ['name', 'email', 'phone', 'ringType', 'ringSize', 'budget', 'usage']
  
  for (const field of required) {
    if (!(field in value) || !isNonEmptyString(value[field])) {
      return false
    }
  }
  
  return (
    isValidEmail(value.email) &&
    isValidPhone(value.phone) &&
    isBoolean(value.subsidySupport)
  )
}

export function isContactFormData(value: unknown): value is ContactFormData {
  if (!isObject(value)) return false
  
  const required = ['name', 'email', 'phone', 'subject', 'message', 'contactMethod']
  
  for (const field of required) {
    if (!(field in value) || !isNonEmptyString(value[field])) {
      return false
    }
  }
  
  return (
    isValidEmail(value.email) &&
    isValidPhone(value.phone) &&
    isNonEmptyString(value.message) &&
    (value.message as string).length >= 10
  )
}


export function isSubsidySupportData(value: unknown): value is SubsidySupportData {
  if (!isObject(value)) return false
  
  const required = ['name', 'email', 'phone', 'company', 'companyType', 'businessType', 'interestedProduct', 'expectedInstallation', 'preferredContact']
  
  for (const field of required) {
    if (!(field in value) || !isNonEmptyString(value[field])) {
      return false
    }
  }
  
  return (
    isValidEmail(value.email) &&
    isValidPhone(value.phone)
  )
}

// API関連の型ガード
export function isApiSuccessResponse<T>(value: unknown): value is { success: true; data: T; message?: string } {
  return (
    isObject(value) &&
    'success' in value &&
    value.success === true &&
    'data' in value
  )
}

export function isApiErrorResponse(value: unknown): value is { success: false; error: string; message?: string } {
  return (
    isObject(value) &&
    'success' in value &&
    value.success === false &&
    'error' in value &&
    isString(value.error)
  )
}

// ブラウザ環境チェック
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

export function isServer(): boolean {
  return typeof window === 'undefined'
}

// ファイル関連の型ガード
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  return (
    validTypes.includes(file.type) &&
    file.size <= maxSize &&
    file.size > 0
  )
}

// 日付関連の型ガード
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function isValidDateString(value: unknown): value is string {
  if (!isString(value)) return false
  const date = new Date(value)
  return isValidDate(date)
}

export function isFutureDate(date: Date): boolean {
  return isValidDate(date) && date.getTime() > Date.now()
}

// 環境変数の型ガード
export function isValidEnvVar(value: unknown): value is string {
  return isNonEmptyString(value)
}

// エラーオブジェクトの型ガード
export function isError(value: unknown): value is Error {
  return value instanceof Error
}

export function isErrorWithMessage(value: unknown): value is { message: string } {
  return (
    isObject(value) &&
    'message' in value &&
    isString(value.message)
  )
}

// HTTPステータスコードの型ガード
export function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300
}

export function isClientError(status: number): boolean {
  return status >= 400 && status < 500
}

export function isServerError(status: number): boolean {
  return status >= 500 && status < 600
}

// 汎用的な型アサーション関数
export function assertIs<T>(
  value: unknown,
  guard: (value: unknown) => value is T,
  message?: string
): asserts value is T {
  if (!guard(value)) {
    throw new Error(message || `Type assertion failed`)
  }
}

export function assertIsDefined<T>(
  value: T | undefined | null,
  message?: string
): asserts value is T {
  if (!isDefined(value)) {
    throw new Error(message || 'Value is undefined or null')
  }
}
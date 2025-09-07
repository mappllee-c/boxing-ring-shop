/**
 * 入力値のサニタイゼーション関数
 * XSS攻撃防止のためのHTML文字エスケープ処理
 */

export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return ''
  }
  
  // 基本的なHTML文字エスケープ
  const sanitized = sanitizeString(email)
  
  // メールアドレスとして無効な文字を除去
  return sanitized.replace(/[^a-zA-Z0-9@._-]/g, '')
}

export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') {
    return ''
  }
  
  // 基本的なHTML文字エスケープ
  const sanitized = sanitizeString(phone)
  
  // 電話番号として有効な文字のみを残す
  return sanitized.replace(/[^0-9\-\(\)\s]/g, '')
}

export function sanitizeMessage(message: string): string {
  if (typeof message !== 'string') {
    return ''
  }
  
  // 基本的なHTML文字エスケープ
  let sanitized = sanitizeString(message)
  
  // 改行文字を保持
  sanitized = sanitized.replace(/\n/g, '\\n')
  
  // 長すぎるメッセージの制限
  if (sanitized.length > 10000) {
    sanitized = sanitized.substring(0, 10000)
  }
  
  return sanitized
}

export function sanitizeFormData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      switch (key) {
        case 'email':
          sanitized[key] = sanitizeEmail(value)
          break
        case 'phone':
          sanitized[key] = sanitizePhone(value)
          break
        case 'message':
        case 'requests':
          sanitized[key] = sanitizeMessage(value)
          break
        default:
          sanitized[key] = sanitizeString(value)
      }
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      sanitized[key] = value
    } else {
      // その他の型は文字列に変換してサニタイズ
      sanitized[key] = sanitizeString(String(value))
    }
  }
  
  return sanitized
}

/**
 * SQLインジェクション防止のための文字エスケープ
 * （実際のSQL処理ではパラメータ化クエリを使用することが重要）
 */
export function sanitizeSQLString(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }
  
  return input
    .replace(/'/g, "''")  // シングルクォートをエスケープ
    .replace(/"/g, '""')  // ダブルクォートをエスケープ
    .replace(/\\/g, '\\\\')  // バックスラッシュをエスケープ
    .replace(/\x00/g, '\\0')  // NULL文字をエスケープ
    .replace(/\n/g, '\\n')  // 改行をエスケープ
    .replace(/\r/g, '\\r')  // 復帰をエスケープ
    .replace(/\x1a/g, '\\Z')  // SUBSTITUTEをエスケープ
}

/**
 * CSVインジェクション防止
 */
export function sanitizeCSVField(field: string): string {
  if (typeof field !== 'string') {
    return ''
  }
  
  // 危険な文字で始まる場合はプレフィックスを追加
  if (/^[=@+\-]/.test(field)) {
    return "'" + field
  }
  
  return sanitizeString(field)
}

/**
 * ファイル名のサニタイゼーション
 */
export function sanitizeFileName(filename: string): string {
  if (typeof filename !== 'string') {
    return ''
  }
  
  return filename
    .replace(/[^a-zA-Z0-9\-_.]/g, '_')  // 安全な文字のみ残す
    .replace(/_{2,}/g, '_')  // 連続するアンダースコアを単一に
    .replace(/^_|_$/g, '')  // 先頭と末尾のアンダースコアを削除
    .substring(0, 255)  // 長さ制限
}

/**
 * レート制限チェックのための識別子サニタイゼーション
 */
export function sanitizeIdentifier(identifier: string): string {
  if (typeof identifier !== 'string') {
    return ''
  }
  
  return identifier
    .replace(/[^a-zA-Z0-9\-_.:]/g, '')  // 英数字と特定の記号のみ
    .substring(0, 100)  // 長さ制限
}
import { Client, TextMessage } from '@line/bot-sdk'
import type { z } from 'zod'
import type { contactFormSchema, estimateFormSchema } from './validations'

// LINE Bot設定
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
}

// LINE Clientの初期化
const client = new Client(config)

// 型定義
type ContactData = z.infer<typeof contactFormSchema>
type EstimateData = z.infer<typeof estimateFormSchema>

// お問い合わせフォームからLINEメッセージを送信
export async function sendContactToLine(type: 'contact' | 'estimate', data: ContactData | EstimateData) {
  try {
    const message = formatMessageForLine(type, data)
    
    // 管理者のLINE USER IDに送信
    // 注意: 実際の運用では、LINEグループやBot webhookを使用することを推奨
    const userId = process.env.LINE_BOT_USER_ID!
    
    await client.pushMessage(userId, message)
    
    return { success: true }
  } catch (error) {
    console.error('LINE送信エラー:', error)
    throw error
  }
}

// メッセージの整形
function formatMessageForLine(type: 'contact' | 'estimate', data: ContactData | EstimateData): TextMessage {
  const timestamp = new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo'
  })

  if (type === 'contact') {
    const contactData = data as ContactData
    
    const text = `🔔 新しいお問い合わせ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 お名前: ${contactData.name}
🏢 会社・施設: ${contactData.company || '未入力'}
📞 電話番号: ${contactData.phone || '未入力'}
📧 メール: ${contactData.email || '未入力'}
🎯 件名: ${contactData.subject || '未入力'}
📬 希望連絡方法: ${getContactMethodText(contactData.contactMethod)}

💬 お問い合わせ内容:
${contactData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 受信日時: ${timestamp}

💡 1営業日以内にご連絡をお願いします。`

    return {
      type: 'text',
      text
    }
  } else {
    const estimateData = data as EstimateData
    
    const text = `📊 新しい見積もり依頼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 お客様情報:
📝 お名前: ${estimateData.name}
🏢 会社・施設: ${estimateData.company || '未入力'}
📞 電話番号: ${estimateData.phone || '未入力'}
📧 メール: ${estimateData.email || '未入力'}
📬 希望連絡方法: ${getContactMethodText(estimateData.contactMethod)}

🥊 商品情報:
🎯 リングタイプ: ${getRingTypeText(estimateData.ringType)}
📏 リングサイズ: ${getRingSizeText(estimateData.ringSize)}
💰 予算: ${getBudgetText(estimateData.budget)}
🎪 用途: ${getUsageText(estimateData.usage)}
🏛️ 補助金サポート: ${estimateData.subsidySupport ? '希望する' : '希望しない'}

📍 設置場所: ${estimateData.location || '未入力'}
📅 希望納期: ${estimateData.deliveryDate || '未入力'}

💬 追加要望:
${estimateData.message || '特になし'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 受信日時: ${timestamp}

🎯 見積もり作成をお願いします！`

    return {
      type: 'text',
      text
    }
  }
}

// 選択肢の日本語変換ヘルパー関数
function getContactMethodText(method?: string): string {
  switch (method) {
    case 'line': return 'LINE'
    case 'phone': return '電話'
    case 'either': return 'どちらでも可'
    default: return '未選択'
  }
}

function getRingTypeText(type: string): string {
  switch (type) {
    case 'standard': return 'スタンダード'
    case 'professional': return 'プロフェッショナル'
    case 'custom': return 'カスタム'
    default: return type
  }
}

function getRingSizeText(size: string): string {
  switch (size) {
    case '5x5': return '5m×5m'
    case '6x6': return '6m×6m'
    case '7x7': return '7m×7m'
    case 'custom': return 'カスタムサイズ'
    default: return size
  }
}

function getBudgetText(budget: string): string {
  switch (budget) {
    case 'under_100': return '100万円未満'
    case '100_200': return '100-200万円'
    case '200_300': return '200-300万円'
    case 'over_300': return '300万円以上'
    default: return budget
  }
}

function getUsageText(usage: string): string {
  switch (usage) {
    case 'training': return 'トレーニング用'
    case 'competition': return '試合用'
    case 'gym': return 'ジム用'
    case 'school': return '学校用'
    default: return usage
  }
}

// 設定確認用のヘルパー関数
export function isLineConfigured(): boolean {
  return !!(
    process.env.LINE_CHANNEL_ACCESS_TOKEN &&
    process.env.LINE_CHANNEL_SECRET &&
    process.env.LINE_BOT_USER_ID
  )
}
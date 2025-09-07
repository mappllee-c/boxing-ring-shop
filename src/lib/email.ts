// メール送信機能の実装
import { ContactFormData, EstimateFormData } from '@/lib/validations'

// メール送信サービス設定
interface EmailConfig {
  service: 'emailjs' | 'sendgrid' | 'resend'
  apiKey: string
  templateId: string
  serviceId: string
  toEmail: string // お客様のメールアドレス
}

// 環境変数から設定を取得
const emailConfig: EmailConfig = {
  service: (process.env.EMAIL_SERVICE as EmailConfig['service']) || 'emailjs',
  apiKey: process.env.EMAIL_API_KEY || '',
  templateId: process.env.EMAIL_TEMPLATE_ID || '',
  serviceId: process.env.EMAIL_SERVICE_ID || '',
  toEmail: process.env.TO_EMAIL || 'info@boxing-ring-shop.com', // ここにお客様のメールアドレス
}

// メール内容生成
export function generateEmailContent(
  type: 'contact' | 'estimate',
  data: ContactFormData | EstimateFormData
): string {
  const baseInfo = `
お名前: ${data.name}
メールアドレス: ${data.email}
電話番号: ${data.phone}
希望連絡方法: ${data.contactMethod}
送信日時: ${new Date().toLocaleString('ja-JP')}
`

  if (type === 'contact') {
    const contactData = data as ContactFormData
    return `
【お問い合わせフォーム】新しいお問い合わせが届きました

${baseInfo}
件名: ${contactData.subject}
お問い合わせ内容:
${contactData.message}

---
このメールはボクシングリング専門店のお問い合わせフォームから送信されました。
`
  } else {
    const estimateData = data as EstimateFormData
    return `
【見積もり依頼フォーム】新しい見積もり依頼が届きました

${baseInfo}
リングタイプ: ${estimateData.ringType}
リングサイズ: ${estimateData.ringSize}
予算: ${estimateData.budget}
用途: ${estimateData.usage}
設置場所: ${estimateData.location || '未指定'}
希望納期: ${estimateData.deliveryDate || '未指定'}
補助金希望: ${estimateData.subsidyInterest || '未指定'}

ご要望・質問:
${estimateData.requirements || 'なし'}

---
このメールはボクシングリング専門店の見積もりフォームから送信されました。
`
  }
}

// EmailJSを使用したメール送信
export async function sendEmailWithEmailJS(
  subject: string,
  content: string
): Promise<void> {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.apiKey,
      template_params: {
        to_email: emailConfig.toEmail,
        subject: subject,
        message: content,
        from_name: 'ボクシングリング専門店',
      },
    }),
  })

  if (!response.ok) {
    throw new Error('メール送信に失敗しました')
  }
}

// SendGridを使用したメール送信
export async function sendEmailWithSendGrid(
  subject: string,
  content: string
): Promise<void> {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${emailConfig.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: emailConfig.toEmail }],
        subject: subject,
      }],
      from: { email: 'noreply@boxing-ring-shop.com' },
      content: [{
        type: 'text/plain',
        value: content,
      }],
    }),
  })

  if (!response.ok) {
    throw new Error('メール送信に失敗しました')
  }
}

// Resendを使用したメール送信
export async function sendEmailWithResend(
  subject: string,
  content: string
): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${emailConfig.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@boxing-ring-shop.com',
      to: emailConfig.toEmail,
      subject: subject,
      text: content,
    }),
  })

  if (!response.ok) {
    throw new Error('メール送信に失敗しました')
  }
}

// 設定されたサービスに応じてメール送信
export async function sendEmail(
  type: 'contact' | 'estimate',
  data: ContactFormData | EstimateFormData
): Promise<void> {
  const subject = type === 'contact' 
    ? `【お問い合わせ】${data.name}様より` 
    : `【見積もり依頼】${data.name}様より`
  
  const content = generateEmailContent(type, data)

  switch (emailConfig.service) {
    case 'emailjs':
      await sendEmailWithEmailJS(subject, content)
      break
    case 'sendgrid':
      await sendEmailWithSendGrid(subject, content)
      break
    case 'resend':
      await sendEmailWithResend(subject, content)
      break
    default:
      throw new Error('無効なメールサービスが設定されています')
  }
}
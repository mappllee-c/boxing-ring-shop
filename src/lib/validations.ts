import { z } from 'zod'

export const estimateFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください').optional().or(z.literal('')),
  phone: z.string().min(1, '電話番号を入力してください'),
  company: z.string().optional(),
  ringType: z.enum(['standard', 'professional', 'custom'], {
    required_error: 'リングタイプを選択してください',
  }),
  ringSize: z.enum(['5x5', '6x6', '7x7', 'custom'], {
    required_error: 'リングサイズを選択してください',
  }),
  budget: z.enum(['under_100', '100_200', '200_300', 'over_300'], {
    required_error: '予算を選択してください',
  }),
  usage: z.enum(['training', 'competition', 'gym', 'school'], {
    required_error: '用途を選択してください',
  }),
  subsidySupport: z.boolean().default(false),
  message: z.string().optional(),
  contactMethod: z.enum(['line', 'phone', 'either'], {
    required_error: '希望連絡方法を選択してください',
  }),
  location: z.string().optional(),
  deliveryDate: z.string().optional(),
  subsidyInterest: z.string().optional(),
  requirements: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください').optional().or(z.literal('')),
  phone: z.string().min(1, '電話番号を入力してください'),
  company: z.string().optional(),
  subject: z.string().min(1, '件名を入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上入力してください'),
  contactMethod: z.enum(['line', 'phone', 'either'], {
    required_error: '希望連絡方法を選択してください',
  }),
})


export const subsidySupportSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().min(1, '電話番号を入力してください'),
  company: z.string().min(1, '会社名・施設名を入力してください'),
  companyType: z.enum(['sme', 'individual', 'large', 'npo', 'public'], {
    required_error: '事業者区分を選択してください',
  }),
  businessType: z.enum(['sports', 'education', 'manufacturing', 'service', 'retail', 'healthcare', 'other'], {
    required_error: '業種を選択してください',
  }),
  annualRevenue: z.enum(['under_10m', '10m_50m', '50m_100m', '100m_500m', 'over_500m']).optional(),
  employeeCount: z.enum(['1', '2_10', '11_50', '51_100', 'over_100']).optional(),
  interestedProduct: z.enum([
    'compact-basic', 'training-standard', 'standard-deluxe', 'youth-special',
    'professional-tournament', 'professional-championship', 'custom-design', 
    'custom-premium', 'undecided'
  ], {
    required_error: '導入予定商品を選択してください',
  }),
  expectedInstallation: z.enum(['immediate', 'within_6m', 'within_1y', 'over_1y', 'depends_on_subsidy'], {
    required_error: '導入希望時期を選択してください',
  }),
  preferredContact: z.enum(['phone', 'email', 'either'], {
    required_error: '希望連絡方法を選択してください',
  }),
  message: z.string().optional(),
})

export type EstimateFormData = z.infer<typeof estimateFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>
export type SubsidySupportData = z.infer<typeof subsidySupportSchema>
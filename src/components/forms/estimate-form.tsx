'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { estimateFormSchema, type EstimateFormData } from '@/lib/validations'
import { Calculator, Zap } from 'lucide-react'

export function EstimateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EstimateFormData>({
    resolver: zodResolver(estimateFormSchema),
  })

  const watchedValues = watch()

  const onSubmit = async () => {
    setIsSubmitting(true)
    setIsSubmitted(true)
    addToast({
      type: 'success',
      title: '見積もり依頼完了',
      message: '2営業日以内にLINEまたはお電話で詳細な見積もりをお送りします。',
      duration: 6000
    })
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <Zap className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">見積もり依頼を受付ました</h3>
        <p className="text-green-700 mb-4">
          2営業日以内にLINEまたはお電話で詳細な見積もりをお送りいたします。<br />
          お急ぎの場合は、下記よりお問い合わせください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => {setIsSubmitted(false); window.location.reload()}} 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            新しい見積もりを依頼する
          </Button>
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <a href="https://lin.ee/jGVe5DT" target="_blank" rel="noopener noreferrer">
              📱 LINE で連絡
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-netlify="true" name="estimate">
      <input type="hidden" name="form-name" value="estimate" />
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="text-blue-600" size={20} />
          <h3 className="font-semibold text-blue-800">専門診断で最適プラン提案</h3>
        </div>
        <p className="text-blue-700 text-sm">
          以下の情報を入力いただくと、専門スタッフがお客様に最適なボクシングリングをご提案します。
        </p>
      </div>

      {/* 基本情報 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">お名前 *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="山田太郎"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="company">会社名・施設名</Label>
          <Input
            id="company"
            {...register('company')}
            placeholder="○○ボクシングジム"
          />
        </div>

        <div>
          <Label htmlFor="email">メールアドレス（任意）</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="example@email.com（LINEでのご連絡も可能です）"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          <p className="text-xs text-gray-600 mt-1">
            📱 LINEでのご連絡をご希望の場合は空欄で構いません
          </p>
        </div>

        <div>
          <Label htmlFor="phone">電話番号 *</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="03-1234-5678"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* リング仕様 */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">リング仕様</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>リングタイプ *</Label>
            <Select onValueChange={(value) => setValue('ringType', value as EstimateFormData['ringType'])}>
              <SelectTrigger className={errors.ringType ? 'border-red-500' : ''}>
                <SelectValue placeholder="リングタイプを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">スタンダード（69万円〜税込）</SelectItem>
                <SelectItem value="professional">プロフェッショナル（128万円〜税込）</SelectItem>
                <SelectItem value="custom">カスタム（応相談）</SelectItem>
              </SelectContent>
            </Select>
            {errors.ringType && <p className="text-red-500 text-sm mt-1">{errors.ringType.message}</p>}
          </div>

          <div>
            <Label>リングサイズ *</Label>
            <Select onValueChange={(value) => setValue('ringSize', value as EstimateFormData['ringSize'])}>
              <SelectTrigger className={errors.ringSize ? 'border-red-500' : ''}>
                <SelectValue placeholder="サイズを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5x5">5m × 5m（標準）</SelectItem>
                <SelectItem value="6x6">6m × 6m（プロ仕様）</SelectItem>
                <SelectItem value="7x7">7m × 7m（大型）</SelectItem>
                <SelectItem value="custom">カスタムサイズ</SelectItem>
              </SelectContent>
            </Select>
            {errors.ringSize && <p className="text-red-500 text-sm mt-1">{errors.ringSize.message}</p>}
          </div>

          <div>
            <Label>予算 *</Label>
            <Select onValueChange={(value) => setValue('budget', value as EstimateFormData['budget'])}>
              <SelectTrigger className={errors.budget ? 'border-red-500' : ''}>
                <SelectValue placeholder="予算を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under_100">100万円未満</SelectItem>
                <SelectItem value="100_200">100万円〜200万円</SelectItem>
                <SelectItem value="200_300">200万円〜300万円</SelectItem>
                <SelectItem value="over_300">300万円以上</SelectItem>
              </SelectContent>
            </Select>
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
          </div>

          <div>
            <Label>用途 *</Label>
            <Select onValueChange={(value) => setValue('usage', value as EstimateFormData['usage'])}>
              <SelectTrigger className={errors.usage ? 'border-red-500' : ''}>
                <SelectValue placeholder="用途を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="training">練習用</SelectItem>
                <SelectItem value="competition">試合用</SelectItem>
                <SelectItem value="gym">ジム運営</SelectItem>
                <SelectItem value="school">学校・教育機関</SelectItem>
              </SelectContent>
            </Select>
            {errors.usage && <p className="text-red-500 text-sm mt-1">{errors.usage.message}</p>}
          </div>
        </div>
      </div>

      {/* 補助金サポート */}
      <div className="border-t pt-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="subsidySupport"
            onCheckedChange={(checked) => setValue('subsidySupport', !!checked)}
          />
          <Label htmlFor="subsidySupport" className="text-sm font-normal">
            補助金申請サポートを希望する（無料）
          </Label>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          設備投資補助金の申請をサポートします。最大50%の補助金活用が可能です。
        </p>
      </div>

      {/* 希望連絡方法 */}
      <div>
        <Label>希望連絡方法 *</Label>
        <Select onValueChange={(value) => setValue('contactMethod', value as EstimateFormData['contactMethod'])}>
          <SelectTrigger className={errors.contactMethod ? 'border-red-500' : ''}>
            <SelectValue placeholder="希望する連絡方法を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">📱 LINE</SelectItem>
            <SelectItem value="phone">📞 電話</SelectItem>
            <SelectItem value="either">🤝 どちらでも可</SelectItem>
          </SelectContent>
        </Select>
        {errors.contactMethod && <p className="text-red-500 text-sm mt-1">{errors.contactMethod.message}</p>}
      </div>

      {/* 追加メッセージ */}
      <div>
        <Label htmlFor="message">ご要望・ご質問</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="設置場所の詳細、特別な仕様のご希望、納期のご相談など、ご自由にお書きください"
          rows={4}
        />
      </div>

      {/* 見積もり概算表示 */}
      {watchedValues.ringType && watchedValues.ringSize && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">概算見積もり</h4>
          <div className="text-sm text-gray-600">
            <p>リングタイプ: {
              watchedValues.ringType === 'standard' ? 'スタンダード' :
              watchedValues.ringType === 'professional' ? 'プロフェッショナル' : 'カスタム'
            }</p>
            <p>サイズ: {watchedValues.ringSize?.replace('x', ' × ').replace('custom', 'カスタム')}</p>
            <p className="text-lg font-semibold text-blue-600 mt-2">
              概算価格: {
                watchedValues.ringType === 'standard' ? '69万円〜95万円（税込）' :
                watchedValues.ringType === 'professional' ? '128万円〜180万円（税込）' : '応相談'
              }
            </p>
            {watchedValues.subsidySupport && (
              <p className="text-green-600 font-medium">補助金適用で最大50%OFF可能</p>
            )}
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? '送信中...' : '見積もりを依頼する'}
      </Button>

      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600">
          お急ぎの場合は、LINE またはお電話でも対応いたします
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" asChild className="bg-green-50 border-green-500 text-green-700">
            <a href="https://lin.ee/jGVe5DT" target="_blank" rel="noopener noreferrer">
              📱 LINE 友だち追加
            </a>
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          営業時間: 平日 9:00-18:00 / 土日祝日も対応可（要予約）
        </p>
      </div>

      <p className="text-xs text-gray-500 text-center border-t pt-4">
        送信いただいた情報は、見積もり作成目的のみに使用し、第三者に提供することはありません。<br />
        ※価格は税込・配送料別途となります。
      </p>
    </form>
  )
}
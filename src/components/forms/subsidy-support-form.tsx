'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { subsidySupportSchema, type SubsidySupportData } from '@/lib/validations'
import { 
  Sparkles, 
  CheckCircle, 
  Building,
  Shield
} from 'lucide-react'

export function SubsidySupportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubsidySupportData>({
    resolver: zodResolver(subsidySupportSchema),
  })

  const onSubmit = async () => {
    setIsSubmitting(true)
    setIsSubmitted(true)
    addToast({
      type: 'success',
      title: '申請サポート依頼完了',
      message: '専門スタッフより1営業日以内にご連絡いたします。',
      duration: 6000
    })
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">申請サポートのご依頼を受付ました</h3>
        <p className="text-green-700 mb-6">
          専門スタッフより1営業日以内にご連絡いたします。<br />
          最適な補助金制度のご提案と申請サポートをいたします。
        </p>
        <div className="bg-white p-4 rounded border border-green-200 mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">今後の流れ</h4>
          <ul className="text-sm text-gray-600 text-left space-y-1">
            <li>• 専門スタッフからお電話・メールでご連絡</li>
            <li>• 詳細なヒアリングと制度のご説明</li>
            <li>• 最適な補助金制度のご提案</li>
            <li>• 申請書類作成のサポート開始</li>
            <li>• 申請手続きから採択までサポート</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => {setIsSubmitted(false); window.location.reload()}} 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            新しい申請
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-netlify="true" name="subsidy-support">
      <input type="hidden" name="form-name" value="subsidy-support" />
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="text-blue-600" size={24} />
          <h3 className="font-semibold text-blue-800 text-lg">無料申請サポートのご依頼</h3>
        </div>
        <p className="text-blue-700 text-sm">
          補助金申請の専門スタッフが、お客様に最適な制度をご提案し、申請から採択まで無料でサポートいたします。
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-green-700">
            <CheckCircle className="h-4 w-4 mr-1" />
            申請サポート無料
          </div>
          <div className="flex items-center text-green-700">
            <CheckCircle className="h-4 w-4 mr-1" />
            成功報酬なし
          </div>
          <div className="flex items-center text-green-700">
            <CheckCircle className="h-4 w-4 mr-1" />
            採択率98%の実績
          </div>
        </div>
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
          <Label htmlFor="company">会社名・施設名 *</Label>
          <Input
            id="company"
            {...register('company')}
            placeholder="○○ボクシングジム"
            className={errors.company ? 'border-red-500' : ''}
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">メールアドレス *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="example@email.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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

      {/* 事業者情報 */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h4 className="font-semibold mb-4 flex items-center">
          <Building className="mr-2 h-5 w-5 text-blue-600" />
          事業者情報
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>事業者区分 *</Label>
            <Select onValueChange={(value) => setValue('companyType', value as SubsidySupportData['companyType'])}>
              <SelectTrigger className={errors.companyType ? 'border-red-500' : ''}>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sme">中小企業</SelectItem>
                <SelectItem value="individual">個人事業主</SelectItem>
                <SelectItem value="large">大企業</SelectItem>
                <SelectItem value="npo">NPO・社団法人</SelectItem>
                <SelectItem value="public">自治体・公共団体</SelectItem>
              </SelectContent>
            </Select>
            {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType.message}</p>}
          </div>

          <div>
            <Label>業種 *</Label>
            <Select onValueChange={(value) => setValue('businessType', value as SubsidySupportData['businessType'])}>
              <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sports">スポーツ施設・ジム</SelectItem>
                <SelectItem value="education">教育・学校</SelectItem>
                <SelectItem value="manufacturing">製造業</SelectItem>
                <SelectItem value="service">サービス業</SelectItem>
                <SelectItem value="retail">小売業</SelectItem>
                <SelectItem value="healthcare">医療・福祉</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
            {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>}
          </div>

          <div>
            <Label>年間売上高</Label>
            <Select onValueChange={(value) => setValue('annualRevenue', value as SubsidySupportData['annualRevenue'])}>
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under_10m">1,000万円未満</SelectItem>
                <SelectItem value="10m_50m">1,000万円〜5,000万円</SelectItem>
                <SelectItem value="50m_100m">5,000万円〜1億円</SelectItem>
                <SelectItem value="100m_500m">1億円〜5億円</SelectItem>
                <SelectItem value="over_500m">5億円以上</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>従業員数</Label>
            <Select onValueChange={(value) => setValue('employeeCount', value as SubsidySupportData['employeeCount'])}>
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1名（個人事業主）</SelectItem>
                <SelectItem value="2_10">2〜10名</SelectItem>
                <SelectItem value="11_50">11〜50名</SelectItem>
                <SelectItem value="51_100">51〜100名</SelectItem>
                <SelectItem value="over_100">100名以上</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 導入予定商品 */}
      <div>
        <Label htmlFor="interestedProduct">導入予定商品 *</Label>
        <Select onValueChange={(value) => setValue('interestedProduct', value as SubsidySupportData['interestedProduct'])}>
          <SelectTrigger className={errors.interestedProduct ? 'border-red-500' : ''}>
            <SelectValue placeholder="ご検討中の商品を選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compact-basic">コンパクトリング ベーシック（69万円〜）</SelectItem>
            <SelectItem value="training-standard">トレーニングリング スタンダード（89万円〜）</SelectItem>
            <SelectItem value="standard-deluxe">スタンダードリング デラックス（128万円〜）</SelectItem>
            <SelectItem value="youth-special">ユースリング スペシャル（79万円〜）</SelectItem>
            <SelectItem value="professional-tournament">プロフェッショナルリング（198万円〜）</SelectItem>
            <SelectItem value="professional-championship">プロフェッショナルリング チャンピオンシップ（258万円〜）</SelectItem>
            <SelectItem value="custom-design">カスタムデザインリング（150万円〜）</SelectItem>
            <SelectItem value="custom-premium">カスタムプレミアムリング（220万円〜）</SelectItem>
            <SelectItem value="undecided">未定・相談したい</SelectItem>
          </SelectContent>
        </Select>
        {errors.interestedProduct && <p className="text-red-500 text-sm mt-1">{errors.interestedProduct.message}</p>}
      </div>

      {/* 導入時期 */}
      <div>
        <Label htmlFor="expectedInstallation">導入希望時期 *</Label>
        <Select onValueChange={(value) => setValue('expectedInstallation', value as SubsidySupportData['expectedInstallation'])}>
          <SelectTrigger className={errors.expectedInstallation ? 'border-red-500' : ''}>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">できるだけ早く（3ヶ月以内）</SelectItem>
            <SelectItem value="within_6m">6ヶ月以内</SelectItem>
            <SelectItem value="within_1y">1年以内</SelectItem>
            <SelectItem value="over_1y">1年以上先</SelectItem>
            <SelectItem value="depends_on_subsidy">補助金採択次第</SelectItem>
          </SelectContent>
        </Select>
        {errors.expectedInstallation && <p className="text-red-500 text-sm mt-1">{errors.expectedInstallation.message}</p>}
      </div>

      {/* 希望連絡方法 */}
      <div>
        <Label>希望連絡方法 *</Label>
        <Select onValueChange={(value) => setValue('preferredContact', value as SubsidySupportData['preferredContact'])}>
          <SelectTrigger className={errors.preferredContact ? 'border-red-500' : ''}>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phone">電話</SelectItem>
            <SelectItem value="email">メール</SelectItem>
            <SelectItem value="either">どちらでも可</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferredContact && <p className="text-red-500 text-sm mt-1">{errors.preferredContact.message}</p>}
      </div>

      {/* 質問・要望 */}
      <div>
        <Label htmlFor="message">ご質問・ご要望</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="補助金に関するご質問、導入に関するご要望などがございましたらお書きください。

例：
・どの補助金制度が最適か相談したい
・申請の難易度や必要な準備について知りたい
・設置条件について相談したい
・過去の成功事例を教えてほしい"
          rows={5}
        />
      </div>

      {/* サポート内容の説明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          無料サポート内容
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              最適な補助金制度の診断・提案
            </div>
            <div className="flex items-center text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              申請書類の作成サポート
            </div>
            <div className="flex items-center text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              事業計画書の作成アドバイス
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              申請手続きの代行・サポート
            </div>
            <div className="flex items-center text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              採択後の手続きサポート
            </div>
            <div className="flex items-center text-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              導入・設置までの一貫サポート
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold text-lg py-4"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? '送信中...' : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            無料申請サポートを依頼する
          </>
        )}
      </Button>

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          お急ぎの場合は、お電話でも承ります
        </p>
        <p className="text-xs text-gray-500">
          営業時間: 平日 9:00-18:00 / 土日祝日も対応可（要予約）
        </p>
      </div>

      <div className="text-xs text-gray-500 text-center border-t pt-4">
        <p className="mb-2">
          送信いただいた情報は、補助金申請サポート目的のみに使用し、第三者に提供することはありません。
        </p>
        <p>
          申請サポートは完全無料です。成功報酬やその他の費用は一切発生いたしません。
        </p>
      </div>
    </form>
  )
}
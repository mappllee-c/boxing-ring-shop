# 🚀 ボクシングリング専門店ウェブサイト運用ガイド

## 📋 目次
1. [運用開始までの手順](#運用開始までの手順)
2. [メール設定（重要）](#メール設定重要)
3. [ホスティング設定](#ホスティング設定)
4. [独自ドメイン設定](#独自ドメイン設定)
5. [運用開始後の管理](#運用開始後の管理)

---

## 🎯 運用開始までの手順

### **ステップ1: メール送信サービスの選択**

お問い合わせフォームからメールを受信するために、以下のいずれかを選択：

#### 🌟 **推奨: EmailJS（最も簡単）**
- **コスト**: 無料（月200通まで）
- **設定時間**: 約10分
- **技術レベル**: 初心者OK

#### 📧 **SendGrid（高品質）**
- **コスト**: 無料（月100通まで）
- **設定時間**: 約30分
- **技術レベル**: 中級者向け

#### ⚡ **Resend（最新）**
- **コスト**: 無料（月3,000通まで）
- **設定時間**: 約20分
- **技術レベル**: 中級者向け

---

## 📧 メール設定（重要）

### **方法1: EmailJS設定（推奨）**

1. **アカウント作成**
   - https://emailjs.com にアクセス
   - 「Sign Up」をクリック
   - Googleアカウントまたはメールで登録

2. **サービス設定**
   - 「Add New Service」をクリック
   - 「Gmail」または「Outlook」を選択
   - お客様のメールアドレス（例：info@example.com）を設定

3. **テンプレート作成**
   - 「Email Templates」をクリック
   - 「Create New Template」をクリック
   - テンプレート内容：
   ```
   件名: 【{{subject}}】ボクシングリング専門店
   
   {{message}}
   
   送信者情報:
   お名前: {{name}}
   メール: {{email}}
   電話: {{phone}}
   ```

4. **設定値の確認**
   - Service ID: service_xxxxxxx
   - Template ID: template_xxxxxxx
   - User ID: user_xxxxxxxxxxxxxxx

### **方法2: SendGrid設定**

1. **アカウント作成**
   - https://sendgrid.com でアカウント作成
   - メールアドレス認証を完了

2. **API Key作成**
   - 「Settings」→「API Keys」
   - 「Create API Key」でフルアクセス権限のキーを作成

3. **送信者認証**
   - 「Settings」→「Sender Authentication」
   - ドメイン認証またはシングル送信者認証を完了

---

## 🌐 ホスティング設定

### **推奨: Vercel（無料・簡単）**

1. **Vercelアカウント作成**
   - https://vercel.com にアクセス
   - 「Sign Up」でGitHubアカウントで登録

2. **プロジェクトのアップロード**
   - 「New Project」をクリック
   - 「Import Git Repository」を選択
   - このプロジェクトフォルダをZipでアップロードまたはGitHubにプッシュ

3. **環境変数設定**
   - プロジェクト設定で「Environment Variables」タブ
   - 以下を設定：
   ```
   EMAIL_SERVICE=emailjs
   EMAIL_API_KEY=your_user_id_here
   EMAIL_SERVICE_ID=your_service_id_here
   EMAIL_TEMPLATE_ID=your_template_id_here
   TO_EMAIL=あなたのメールアドレス@example.com
   NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
   ```

4. **デプロイ**
   - 「Deploy」ボタンをクリック
   - 数分で自動デプロイ完了

### **代替案: Netlify**

1. **Netlifyアカウント作成**
   - https://netlify.com でアカウント作成

2. **サイトデプロイ**
   - 「Sites」→「Add new site」→「Deploy manually」
   - プロジェクトフォルダをビルドしてdistフォルダをドラッグ&ドロップ

---

## 🌍 独自ドメイン設定

### **ドメイン取得**

**日本語対応推奨サービス:**
- **お名前.com**: 最大手、サポート充実
- **ムームードメイン**: 初心者向け、安価
- **エックスドメイン**: 高機能、中級者向け

**おすすめドメイン名:**
- boxing-ring.co.jp
- boxing-ring-shop.com
- ring-boxing.jp

### **DNS設定**

1. **ドメインサービスでDNS設定**
   ```
   タイプ: CNAME
   名前: @（または空欄）
   値: your-site.vercel.app
   ```

2. **Vercelでカスタムドメイン設定**
   - プロジェクト設定→「Domains」
   - 取得したドメインを追加
   - SSL証明書が自動で設定される

---

## 🔧 運用開始後の管理

### **日常管理**

1. **メール確認**
   - 設定したメールアドレスに問い合わせが届く
   - 1営業日以内の返信を心がける

2. **サイト監視**
   - Vercelダッシュボードでアクセス状況確認
   - エラーが発生していないかチェック

3. **コンテンツ更新**
   - ブログ記事の定期更新（月1-2回推奨）
   - 価格や製品情報の最新化

### **SEO管理**

1. **Google Analytics設定**
   - https://analytics.google.com でアカウント作成
   - トラッキングコードを設置

2. **Google Search Console設定**
   - https://search.google.com/search-console
   - サイトマップ送信: `/sitemap.xml`

3. **定期確認項目**
   - 月次アクセス数
   - 検索順位（「ボクシングリング 販売」等）
   - 問い合わせ数

---

## ⚠️ 重要な注意事項

### **運用開始前に必須確認**
- [ ] メール送信テスト完了
- [ ] お問い合わせフォーム動作確認
- [ ] 全ページの表示確認
- [ ] モバイル表示確認
- [ ] 独自ドメインSSL証明書確認

### **法的対応**
- [ ] 特定商取引法の表記追加
- [ ] プライバシーポリシーの確認
- [ ] 会社情報の正確性確認

### **緊急時対応**
- サイトが表示されない → Vercelダッシュボードでエラー確認
- メールが届かない → 環境変数とメールサービス設定確認
- フォームが動かない → ブラウザの開発者ツールでエラー確認

---

## 📞 サポート情報

### **技術的問題**
- Vercel: https://vercel.com/help
- EmailJS: https://emailjs.com/docs/
- Next.js: https://nextjs.org/docs

### **推定運用コスト**
- **無料運用**: Vercel無料枠 + EmailJS無料枠 = 月0円
- **独自ドメイン**: 年間1,000-3,000円
- **有料プラン移行**: アクセス増加時に月1,000-3,000円

---

**🎉 これで本格的なボクシングリング専門店のウェブサイトが運用開始できます！**

何か不明な点があれば、このガイドを参照しながら一つずつ進めてください。
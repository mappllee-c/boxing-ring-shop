'use client'

import { Heart, Globe, Shield, Users } from 'lucide-react'

export function MissionSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            人類貢献ミッション
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ボクシングリング製造を通じた人類のスポーツ発展と健康増進への貢献
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-red-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-3">若年層健康促進</h3>
            <p className="text-gray-600 text-sm">
              青少年のボクシング活動支援により、健全な心身の発達を促進し、運動習慣の定着を図ります。
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-3">地域スポーツ振興</h3>
            <p className="text-gray-600 text-sm">
              地方自治体・コミュニティセンターへの設備提供により、地域住民の健康増進と交流を促進します。
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-3">国際競技力向上</h3>
            <p className="text-gray-600 text-sm">
              オリンピック・世界選手権レベルの練習環境提供により、次世代アスリートの育成基盤を強化します。
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-purple-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-3">平等な機会創出</h3>
            <p className="text-gray-600 text-sm">
              補助金制度の活用により、経済的制約を超えた設備導入支援と、アクセシビリティを確保します。
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
            倫理基準・安全性へのコミット
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield size={24} />
              </div>
              <h4 className="font-semibold mb-2">製品安全性</h4>
              <p className="text-sm text-gray-600">
                国際安全基準への完全準拠<br />
                事故ゼロを目指す設計思想
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe size={24} />
              </div>
              <h4 className="font-semibold mb-2">環境負荷軽減</h4>
              <p className="text-sm text-gray-600">
                持続可能な素材の積極的採用<br />
                CO2削減・リサイクル推進
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart size={24} />
              </div>
              <h4 className="font-semibold mb-2">公正な価格設定</h4>
              <p className="text-sm text-gray-600">
                透明性の高い価格体系<br />
                中小規模事業者への配慮
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
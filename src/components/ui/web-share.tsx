'use client'

import { Share2 } from 'lucide-react'
import { Button } from './button'
import { useState, useEffect } from 'react'

interface WebShareProps {
  url?: string
  title?: string
  text?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export function WebShare({ 
  url, 
  title, 
  text, 
  size = 'sm', 
  variant = 'outline' 
}: WebShareProps) {
  const [isClient, setIsClient] = useState(false)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined' && 'navigator' in window && 'share' in navigator) {
      setCanShare(true)
    }
  }, [])

  const handleShare = async () => {
    if (!isClient) return

    const shareData = {
      title: title || 'ボクシングリング専門店',
      text: text || '69万円から高品質ボクシングリングを販売。補助金サポート付き。',
      url: url || (typeof window !== 'undefined' ? window.location.href : '')
    }

    try {
      if (canShare && navigator.share) {
        await navigator.share(shareData)
      } else {
        // フォールバック: クリップボードにコピー
        if (navigator.clipboard && shareData.url) {
          await navigator.clipboard.writeText(shareData.url)
          // 簡単な通知（アラートの代わり）
          console.log('URLをクリップボードにコピーしました')
        }
      }
    } catch {
      // エラー時も静かにフォールバック
      if (navigator.clipboard && shareData.url) {
        try {
          await navigator.clipboard.writeText(shareData.url)
          console.log('URLをクリップボードにコピーしました')
        } catch {
          console.log('シェア機能は利用できません')
        }
      }
    }
  }

  if (!isClient) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        disabled
        className="gap-2"
      >
        <Share2 size={16} />
        シェア
      </Button>
    )
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleShare}
      className="gap-2"
    >
      <Share2 size={16} />
      {canShare ? 'シェア' : 'URLコピー'}
    </Button>
  )
}
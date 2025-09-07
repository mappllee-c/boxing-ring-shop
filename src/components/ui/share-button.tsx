'use client'

import { Share2 } from 'lucide-react'
import { Button } from './button'
import { useState, useEffect } from 'react'

interface ShareButtonProps {
  url?: string
  title?: string
  text?: string
}

export function ShareButton({ url, title, text }: ShareButtonProps) {
  const [isSupported, setIsSupported] = useState(false)

  // Check if Web Share API is supported
  useEffect(() => {
    setIsSupported(typeof navigator !== 'undefined' && 'share' in navigator)
  }, [])

  const handleShare = async () => {
    const shareData = {
      title: title || 'ボクシングリング専門店',
      text: text || '69万円から高品質ボクシングリングを販売。補助金サポート付き。',
      url: url || window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url!)
        alert('URLをクリップボードにコピーしました')
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url!)
        alert('URLをクリップボードにコピーしました')
      } catch {
        console.error('Share failed:', error)
      }
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleShare}
      className="gap-2"
    >
      <Share2 size={16} />
      {isSupported ? 'シェア' : 'URLコピー'}
    </Button>
  )
}
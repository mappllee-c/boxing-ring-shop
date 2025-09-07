'use client'

import { useEffect } from 'react'

// CLS対策: レイアウトシフト防止コンポーネント
export function LayoutStabilizer() {
  useEffect(() => {
    // フォント読み込み完了まで待機
    if (document.fonts) {
      document.fonts.ready.then(() => {
        // フォント読み込み完了後の追加処理
        document.body.classList.add('fonts-loaded')
      })
    }

    // 画像の読み込み完了を監視
    const images = document.querySelectorAll('img')
    let loadedCount = 0
    const totalImages = images.length

    if (totalImages === 0) {
      document.body.classList.add('images-loaded')
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++
        } else {
          img.addEventListener('load', () => {
            loadedCount++
            if (loadedCount === totalImages) {
              document.body.classList.add('images-loaded')
            }
          })
          img.addEventListener('error', () => {
            loadedCount++
            if (loadedCount === totalImages) {
              document.body.classList.add('images-loaded')
            }
          })
        }
      })

      if (loadedCount === totalImages) {
        document.body.classList.add('images-loaded')
      }
    }
  }, [])

  return null
}

interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  rounded?: boolean
}

export function Skeleton({ 
  width = '100%', 
  height = '20px', 
  className = '', 
  rounded = false 
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

interface AspectRatioBoxProps {
  aspectRatio: number // 16/9 = 1.777...
  children: React.ReactNode
  className?: string
}

export function AspectRatioBox({ aspectRatio, children, className = '' }: AspectRatioBoxProps) {
  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}

interface ReservedSpaceProps {
  width: number
  height: number
  children?: React.ReactNode
  className?: string
}

export function ReservedSpace({ width, height, children, className = '' }: ReservedSpaceProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {children}
    </div>
  )
}

// 動的コンテンツ用のプレースホルダー
export function ContentPlaceholder({ 
  lines = 3, 
  showAvatar = false, 
  className = '' 
}: { 
  lines?: number
  showAvatar?: boolean
  className?: string 
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton width={40} height={40} rounded />
          <div className="flex-1">
            <Skeleton width="60%" height={16} className="mb-2" />
            <Skeleton width="40%" height={14} />
          </div>
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton 
            key={index}
            height={16}
            width={index === lines - 1 ? '75%' : '100%'}
          />
        ))}
      </div>
    </div>
  )
}

// 画像コンテナ（CLS防止）
interface ImageContainerProps {
  width: number
  height: number
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function ImageContainer({ 
  width, 
  height, 
  src, 
  alt, 
  className = '',
  priority = false 
}: ImageContainerProps) {
  return (
    <div 
      className={`relative bg-gray-100 ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: 0 }}
        onLoad={(e) => {
          e.currentTarget.style.opacity = '1'
        }}
        onError={(e) => {
          e.currentTarget.style.opacity = '1'
        }}
      />
    </div>
  )
}
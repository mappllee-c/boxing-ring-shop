'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductGalleryProps {
  images: {
    main: string
    gallery: string[]
    thumbnail: string
  }
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const allImages = [images.main, ...images.gallery]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // スライドショー機能
  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="space-y-4">
      {/* メイン画像表示 */}
      <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden group">
        <div className="aspect-square relative">
          <Image
            src={allImages[currentImageIndex]}
            alt={`${productName} - 画像 ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* ナビゲーションボタン */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* コントロールボタン */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {allImages.length > 1 && (
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/80 hover:bg-white"
                onClick={toggleSlideshow}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            )}
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 hover:bg-white"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* 画像インジケーター */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-blue-600' : 'bg-white/60'
                  }`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* サムネイル画像 */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              className={`aspect-square rounded border-2 transition-colors overflow-hidden relative ${
                index === currentImageIndex ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => goToImage(index)}
            >
              <Image
                src={allImages[index]}
                alt={`${productName} サムネイル ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* 画像情報 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">
          <span>全 {allImages.length} 枚の画像</span>
        </div>
      </div>

      {/* 特別な機能案内 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">実物をご確認いただけます</h4>
        <p className="text-blue-700 text-sm mb-3">
          実物見学にて実際の商品をご確認いただけます。質感や仕上がりをぜひ実物でお確かめください。
        </p>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          実物見学を予約する
        </Button>
      </div>

      {/* フルスクリーンモーダル */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full">
            <div className="bg-white p-4 rounded-lg">
              <div className="aspect-square relative">
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${productName} - 拡大表示`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsFullscreen(false)}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
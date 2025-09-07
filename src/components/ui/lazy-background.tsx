'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyBackgroundProps {
  backgroundImage: string
  className?: string
  children: React.ReactNode
}

export function LazyBackground({ backgroundImage, className = '', children }: LazyBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '100px' } // 100px手前で読み込み開始
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundImage: isLoaded ? backgroundImage : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {children}
    </div>
  )
}
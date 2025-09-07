'use client'

import { useEffect } from 'react'

// FID対策: インタラクション最適化
export function InteractionOptimizer() {
  useEffect(() => {
    // パッシブイベントリスナーの設定
    const addPassiveEventListeners = () => {
      const elements = document.querySelectorAll('[data-scroll-listener]')
      elements.forEach(el => {
        el.addEventListener('scroll', () => {}, { passive: true })
        el.addEventListener('touchstart', () => {}, { passive: true })
        el.addEventListener('touchmove', () => {}, { passive: true })
      })
    }

    // 重いタスクの分割実行
    const scheduleWork = (tasks: (() => void)[], index = 0) => {
      if (index >= tasks.length) return

      const task = tasks[index]
      if (!task) return

      // requestIdleCallback使用（フォールバック付き）
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          task()
          scheduleWork(tasks, index + 1)
        })
      } else {
        setTimeout(() => {
          task()
          scheduleWork(tasks, index + 1)
        }, 0)
      }
    }

    // 初期化タスク
    const initTasks = [
      addPassiveEventListeners,
      () => {
        // 非重要なアニメーションの遅延実行
        document.body.classList.add('animations-ready')
      },
      () => {
        // サードパーティスクリプトの遅延読み込み
        console.log('Non-critical scripts can be loaded here')
      }
    ]

    // タスクのスケジュール実行
    scheduleWork(initTasks)

    // Input Delay対策
    const optimizeInputs = () => {
      const inputs = document.querySelectorAll('input, textarea, select')
      inputs.forEach(input => {
        // デバウンス処理用
        let timeoutId: NodeJS.Timeout

        input.addEventListener('input', (e) => {
          clearTimeout(timeoutId)
          timeoutId = setTimeout(() => {
            // 実際の処理は遅延実行
            console.log('Input processed:', (e.target as HTMLInputElement).value)
          }, 100)
        })
      })
    }

    // DOM読み込み完了後に実行
    if (document.readyState === 'complete') {
      optimizeInputs()
    } else {
      window.addEventListener('load', optimizeInputs)
    }

    return () => {
      // クリーンアップ
      window.removeEventListener('load', optimizeInputs)
    }
  }, [])

  return null
}

// ボタンクリック最適化
interface OptimizedButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
  debounceMs?: number
}

export function OptimizedButton({ 
  onClick, 
  children, 
  className = '', 
  disabled = false,
  debounceMs = 300 
}: OptimizedButtonProps) {
  let timeoutId: NodeJS.Timeout | null = null
  let isProcessing = false

  const handleClick = () => {
    if (isProcessing || disabled) return

    isProcessing = true

    // デバウンス処理
    if (timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      onClick()
      isProcessing = false
    }, debounceMs)
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className={`transition-all duration-200 ${className} ${
        isProcessing ? 'opacity-70 cursor-not-allowed' : ''
      }`}
      type="button"
    >
      {children}
    </button>
  )
}

// スクロール最適化
export function useOptimizedScroll(callback: () => void, delay = 100) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let isScrolling = false

    const handleScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          clearTimeout(timeoutId)
          timeoutId = setTimeout(() => {
            callback()
            isScrolling = false
          }, delay)
        })
        isScrolling = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [callback, delay])
}

// 非同期コンポーネント読み込み
interface LazyComponentProps {
  loader: () => Promise<{ default: React.ComponentType }>
  fallback?: React.ReactNode
  children?: never
}

export function LazyComponent({ loader, fallback = null }: LazyComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Intersection Observer で可視性を検出
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loader()
              .then((module) => {
                setComponent(() => module.default)
                setIsLoading(false)
              })
              .catch((error) => {
                console.error('Component loading failed:', error)
                setIsLoading(false)
              })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    const element = document.createElement('div')
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [loader])

  if (isLoading) {
    return <>{fallback}</>
  }

  if (!Component) {
    return null
  }

  return <Component />
}

import { useState } from 'react'

// Web Workers for heavy computations
export function useWebWorker(workerFunction: string) {
  const [result, setResult] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = (data: unknown) => {
    if (!window.Worker) {
      console.warn('Web Workers not supported')
      return
    }

    setIsLoading(true)
    setError(null)

    const blob = new Blob([workerFunction], { type: 'application/javascript' })
    const worker = new Worker(URL.createObjectURL(blob))

    worker.postMessage(data)

    worker.onmessage = (e) => {
      setResult(e.data)
      setIsLoading(false)
      worker.terminate()
    }

    worker.onerror = (e) => {
      setError(e.message)
      setIsLoading(false)
      worker.terminate()
    }
  }

  return { result, isLoading, error, execute }
}
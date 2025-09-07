'use client'

import { useMemo } from 'react'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const processedContent = useMemo(() => {
    return processMarkdownToHtml(content)
  }, [content])

  return (
    <div 
      className="text-lg leading-relaxed text-gray-700 max-w-none
        [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:border-b-2 [&_h1]:border-blue-500 [&_h1]:pb-2 [&_h1]:my-8
        [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:bg-gradient-to-r [&_h2]:from-blue-50 [&_h2]:to-transparent [&_h2]:border-l-4 [&_h2]:border-blue-500 [&_h2]:pl-4 [&_h2]:py-2 [&_h2]:my-6
        [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-700 [&_h3]:my-4
        [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-gray-600 [&_h4]:bg-gray-50 [&_h4]:px-4 [&_h4]:py-2 [&_h4]:rounded [&_h4]:border-l-4 [&_h4]:border-green-500 [&_h4]:my-3
        [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-gray-700 [&_p]:my-6
        [&_strong]:font-bold [&_strong]:text-gray-900 [&_strong]:bg-yellow-100 [&_strong]:px-1 [&_strong]:py-0.5 [&_strong]:rounded
        [&_em]:italic [&_em]:text-blue-600
        [&_ul]:my-6 [&_ul]:pl-8 [&_ol]:my-6 [&_ol]:pl-8 [&_li]:my-2
        [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50 [&_blockquote]:italic [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:my-6
        [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:w-full [&_table]:my-8
        [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:p-3 [&_th]:border [&_th]:border-gray-300 [&_th]:text-left
        [&_td]:p-3 [&_td]:border [&_td]:border-gray-300
        [&_a]:text-blue-600 [&_a]:underline [&_a]:font-medium hover:[&_a]:text-blue-800"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

function processMarkdownToHtml(markdown: string): string {
  // 基本的なマークダウン処理を改善
  let html = markdown
    // ヘッダー（順序重要：長いものから先に処理）
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 太字
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // イタリック（太字と競合しないよう調整）
    .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>')
    // リンク
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // 引用
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // 番号付きリスト
    .replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>')
    // 通常のリスト
    .replace(/^[-*]\s+(.*$)/gim, '<li>$1</li>')

  // 内部リンク自動生成（SEO強化）
  html = addInternalLinks(html)

  // テーブル処理
  html = processTable(html)
  
  // リスト要素をul/olで囲む
  html = html.replace(/(<li>.*?<\/li>)/g, (match) => {
    return `<ul>${match}</ul>`
  })
  
  // 段落処理（最後に実行）
  html = html
    .split('\n\n')
    .map(paragraph => {
      if (paragraph.trim() && 
          !paragraph.includes('<h') && 
          !paragraph.includes('<li>') && 
          !paragraph.includes('<blockquote>') &&
          !paragraph.includes('<table>')) {
        return `<p>${paragraph.replace(/\n/g, '<br />')}</p>`
      }
      return paragraph.replace(/\n/g, '<br />')
    })
    .join('\n\n')
  
  return html
}

// 内部リンク自動生成機能（SEO強化）
function addInternalLinks(html: string): string {
  const internalLinks: { [key: string]: string } = {
    'フロアーリング': '/products/floor-ring',
    'レイズドリング': '/products/raised-ring',
    'ボクシングリング': '/products',
    '補助金申請': '/subsidy',
    'ものづくり補助金': '/subsidy/monozukuri',
    '小規模事業者持続化補助金': '/subsidy/jizokuka',
    'お問い合わせ': '/contact',
    '無料相談': '/consultation',
    'メンテナンス': '/service/maintenance',
    '設置工事': '/service/installation',
    '安全基準': '/safety-standards',
    'JBA認定': '/certification/jba',
    '価格表': '/pricing',
    '事例紹介': '/case-studies',
    '会社概要': '/about',
    'よくある質問': '/faq'
  }

  // 各キーワードに対してリンクを追加（既にリンクになっているものは除外）
  Object.entries(internalLinks).forEach(([keyword, url]) => {
    // 既にaタグ内にあるテキストは除外
    const regex = new RegExp(`(?![^<]*>)(?![^<]*</a>)\\b(${keyword})\\b(?![^<]*</a>)`, 'gi')
    html = html.replace(regex, `<a href="${url}" class="internal-link">${keyword}</a>`)
  })

  return html
}

function processTable(html: string): string {
  // シンプルなテーブル処理
  const tableRegex = /\|(.+)\|\n\|[\s\-|:]+\|\n((?:\|.+\|\n?)+)/g
  
  return html.replace(tableRegex, (match, header, rows) => {
    const headerCells = header.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
    const rowsArray = rows.trim().split('\n').map((row: string) => 
      row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
    )
    
    let table = '<table><thead><tr>'
    headerCells.forEach((cell: string) => {
      table += `<th>${cell}</th>`
    })
    table += '</tr></thead><tbody>'
    
    rowsArray.forEach((row: string[]) => {
      table += '<tr>'
      row.forEach((cell: string) => {
        table += `<td>${cell}</td>`
      })
      table += '</tr>'
    })
    
    table += '</tbody></table>'
    return table
  })
}
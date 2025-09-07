'use client'

interface ColumnContentProps {
  content: string
}

export function ColumnContent({ content }: ColumnContentProps) {
  return (
    <div 
      className="text-lg leading-relaxed text-gray-700 
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-8 [&_h1]:text-gray-900
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-6 [&_h2]:text-gray-900
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-4 [&_h3]:text-gray-900
        [&_h4]:text-lg [&_h4]:font-bold [&_h4]:my-3 [&_h4]:text-gray-900
        [&_p]:my-6
        [&_ul]:my-6 [&_ul]:pl-8 [&_ol]:my-6 [&_ol]:pl-8
        [&_li]:my-2
        [&_strong]:font-bold [&_strong]:text-gray-900
        [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300
        [&_th]:p-3 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-left
        [&_td]:p-3 [&_td]:border [&_td]:border-gray-300
        [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-gray-600"
      dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
    />
  )
}
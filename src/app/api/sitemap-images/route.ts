import { NextResponse } from 'next/server'
import { products } from '@/data/products'

export async function GET() {
  const baseUrl = 'https://boxing-ring-shop.com'
  
  try {
    // Product images from data
    const productImages = products.flatMap(product => {
      const images = [
        {
          loc: `${baseUrl}${product.images.main}`,
          caption: `${product.name} - メイン画像`,
          title: product.name,
          lastmod: new Date().toISOString().split('T')[0],
        },
        {
          loc: `${baseUrl}${product.images.thumbnail}`,
          caption: `${product.name} - サムネイル画像`, 
          title: product.name,
          lastmod: new Date().toISOString().split('T')[0],
        }
      ]
      
      // Add gallery images
      product.images.gallery.forEach((image, index) => {
        images.push({
          loc: `${baseUrl}${image}`,
          caption: `${product.name} - ギャラリー画像 ${index + 1}`,
          title: product.name,
          lastmod: new Date().toISOString().split('T')[0],
        })
      })
      
      return images
    })

    // Blog/Column images
    const blogImages = [
      {
        loc: `${baseUrl}/images/columns/boxing-industry-digitalization-2025.jpg`,
        caption: 'ボクシング業界のデジタル化2025年トレンド',
        title: 'ボクシング業界最新トレンド',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: `${baseUrl}/images/columns/global-boxing-market-analysis-2025.jpg`,
        caption: 'グローバルボクシング市場分析2025',
        title: 'ボクシング市場分析', 
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: `${baseUrl}/images/columns/gym-business-success-strategies-2025.jpg`,
        caption: 'ジム事業成功戦略2025',
        title: 'ジム事業成功戦略',
        lastmod: new Date().toISOString().split('T')[0],
      }
    ]

    // Brand images
    const brandImages = [
      {
        loc: `${baseUrl}/og-image.jpg`,
        caption: 'ボクシングリング専門店 - 69万円から・補助金対応',
        title: 'ボクシングリング専門店',
        lastmod: new Date().toISOString().split('T')[0],
      }
    ]

    const allImages = [...productImages, ...blogImages, ...brandImages]

    // Generate XML sitemap following Google Image Sitemap spec
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allImages.map(image => `  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
    </image:image>
    <lastmod>${image.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })

  } catch (error) {
    console.error('Error generating image sitemap:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
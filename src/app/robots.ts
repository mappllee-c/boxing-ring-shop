import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap: [
      'https://boxing-ring-shop.com/sitemap.xml',
      'https://boxing-ring-shop.com/api/sitemap-images'
    ],
    host: 'https://boxing-ring-shop.com',
  }
}
import type { HeadConfig, PageData } from 'vitepress'

const SITE_URL = new URL('https://gavinliu.me/')
const DEFAULT_OG_IMAGE = '/og/fallback.webp'

export function buildSocialMetadata(pageData: PageData): void {
  if (pageData.isNotFound) return

  const title = pageData.frontmatter.home
    ? 'My personal website — Gavin Liu'
    : pageData.title
  const description = pageData.description || title
  const isArticlePage = pageData.relativePath.startsWith('blog/')
  const pagePath = pageData.relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
  const pageUrl = new URL(`/${pagePath}`, SITE_URL).href
  const ogImagePath = isArticlePage
    ? `/og/${pageData.relativePath.replace(/^.*\//, '').replace(/\.md$/, '')}.webp`
    : (pageData.frontmatter.ogImage ?? DEFAULT_OG_IMAGE)
  const ogImageUrl = new URL(ogImagePath, SITE_URL).href

  const socialHead: HeadConfig[] = [
    ['link', { rel: 'canonical', href: pageUrl }],
    [
      'meta',
      { property: 'og:type', content: isArticlePage ? 'article' : 'website' },
    ],
    ['meta', { property: 'og:site_name', content: 'Gavin Liu' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: pageUrl }],
    ['meta', { property: 'og:image', content: ogImageUrl }],
    ['meta', { property: 'og:image:type', content: 'image/webp' }],
    ['meta', { property: 'og:image:alt', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImageUrl }],
    ['meta', { name: 'twitter:image:alt', content: title }],
  ]

  if (isArticlePage && pageData.frontmatter.date) {
    socialHead.push([
      'meta',
      {
        property: 'article:published_time',
        content: new Date(pageData.frontmatter.date).toISOString(),
      },
    ])
  }

  pageData.frontmatter.head ??= []
  pageData.frontmatter.head.push(...socialHead)
}

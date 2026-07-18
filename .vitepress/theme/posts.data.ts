import dayjs from 'dayjs'
import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  ogImage: string
  date: {
    time: number
    iso: string
    formatted: string
    year: number
  }
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        ogImage: `/og/${url.split('/').filter(Boolean).at(-1)}.webp`,
        date: formatDate(frontmatter.date),
      }))
      .sort((a, b) => b.date.time - a.date.time)
  },
})

function formatDate(raw: string): Post['date'] {
  const date = dayjs(raw)

  return {
    time: date.unix(),
    iso: raw,
    formatted: date.format('MMM D, YYYY'),
    year: date.year(),
  }
}

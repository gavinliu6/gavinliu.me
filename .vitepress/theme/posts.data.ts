import dayjs from 'dayjs'
import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
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

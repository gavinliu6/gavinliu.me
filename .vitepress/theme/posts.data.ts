import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: string
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/**/(?!index.md)*.md', {
  transform(rawData): Post[] {
    return rawData.sort((a, b) => {
      return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    }).map(({ url, frontmatter }) => {
      return {
        title: frontmatter.title,
        url,
        date: frontmatter.date,
      }
    })
  },
})

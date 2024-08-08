import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import MarkdownItMark from 'markdown-it-mark'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Gavin Liu',
  description: 'Gavin Liu\'s personal website',
  srcDir: './pages',
  lang: 'zh-CN',
  cleanUrls: true,
  markdown: {
    math: true,
    breaks: true,
    gfmAlerts: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark-dimmed',
    },
    image: {
      lazyLoading: true,
    },
    config(md) {
      md.use(MarkdownItMark)
      md.use(MarkdownItGitHubAlerts)
      md.use(MarkdownItFootnote)
    },
  },

  async buildEnd() {
    // todo: RSS 订阅
  },
})

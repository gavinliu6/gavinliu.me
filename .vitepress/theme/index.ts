// https://vitepress.dev/guide/custom-theme
import './styles.css'
import './typography.css'

import type { Theme } from 'vitepress'

import Layout from './components/layouts/Layout.vue'

export default {
  Layout,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme

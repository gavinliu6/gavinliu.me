// https://vitepress.dev/guide/custom-theme
import './style.css'

import type { Theme } from 'vitepress'

import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp() {
    // ...
  },
} satisfies Theme

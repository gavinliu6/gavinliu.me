// https://vitepress.dev/guide/custom-theme
import './style.css'

import type { Theme } from 'vitepress'

import BookLink from './components/global/BookLink.vue'
import Image from './components/global/Image.vue'
import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('BookLink', BookLink)
    // eslint-disable-next-line vue/no-reserved-component-names
    app.component('Image', Image)
  },
} satisfies Theme

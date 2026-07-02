import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ThemeConfig {}

// https://vitepress.dev/reference/site-config
export default defineConfig<ThemeConfig>({
  title: 'Gavin Liu',
  description: 'My personal website',
  srcDir: 'src',

  vite: {
    plugins: [tailwindcss()],
  },
})

// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './.vitepress/theme/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Chinese Quotes"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Noto Sans"',
          'Helvetica',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"'],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      textColor: {
        'default': 'var(--color-text-default)',
        'muted': 'var(--color-text-muted)',
        'link': 'var(--color-text-link)',
        'on-emphasis': 'var(--color-text-on-emphasis)',
      },
      backgroundColor: {
        'app': 'var(--color-bg-app)',
        'header': 'var(--color-bg-header)',
        'muted': 'var(--color-bg-muted)',
        'accent-emphasis': 'var(--color-bg-accent-emphasis)',
      },
      borderColor: {
        'default': 'var(--color-border-default)',
        'muted': 'var(--color-border-muted)',
        'accent-emphasis': 'var(--color-border-accent-emphasis)',
      },
    },
  },
  plugins: [],
}

// @ts-check

import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      '.vitepress/cache/**',
      '.vitepress/dist/**',
    ],
  },
  {
    files: ['**/*.{js,ts,mts,vue}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginVue.configs['flat/recommended'],
      stylistic.configs.recommended,
      betterTailwindcss.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: '.vitepress/theme/styles.css',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'off',
      'vue/require-default-prop': 'off',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',

      'better-tailwindcss/no-unknown-classes': [
        'error',
        {
          ignore: ['^markdown-body$', '^home$'],
        },
      ],

      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          functions: 'never',
        },
      ],
      '@stylistic/jsx-one-expression-per-line': 'off',
    },
  },
)

// @ts-check

import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: ['eslint.config.js', 'prettier.config.js', '.vitepress/dist/**'],
  },
  {
    files: ['**/*.{js,ts,mts,vue}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginVue.configs['flat/recommended'],
      stylistic.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'vue/multi-word-component-names': 'off',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',

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

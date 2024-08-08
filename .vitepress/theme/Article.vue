<script setup lang="ts">
import './typography.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import './github-colors-dark-dimmed.css'

import { useData } from 'vitepress'

import formatDate from './utils/formatDate'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData()
</script>

<template>
  <article>
    <div class="pb-6">
      <h1 class="text-wrap text-[2rem] font-semibold leading-[1.125]">
        {{ frontmatter.title }}
      </h1>
      <div class="mt-2 border-b border-default pb-4 text-sm text-muted">
        <time :datetime="frontmatter.date">{{ formatDate(frontmatter.date) }}</time>
      </div>
    </div>
    <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
    <Content class="markdown-body" />
  </article>
</template>

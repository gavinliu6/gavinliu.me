<script setup lang="ts">
import { useData } from 'vitepress'

import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import Article from './Article.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import PageBlog from './PageBlog.vue'
import PagePhotos from './PagePhotos.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { page, frontmatter } = useData()
</script>

<template>
  <div class="relative min-h-screen">
    <AppHeader />
    <div class="h-14" />
    <main class="mx-auto max-w-screen-md px-4 pb-14 pt-6">
      <Home v-if="frontmatter.home" />
      <PageBlog v-else-if="frontmatter.blog" />
      <PagePhotos v-else-if="frontmatter.photos" />
      <NotFound v-else-if="page.isNotFound" />
      <div v-else>
        <div class="pb-6">
          <a
            href="/posts/"
            class="link inline-flex items-center text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6L4 12L10 18M5 12H20"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="ml-1">返回博客</span>
          </a>
        </div>
        <Article />
        <ScrollToTop />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

import BlogPage from '../pages/BlogPage.vue'
import HomePage from '../pages/HomePage.vue'
import PostDetailPage from '../pages/PostDetailPage.vue'
import { TooltipProvider } from '../ui/tooltip'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData()
</script>

<template>
  <a
    href="#main-content"
    class="
      pointer-events-none fixed top-16 left-12 z-1000 -m-px overflow-hidden
      rounded-md border-0 bg-background-100 px-1 py-0 text-label-14
      whitespace-nowrap text-blue-700 opacity-0
      shadow-[0_0_0_2px_var(--ds-background-100),0_0_0_4px_var(--ds-blue-700)]
      outline-none
      focus:pointer-events-auto focus:opacity-100
    "
  >
    Skip to content
  </a>
  <main
    v-if="frontmatter.home"
    id="main-content"
    tabindex="-1"
    class="outline-none"
  >
    <HomePage />
  </main>
  <template v-else>
    <TooltipProvider>
      <div class="flex min-h-screen flex-col">
        <AppHeader />
        <main
          id="main-content"
          tabindex="-1"
          class="outline-none"
        >
          <BlogPage v-if="frontmatter.blog" />
          <PostDetailPage v-else />
        </main>
        <AppFooter />
      </div>
    </TooltipProvider>
  </template>
</template>

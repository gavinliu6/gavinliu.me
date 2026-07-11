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
  <HomePage v-if="frontmatter.home" />
  <template v-else>
    <TooltipProvider>
      <div class="flex min-h-screen flex-col">
        <AppHeader />
        <main>
          <BlogPage v-if="frontmatter.blog" />
          <PostDetailPage v-else />
        </main>
        <AppFooter />
      </div>
    </TooltipProvider>
  </template>
</template>

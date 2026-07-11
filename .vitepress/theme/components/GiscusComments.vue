<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()
const { isDark } = useData()

const theme = computed(() => (isDark.value ? 'dark' : 'light'))
</script>

<template>
  <Giscus
    :key="route.path"
    repo="gavinliu6/gavinliu.me"
    repo-id="R_kgDOTLIRKg"
    category="Blog comments"
    category-id="DIC_kwDOTLIRKs4DAVY9"
    mapping="pathname"
    strict="0"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    :theme="theme"
    lang="en"
    loading="lazy"
  />
</template>

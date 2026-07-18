<script setup lang="ts">
import { BentoItem } from '@theme/components/ui/bento-grid'

import { data as posts } from '../../posts.data'

const latestPost = posts[0]
</script>

<template>
  <BentoItem
    v-if="latestPost"
    as="a"
    :href="latestPost.url"
    :col-span="2"
    class="
      group relative isolate overflow-hidden rounded-2xl bg-background-100
      shadow-[0_0_0_1px_var(--ds-gray-alpha-400)] outline-none
      focus-visible:ring-2 focus-visible:ring-blue-700
      focus-visible:ring-offset-2 focus-visible:ring-offset-background-100
    "
  >
    <img
      :src="latestPost.ogImage"
      alt=""
      class="
        absolute inset-0 size-full object-cover opacity-85
        transition-[scale,opacity] duration-300 ease-out
        group-hover:scale-[1.025] group-hover:opacity-95
        group-focus-visible:scale-[1.025] group-focus-visible:opacity-95
      "
    />
    <span
      class="
        absolute bottom-3 left-3 block max-w-[calc(100%-1.5rem)] truncate
        rounded-md bg-white/80 px-2 text-copy-14 text-[#171717]
        shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_2px_8px_rgb(0_0_0/0.12)]
        backdrop-blur-md
        dark:bg-[#262626]/80 dark:text-[#ededed]
        dark:shadow-[0_0_0_1px_rgb(255_255_255/0.12),0_2px_8px_rgb(0_0_0/0.28)]
      "
    >
      {{ latestPost.title }}
    </span>
  </BentoItem>
</template>

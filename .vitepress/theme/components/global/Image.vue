<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { isExternal } from 'vitepress/dist/client/shared.js'

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'auto',
  },
})
</script>

<template>
  <figure class="flex">
    <div>
      <img
        :src="src"
        :alt="alt ? alt : title"
        class="h-auto max-w-full"
        :style="{ width }"
      />
      <figcaption class="relative mt-2 flex items-center justify-center text-xs text-muted">
        <span v-if="title">{{ title }}</span>
        <a
          v-if="source && isExternal(source)"
          title="source"
          :href="source"
          target="_blank"
          rel="noopener noreferrer"
          :class="twMerge(
            'inline-flex items-center rounded-full bg-lime-600/80 p-0.5 !text-lime-50 !no-underline transition-colors hover:bg-lime-600 dark:bg-lime-500/80 dark:!text-white dark:hover:bg-lime-500',
            title && 'ml-2'
          )"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15V6M18 6H9M18 6L6.25 17.75"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <span v-else-if="source">
          {{ (title ? '，' : '') + `图片来源：${source}` }}
        </span>
      </figcaption>
    </div>
  </figure>
</template>

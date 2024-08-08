<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useElementSize } from '@vueuse/core'
import { ref } from 'vue'
import { computed } from 'vue'

import { data as posts } from './posts.data.js'
import type { Post } from './types'
import formatDate from './utils/formatDate'

const { width: widthOfWindow } = useWindowSize()

const lighthouse = ref<HTMLElement | null>(null)
const { width: widthOfLighthouse } = useElementSize(lighthouse)

const right = computed(() => {
  if (widthOfWindow && widthOfLighthouse) {
    return (widthOfWindow.value - widthOfLighthouse.value) / 2
  }
  return 0
})

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Post, b?: Post) {
  return isSameYear(a.date, b?.date)
}
</script>

<template>
  <div ref="lighthouse">
    <div
      class="fixed flex items-center"
      :style="{
        right: `${right}px`,
      }"
    >
      <a
        href="/feed.xml"
        target="_blank"
        title="RSS"
      >
        <span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.5004 6.44218C19.5004 6.21565 19.5004 5.98912 19.4994 5.76259C19.4983 5.57154 19.4962 5.38047 19.4909 5.18941C19.4799 4.77299 19.4551 4.3534 19.3812 3.94172C19.3062 3.52371 19.1832 3.13473 18.9901 2.75472C18.8001 2.38157 18.552 2.04062 18.2559 1.74453C17.9598 1.44844 17.6183 1.20038 17.2452 1.01037C16.8657 0.817202 16.4767 0.694755 16.0593 0.619281C15.6476 0.54539 15.2275 0.520584 14.811 0.5095C14.62 0.504222 14.4289 0.502111 14.2378 0.501056C14.0109 0.5 13.7839 0.5 13.557 0.5H6.44344C6.2165 0.5 5.98954 0.5 5.76259 0.501056C5.57153 0.502111 5.38047 0.504222 5.18941 0.5095C4.77299 0.521112 4.35287 0.54539 3.94119 0.619808C3.52318 0.694755 3.13473 0.81773 2.75525 1.0109C2.3821 1.20091 2.04062 1.44897 1.74453 1.74506C1.44844 2.04115 1.20038 2.3821 1.01037 2.75525C0.817202 3.13526 0.694227 3.52424 0.619281 3.94225C0.54539 4.35392 0.520584 4.77404 0.5095 5.18994C0.504222 5.381 0.502111 5.57206 0.501056 5.76312C0.5 5.98954 0.5 6.21649 0.5 6.44344V13.5565C0.5 13.7834 0.5 14.0104 0.501056 14.2373C0.502111 14.4284 0.504222 14.6194 0.5095 14.8105C0.520584 15.2269 0.54539 15.6465 0.619281 16.0582C0.694227 16.4762 0.817202 16.8652 1.01037 17.2452C1.20038 17.6183 1.44844 17.9593 1.74453 18.2554C2.04062 18.5515 2.3821 18.7995 2.75525 18.9895C3.13473 19.1827 3.52371 19.3052 3.94119 19.3806C4.35287 19.4545 4.77299 19.4793 5.18941 19.4904C5.38047 19.4957 5.57153 19.4978 5.76259 19.4989C5.94412 19.5001 6.12565 19.5 6.30717 19.5L13.5565 19.4999C13.7834 19.4999 14.0104 19.4999 14.2373 19.4989C14.4284 19.4978 14.6194 19.4957 14.8105 19.4904C15.2269 19.4793 15.647 19.4545 16.0587 19.3806C16.4767 19.3057 16.8652 19.1827 17.2447 18.9895C17.6178 18.7995 17.9593 18.5515 18.2554 18.2554C18.5515 17.9593 18.7995 17.6183 18.9895 17.2452C19.1827 16.8652 19.3057 16.4762 19.3806 16.0582C19.4545 15.6465 19.4793 15.2264 19.4904 14.8105C19.4957 14.6194 19.4978 14.4284 19.4989 14.2373C19.5001 14.0558 19.5 13.8743 19.5 13.6927L19.5004 6.44218ZM5.5 16C6.32843 16 7 15.3284 7 14.5C7 13.6716 6.32843 13 5.5 13C4.67157 13 4 13.6716 4 14.5C4 15.3284 4.67157 16 5.5 16ZM10 16C10 12.6863 7.31371 10 4 10V8C8.41828 8 12 11.5817 12 16H10ZM4 6C9.52285 6 14 10.4772 14 16H16C16 9.37258 10.6274 4 4 4V6Z"
              class="fill-amber-500 dark:fill-amber-400"
            />
          </svg>
        </span>
      </a>
    </div>
    <ul class="list-disc pt-12">
      <template
        v-for="item, idx in posts"
        :key="item.url"
      >
        <div
          v-if="!isSameGroup(item, posts[idx-1])"
          class="pb-4 pt-8 first:pt-0"
        >
          <h2 class="mb-1.5 h-[1.0625rem] border-b border-b-default py-1.5 text-sm font-semibold text-muted">
            <span class="bg-app pr-4">{{ getYear(item.date) }}</span>
          </h2>
        </div>
        <li>
          <a
            :href="item.url"
            class="link text-sm"
          >{{ item.title }}</a>
          <time
            :datetime="item.date"
            class="ml-2 text-xs text-muted"
          >{{ formatDate(item.date) }}</time>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
li+li {
  margin-top: 0.25em;
}
</style>

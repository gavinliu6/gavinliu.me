<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
</script>

<template>
  <div
    class="fixed bottom-0 right-0 z-20 mb-6 mr-6 transition-opacity"
    :style="{
      opacity: y > 100 ? 1 : 0,
    }"
  >
    <button
      class="inline-flex size-10 items-center justify-center rounded-full bg-accent-emphasis text-on-emphasis"
      @click="y = 0"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 15.0001L11.2929 7.7072C11.6834 7.31668 12.3166 7.31667 12.7071 7.7072L20 15.0001"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IconProps } from './types'

withDefaults(defineProps<IconProps>(), {
  size: 24,
  color: 'currentColor',
})
</script>

<template>
  <!-- 2 0 round -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 6H18V15M18 6L6.25 17.75"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

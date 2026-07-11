<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="dropdown-menu-shortcut"
    :class="
      cn('ml-auto pl-4 font-mono text-[12px]/4 text-secondary', props.class)
    "
  >
    <slot />
  </span>
</template>

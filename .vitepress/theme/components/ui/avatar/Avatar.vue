<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import { AvatarRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="
      cn(
        `
          relative flex size-8 shrink-0 overflow-hidden rounded-full
          after:absolute after:inset-0 after:size-full after:rounded-full
          after:outline-1 after:-outline-offset-1
          after:outline-[rgba(0,0,0,0.1)]
          dark:after:outline-[rgba(255,255,255,0.1)]
        `,
        props.class,
      )
    "
  >
    <slot />
  </AvatarRoot>
</template>

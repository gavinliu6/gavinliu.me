<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

type Props = {
  class?: HTMLAttributes['class']
  position?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
})

const labelClass = computed(() => {
  const positionClass
    = props.position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'

  return cn(
    `
      absolute left-1/2 -translate-x-1/2 text-[10px] font-medium
      whitespace-nowrap text-primary
    `,
    positionClass,
    props.class
  )
})
</script>

<template>
  <div :class="labelClass">
    <slot />
  </div>
</template>

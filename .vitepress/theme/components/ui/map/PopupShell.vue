<script setup lang="ts">
import { X } from '@lucide/vue'
import { cn } from '@theme/lib/utils'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

type Props = {
  variant?: 'popover' | 'tooltip'
  closeButton?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'popover',
  closeButton: false,
})

defineEmits<{ close: [] }>()

const shellClass = computed(() =>
  props.variant === 'tooltip'
    ? cn(
        `
          pointer-events-none animate-in rounded-md bg-gray-1000 px-2 py-1
          text-xs text-balance text-background-100
          shadow-[0_4px_12px_var(--ds-gray-alpha-300)] duration-200 ease-out
          fade-in-0 zoom-in-95
        `,
        props.class
      )
    : cn(
        `
          relative max-w-62 animate-in rounded-lg bg-background-100 p-3
          text-primary
          shadow-[0_0_0_1px_var(--ds-gray-alpha-400),0_4px_12px_var(--ds-gray-alpha-200)]
          duration-200 ease-out fade-in-0 zoom-in-95
        `,
        props.closeButton && 'pr-12',
        props.class
      )
)
</script>

<template>
  <div :class="shellClass">
    <button
      v-if="variant === 'popover' && closeButton"
      type="button"
      aria-label="Close popup"
      class="
        absolute top-1 right-1 z-10 inline-flex size-10 items-center
        justify-center rounded-md text-primary
        transition-[background-color,box-shadow,scale]
        hover:bg-gray-alpha-100
        focus:outline-none
        focus-visible:shadow-[0_0_0_2px_var(--ds-background-100),0_0_0_4px_var(--ds-blue-700)]
        active:scale-[0.96] active:bg-gray-alpha-200
      "
      @click="$emit('close')"
    >
      <X class="size-4" />
    </button>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'

import { MarkerContextKey } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const context = inject(MarkerContextKey, null)

if (!context) {
  throw new Error('MarkerContent must be used within a MapMarker component')
}

const targetElement = computed(() => context.marker.value?.getElement() ?? null)
const containerClass = computed(() =>
  cn('relative cursor-pointer', props.class)
)
</script>

<template>
  <Teleport
    v-if="targetElement"
    :to="targetElement"
  >
    <div :class="containerClass">
      <slot>
        <div
          class="
            relative size-4 rounded-full border-2 border-white bg-blue-500
            shadow-lg
          "
        />
      </slot>
    </div>
  </Teleport>
</template>

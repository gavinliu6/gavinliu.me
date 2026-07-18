<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'

import { bentoGridContextKey } from './context'
import type { ResponsiveValue } from './responsive'
import {
  formatGridTrack,
  mapResponsiveValue,
  normalizeGridTrack,
  responsiveCustomProperties
} from './responsive'

export type BentoSpan = number | 'full'

interface Props {
  colSpan?: ResponsiveValue<BentoSpan>
  rowSpan?: ResponsiveValue<number>
  as?: string | Component
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  colSpan: 1,
  rowSpan: 1,
  as: 'div',
})

const gridContext = inject(bentoGridContextKey, null)

const resolvedColSpan = computed(() =>
  mapResponsiveValue(props.colSpan, 1, (span, breakpoint) => {
    const columns = gridContext?.columns.value[breakpoint]
    const requestedSpan
      = span === 'full' ? (columns ?? 1) : normalizeGridTrack(span)

    return columns === undefined
      ? requestedSpan
      : Math.min(requestedSpan, columns)
  })
)

const resolvedRowSpan = computed(() =>
  mapResponsiveValue(props.rowSpan, 1, normalizeGridTrack)
)

const itemStyle = computed(() => ({
  ...responsiveCustomProperties(
    'bento-col-span',
    resolvedColSpan.value,
    1,
    formatGridTrack
  ),
  ...responsiveCustomProperties(
    'bento-row-span',
    resolvedRowSpan.value,
    1,
    formatGridTrack
  ),
}))
</script>

<template>
  <component
    :is="as"
    data-slot="bento-item"
    :class="props.class"
    :style="itemStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
[data-slot='bento-item'] {
  --bento-col-span: var(--bento-col-span-base);
  --bento-row-span: var(--bento-row-span-base);

  grid-column: span var(--bento-col-span) / span var(--bento-col-span);
  grid-row: span var(--bento-row-span) / span var(--bento-row-span);
  min-width: 0;
  min-height: 0;
}

@container bento-grid (min-width: 401px) {
  [data-slot='bento-item'] {
    --bento-col-span: var(--bento-col-span-sm);
    --bento-row-span: var(--bento-row-span-sm);
  }
}

@container bento-grid (min-width: 601px) {
  [data-slot='bento-item'] {
    --bento-col-span: var(--bento-col-span-md);
    --bento-row-span: var(--bento-row-span-md);
  }
}

@container bento-grid (min-width: 961px) {
  [data-slot='bento-item'] {
    --bento-col-span: var(--bento-col-span-lg);
    --bento-row-span: var(--bento-row-span-lg);
  }
}

@container bento-grid (min-width: 1200px) {
  [data-slot='bento-item'] {
    --bento-col-span: var(--bento-col-span-xl);
    --bento-row-span: var(--bento-row-span-xl);
  }
}

@container bento-grid (min-width: 1400px) {
  [data-slot='bento-item'] {
    --bento-col-span: var(--bento-col-span-2xl);
    --bento-row-span: var(--bento-row-span-2xl);
  }
}
</style>

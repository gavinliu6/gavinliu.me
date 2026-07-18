<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { computed, provide } from 'vue'

import { bentoGridContextKey } from './context'
import type { GeistSpacing, ResponsiveValue } from './responsive'
import {
  formatGridTrack,
  formatPixelLength,
  mapResponsiveValue,
  normalizeGeistSpacing,
  normalizeGridTrack,
  responsiveCustomProperties
} from './responsive'

export type BentoGridFlow = 'ordered' | 'dense'

interface Props {
  columns?: ResponsiveValue<number>
  gap?: ResponsiveValue<GeistSpacing>
  /** Dense packing is only suitable when visual reading order is unimportant. */
  flow?: BentoGridFlow
  as?: string | Component
  class?: HTMLAttributes['class']
  rootClass?: HTMLAttributes['class']
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  columns: () => ({ base: 2, md: 4 }),
  gap: () => ({ base: 16, md: 24 }),
  flow: 'ordered',
  as: 'div',
})

const resolvedColumns = computed(() =>
  mapResponsiveValue(props.columns, 2, normalizeGridTrack)
)

const resolvedGap = computed(() =>
  mapResponsiveValue(props.gap, 16, normalizeGeistSpacing)
)

provide(bentoGridContextKey, { columns: resolvedColumns })

const gridStyle = computed(() => ({
  ...responsiveCustomProperties(
    'bento-columns',
    resolvedColumns.value,
    2,
    formatGridTrack
  ),
  ...responsiveCustomProperties(
    'bento-gap',
    resolvedGap.value,
    16,
    formatPixelLength
  ),
}))
</script>

<template>
  <div
    data-slot="bento-grid-root"
    :class="rootClass"
    :style="gridStyle"
  >
    <component
      :is="as"
      v-bind="$attrs"
      data-slot="bento-grid"
      :data-flow="flow"
      :class="props.class"
    >
      <slot />
    </component>
  </div>
</template>

<style scoped>
[data-slot='bento-grid-root'] {
  container: bento-grid / inline-size;
  min-width: 0;
}

[data-slot='bento-grid'] {
  --bento-columns: var(--bento-columns-base);
  --bento-gap: var(--bento-gap-base);

  display: grid;
  grid-template-columns: repeat(var(--bento-columns), minmax(0, 1fr));
  grid-auto-rows: calc(
    (100cqw + var(--bento-gap)) / var(--bento-columns) - var(--bento-gap)
  );
  grid-auto-flow: row;
  gap: var(--bento-gap);
  min-width: 0;
}

[data-slot='bento-grid'][data-flow='dense'] {
  grid-auto-flow: dense;
}

@container bento-grid (min-width: 401px) {
  [data-slot='bento-grid'] {
    --bento-columns: var(--bento-columns-sm);
    --bento-gap: var(--bento-gap-sm);
  }
}

@container bento-grid (min-width: 601px) {
  [data-slot='bento-grid'] {
    --bento-columns: var(--bento-columns-md);
    --bento-gap: var(--bento-gap-md);
  }
}

@container bento-grid (min-width: 961px) {
  [data-slot='bento-grid'] {
    --bento-columns: var(--bento-columns-lg);
    --bento-gap: var(--bento-gap-lg);
  }
}

@container bento-grid (min-width: 1200px) {
  [data-slot='bento-grid'] {
    --bento-columns: var(--bento-columns-xl);
    --bento-gap: var(--bento-gap-xl);
  }
}

@container bento-grid (min-width: 1400px) {
  [data-slot='bento-grid'] {
    --bento-columns: var(--bento-columns-2xl);
    --bento-gap: var(--bento-gap-2xl);
  }
}
</style>

<script setup lang="ts">
import type { PopupOptions } from 'maplibre-gl'
import type { HTMLAttributes } from 'vue'
import { inject, onBeforeUnmount, watch } from 'vue'

import { usePopup } from './composables/use-popup'
import { MarkerContextKey } from './context'
import PopupShell from './PopupShell.vue'

type Props = {
  class?: HTMLAttributes['class']
} & Omit<PopupOptions, 'className' | 'closeButton' | 'closeOnClick'>

const props = withDefaults(defineProps<Props>(), {
  offset: 16,
})
const context = inject(MarkerContextKey, null)

if (!context) {
  throw new Error('MarkerTooltip must be used within a MapMarker component')
}

const { container, create } = usePopup(() => props)

let cleanup: (() => void) | null = null

watch(
  () => [context.marker.value, context.map.value] as const,
  ([marker, map]) => {
    if (!marker || !map || cleanup) return

    const tooltip = create({ closeOnClick: true })
    const handleMouseEnter = () => {
      tooltip.setLngLat(marker.getLngLat()).addTo(map)
    }
    const handleMouseLeave = () => tooltip.remove()

    marker.getElement().addEventListener('mouseenter', handleMouseEnter)
    marker.getElement().addEventListener('mouseleave', handleMouseLeave)

    cleanup = () => {
      marker.getElement().removeEventListener('mouseenter', handleMouseEnter)
      marker.getElement().removeEventListener('mouseleave', handleMouseLeave)
      tooltip.remove()
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  cleanup?.()
  cleanup = null
})
</script>

<template>
  <Teleport
    v-if="container"
    :to="container"
  >
    <PopupShell
      variant="tooltip"
      :class="props.class"
    >
      <slot />
    </PopupShell>
  </Teleport>
</template>

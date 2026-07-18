<script setup lang="ts">
import type { PopupOptions } from 'maplibre-gl'
import type { HTMLAttributes } from 'vue'
import { inject, onBeforeUnmount, watch } from 'vue'

import { usePopup } from './composables/use-popup'
import { MarkerContextKey } from './context'
import PopupShell from './PopupShell.vue'

type Props = {
  class?: HTMLAttributes['class']
  closeButton?: boolean
} & Omit<PopupOptions, 'className' | 'closeButton'>

const props = withDefaults(defineProps<Props>(), {
  closeButton: false,
  offset: 16,
})
const context = inject(MarkerContextKey, null)

if (!context) {
  throw new Error('MarkerPopup must be used within a MapMarker component')
}

const { container, popup, create } = usePopup(() => props)

watch(
  () => [context.marker.value, context.map.value] as const,
  ([marker, map]) => {
    if (!marker || !map || popup.value) return

    marker.setPopup(create())
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  context.marker.value?.setPopup(null)
})
</script>

<template>
  <Teleport
    v-if="container"
    :to="container"
  >
    <PopupShell
      variant="popover"
      :close-button="closeButton"
      :class="props.class"
      @close="popup?.remove()"
    >
      <slot />
    </PopupShell>
  </Teleport>
</template>

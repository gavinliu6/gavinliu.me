<script setup lang="ts">
import type { PopupOptions } from 'maplibre-gl'
import type { HTMLAttributes } from 'vue'
import { watch } from 'vue'

import { useMap } from './composables/use-map'
import { usePopup } from './composables/use-popup'
import PopupShell from './PopupShell.vue'

type Props = {
  longitude: number
  latitude: number
  class?: HTMLAttributes['class']
  closeButton?: boolean
} & Omit<PopupOptions, 'className' | 'closeButton'>

const props = withDefaults(defineProps<Props>(), {
  closeButton: false,
  offset: 16,
})
const emit = defineEmits<{ close: [] }>()
const { map } = useMap()
const { container, popup, create } = usePopup(() => props)

watch(
  map,
  (mapInstance) => {
    if (!mapInstance || popup.value) return

    const popupInstance = create()
    popupInstance.setLngLat([props.longitude, props.latitude])
    popupInstance.on('close', () => emit('close'))
    popupInstance.addTo(mapInstance)
  },
  { immediate: true }
)

watch(
  () => [props.longitude, props.latitude] as const,
  ([longitude, latitude]) => {
    const popupInstance = popup.value
    if (!popupInstance?.isOpen()) return

    const current = popupInstance.getLngLat()
    if (current.lng !== longitude || current.lat !== latitude) {
      popupInstance.setLngLat([longitude, latitude])
    }
  }
)
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

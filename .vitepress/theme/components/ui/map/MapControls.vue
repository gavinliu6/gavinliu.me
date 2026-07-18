<script setup lang="ts">
import { Loader2, Locate, Maximize, Minus, Plus } from '@lucide/vue'
import { cn } from '@theme/lib/utils'
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'

import { useMap } from './composables/use-map'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

type Props = {
  position?: Position
  showZoom?: boolean
  showCompass?: boolean
  showLocate?: boolean
  showFullscreen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  showZoom: true,
  showCompass: false,
  showLocate: false,
  showFullscreen: false,
})
const emit = defineEmits<{
  locate: [coordinates: { longitude: number, latitude: number }]
}>()
const { map } = useMap()
const waitingForLocation = ref(false)
const compassRef = useTemplateRef<SVGSVGElement>('compass')

const positionClasses: Record<Position, string> = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'right-2 bottom-10',
}
const containerClass = computed(() =>
  cn(
    'absolute z-10 flex flex-col gap-1.5',
    positionClasses[props.position],
    props.class
  )
)

const handleZoomIn = () =>
  map.value?.zoomTo(map.value.getZoom() + 1, { duration: 300 })
const handleZoomOut = () =>
  map.value?.zoomTo(map.value.getZoom() - 1, { duration: 300 })
const handleResetBearing = () => map.value?.resetNorthPitch({ duration: 300 })

const handleLocate = () => {
  if (!('geolocation' in navigator)) return

  waitingForLocation.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coordinates = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      }
      map.value?.flyTo({
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 14,
        duration: 1500,
      })
      emit('locate', coordinates)
      waitingForLocation.value = false
    },
    (error) => {
      console.error('Error getting location:', error)
      waitingForLocation.value = false
    }
  )
}

const handleFullscreen = () => {
  const container = map.value?.getContainer()
  if (!container) return

  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    container.requestFullscreen()
  }
}

let cleanupCompass: (() => void) | null = null

watch(
  [map, () => props.showCompass, compassRef],
  ([mapInstance, showCompass, compass]) => {
    cleanupCompass?.()
    cleanupCompass = null
    if (!mapInstance || !showCompass || !compass) return

    const update = () => {
      const pitch = mapInstance.getPitch()
      const bearing = mapInstance.getBearing()
      compass.style.transform
        = 'rotateX(' + pitch + 'deg) rotateZ(' + -bearing + 'deg)'
    }
    mapInstance.on('rotate', update)
    mapInstance.on('pitch', update)
    update()
    cleanupCompass = () => {
      mapInstance.off('rotate', update)
      mapInstance.off('pitch', update)
    }
  }
)

onBeforeUnmount(() => {
  cleanupCompass?.()
})

const buttonClass
  = 'flex size-10 items-center justify-center text-primary transition-[background-color,box-shadow,scale] first:rounded-t-md last:rounded-b-md hover:bg-gray-alpha-100 active:scale-[0.96] active:bg-gray-alpha-200 focus-visible:z-10 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--ds-blue-700)] disabled:pointer-events-none disabled:opacity-50'
const groupClass
  = 'flex flex-col overflow-hidden rounded-md bg-background-100 shadow-[0_0_0_1px_var(--ds-gray-alpha-400),0_2px_6px_var(--ds-gray-alpha-200)] [&>button:not(:last-child)]:shadow-[0_1px_0_var(--ds-gray-alpha-400)]'
</script>

<template>
  <div :class="containerClass">
    <div
      v-if="showZoom"
      :class="groupClass"
    >
      <button
        type="button"
        :class="buttonClass"
        aria-label="Zoom in"
        @click="handleZoomIn"
      >
        <Plus class="size-4" />
      </button>
      <button
        type="button"
        :class="buttonClass"
        aria-label="Zoom out"
        @click="handleZoomOut"
      >
        <Minus class="size-4" />
      </button>
    </div>

    <div
      v-if="showCompass"
      :class="groupClass"
    >
      <button
        type="button"
        :class="buttonClass"
        aria-label="Reset bearing to north"
        @click="handleResetBearing"
      >
        <svg
          ref="compass"
          viewBox="0 0 24 24"
          class="size-5 transition-transform duration-200"
          style="transform-style: preserve-3d"
        >
          <path
            d="M12 2L16 12H12V2Z"
            class="fill-red-500"
          />
          <path
            d="M12 2L8 12H12V2Z"
            class="fill-red-300"
          />
          <path
            d="M12 22L16 12H12V22Z"
            class="fill-gray-700/60"
          />
          <path
            d="M12 22L8 12H12V22Z"
            class="fill-gray-700/30"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="showLocate"
      :class="groupClass"
    >
      <button
        type="button"
        :class="buttonClass"
        aria-label="Find my location"
        :disabled="waitingForLocation"
        @click="handleLocate"
      >
        <Loader2
          v-if="waitingForLocation"
          class="size-4 animate-spin"
        />
        <Locate
          v-else
          class="size-4"
        />
      </button>
    </div>

    <div
      v-if="showFullscreen"
      :class="groupClass"
    >
      <button
        type="button"
        :class="buttonClass"
        aria-label="Toggle fullscreen"
        @click="handleFullscreen"
      >
        <Maximize class="size-4" />
      </button>
    </div>
  </div>
</template>

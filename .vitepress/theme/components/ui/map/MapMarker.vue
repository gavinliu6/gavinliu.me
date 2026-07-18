<script setup lang="ts">
import type { MarkerOptions } from 'maplibre-gl'
import MapLibreGL from 'maplibre-gl'
import {
  onBeforeUnmount,
  onMounted,
  provide,
  shallowRef,
  useAttrs,
  watch,
  watchEffect
} from 'vue'

import { useMap } from './composables/use-map'
import { MarkerContextKey } from './context'

type Props = {
  longitude: number
  latitude: number
  draggable?: boolean
  offset?: MarkerOptions['offset']
  rotation?: number
  rotationAlignment?: MarkerOptions['rotationAlignment']
  pitchAlignment?: MarkerOptions['pitchAlignment']
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  draggable: false,
})
const attrs = useAttrs()
const emit = defineEmits<{
  click: [event: MouseEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
  dragstart: [coordinates: { lng: number, lat: number }]
  drag: [coordinates: { lng: number, lat: number }]
  dragend: [coordinates: { lng: number, lat: number }]
}>()

const { map } = useMap()
const markerRef = shallowRef<MapLibreGL.Marker | null>(null)

provide(MarkerContextKey, { marker: markerRef, map })

const collectMarkerOptions = (): Partial<MarkerOptions> => {
  const options: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined) continue
    if (/^on[A-Z]/.test(key)) continue
    if (key === 'class' || key === 'style' || key === 'element') continue

    options[key] = value
  }

  return options as Partial<MarkerOptions>
}

onMounted(() => {
  const marker = new MapLibreGL.Marker({
    ...collectMarkerOptions(),
    element: document.createElement('div'),
    draggable: props.draggable,
    offset: props.offset,
    rotation: props.rotation,
    rotationAlignment: props.rotationAlignment,
    pitchAlignment: props.pitchAlignment,
  }).setLngLat([props.longitude, props.latitude])

  const element = marker.getElement()
  const handleClick = (event: MouseEvent) => emit('click', event)
  const handleMouseEnter = (event: MouseEvent) => emit('mouseenter', event)
  const handleMouseLeave = (event: MouseEvent) => emit('mouseleave', event)
  element.addEventListener('click', handleClick)
  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)

  marker.on('dragstart', () => emit('dragstart', marker.getLngLat()))
  marker.on('drag', () => emit('drag', marker.getLngLat()))
  marker.on('dragend', () => emit('dragend', marker.getLngLat()))

  if (map.value) marker.addTo(map.value)
  markerRef.value = marker

  onBeforeUnmount(() => {
    element.removeEventListener('click', handleClick)
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
    marker.remove()
    markerRef.value = null
  })
})

watch(map, (mapInstance) => {
  if (mapInstance && markerRef.value) markerRef.value.addTo(mapInstance)
})

watchEffect(() => {
  const marker = markerRef.value
  if (!marker) return

  marker.setLngLat([props.longitude, props.latitude])
  marker.setDraggable(props.draggable)
  marker.setOffset(props.offset ?? [0, 0])
  marker.setRotation(props.rotation ?? 0)
  marker.setRotationAlignment(props.rotationAlignment ?? 'auto')
  marker.setPitchAlignment(props.pitchAlignment ?? 'auto')
})
</script>

<template>
  <slot />
</template>

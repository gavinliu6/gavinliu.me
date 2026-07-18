<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css'

import { cn } from '@theme/lib/utils'
import type {
  MapOptions,
  ProjectionSpecification,
  StyleSpecification
} from 'maplibre-gl'
import MapLibreGL from 'maplibre-gl'
import type { HTMLAttributes } from 'vue'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  useAttrs,
  useTemplateRef,
  watch
} from 'vue'

import { useResolvedTheme } from './composables/use-resolved-theme'
import { MapContextKey } from './context'
import type { MapViewport, Theme } from './types'
import { getViewport } from './utils'

type MapStyleOption = string | StyleSpecification

type MapStyles = {
  light?: MapStyleOption
  dark?: MapStyleOption
}

type Props = {
  class?: HTMLAttributes['class']
  theme?: Theme
  styles?: MapStyles
  projection?: ProjectionSpecification
  viewport?: Partial<MapViewport>
  loading?: boolean
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
const attrs = useAttrs()
const emit = defineEmits<{
  'update:viewport': [viewport: MapViewport]
}>()

const defaultStyles = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
}

const containerRef = useTemplateRef<HTMLDivElement>('container')
const mapInstance = shallowRef<MapLibreGL.Map | null>(null)
const isLoaded = ref(false)
const isStyleLoaded = ref(false)
const resolvedTheme = useResolvedTheme(() => props.theme)
const isControlled = computed(() => props.viewport !== undefined)

const mapStyles = computed<Required<MapStyles>>(() => ({
  dark: props.styles?.dark ?? defaultStyles.dark,
  light: props.styles?.light ?? defaultStyles.light,
}))
const containerClass = computed(() => cn('relative size-full', props.class))
const isLoadedAndStyleLoaded = computed(
  () => isLoaded.value && isStyleLoaded.value
)

let currentStyle: MapStyleOption | null = null
let styleTimeout: ReturnType<typeof setTimeout> | null = null
let internalUpdate = false

const clearStyleTimeout = () => {
  if (!styleTimeout) return

  clearTimeout(styleTimeout)
  styleTimeout = null
}

const collapseAttribution = (map: MapLibreGL.Map) => {
  map
    .getContainer()
    .querySelector('.maplibregl-ctrl-attrib.maplibregl-compact-show')
    ?.classList.remove('maplibregl-compact-show')
}

provide(MapContextKey, {
  map: mapInstance,
  isLoaded: isLoadedAndStyleLoaded,
})

defineExpose({
  map: mapInstance,
})

const reservedAttributeKeys = new Set(['class', 'style', 'container'])

const collectMapOptions = (): Partial<MapOptions> => {
  const options: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined) continue
    if (/^on[A-Z]/.test(key)) continue
    if (reservedAttributeKeys.has(key)) continue

    options[key] = value
  }

  for (const [key, value] of Object.entries(props.viewport ?? {})) {
    if (value !== undefined) options[key] = value
  }

  return options as Partial<MapOptions>
}

onMounted(() => {
  if (!containerRef.value) return

  const initialStyle
    = resolvedTheme.value === 'dark'
      ? mapStyles.value.dark
      : mapStyles.value.light
  currentStyle = initialStyle

  const map = new MapLibreGL.Map({
    container: containerRef.value,
    style: initialStyle,
    renderWorldCopies: false,
    attributionControl: { compact: true },
    ...collectMapOptions(),
  })

  const handleStyleData = () => {
    clearStyleTimeout()
    styleTimeout = setTimeout(() => {
      isStyleLoaded.value = true
      if (props.projection) map.setProjection(props.projection)
    }, 100)
  }
  const handleLoad = () => {
    isLoaded.value = true
    collapseAttribution(map)
  }
  const handleMove = () => {
    if (internalUpdate) return

    emit('update:viewport', getViewport(map))
  }

  map.on('load', handleLoad)
  map.on('styledata', handleStyleData)
  map.on('move', handleMove)
  mapInstance.value = map
})

onBeforeUnmount(() => {
  clearStyleTimeout()
  mapInstance.value?.remove()
  mapInstance.value = null
  isLoaded.value = false
  isStyleLoaded.value = false
})

watch(
  () => props.viewport,
  (next) => {
    const map = mapInstance.value
    if (!map || !isControlled.value || !next || map.isMoving()) return

    const current = getViewport(map)
    const target = {
      center: next.center ?? current.center,
      zoom: next.zoom ?? current.zoom,
      bearing: next.bearing ?? current.bearing,
      pitch: next.pitch ?? current.pitch,
    }

    if (
      target.center[0] === current.center[0]
      && target.center[1] === current.center[1]
      && target.zoom === current.zoom
      && target.bearing === current.bearing
      && target.pitch === current.pitch
    ) {
      return
    }

    internalUpdate = true
    map.jumpTo(target)
    internalUpdate = false
  },
  { deep: true }
)

watch([resolvedTheme, mapStyles], ([theme, styles]) => {
  const map = mapInstance.value
  if (!map) return

  const nextStyle = theme === 'dark' ? styles.dark : styles.light
  if (currentStyle === nextStyle) return

  clearStyleTimeout()
  currentStyle = nextStyle
  isStyleLoaded.value = false
  map.setStyle(nextStyle, { diff: true })
})

watch(
  () => props.projection,
  (next) => {
    const map = mapInstance.value
    if (!map || !next) return

    map.setProjection(next)
  }
)
</script>

<template>
  <div
    ref="container"
    :class="containerClass"
  >
    <div
      v-if="!isLoaded || loading"
      class="
        absolute inset-0 z-10 flex items-center justify-center
        bg-background-100/50 backdrop-blur-xs
      "
    >
      <div class="flex gap-1">
        <span class="size-1.5 animate-pulse rounded-full bg-gray-700/60" />
        <span
          class="
            size-1.5 animate-pulse rounded-full bg-gray-700/60
            [animation-delay:150ms]
          "
        />
        <span
          class="
            size-1.5 animate-pulse rounded-full bg-gray-700/60
            [animation-delay:300ms]
          "
        />
      </div>
    </div>

    <slot v-if="mapInstance" />
  </div>
</template>

<style>
.maplibregl-popup-content {
  background: transparent !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.maplibregl-popup-tip {
  display: none !important;
}
</style>

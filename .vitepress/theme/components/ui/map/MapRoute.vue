<script setup lang="ts">
import type { GeoJSONSource } from 'maplibre-gl'
import { useId, watch } from 'vue'

import { useMap } from './composables/use-map'
import { useMapLayer } from './composables/use-map-layer'

type Props = {
  id?: string
  coordinates: [number, number][]
  color?: string
  width?: number
  opacity?: number
  dashArray?: [number, number]
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: '#4285F4',
  width: 3,
  opacity: 0.8,
  interactive: true,
})
const emit = defineEmits<{
  click: []
  mouseenter: []
  mouseleave: []
}>()
const { map, isLoaded } = useMap()
const automaticId = useId()
const baseId = props.id ?? automaticId
const sourceId = 'route-source-' + baseId
const layerId = 'route-layer-' + baseId

const buildFeature = (coordinates: [number, number][]) =>
  ({
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates },
  }) as const

useMapLayer(map, isLoaded, (mapInstance) => {
  mapInstance.addSource(sourceId, {
    type: 'geojson',
    data: buildFeature(props.coordinates),
  })
  mapInstance.addLayer({
    id: layerId,
    type: 'line',
    source: sourceId,
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: {
      'line-color': props.color,
      'line-width': props.width,
      'line-opacity': props.opacity,
      ...(props.dashArray && { 'line-dasharray': props.dashArray }),
    },
  })

  const handleClick = () => emit('click')
  const handleMouseEnter = () => {
    mapInstance.getCanvas().style.cursor = 'pointer'
    emit('mouseenter')
  }
  const handleMouseLeave = () => {
    mapInstance.getCanvas().style.cursor = ''
    emit('mouseleave')
  }

  if (props.interactive) {
    mapInstance.on('click', layerId, handleClick)
    mapInstance.on('mouseenter', layerId, handleMouseEnter)
    mapInstance.on('mouseleave', layerId, handleMouseLeave)
  }

  return () => {
    if (props.interactive) {
      mapInstance.off('click', layerId, handleClick)
      mapInstance.off('mouseenter', layerId, handleMouseEnter)
      mapInstance.off('mouseleave', layerId, handleMouseLeave)
    }

    try {
      if (mapInstance.getLayer(layerId)) mapInstance.removeLayer(layerId)
      if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId)
    } catch {
      // The active style may already have removed the layer and source.
    }
  }
})

watch(
  () => props.coordinates,
  (coordinates) => {
    if (coordinates.length < 2) return

    const source = map.value?.getSource(sourceId) as GeoJSONSource | undefined
    source?.setData(buildFeature(coordinates))
  },
  { deep: true }
)

watch(
  () => [props.color, props.width, props.opacity, props.dashArray] as const,
  ([color, width, opacity, dashArray]) => {
    const mapInstance = map.value
    if (!mapInstance?.getLayer(layerId)) return

    mapInstance.setPaintProperty(layerId, 'line-color', color)
    mapInstance.setPaintProperty(layerId, 'line-width', width)
    mapInstance.setPaintProperty(layerId, 'line-opacity', opacity)
    if (dashArray) {
      mapInstance.setPaintProperty(layerId, 'line-dasharray', dashArray)
    }
  }
)
</script>

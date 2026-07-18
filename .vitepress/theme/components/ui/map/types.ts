import type {
  LineLayerSpecification,
  Map as MapLibreMap,
  MapMouseEvent
} from 'maplibre-gl'

export type Theme = 'light' | 'dark'

export type MapViewport = {
  center: [number, number]
  zoom: number
  bearing: number
  pitch: number
}

export type MapRef = MapLibreMap

export type MapArcDatum = {
  id: string | number
  from: [number, number]
  to: [number, number]
}

export type MapArcEvent<T extends MapArcDatum = MapArcDatum> = {
  arc: T
  longitude: number
  latitude: number
  originalEvent: MapMouseEvent
}

export type MapArcLinePaint = NonNullable<LineLayerSpecification['paint']>
export type MapArcLineLayout = NonNullable<LineLayerSpecification['layout']>

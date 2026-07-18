import type { Map as MapLibreMap } from 'maplibre-gl'
import type { Ref } from 'vue'
import { onBeforeUnmount, watch } from 'vue'

export type LayerSetup = (map: MapLibreMap) => void | (() => void)

export function useMapLayer(
  map: Ref<MapLibreMap | null>,
  isLoaded: Ref<boolean>,
  setup: LayerSetup
) {
  let cleanup: (() => void) | null = null

  const teardown = () => {
    cleanup?.()
    cleanup = null
  }

  watch(
    [map, isLoaded],
    ([mapInstance, loaded]) => {
      if (!mapInstance) {
        teardown()
        return
      }

      if (loaded) {
        if (cleanup) return

        const setupResult = setup(mapInstance)
        cleanup = typeof setupResult === 'function' ? setupResult : null
      } else {
        teardown()
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(teardown)
}

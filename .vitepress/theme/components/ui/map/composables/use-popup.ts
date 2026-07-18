import MapLibreGL, { type PopupOptions } from 'maplibre-gl'
import type { MaybeRefOrGetter } from 'vue'
import { onBeforeUnmount, shallowRef, toValue, watch } from 'vue'

export function usePopup(options: MaybeRefOrGetter<PopupOptions | undefined>) {
  const container
    = typeof document === 'undefined' ? null : document.createElement('div')
  const popup = shallowRef<MapLibreGL.Popup | null>(null)

  const create = (extra?: Partial<PopupOptions>) => {
    if (!container) {
      throw new Error('A map popup can only be created in the browser')
    }

    const popupOptions = toValue(options) ?? {}
    const instance = new MapLibreGL.Popup({
      offset: 16,
      ...popupOptions,
      ...extra,
      closeButton: false,
    })
      .setMaxWidth(popupOptions.maxWidth ?? 'none')
      .setDOMContent(container)

    popup.value = instance
    return instance
  }

  watch(
    () => toValue(options)?.offset,
    (next) => {
      const popupInstance = popup.value
      if (!popupInstance?.isOpen()) return

      popupInstance.setOffset(next ?? 16)
    }
  )

  watch(
    () => toValue(options)?.maxWidth,
    (next) => {
      const popupInstance = popup.value
      if (!popupInstance?.isOpen() || !next) return

      popupInstance.setMaxWidth(next)
    }
  )

  onBeforeUnmount(() => {
    if (popup.value?.isOpen()) popup.value.remove()
    popup.value = null
  })

  return { container, popup, create }
}

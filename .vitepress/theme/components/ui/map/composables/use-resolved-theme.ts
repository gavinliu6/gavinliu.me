import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, toValue } from 'vue'

import type { Theme } from '../types'

function getDocumentTheme(): Theme | null {
  if (typeof document === 'undefined') return null
  if (document.documentElement.classList.contains('dark')) return 'dark'
  if (document.documentElement.classList.contains('light')) return 'light'

  return null
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useResolvedTheme(
  themeProp?: MaybeRefOrGetter<Theme | undefined>
): ComputedRef<Theme> {
  const documentTheme = ref<Theme | null>(getDocumentTheme())
  const systemTheme = ref<Theme>(getSystemTheme())

  onMounted(() => {
    const observer = new MutationObserver(() => {
      documentTheme.value = getDocumentTheme()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      systemTheme.value = event.matches ? 'dark' : 'light'
    }
    colorScheme.addEventListener('change', handleChange)

    onBeforeUnmount(() => {
      observer.disconnect()
      colorScheme.removeEventListener('change', handleChange)
    })
  })

  return computed(
    () => toValue(themeProp) ?? documentTheme.value ?? systemTheme.value
  )
}

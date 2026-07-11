<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import type { Header } from 'vitepress'
import type { HTMLAttributes } from 'vue'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  headers: Header[]
}>()

const isWideLayout = useMediaQuery('(min-width: 961px)')
const activeSlugs = ref(new Set<string>())

let observer: IntersectionObserver | undefined

function observeHeaders() {
  observer?.disconnect()
  activeSlugs.value = new Set()

  if (!isWideLayout.value || typeof IntersectionObserver === 'undefined') {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const nextActiveSlugs = new Set(activeSlugs.value)

      for (const entry of entries) {
        if (entry.isIntersecting) {
          nextActiveSlugs.add(entry.target.id)
        } else {
          nextActiveSlugs.delete(entry.target.id)
        }
      }

      activeSlugs.value = nextActiveSlugs
    },
    { threshold: 0 }
  )

  for (const { slug } of props.headers) {
    const header = document.getElementById(slug)

    if (header) {
      observer.observe(header)
    }
  }
}

watch(
  [isWideLayout, () => props.headers],
  async () => {
    await nextTick()
    observeHeaders()
  },
  { immediate: true }
)

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <aside :class="props.class">
    <div class="py-1">
      <h3 class="text-copy-14">
        On this page
      </h3>
      <ul class="py-1">
        <li
          v-for="header in headers"
          :key="header.slug"
          :class="['w-full', header.level === 3 && 'pl-2']"
        >
          <a
            :href="header.link"
            :aria-current="
              activeSlugs.has(header.slug) ? 'location' : undefined
            "
            :class="[
              `
                block border-l-2 py-1 pl-2 text-copy-14 transition-colors
                duration-150
              `,
              activeSlugs.has(header.slug) && 'border-primary text-primary',
            ]"
          >
            {{ header.title }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

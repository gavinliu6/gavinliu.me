<script setup lang="ts">
import { BentoItem } from '@theme/components/ui/bento-grid'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const shanghaiCoordinates: [number, number] = [121.4737, 31.2304]
const mapLocale = {
  'Map.Title': 'Map centered on Shanghai, China',
}
const mapStyles = {
  light: 'https://tiles.openfreemap.org/styles/liberty',
  dark: 'https://tiles.openfreemap.org/styles/dark',
}
const AsyncMap = defineAsyncComponent(
  () => import('@theme/components/ui/map/Map.vue')
)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <BentoItem
    :col-span="2"
    :row-span="2"
    class="
      relative isolate overflow-hidden rounded-2xl bg-background-100
      shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
    "
  >
    <AsyncMap
      v-if="isMounted"
      :center="shanghaiCoordinates"
      :zoom="6.5"
      :bearing="0"
      :pitch="0"
      :interactive="false"
      :locale="mapLocale"
      :styles="mapStyles"
      class="absolute inset-0 select-none"
    />

    <span
      aria-hidden="true"
      class="
        pointer-events-none absolute top-1/2 left-1/2 z-20 size-2.5
        -translate-1/2 rounded-full bg-blue-700
        shadow-[0_0_0_2px_rgb(255_255_255/0.95),0_2px_6px_rgb(0_0_0/0.18)]
      "
    ></span>
  </BentoItem>
</template>

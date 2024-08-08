<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, inject } from 'vue'

import IconMoon from './icons/bold/IconMoon.vue'
import IconSun from './icons/bold/IconSun.vue'

const { isDark } = useData()

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value
})

const switchTitle = computed(() => {
  return isDark.value ? 'Switch to light theme' : 'Switch to dark theme'
})
</script>

<template>
  <button
    type="button"
    role="switch"
    :title="switchTitle"
    :aria-checked="isDark"
    class="relative h-[22px] w-10 shrink-0 rounded-full border border-default bg-muted transition-[border-color] hover:border-accent-emphasis"
    @click="toggleAppearance"
  >
    <span
      class="absolute left-px top-px size-[18px] rounded-full bg-white !transition-transform duration-200 dark:translate-x-[18px] dark:bg-black"
    >
      <span class="size-[18px] overflow-hidden">
        <IconSun
          :size="12"
          class="absolute left-[3px] top-[3px] opacity-100 transition-opacity dark:opacity-0"
        />
        <IconMoon
          :size="12"
          class="absolute left-[3px] top-[3px] opacity-0 transition-opacity dark:opacity-100"
        />
      </span>
    </span>
  </button>
</template>

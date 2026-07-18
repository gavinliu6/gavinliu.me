<script setup lang="ts">
import darkBackground from '@theme/assets/dark-theme.webp'
import lightBackground from '@theme/assets/light-theme.webp'
import { BentoItem } from '@theme/components/ui/bento-grid'

import ThemeSwitcher from '../ThemeSwitcher.vue'
</script>

<template>
  <BentoItem
    class="
      relative overflow-hidden rounded-2xl bg-background-100
      shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
    "
  >
    <img
      :src="lightBackground"
      alt=""
      aria-hidden="true"
      draggable="false"
      class="
        pointer-events-none absolute inset-0 size-full object-cover opacity-100
        transition-opacity duration-300 select-none
        motion-reduce:transition-none
        dark:opacity-0
      "
    />
    <img
      :src="darkBackground"
      alt=""
      aria-hidden="true"
      draggable="false"
      class="
        pointer-events-none absolute inset-0 size-full object-cover opacity-0
        transition-opacity duration-300 select-none
        motion-reduce:transition-none
        dark:opacity-100
      "
    />
    <div
      class="
        absolute right-3 bottom-3 z-10 rounded-full bg-white/65 p-1
        shadow-[0_0_0_1px_var(--ds-gray-alpha-400),0_2px_2px_rgba(0,0,0,0.04)]
        backdrop-blur-md
        dark:bg-gray-alpha-200
        dark:shadow-[0_0_0_1px_var(--ds-gray-alpha-400),0_1px_2px_rgba(0,0,0,0.16)]
      "
    >
      <ThemeSwitcher
        glass
        class="shadow-none!"
      />
    </div>
  </BentoItem>
</template>

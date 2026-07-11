<script setup lang="ts">
import ThemeSwitcher from '../ThemeSwitcher.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto px-(--page-margin) pt-16 pb-8">
    <div
      class="
        mx-auto flex w-full max-w-2xl items-center justify-between gap-6
        border-t border-gray-alpha-400 pt-6
      "
    >
      <p class="text-sm text-secondary">
        &copy; {{ currentYear }} Gavin Liu. All rights reserved.
      </p>

      <ThemeSwitcher />
    </div>
  </footer>
</template>

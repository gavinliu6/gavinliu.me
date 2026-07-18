<script setup lang="ts">
import { BentoItem } from '@theme/components/ui/bento-grid'
</script>

<template>
  <BentoItem
    as="a"
    href="https://github.com/gavinliu6"
    target="_blank"
    :col-span="2"
    class="
      rounded-2xl bg-background-100 shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
      select-none
    "
  >
    <img
      src="https://raw.githubusercontent.com/gavinliu6/gavinliu6/refs/heads/main/profile/stats.svg"
      alt="GitHub statistics for Gavin Liu"
      class="h-full w-auto"
    />
  </BentoItem>
</template>

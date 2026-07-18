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
      src="https://github-stats-extended.vercel.app/api?username=gavinliu6&rank_icon=github&hide_title=true&show_icons=true&hide_border=true&theme=gruvbox&bg_color=00000000&disable_animations=true"
      alt="GitHub statistics for Gavin Liu"
      class="h-full w-auto"
    />
  </BentoItem>
</template>

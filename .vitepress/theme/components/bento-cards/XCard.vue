<script setup lang="ts">
import { BentoItem } from '@theme/components/ui/bento-grid'

import { IconArrowUpRight, IconTwitter } from '../icons'
</script>

<template>
  <BentoItem
    as="a"
    href="https://twitter.com/GavinLiu0606"
    target="_blank"
    aria-label="Gavin Liu on X"
    class="
      group @container/x-card relative inline-flex items-center justify-center
      rounded-2xl bg-[rgba(29,155,240,.8)] text-white
      shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
      dark:bg-background-100 dark:text-[rgba(29,155,240)]
    "
  >
    <IconTwitter class="size-[clamp(3rem,35cqi,3.5rem)]" />
    <span
      class="
        absolute bottom-3 left-3 inline-flex size-[clamp(1.75rem,20cqi,2rem)]
        items-center justify-center overflow-hidden rounded-full bg-white
        text-[#171717] shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
        dark:bg-transparent dark:text-gray-1000
      "
    >
      <IconArrowUpRight
        class="
          absolute size-4 translate-0 scale-100 opacity-100 blur-none
          transition-[translate,scale,opacity,filter] duration-400
          ease-[cubic-bezier(0.2,0,0,1)]
          group-hover:translate-x-4 group-hover:-translate-y-4
          group-hover:scale-25 group-hover:opacity-0 group-hover:blur-xs
          group-focus-visible:translate-x-4 group-focus-visible:-translate-y-4
          group-focus-visible:scale-25 group-focus-visible:opacity-0
          group-focus-visible:blur-xs
          motion-reduce:transition-none
          motion-reduce:group-hover:translate-0
          motion-reduce:group-hover:scale-100
          motion-reduce:group-hover:opacity-100
          motion-reduce:group-hover:blur-none
          motion-reduce:group-focus-visible:translate-0
          motion-reduce:group-focus-visible:scale-100
          motion-reduce:group-focus-visible:opacity-100
          motion-reduce:group-focus-visible:blur-none
        "
      />
      <IconArrowUpRight
        class="
          absolute size-4 -translate-x-4 translate-y-4 scale-25 opacity-0
          blur-xs transition-[translate,scale,opacity,filter] duration-400
          ease-[cubic-bezier(0.2,0,0,1)]
          group-hover:translate-0 group-hover:scale-100 group-hover:opacity-100
          group-hover:blur-none
          group-focus-visible:translate-0 group-focus-visible:scale-100
          group-focus-visible:opacity-100 group-focus-visible:blur-none
          motion-reduce:hidden motion-reduce:transition-none
        "
      />
    </span>
  </BentoItem>
</template>

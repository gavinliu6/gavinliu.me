<script setup lang="ts">
import { cn, isActive } from '@theme/lib/utils'
import { useData } from 'vitepress'

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

// https://vitepress.dev/reference/runtime-api#usedata
const { page } = useData()
</script>

<template>
  <header class="h-(--header-height)">
    <div
      class="
        mx-auto flex size-full items-center justify-between gap-2
        px-(--page-margin)
      "
    >
      <nav
        class="flex items-center gap-2 text-[15px] font-medium tracking-normal"
      >
        <a
          href="/"
          class="
            text-secondary underline decoration-gray-alpha-400
            underline-offset-4
            hover:text-primary hover:decoration-gray-alpha-500
          "
        >home</a>
        <span>/</span>
        <a
          href="/blog"
          :class="
            cn(
              `
                text-secondary underline decoration-gray-alpha-400
                underline-offset-4
                hover:text-primary hover:decoration-gray-alpha-500
              `,
              isActive(page.relativePath, '/blog') &&
                `text-primary decoration-gray-alpha-500`,
            )
          "
        >blog</a>
        <span>/</span>
        <Tooltip>
          <TooltipTrigger>
            <a
              href="https://moments.gavinliu.me"
              target="_blank"
              class="
                text-secondary underline decoration-gray-alpha-400
                underline-offset-4
                hover:text-primary hover:decoration-gray-alpha-500
              "
            >moments</a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open the link in new tab</p>
          </TooltipContent>
        </Tooltip>
      </nav>
    </div>
  </header>
</template>

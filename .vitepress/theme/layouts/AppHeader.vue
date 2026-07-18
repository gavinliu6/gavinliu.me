<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'
import { cn, isActive } from '@theme/lib/utils'
import { useData } from 'vitepress'

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../components/ui/tooltip'

// https://vitepress.dev/reference/runtime-api#usedata
const { page } = useData()
</script>

<template>
  <header class="h-(--header-height)">
    <div
      class="
        mx-auto flex size-full max-w-(--page-width-with-margin) items-center
        justify-between gap-2 px-(--page-margin)
      "
    >
      <a
        href="/"
        aria-label="Home"
        class="
          group inline-flex rounded-lg outline-none
          focus-visible:ring-2 focus-visible:ring-blue-700
          focus-visible:ring-offset-2 focus-visible:ring-offset-background-100
        "
      >
        <Avatar
          class="
            size-7.5 rotate-5 rounded-lg transition-transform duration-200
            ease-out select-none
            group-hover:rotate-0
            group-active:scale-95
            after:rounded-lg
            motion-reduce:transition-none
          "
        >
          <AvatarImage src="https://github.com/gavinliu6.png" />
          <AvatarFallback class="text-sm">GL</AvatarFallback>
        </Avatar>
      </a>
      <nav
        class="flex items-center gap-2 text-[15px] font-medium tracking-normal"
      >
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
              rel="noopener noreferrer"
              class="
                inline-flex items-center gap-0.5 text-secondary underline
                decoration-gray-alpha-400 underline-offset-4
                hover:text-primary hover:decoration-gray-alpha-500
              "
            >
              <span>moments</span>
              <ArrowUpRightIcon
                class="size-3.5 shrink-0"
                :stroke-width="1.75"
                aria-hidden="true"
              />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open the link in new tab</p>
          </TooltipContent>
        </Tooltip>
      </nav>
    </div>
  </header>
</template>

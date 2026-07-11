<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { useData } from 'vitepress'
import { computed } from 'vue'

import CopyPageDropdown from '../CopyPageDropdown.vue'
import ExpandPageBtn from '../ExpandPageBtn.vue'
import GiscusComments from '../GiscusComments.vue'
import Toc from '../Toc.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter, page } = useData()

const expanded = useStorage('docs-page-full-width', false, undefined, {
  initOnMounted: true,
})

const hasToc = computed(() => page.value.headers.length > 0)
const publishedAt = computed(() =>
  dayjs(frontmatter.value.date).format('MMM D, YYYY')
)
const tocHeaders = computed(() =>
  page.value.headers.flatMap(header => [
    header,
    ...header.children.filter(child => child.level === 3),
  ])
)
</script>

<template>
  <div
    class="
      pt-8
      lg:pt-20
    "
  >
    <div
      class="mx-auto w-full max-w-(--page-width-with-margin) px-(--page-margin)"
    >
      <div class="grid grid-cols-12 gap-6">
        <div
          :class="
            cn(
              `
                col-span-12 mb-12 flex flex-col gap-5
                lg:mb-16
              `,
              expanded
                ? `
                  lg:col-span-9 lg:col-start-1
                  xl:col-span-9 xl:col-start-1
                `
                : `
                  lg:col-span-7 lg:col-start-2
                  xl:col-span-6 xl:col-start-4
                `,
            )
          "
        >
          <div class="text-copy-14 leading-none text-secondary italic">
            Published
            <time :datetime="frontmatter.date">{{ publishedAt }}</time>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h1
              class="
                text-heading-40 font-[450]! text-gray-1000
                [--font-weight-semibold:450]
              "
            >
              {{ frontmatter.title }}
            </h1>
            <div class="flex shrink-0 items-center gap-2">
              <CopyPageDropdown :page="page" />
              <ExpandPageBtn v-model="expanded" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <Toc
          v-if="hasToc"
          :headers="tocHeaders"
          :class="
            cn(
              `
                order-first col-span-12 flex h-fit justify-between gap-2
                text-copy-14 text-gray-900
                lg:sticky lg:top-6 lg:flex-col
              `,
              expanded
                ? `
                  lg:order-last lg:col-span-3 lg:col-start-11
                  xl:col-span-2 xl:col-start-11
                `
                : `
                  lg:order-last lg:col-span-3 lg:col-start-10
                  xl:col-span-2 xl:col-start-11
                `,
            )
          "
        />
        <div
          :class="
            cn(
              'col-span-12',
              expanded
                ? `
                  lg:col-span-9 lg:col-start-1
                  xl:col-span-9 xl:col-start-1
                `
                : `
                  lg:col-span-7 lg:col-start-2
                  xl:col-span-6 xl:col-start-4
                `,
            )
          "
        >
          <article class="markdown-body text-copy-16">
            <Content />
          </article>
          <GiscusComments class="mt-16" />
        </div>
      </div>
    </div>
  </div>
</template>

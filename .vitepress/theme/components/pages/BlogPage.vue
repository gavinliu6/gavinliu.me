<script setup lang="ts">
import { computed } from 'vue'

import { data as posts, type Post } from '../../posts.data'

interface PostGroup {
  year: number
  posts: Post[]
}

const postGroups = computed<PostGroup[]>(() => {
  const groups: PostGroup[] = []

  for (const post of posts) {
    const currentGroup = groups.at(-1)

    if (currentGroup?.year === post.date.year) {
      currentGroup.posts.push(post)
    } else {
      groups.push({ year: post.date.year, posts: [post] })
    }
  }

  return groups
})
</script>

<template>
  <div
    class="
      pt-12
      lg:pt-20
    "
  >
    <div
      class="mx-auto w-full max-w-(--page-width-with-margin) px-(--page-margin)"
    >
      <header class="grid grid-cols-12 gap-6 border-b border-gray-alpha-400">
        <div
          class="
            col-span-12 flex items-end justify-between gap-6 pb-8
            lg:col-span-10 lg:col-start-2 lg:pb-10
            xl:col-span-8 xl:col-start-3
          "
        >
          <h1
            class="
              text-heading-40 font-[450]! text-gray-1000
              [--font-weight-semibold:450]
              md:text-heading-56
            "
          >
            Blog
          </h1>
          <p
            class="
              pb-1 text-label-13-mono text-gray-900 tabular-nums
              md:pb-2
            "
          >
            {{ posts.length }}
            {{ posts.length === 1 ? 'story' : 'stories' }}
          </p>
        </div>
      </header>

      <div class="grid grid-cols-12 gap-6">
        <div
          class="
            col-span-12
            lg:col-span-10 lg:col-start-2
            xl:col-span-8 xl:col-start-3
          "
        >
          <section
            v-for="group in postGroups"
            :key="group.year"
            :aria-labelledby="`posts-${group.year}`"
            class="
              grid grid-cols-1 border-b border-gray-alpha-400
              last:border-b-0
              md:grid-cols-[7rem_1fr]
            "
          >
            <h2
              :id="`posts-${group.year}`"
              class="
                pt-6 text-heading-24 font-normal! text-gray-900
                md:pt-8
              "
            >
              {{ group.year }}
            </h2>

            <ol
              class="
                divide-y divide-gray-alpha-400 pb-6
                md:pb-8
              "
            >
              <li
                v-for="post in group.posts"
                :key="post.url"
              >
                <a
                  :href="post.url"
                  class="
                    group -mx-3 grid grid-cols-[1fr_auto] items-start gap-6
                    rounded-sm px-3 py-6 outline-none
                    hover:bg-gray-alpha-100
                    focus-visible:ring-2 focus-visible:ring-blue-700
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-background-100
                    md:-mx-4 md:px-4 md:py-8
                  "
                >
                  <span class="min-w-0">
                    <span
                      class="
                        block text-heading-20 font-[450]! text-gray-1000
                        [--font-weight-semibold:450]
                        group-hover:text-blue-700
                        md:text-heading-24
                      "
                    >
                      {{ post.title }}
                    </span>

                    <time
                      :datetime="post.date.iso"
                      class="mt-3 block text-label-13 text-gray-900"
                    >
                      {{ post.date.formatted }}
                    </time>
                  </span>

                  <span
                    class="
                      mt-0.5 text-heading-16 font-normal text-gray-700
                      group-hover:text-blue-700
                    "
                    aria-hidden="true"
                  >→</span>
                </a>
              </li>
            </ol>
          </section>

          <p
            v-if="posts.length === 0"
            class="py-16 text-copy-16 text-gray-900"
          >
            No stories published yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

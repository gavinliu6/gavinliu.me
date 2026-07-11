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
      py-14
      md:py-20
      lg:py-24
    "
  >
    <div class="mx-auto w-full max-w-3xl px-(--page-margin)">
      <div>
        <section
          v-for="group in postGroups"
          :key="group.year"
          :aria-labelledby="`posts-${group.year}`"
          class="
            grid grid-cols-1 gap-5
            not-last:mb-14
            md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8
            md:not-last:mb-20
          "
        >
          <h2
            :id="`posts-${group.year}`"
            class="
              text-heading-32 font-[450]! tracking-[-0.04em] text-gray-1000
              [--font-weight-semibold:450]
              md:-mt-1
            "
          >
            {{ group.year }}
          </h2>

          <ol class="border-t border-gray-alpha-400">
            <li
              v-for="post in group.posts"
              :key="post.url"
              class="border-b border-gray-alpha-400"
            >
              <a
                :href="post.url"
                class="
                  group -mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline
                  gap-5 px-3 py-5 transition-colors duration-150 outline-none
                  hover:bg-gray-alpha-100
                  focus-visible:bg-gray-alpha-100 focus-visible:ring-2
                  focus-visible:ring-blue-700 focus-visible:ring-offset-2
                  focus-visible:ring-offset-background-100
                  md:-mx-4 md:gap-8 md:px-4 md:py-6
                "
              >
                <span
                  class="
                    min-w-0 text-heading-20 font-normal! wrap-break-word
                    text-primary underline decoration-gray-alpha-400
                    underline-offset-[5px] transition-colors duration-150
                    group-hover:decoration-gray-alpha-600
                  "
                >
                  {{ post.title }}
                </span>

                <time
                  :datetime="post.date.iso"
                  class="
                    shrink-0 text-label-13-mono whitespace-nowrap text-gray-800
                    transition-colors duration-150
                    group-hover:text-gray-1000
                  "
                >
                  {{ post.date.formatted }}
                </time>
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
</template>

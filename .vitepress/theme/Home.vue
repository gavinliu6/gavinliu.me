<script setup lang="ts">
import IconGitHub from './components/icons/social/IconGitHub.vue'
import IconX from './components/icons/social/IconX.vue'
import { data as posts } from './latestPosts.data.js'
import formatDate from './utils/formatDate'

const socialLinks = [
  {
    name: 'Twitter',
    link: 'https://x.com/GavinLiu0606',
    icon: IconX,
  },
  {
    name: 'GitHub',
    link: 'https://github.com/gavinliu6',
    icon: IconGitHub,
  },
]
</script>

<template>
  <div>
    <div>
      <img
        src="/avatar.jpg"
        alt="Gavin Liu"
        class="size-16 rounded-full"
      >
    </div>
    <div class="mt-4">
      <h2 class="mb-3 text-sm font-medium text-muted">
        Social
      </h2>
      <ul class="flex items-center space-x-2.5">
        <li
          v-for="item in socialLinks"
          :key="item.name"
        >
          <a
            :href="item.link"
            :title="item.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component :is="item.icon" />
          </a>
        </li>
      </ul>
      <div>
        <h2 class="mb-4 mt-6 flex items-center border-b border-b-default pb-[.3em] text-xl font-semibold">
          {{ 'Hey, there ' }}
          <img
            src="/wave.gif"
            alt="👋"
            class="inline-block size-6"
          />
        </h2>
        <p class="mb-4 text-sm">
          I am Gavin (/ˈɡævɪn/) Liu, a backend developer and lifelong learner.
        </p>
        <p class="mb-4 text-sm">
          I am passionate about web development, open source, and creative design. You can access my daily notes <a
            href="https://notes.gavinliu.me"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          ><span>here</span></a>.
        </p>
        <p class="text-sm">
          📺 My favorite TV series are "Reply 1988" and "The Big Bang Theory."
        </p>
      </div>
      <div>
        <div class="mb-4 mt-8 flex items-center justify-between border-b border-b-default pb-[.3em] ">
          <h2 class="text-xl font-semibold">
            最近文章
          </h2>
          <a
            href="/posts/"
            class="text-sm text-muted transition-[color] hover:text-link"
          >
            <span>{{ '查看全部 >' }}</span>
          </a>
        </div>
        <ul class="list-disc pl-[2em]">
          <li
            v-for="{title, url, date} in posts"
            :key="url"
            class="mt-[.25em] first:mt-0"
          >
            <a
              :href="url"
              class="link text-sm"
            >{{ title }}</a>
            <time
              :datetime="date"
              class="ml-2 text-xs text-muted"
            >{{ formatDate(date) }}</time>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

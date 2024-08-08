<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { useRoute } from 'vitepress'

import IconCamera from './components/icons/bold/IconCamera.vue'
import IconFeather from './components/icons/bold/IconFeather.vue'
import IconHome from './components/icons/bold/IconHome.vue'
import SwitchAppearance from './components/SwitchAppearance.vue'

const route = useRoute()

const navList = [
  {
    text: '主页',
    link: '/',
    icon: IconHome,
  },
  {
    text: '博客',
    link: '/posts/',
    icon: IconFeather,
  },
  {
    text: '相册',
    link: '/photos',
    icon: IconCamera,
  },
]
</script>

<template>
  <header class="fixed z-10 flex w-full items-center bg-header backdrop-blur-xl after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[--color-border-default]">
    <div class="mx-auto flex size-full max-w-screen-md justify-between px-4">
      <nav>
        <ul class="flex items-center space-x-8">
          <li
            v-for="item in navList"
            :key="item.link"
          >
            <a
              :href="item.link"
              :class="twMerge(
                'flex h-14 items-center text-sm font-medium',
                'relative after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-0.5 after:w-0 after:bg-[#fd8c73] after:transition-[width] after:duration-300 after:ease-linear hover:after:w-full dark:after:bg-[#ee775c]',
                route.path === item.link && 'after:w-full',
              )"
            >
              <component
                :is="item.icon"
                :size="19"
                class="mr-2 text-muted"
              />
              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center">
        <SwitchAppearance />
      </div>
    </div>
  </header>
</template>

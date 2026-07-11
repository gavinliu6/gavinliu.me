<script setup lang="ts">
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  LoaderCircleIcon
} from '@lucide/vue'
import type { PageData } from 'vitepress'
import { computed, ref } from 'vue'

import { Button } from './ui/button'
import { ButtonGroup, ButtonGroupSeparator } from './ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

const props = defineProps<{
  page: PageData
}>()

const copied = ref(false)
const copying = ref(false)
const markdownSourceUrl = computed(
  () =>
    `https://raw.githubusercontent.com/gavinliu6/gavinliu.me/main/src/${props.page.relativePath}`
)
const copyFeedbackDuration = 2000

let copiedTimeout: number | undefined

async function copyPage() {
  window.clearTimeout(copiedTimeout)
  copied.value = false
  copying.value = true

  try {
    const response = await fetch(markdownSourceUrl.value)

    if (!response.ok) return

    const markdown = await response.text()

    await navigator.clipboard.writeText(markdown)

    copied.value = true
    copiedTimeout = window.setTimeout(() => {
      copied.value = false
    }, copyFeedbackDuration)
  } finally {
    copying.value = false
  }
}
</script>

<template>
  <ButtonGroup
    class="
      h-7
      *:data-[slot=button]:h-7
    "
  >
    <Button
      :aria-label="
        copying
          ? 'Copying page as Markdown'
          : copied
            ? 'Markdown copied'
            : 'Copy page as Markdown'
      "
      :disabled="copying"
      variant="outline"
      size="small"
      class="px-2.5"
      @click="copyPage"
    >
      <LoaderCircleIcon
        v-if="copying"
        class="size-3.5 animate-spin"
      />
      <CheckIcon
        v-else-if="copied"
        class="size-3.5 text-green-500"
      />
      <CopyIcon
        v-else
        class="size-3.5"
      />
      {{ copying ? 'Copying' : copied ? 'Copied' : 'Copy page' }}
    </Button>
    <ButtonGroupSeparator />
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          aria-label="More page actions"
          variant="outline"
          size="icon-sm"
          class="size-7"
        >
          <ChevronDownIcon class="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem as-child>
          <a
            :href="`/${page.filePath}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="flex size-5 items-center justify-center text-gray-900"><svg
              viewBox="0 0 22 16"
              height="16"
              width="22"
              data-slot="geist-icon"
              style="color: currentcolor"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M19.5 2.25h-17c-.69 0-1.25.56-1.25 1.25v9c0 .69.56 1.25 1.25 1.25h17c.69 0 1.25-.56 1.25-1.25v-9c0-.69-.56-1.25-1.25-1.25M2.5 1A2.5 2.5 0 0 0 0 3.5v9A2.5 2.5 0 0 0 2.5 15h17a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 19.5 1zM3 4.5h1.69l.3.32L7 7.02l2.01-2.2.3-.32H11v7H9V7.8L7.74 9.18l-.74.8-.74-.8L5 7.8v3.7H3v-7M15 8V4.5h2V8h2.5L17 10.5l-1 1-1-1L12.5 8z"
                clip-rule="evenodd"
              ></path></svg></span>
            View as Markdown
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <a
            :href="`https://chatgpt.com/?prompt=Read from this URL: https://gavinliu.me/${page.filePath} and explain it to me`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              class="size-4.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.67089 9.30426V7.42122C9.67089 7.26262 9.73039 7.14363 9.86909 7.06443L13.6551 4.88409C14.1705 4.58679 14.7849 4.4481 15.4191 4.4481C17.7977 4.4481 19.3042 6.29154 19.3042 8.25379C19.3042 8.39249 19.3042 8.55109 19.2843 8.70969L15.3597 6.41034C15.1219 6.27165 14.8839 6.27165 14.6461 6.41034L9.67089 9.30426ZM18.5113 16.6383V12.1387C18.5113 11.8611 18.3923 11.6629 18.1544 11.5242L13.1793 8.63029L14.8047 7.69862C14.9434 7.61942 15.0624 7.61942 15.2011 7.69862L18.987 9.87896C20.0774 10.5133 20.8106 11.8611 20.8106 13.1693C20.8106 14.6756 19.9188 16.0632 18.5113 16.6381V16.6383ZM8.50143 12.674L6.87607 11.7226C6.73737 11.6434 6.67788 11.5244 6.67788 11.3658V7.00513C6.67788 4.88427 8.30323 3.27863 10.5035 3.27863C11.336 3.27863 12.1089 3.55622 12.7632 4.0517L8.8584 6.31143C8.62061 6.45014 8.50161 6.64834 8.50161 6.92593V12.6742L8.50143 12.674ZM12 14.6957L9.67089 13.3876V10.6126L12 9.30446L14.3289 10.6126V13.3876L12 14.6957ZM13.4965 20.7216C12.6639 20.7216 11.891 20.4439 11.2368 19.9485L15.1415 17.6887C15.3793 17.55 15.4983 17.3519 15.4983 17.0743V11.326L17.1436 12.2774C17.2823 12.3566 17.3418 12.4756 17.3418 12.6342V16.9949C17.3418 19.1157 15.6965 20.7216 13.4965 20.7216ZM8.79872 16.3014L5.01273 14.121C3.92246 13.4866 3.18917 12.1389 3.18917 10.8307C3.18917 9.30446 4.10096 7.93679 5.50821 7.36191V11.8812C5.50821 12.1588 5.62721 12.357 5.86501 12.4957L10.8205 15.3697L9.19511 16.3014C9.05641 16.3806 8.93741 16.3806 8.79872 16.3014ZM8.58081 19.5521C6.34097 19.5521 4.69573 17.8672 4.69573 15.786C4.69573 15.6274 4.71562 15.4688 4.73533 15.3102L8.64012 17.5699C8.87792 17.7086 9.11591 17.7086 9.35371 17.5699L14.3289 14.6959V16.579C14.3289 16.7376 14.2694 16.8565 14.1307 16.9357L10.3447 19.1161C9.8293 19.4133 9.21481 19.5521 8.58063 19.5521H8.58081ZM13.4965 21.9107C15.8949 21.9107 17.8967 20.2061 18.3528 17.9464C20.5727 17.3715 22 15.2903 22 13.1695C22 11.7819 21.4053 10.4341 20.3349 9.46286C20.4341 9.04658 20.4937 8.63029 20.4937 8.21419C20.4937 5.37977 18.1943 3.25873 15.5381 3.25873C15.0031 3.25873 14.4877 3.33794 13.9723 3.51642C13.0802 2.64425 11.8512 2.08926 10.5035 2.08926C8.10504 2.08926 6.10318 3.79382 5.6471 6.05355C3.42716 6.62843 2 8.70969 2 10.8305C2 12.2181 2.59459 13.5659 3.66496 14.5371C3.56586 14.9534 3.50637 15.3697 3.50637 15.7858C3.50637 18.6202 5.80569 20.7412 8.46183 20.7412C8.99692 20.7412 9.51231 20.6621 10.0277 20.4836C10.9196 21.3558 12.1485 21.9107 13.4965 21.9107Z"
                fill="currentColor"
              />
            </svg>
            Open in ChatGPT
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  href: string
}>()
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-stretch"
  >
    <span class="w-0 overflow-hidden whitespace-nowrap">{{ title }}</span>
    <svg
      class="m-[0.2em] size-4 rounded bg-lime-600/80 p-[0.1em] text-lime-50 dark:bg-lime-500/80 dark:text-white"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 10H2M23 10H22M9.72677 9.70829C10.3723 9.26165 11.1556 9 12 9C12.8668 9 13.6692 9.27571 14.3243 9.74423M10 12C10 14.2091 8.20914 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C8.20914 8 10 9.79086 10 12ZM22 12C22 14.2091 20.2091 16 18 16C15.7909 16 14 14.2091 14 12C14 9.79086 15.7909 8 18 8C20.2091 8 22 9.79086 22 12Z"
        stroke-width="2"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span>{{ title }}</span>
  </a>
</template>

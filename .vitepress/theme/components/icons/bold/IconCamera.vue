<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z"
      :stroke="color"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      :stroke="color"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M17.5 7.5H17.51M17.75 7.5C17.75 7.63807 17.6381 7.75 17.5 7.75C17.3619 7.75 17.25 7.63807 17.25 7.5C17.25 7.36193 17.3619 7.25 17.5 7.25C17.6381 7.25 17.75 7.36193 17.75 7.5Z"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

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
      d="M5 21C5 12.5481 8.11085 4.09628 17.2371 3.01256C18.3552 2.87979 19.2922 3.81976 18.9151 4.86659C17.835 7.86506 14.6857 9.93632 14.6857 9.93632L15.5776 10.5962C16.2658 11.1054 16.5505 11.9891 16.1251 12.7267C15.0272 14.6303 12.2059 17.9826 5.95157 17.9826"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

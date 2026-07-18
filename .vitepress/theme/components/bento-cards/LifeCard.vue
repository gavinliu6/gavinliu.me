<script setup lang="ts">
import { BentoItem } from '@theme/components/ui/bento-grid'
</script>

<template>
  <BentoItem
    as="a"
    href="https://moments.gavinliu.me"
    target="_blank"
    aria-hidden="true"
    class="
      @container/life-card relative isolate overflow-hidden rounded-2xl
      bg-green-700 text-white shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
      dark:text-[#ededed]
    "
  >
    <span class="absolute top-3 left-3">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.8755 16C20.8755 13.3073 18.6926 11.1244 16 11.1244C13.3073 11.1244 11.1244 13.3073 11.1244 16C11.1244 18.6927 13.3073 20.8755 16 20.8755C18.6926 20.8755 20.8755 18.6927 20.8755 16ZM23.5425 16C23.5425 20.1656 20.1656 23.5425 16 23.5425C11.8344 23.5425 8.45746 20.1656 8.45746 16C8.45746 11.8344 11.8344 8.45747 16 8.45747C20.1656 8.45747 23.5425 11.8344 23.5425 16Z"
          fill="currentColor"
        />
        <path
          d="M16 8.45747V11.1244H0.914978V8.45747H16Z"
          fill="currentColor"
        />
        <path
          d="M21.3334 10.6666L19.4475 12.5524L8.78094 1.88579L10.6667 0L21.3334 10.6666Z"
          fill="currentColor"
        />
        <path
          d="M23.5425 0.914978V16H20.8755V0.914978H23.5425Z"
          fill="currentColor"
        />
        <path
          d="M32 10.6668L21.3334 21.3334L19.4476 19.4476L30.1142 8.78098L32 10.6668Z"
          fill="currentColor"
        />
        <path
          d="M31.0849 20.8755V23.5425H15.9999V20.8755H31.0849Z"
          fill="currentColor"
        />
        <path
          d="M23.219 30.1142L21.3332 32L10.6666 21.3334L12.5524 19.4476L23.219 30.1142Z"
          fill="currentColor"
        />
        <path
          d="M11.1244 16V31.085H8.45746V16H11.1244Z"
          fill="currentColor"
        />
        <path
          d="M12.5524 12.5524L1.88579 23.219L0 21.3332L10.6666 10.6666L12.5524 12.5524Z"
          fill="currentColor"
        />
      </svg>
    </span>
    <span
      class="
        absolute right-[clamp(0.5rem,5cqw,0.75rem)]
        bottom-[clamp(0.5rem,5cqw,0.75rem)] z-10 flex flex-col text-heading-32
        text-[clamp(1.25rem,13cqw,2rem)]! leading-tight! tracking-[-0.04em]!
      "
    >Moments</span>
    <span
      aria-hidden="true"
      class="
        pointer-events-none absolute inset-0 z-0 bg-[url('/static.png')]
        bg-size-[128px] bg-top-left bg-repeat opacity-20 mix-blend-soft-light
      "
    ></span>
  </BentoItem>
</template>

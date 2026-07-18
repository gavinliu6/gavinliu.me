<script setup lang="ts">
import { useData } from 'vitepress'

const { site } = useData()
</script>

<template>
  <main
    class="
      grid min-h-screen justify-items-center bg-background-100 px-6 pt-20 pb-10
      text-gray-900 antialiased
    "
    aria-labelledby="not-found-title"
  >
    <div class="flex flex-col items-center text-center">
      <p
        class="
          m-0 text-[64px] leading-none font-semibold tracking-[-2.5px]
          tabular-nums
        "
        aria-hidden="true"
      >
        404
      </p>
      <h1
        id="not-found-title"
        class="
          mt-2.5 text-[20px] leading-[1.4] font-[650] tracking-[1.25px]
          text-balance uppercase
        "
      >
        Page not found
      </h1>
      <div
        class="mt-5 h-px w-16 bg-gray-300"
        aria-hidden="true"
      ></div>
      <p
        class="
          mt-5 text-[15px]/6 font-normal text-pretty text-gray-800
          max-[400px]:max-w-[290px]
        "
      >
        But if you don't change your direction,<br class="max-[400px]:hidden" />
        and if you keep looking, you may end<br class="max-[400px]:hidden" />
        up where you are heading.
      </p>
      <a
        class="
          relative mt-5 inline-flex min-h-8 items-center justify-center
          rounded-full border border-blue-800 px-4 py-[5px] text-[15px]/5
          font-normal text-blue-800 no-underline
          transition-[color,background-color,box-shadow,transform] duration-160
          ease-[cubic-bezier(0.2,0,0,1)]
          before:absolute before:h-11 before:w-full before:min-w-11
          hover:bg-blue-800 hover:text-background-100
          focus-visible:shadow-[0_0_0_2px_var(--ds-background-100),0_0_0_4px_var(--ds-blue-700)]
          focus-visible:outline-none
          active:scale-[0.96]
          motion-reduce:duration-[0.01ms]
        "
        :href="site.base"
      >Take me home</a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CheckIcon, CopyIcon } from '@lucide/vue'
import { BentoItem } from '@theme/components/ui/bento-grid'
import { onBeforeUnmount, ref } from 'vue'

const email = 'hi@gavinliu.me'
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
  }
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <BentoItem
    class="
      @container/email-card relative isolate overflow-hidden rounded-2xl
      bg-background-100 p-3 shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
    "
  >
    <span
      aria-hidden="true"
      class="
        pointer-events-none absolute right-[-0.06em] bottom-[-0.3em]
        text-[clamp(6rem,62cqi,9rem)] leading-none font-semibold
        tracking-[-0.08em] text-gray-alpha-200 select-none
      "
    >@</span>
    <div class="relative z-10 flex flex-col gap-2">
      <span>📮</span>
      <div class="group/email relative w-fit max-w-full">
        <a
          :href="`mailto:${email}`"
          class="
            block max-w-full text-copy-14 font-mono! font-medium
            whitespace-nowrap text-gray-1000 underline decoration-gray-alpha-400
            underline-offset-[3px] transition-[text-decoration-color]
            duration-200 ease-out
            hover:decoration-current
            focus-visible:decoration-current focus-visible:outline-none
          "
        >
          {{ email }}
        </a>

        <button
          type="button"
          :class="
            copied
              ? 'scale-100 opacity-100 blur-none'
              : `
                scale-[0.25] opacity-0 blur-xs
                group-hover/email:scale-100 group-hover/email:opacity-100
                group-hover/email:blur-none
                group-has-focus-visible/email:scale-100
                group-has-focus-visible/email:opacity-100
                group-has-focus-visible/email:blur-none
                focus-visible:scale-100 focus-visible:opacity-100
                focus-visible:blur-none
              `
          "
          class="
            absolute top-1/2 left-full inline-flex size-10 -translate-y-1/2
            items-center justify-start rounded-lg pl-1 text-gray-800
            transition-[opacity,scale,filter,color] duration-300
            ease-[cubic-bezier(0.2,0,0,1)]
            hover:text-gray-1000
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-gray-1000
            active:scale-[0.96]
            motion-reduce:transition-none
          "
          :aria-label="copied ? 'Email copied' : `Copy ${email}`"
          :title="copied ? 'Copied' : 'Copy email'"
          @click="copyEmail"
        >
          <span
            class="relative size-4"
            aria-hidden="true"
          >
            <CopyIcon
              :size="16"
              :stroke-width="1.75"
              :class="
                copied
                  ? 'scale-[0.25] opacity-0 blur-xs'
                  : 'scale-100 opacity-100 blur-none'
              "
              class="
                absolute inset-0 transition-[opacity,scale,filter] duration-300
                ease-[cubic-bezier(0.2,0,0,1)]
                motion-reduce:transition-none
              "
            />
            <CheckIcon
              :size="16"
              :stroke-width="2"
              :class="
                copied
                  ? 'scale-100 opacity-100 blur-none'
                  : 'scale-[0.25] opacity-0 blur-xs'
              "
              class="
                absolute inset-0 text-green-900
                transition-[opacity,scale,filter] duration-300
                ease-[cubic-bezier(0.2,0,0,1)]
                motion-reduce:transition-none
              "
            />
          </span>
        </button>
      </div>
    </div>
  </BentoItem>
</template>

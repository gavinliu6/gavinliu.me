<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type { HoverCardContentProps } from 'reka-ui'
import { HoverCardContent, HoverCardPortal, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})

type Props = HoverCardContentProps & { class?: HTMLAttributes['class'] }

const props = withDefaults(defineProps<Props>(), { sideOffset: 4 })

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const contentClass = `
  z-50 w-64 origin-(--reka-hover-card-content-transform-origin)
  rounded-[8px] bg-background-100 p-4 text-copy-14 text-gray-1000
  shadow-[0_0_0_1px_var(--ds-gray-alpha-400),0_1px_1px_rgb(0_0_0/0.02),0_4px_8px_-4px_rgb(0_0_0/0.04),0_16px_24px_-8px_rgb(0_0_0/0.06)]
  outline-hidden
  data-[side=bottom]:slide-in-from-top-2
  data-[side=left]:slide-in-from-right-2
  data-[side=right]:slide-in-from-left-2
  data-[side=top]:slide-in-from-bottom-2
  data-[state=closed]:animate-out data-[state=closed]:duration-200
  data-[state=closed]:ease-[cubic-bezier(0.175,0.885,0.32,1.1)]
  data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
  data-[state=open]:animate-in data-[state=open]:duration-200
  data-[state=open]:ease-[cubic-bezier(0.175,0.885,0.32,1.1)]
  data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
  motion-reduce:data-[state=closed]:animate-none
  motion-reduce:data-[state=open]:animate-none
`
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="hover-card-content"
      v-bind="{ ...$attrs, ...forwardedProps }"
      :class="cn(contentClass, props.class)"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>

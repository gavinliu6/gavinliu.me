<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type {
  DropdownMenuSubContentEmits,
  DropdownMenuSubContentProps
} from 'reka-ui'
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<
  DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }
>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuSubContent
    data-slot="dropdown-menu-sub-content"
    v-bind="forwarded"
    :class="
      cn(
        `
          z-50 min-w-45 origin-(--reka-dropdown-menu-content-transform-origin)
          overflow-hidden rounded-[6px] bg-background-100 p-1 text-gray-1000
          shadow-[0_0_0_1px_var(--ds-gray-alpha-400),0_1px_1px_rgb(0_0_0/0.02),0_4px_8px_-4px_rgb(0_0_0/0.04),0_16px_24px_-8px_rgb(0_0_0/0.08),0_0_0_1px_var(--ds-background-200)]
          data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2
          data-[state=closed]:animate-out data-[state=closed]:duration-100
          data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[state=open]:animate-in data-[state=open]:duration-150
          data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
        `,
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuSubContent>
</template>

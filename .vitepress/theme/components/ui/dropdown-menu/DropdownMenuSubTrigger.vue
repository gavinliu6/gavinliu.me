<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { cn } from '@theme/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type { DropdownMenuSubTriggerProps } from 'reka-ui'
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<
    DropdownMenuSubTriggerProps & {
      class?: HTMLAttributes['class']
      inset?: boolean
      variant?: 'default' | 'destructive'
    }
  >(),
  {
    variant: 'default',
  }
)

const delegatedProps = reactiveOmit(props, 'class', 'inset', 'variant')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    v-bind="forwardedProps"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    :class="
      cn(
        `
          relative flex h-8 cursor-default items-center gap-2 rounded-[4px] px-2
          text-button-14 outline-none select-none
          data-highlighted:bg-gray-alpha-100
          data-inset:pl-8
          data-[state=open]:bg-gray-alpha-100
          data-[variant=destructive]:text-red-800
          data-[variant=destructive]:data-highlighted:bg-red-100
          data-[variant=destructive]:data-[state=open]:bg-red-100
          [&_svg]:pointer-events-none [&_svg]:shrink-0
          [&_svg:not([class*=\'size-\'])]:size-4
        `,
        props.class,
      )
    "
  >
    <slot />
    <ChevronRight class="ml-auto size-4" />
  </DropdownMenuSubTrigger>
</template>

<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type { DropdownMenuItemProps } from 'reka-ui'
import { DropdownMenuItem, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<
    DropdownMenuItemProps & {
      class?: HTMLAttributes['class']
      inset?: boolean
      variant?: 'default' | 'destructive'
    }
  >(),
  {
    variant: 'default',
  }
)

const delegatedProps = reactiveOmit(props, 'inset', 'variant', 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwardedProps"
    :class="
      cn(
        `
          relative flex h-8 cursor-default items-center gap-2 rounded-[4px] px-2
          text-button-14 outline-none select-none
          data-disabled:pointer-events-none data-disabled:opacity-40
          data-highlighted:bg-gray-alpha-100
          data-inset:pl-8
          data-[variant=destructive]:text-red-800
          data-[variant=destructive]:data-highlighted:bg-red-100
          [&_svg]:pointer-events-none [&_svg]:shrink-0
          [&_svg:not([class*=\'size-\'])]:size-4
        `,
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>

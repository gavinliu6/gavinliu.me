<script setup lang="ts">
import { Circle } from '@lucide/vue'
import { cn } from '@theme/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type {
  DropdownMenuRadioItemEmits,
  DropdownMenuRadioItemProps
} from 'reka-ui'
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  useForwardPropsEmits
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<
  DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }
>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="forwarded"
    :class="
      cn(
        `
          relative flex h-8 cursor-default items-center gap-2 rounded-[4px] pr-2
          pl-8 text-button-14 outline-none select-none
          data-disabled:pointer-events-none data-disabled:opacity-40
          data-highlighted:bg-gray-alpha-100
          [&_svg]:pointer-events-none [&_svg]:shrink-0
          [&_svg:not([class*=\'size-\'])]:size-4
        `,
        props.class,
      )
    "
  >
    <span
      class="
        pointer-events-none absolute left-2 flex size-4 items-center
        justify-center
      "
    >
      <DropdownMenuItemIndicator>
        <slot name="indicator-icon">
          <Circle class="size-2 fill-current" />
        </slot>
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>

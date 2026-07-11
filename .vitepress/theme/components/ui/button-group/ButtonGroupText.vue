<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import type { ButtonGroupVariants } from '.'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    data-slot="button-group-text"
    :data-orientation="props.orientation"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        `
          flex h-10 items-center gap-2 rounded-[6px] bg-background-100 px-2.5
          text-button-14 font-medium text-gray-1000
          shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
          [&_svg]:pointer-events-none
          [&_svg:not([class*=\'size-\'])]:size-4
        `,
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>

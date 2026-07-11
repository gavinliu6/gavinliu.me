<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { Separator } from '../separator'

const props = withDefaults(
  defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>(),
  {
    orientation: 'vertical',
  }
)
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    v-bind="delegatedProps"
    :orientation="props.orientation"
    :class="
      cn(
        `
          relative m-0! shrink-0 self-stretch bg-gray-alpha-400
          data-[orientation=vertical]:h-auto
        `,
        props.class,
      )
    "
  />
</template>

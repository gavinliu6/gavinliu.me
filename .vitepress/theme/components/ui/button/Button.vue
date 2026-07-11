<script setup lang="ts">
import { cn } from '@theme/lib/utils'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import type { ButtonVariants } from '.'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  shape?: ButtonVariants['shape']
  shadow?: ButtonVariants['shadow']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :data-shape="shape"
    :data-shadow="shadow"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, shape, shadow }), props.class)"
  >
    <slot />
  </Primitive>
</template>

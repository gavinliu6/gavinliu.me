<script setup lang="ts">
import { FoldHorizontalIcon, UnfoldHorizontalIcon } from '@lucide/vue'

import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const expanded = defineModel<boolean>({ default: false })

function toggleExpanded() {
  expanded.value = !expanded.value
}
</script>

<template>
  <Tooltip>
    <TooltipTrigger>
      <Button
        aria-label="Expand width"
        shape="square"
        size="icon-sm"
        variant="tertiary"
        svg-only
        class="
          hidden
          lg:inline-flex
        "
        @click="toggleExpanded"
      >
        <FoldHorizontalIcon v-if="expanded" />
        <UnfoldHorizontalIcon v-else />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Expand width</p>
    </TooltipContent>
  </Tooltip>
</template>

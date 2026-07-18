import type { ComputedRef, InjectionKey } from 'vue'

import type { ResolvedResponsiveValue } from './responsive'

export interface BentoGridContext {
  columns: ComputedRef<ResolvedResponsiveValue<number>>
}

export const bentoGridContextKey = Symbol(
  'bento-grid-context'
) as InjectionKey<BentoGridContext>

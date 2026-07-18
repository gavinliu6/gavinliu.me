import type { CSSProperties } from 'vue'

export const bentoBreakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export const geistSpacing = [4, 8, 12, 16, 24, 32, 40, 64, 96] as const

export type BentoBreakpoint = (typeof bentoBreakpoints)[number]
export type GeistSpacing = (typeof geistSpacing)[number]

export type ResponsiveValue<T> = T | Partial<Record<BentoBreakpoint, T>>
export type ResolvedResponsiveValue<T> = Record<BentoBreakpoint, T>

type CSSCustomProperties = CSSProperties
  & Partial<Record<`--${string}`, string | number>>

const isResponsiveValue = <T>(
  value: ResponsiveValue<T>
): value is Partial<Record<BentoBreakpoint, T>> =>
  typeof value === 'object' && value !== null

export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  fallback: T
): ResolvedResponsiveValue<T> {
  const values = isResponsiveValue(value) ? value : { base: value }
  const resolved = {} as ResolvedResponsiveValue<T>
  let currentValue = values.base ?? fallback

  for (const breakpoint of bentoBreakpoints) {
    currentValue = values[breakpoint] ?? currentValue
    resolved[breakpoint] = currentValue
  }

  return resolved
}

export function mapResponsiveValue<T, U>(
  value: ResponsiveValue<T>,
  fallback: T,
  transform: (value: T, breakpoint: BentoBreakpoint) => U
): ResolvedResponsiveValue<U> {
  const resolved = resolveResponsiveValue(value, fallback)

  return Object.fromEntries(
    bentoBreakpoints.map(breakpoint => [
      breakpoint,
      transform(resolved[breakpoint], breakpoint),
    ])
  ) as ResolvedResponsiveValue<U>
}

export function responsiveCustomProperties<T>(
  name: string,
  value: ResponsiveValue<T>,
  fallback: T,
  format: (value: T) => string
): CSSCustomProperties {
  const values = resolveResponsiveValue(value, fallback)
  const properties: CSSCustomProperties = {}

  for (const breakpoint of bentoBreakpoints) {
    properties[`--${name}-${breakpoint}`] = format(values[breakpoint])
  }

  return properties
}

export const normalizeGridTrack = (value: number) =>
  Number.isFinite(value) ? Math.max(1, Math.trunc(value)) : 1

export const formatGridTrack = (value: number) => String(value)

export const normalizeGeistSpacing = (value: GeistSpacing) => {
  if ((geistSpacing as readonly number[]).includes(value)) {
    return value
  }

  return 16
}

export const formatPixelLength = (value: GeistSpacing) => `${value}px`

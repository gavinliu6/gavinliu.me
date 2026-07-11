import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  `
    inline-flex max-w-full shrink-0 items-center justify-center border-0
    align-baseline font-medium whitespace-nowrap no-underline
    transition-[border-color,background-color,color,box-shadow] duration-150
    ease-in-out outline-none select-none
    focus-visible:shadow-[0_0_0_1px_var(--themed-border,transparent),0_0_0_2px_var(--ds-background-100),0_0_0_4px_var(--ds-blue-700)]
    focus-visible:transition-none
    disabled:pointer-events-none disabled:cursor-not-allowed
    disabled:bg-gray-100 disabled:text-gray-700
    disabled:shadow-[0_0_0_1px_var(--ds-gray-400)]
    aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed
    aria-disabled:bg-gray-100 aria-disabled:text-gray-700
    aria-disabled:shadow-[0_0_0_1px_var(--ds-gray-400)]
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        default: `
          bg-gray-1000 text-background-100 [--themed-border:transparent]
          hover:bg-gray-900
          active:bg-gray-800
        `,
        primary: `
          bg-gray-1000 text-background-100 [--themed-border:transparent]
          hover:bg-gray-900
          active:bg-gray-800
        `,
        error: `
          bg-red-800 text-white [--themed-border:var(--ds-red-800)]
          hover:bg-red-700
          active:bg-red-900
        `,
        destructive: `
          bg-red-800 text-white [--themed-border:var(--ds-red-800)]
          hover:bg-red-700
          active:bg-red-900
        `,
        warning: `
          bg-amber-700 text-amber-1000 [--themed-border:var(--ds-amber-700)]
          hover:bg-amber-800
          active:bg-amber-900
        `,
        outline: `
          bg-background-100 text-gray-1000
          shadow-[0_0_0_1px_var(--themed-border)]
          [--themed-border:var(--ds-gray-alpha-400)]
          hover:bg-gray-alpha-100
          hover:[--themed-border:var(--ds-gray-alpha-500)]
          active:bg-gray-alpha-200
          active:[--themed-border:var(--ds-gray-alpha-600)]
        `,
        secondary: `
          bg-background-100 text-gray-1000
          shadow-[0_0_0_1px_var(--themed-border)]
          [--themed-border:var(--ds-gray-alpha-400)]
          hover:bg-gray-alpha-100
          hover:[--themed-border:var(--ds-gray-alpha-500)]
          active:bg-gray-alpha-200
          active:[--themed-border:var(--ds-gray-alpha-600)]
        `,
        tertiary: `
          bg-transparent text-gray-1000 [--themed-border:transparent]
          hover:bg-gray-alpha-100
          active:bg-gray-alpha-200
        `,
        ghost: `
          bg-transparent text-gray-1000 [--themed-border:transparent]
          hover:bg-gray-alpha-100
          active:bg-gray-alpha-200
        `,
        link: `
          h-auto min-h-0 bg-transparent px-0 text-gray-1000 underline-offset-4
          [--themed-border:transparent]
          hover:underline
        `,
      },
      size: {
        'default': 'h-10 min-w-10 gap-2 rounded-[6px] px-4 text-button-14',
        'medium': `h-10 min-w-10 gap-2 rounded-[6px] px-4 text-button-14`,
        'sm': `h-8 min-w-8 gap-1.5 rounded-[6px] px-3 text-button-14`,
        'small': `h-8 min-w-8 gap-1.5 rounded-[6px] px-3 text-button-14`,
        'lg': `h-12 min-w-12 gap-2 rounded-[6px] px-5 text-button-16`,
        'large': `h-12 min-w-12 gap-2 rounded-[6px] px-5 text-button-16`,
        'tiny': `
          h-6 min-w-6 gap-1 rounded-[6px] px-1.5 text-button-12
          [&_svg:not([class*='size-'])]:size-3.5
        `,
        'icon': 'size-10 rounded-[6px] p-0',
        'icon-sm': 'size-8 rounded-[6px] p-0',
        'icon-lg': `
          size-12 rounded-[6px] p-0
          [&_svg:not([class*=size-])]:size-5
        `,
      },
      shape: {
        default: '',
        square: 'rounded-[6px]',
        rounded: 'rounded-full',
      },
      shadow: {
        false: '',
        true: `
          shadow-[0_0_0_1px_var(--themed-border,transparent),0_1px_2px_0_var(--ds-gray-alpha-100),0_2px_4px_-1px_var(--ds-gray-alpha-100)]
          hover:shadow-[0_0_0_1px_var(--themed-border,transparent),0_2px_4px_0_var(--ds-gray-alpha-200),0_4px_8px_-2px_var(--ds-gray-alpha-100)]
        `,
      },
    },
    compoundVariants: [
      {
        variant: ['default', 'primary', 'error', 'destructive', 'warning'],
        shadow: true,
        class: `
          shadow-[0_1px_2px_0_var(--ds-gray-alpha-200),0_0_0_1px_var(--themed-border,transparent)]
        `,
      },
      {
        variant: ['outline', 'secondary'],
        shadow: true,
        class: `
          shadow-[0_0_0_1px_var(--themed-border),0_1px_2px_0_var(--ds-gray-alpha-100),0_2px_4px_-1px_var(--ds-gray-alpha-100)]
        `,
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      shadow: false,
    },
  }
)
export type ButtonVariants = VariantProps<typeof buttonVariants>

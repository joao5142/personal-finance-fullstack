import { type VariantProps, cva } from 'class-variance-authority'

export { default as Text } from './Text.vue'

export const textVariants = cva('', {
  variants: {
    size: {
      preset1: 'text-app-preset-1',
      preset2: 'text-app-preset-2',
      preset3: 'text-app-preset-3',
      preset4: 'text-app-preset-4',
      preset5: 'text-app-preset-5',
    },

    weight: {
      '400': 'font-app-regular',

      '700': 'font-app-bold',
    },
  },
  defaultVariants: {
    size: 'preset3',
    weight: '400',
  },
})

export type TextVariants = VariantProps<typeof textVariants>

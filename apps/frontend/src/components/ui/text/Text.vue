<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="clsx(textVariants({ weight, size }), props.class)"
  >
    <slot></slot>
  </Primitive>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import clsx from 'clsx'
import { type TextVariants, textVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  size?: TextVariants['size']
  weight?: TextVariants['weight']
  as?: string
  // eslint-disable-next-line
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
  size: 'preset3',
  weight: '400',
})
</script>

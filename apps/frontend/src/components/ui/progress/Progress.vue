<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="cn('relative h-4 w-full overflow-hidden rounded-full bg-app-beige-100', props.class)"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 transition-all"
      :class="classes"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>

<script setup lang="ts">
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { ColorTypes } from '@/theme/colors'

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: HTMLAttributes['class']; color?: ColorTypes }>(),
  {
    modelValue: 0,
    color: 'green',
  }
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const classes = computed(() => {
  return {
    [`bg-app-${props.color}`]: true,
  }
})
</script>

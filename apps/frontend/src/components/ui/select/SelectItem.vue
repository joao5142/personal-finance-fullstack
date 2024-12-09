<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative px-app-200 flex cursor-pointer hover:bg-app-grey-100 border-b-[1px] border-b-app-beige-100 w-full  select-none items-center rounded-sm py-1.5   pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <SelectItemText>
      <slot></slot>
    </SelectItemText>
  </SelectItem>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

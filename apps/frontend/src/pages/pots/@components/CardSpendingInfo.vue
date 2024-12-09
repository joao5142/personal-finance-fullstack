<template>
  <div
    :class="
      cn('flex justify-between pl-app-300 detail', {
        [`before:bg-app-${props.item.theme}`]: true,
      })
    "
  >
    <Text as="span" size="preset5" class="block text-app-grey-500">
      {{ CATEGORIES[item.category].label }}
    </Text>
    <div>
      <Text as="span" size="preset4" class="text-app-grey-900" weight="700">${{ item.value }}</Text>

      <Text as="span" size="preset4" class="ml-1 text-app-grey-500">of ${{ item.maxSpend }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import Text from '@/components/ui/text/Text.vue'
import { CategoryValueTypes, CATEGORIES } from '@/constants/categories'
import { cn } from '@/lib/utils'
import { ColorTypes } from '@/theme/colors'

interface IProps {
  item: {
    category: CategoryValueTypes
    value: number
    maxSpend: number
    theme: ColorTypes
  }
}

const props = defineProps<IProps>()

const classes = computed(() => {
  return {
    [`before:bg-app-${props.item.theme}`]: true,
  }
})
</script>

<style scoped></style>

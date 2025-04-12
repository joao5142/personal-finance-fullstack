<template>
  <div
    :class="
      cn('flex flex-col justify-center pl-app-300 detail', {
        [`before:bg-app-${props.item.theme}`]: true,
      })
    "
  >
    <Text as="span" size="preset5" class="block text-app-grey-500">{{ item.label }}</Text>
    <Text as="span" size="preset4" class="text-app-grey-900" weight="700">{{ item.value }}</Text>
  </div>
</template>

<script setup lang="ts">
import Text from '@/components/ui/text/Text.vue'
import { cn } from '@/lib/utils'
import { ColorTypes } from '@/theme/colors'

interface IProps {
  item: {
    label: string
    value: number
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

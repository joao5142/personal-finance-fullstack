<template>
  <div
    :class="
      cn(
        'transition-all group flex flex-col lg:flex-row  items-center lg:items-start  gap-app-200  cursor-pointer rounded-br-app-small rounded-tr-app-small',
        { 'group/active  lg:bg-app-beige-100': item.active },
        collapsed ? 'justify-center lg:bg-transparent' : ' px-app-400 py-app-200'
      )
    "
  >
    <component
      :is="item.image"
      weight="fill"
      :size="collapsed ? '35' : '24'"
      :class="
        cn(' lg:group-hover:fill-white fill-app-grey-300', {
          'fill-app-green lg:group-hover:fill-app-grey-900': item.active,
          'group-hover:fill-app-green': collapsed,
        })
      "
    />

    <Text
      v-if="!collapsed"
      size="preset3"
      weight="700"
      :class="
        cn('text-app-grey-300 group-hover:text-app-white hidden md:block text-center', {
          'fill-app-green lg:text-app-grey-900  lg:group-hover:text-app-grey-900': item.active,
        })
      "
    >
      {{ item.label }}
    </Text>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx'
import Text from '@/components/ui/text/Text.vue'
import { cn } from '@/lib/utils'

interface IProps {
  collapsed?: boolean
  item: {
    label: String
    image: any
    active?: boolean
  }
}
withDefaults(defineProps<IProps>(), {
  collapsed: true,
})
</script>

<style scoped></style>

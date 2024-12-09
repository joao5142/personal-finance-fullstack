<template>
  <MenubarGroup v-bind="props">
    <slot></slot>
  </MenubarGroup>
</template>

<script setup lang="ts">
import { MenubarGroup, type MenubarGroupProps } from 'radix-vue'

const props = defineProps<MenubarGroupProps>()
</script>

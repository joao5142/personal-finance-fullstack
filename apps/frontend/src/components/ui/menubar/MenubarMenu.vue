<template>
  <MenubarMenu v-bind="props">
    <slot></slot>
  </MenubarMenu>
</template>

<script setup lang="ts">
import { MenubarMenu, type MenubarMenuProps } from 'radix-vue'

const props = defineProps<MenubarMenuProps>()
</script>

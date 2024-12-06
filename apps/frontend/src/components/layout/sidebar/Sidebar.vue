<template>
  <nav
    :class="
      cn(
        'fixed bottom-0 w-full flex lg:static lg:flex-col pr-app-300 h-sidebar-mobile-height lg:h-full bg-app-grey-900 rounded-br-app-small rounded-tr-app-small',
        isSidebarCollapsed
          ? 'lg:max-w-collapsed-sidebar px-app-100 lg:px-app-200'
          : 'lg:max-w-expanded-sidebar pr-app-300'
      )
    "
  >
    <img
      v-if="!isSidebarCollapsed"
      :src="FinanceImage"
      alt=""
      class="hidden lg:block px-app-400 py-app-500 w-full max-w-[220px]"
    />

    <img
      v-else
      :src="FinanceImageMobile"
      alt=""
      class="hidden lg:block py-app-500 w-full mx-auto max-w-[20px]"
    />

    <div
      class="w-full flex-1 flex flex-row lg:flex-col justify-center items-center lg:justify-start lg:items-start lg:mt-10 gap-5"
    >
      <div
        v-for="(item, index) in items"
        :key="'item' + index"
        class="lg:w-full"
        :class="{ 'lg:mb-app-400': isSidebarCollapsed }"
      >
        <SidebarItem :item="item" :collapsed="isSidebarCollapsed" />
      </div>
    </div>

    <div class="mt-auto pb-app-500 hidden lg:block">
      <SidebarItem
        :item="{
          label: 'Minimize Menu',
          image: isSidebarCollapsed ? PhArrowFatLinesRight : PhArrowFatLinesLeft,
        }"
        :collapsed="isSidebarCollapsed"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  PhHouse,
  PhArrowsDownUp,
  PhChartDonut,
  PhJar,
  PhReceipt,
  PhArrowFatLinesRight,
  PhArrowFatLinesLeft,
} from '@phosphor-icons/vue'
import clsx from 'clsx'
import SidebarItem from './SidebarItem.vue'
import FinanceImage from '@/assets/images/logo-large.svg'
import FinanceImageMobile from '@/assets/images/logo-small.svg'

import { cn } from '@/lib/utils'

const isSidebarCollapsed = ref<boolean>(false)

const route = useRoute()

const items = computed(() => {
  return [
    {
      label: 'Overview',
      image: PhHouse,
      active: route?.path === '/home',
    },
    {
      label: 'Transactions',
      image: PhArrowsDownUp,
    },

    {
      label: 'Budget',
      image: PhChartDonut,
    },

    {
      label: 'Pots',
      image: PhJar,
    },

    {
      label: 'Recurring bills',
      image: PhReceipt,
    },
  ]
})

onMounted(() => {
  console.log(route.path)
})
</script>

<style scoped></style>

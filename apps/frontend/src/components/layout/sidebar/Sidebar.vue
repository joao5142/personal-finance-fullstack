<template>
  <nav
    :class="
      cn(
        'lg:sticky top-0 lg:h-screen z-10 bottom-0 w-full flex  lg:flex-col pr-app-300 h-sidebar-mobile-height  bg-app-grey-900 rounded-br-app-small rounded-tr-app-small',
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
        <SidebarItem :item="item" :collapsed="isSidebarCollapsed" @click="item.command" />
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
const router = useRouter()

const items = computed(() => {
  return [
    {
      label: 'Overview',
      image: PhHouse,
      active: route?.path === '/home',
      command: () => router.push('/home'),
    },
    {
      label: 'Transactions',
      image: PhArrowsDownUp,
      active: route?.path === '/transactions',
      command: () => router.push('/transactions'),
    },

    {
      label: 'Budget',
      image: PhChartDonut,
      active: route?.path === '/budget',
      command: () => router.push('/budget'),
    },

    {
      label: 'Pots',
      image: PhJar,
      active: route?.path === '/pots',
      command: () => router.push('/pots'),
    },

    {
      label: 'Recurring bills',
      image: PhReceipt,
      active: route?.path === '/bills',
      command: () => router.push('/bills'),
    },
  ]
})

onMounted(() => {
  console.log(route.path)
})
</script>

<style scoped></style>

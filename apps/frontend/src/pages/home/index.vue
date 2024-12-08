<template>
  <div class="d-flex align-center">
    <Text as="strong" size="preset1" weight="700">Overview</Text>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
      <Card class="bg-app-grey-900">
        <Text as="span" size="preset4" class="block text-app-white">Currency Balance</Text>
        <Text as="span" size="preset1" class="text-app-white" weight="700">$4,836.00</Text>
      </Card>
      <Card>
        <Text as="span" size="preset4" class="block text-app-grey-500">Income</Text>
        <Text as="span" size="preset1" class="text-app-grey-900" weight="700">$3,814.25</Text>
      </Card>
      <Card>
        <Text as="span" size="preset4" class="block text-app-grey-500">Expenses</Text>
        <Text as="span" size="preset1" class="text-app-grey-900" weight="700">$1,700.50</Text>
      </Card>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
      <div class="col-span-12 lg:col-span-7">
        <Card>
          <header class="flex justify-between items-end mb-4">
            <Text as="span" size="preset2" class="text-app-grey-900" weight="700">Pots</Text>
            <div class="flex items-center gap-2 cursor-pointer">
              <Text as="span" size="preset4" class="block text-app-grey-500">See Details</Text>
              <PhCaretRight />
            </div>
          </header>

          <div class="grid grid-cols-1 2xl:grid-cols-2 gap-5">
            <Card class="bg-app-beige-100 flex items-center gap-5 overflow-x-hidden">
              <PhTipJar size="60" class="fill-app-green min-w-[60px]" />
              <div class="flex-1">
                <Text as="span" size="preset4" class="block text-app-grey-500">Expenses</Text>
                <Text
                  as="span"
                  size="preset1"
                  class="block text-app-grey-900 text-ellipsis max-w-60 w-full overflow-hidden"
                  weight="700"
                >
                  $1,700.50
                </Text>
              </div>
            </Card>

            <div class="grid grid-cols-2 gap-5">
              <CardMoneyInfo :item="{ label: 'Savings', value: 159, theme: 'green' }" />
              <CardMoneyInfo :item="{ label: 'Gift', value: 40, theme: 'cyan' }" />
              <CardMoneyInfo :item="{ label: 'Concert Ticket', value: 110, theme: 'navy' }" />
              <CardMoneyInfo :item="{ label: 'New Laptop', value: 10, theme: 'yellow' }" />
            </div>
          </div>
        </Card>

        <Card class="mt-6">
          <header class="flex justify-between items-end mb-4">
            <Text as="span" size="preset2" class="text-app-grey-900" weight="700">
              Transactions
            </Text>
            <div class="flex items-center gap-2 cursor-pointer">
              <Text as="span" size="preset4" class="block text-app-grey-500">View All</Text>
              <PhCaretRight />
            </div>
          </header>

          <div>
            <TransactionCard
              :person="{ name: 'Emma Richardson', avatar: 'emma' }"
              type="deposit"
              :value="45"
              created-at="19 Aug 2024"
            />

            <div class="h-[1px] w-full bg-app-grey-100"></div>

            <TransactionCard
              :person="{ name: 'Savory Bites Bistro', avatar: 'savory' }"
              type="withdraw"
              :value="45"
              created-at="19 Aug 2024"
            />
          </div>
        </Card>
      </div>
      <div class="col-span-12 lg:col-span-5">
        <Card>
          <header class="flex justify-between items-end mb-4">
            <Text as="span" size="preset2" class="text-app-grey-900" weight="700">Budgets</Text>
            <div class="flex items-center gap-2 cursor-pointer">
              <Text as="span" size="preset4" class="block text-app-grey-500">See Details</Text>
              <PhCaretRight />
            </div>
          </header>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div>
              <DonutChart
                :value-formatter="valueFormatter"
                index="name"
                :category="'total'"
                :data="data"
                :colors="[colors['green'], colors['cyan'], colors['navy'], colors['yellow']]"
              />
            </div>
            <div class="flex flex-col gap-3">
              <CardMoneyInfo :item="{ label: 'Savings', value: 159, theme: 'green' }" />
              <CardMoneyInfo :item="{ label: 'Gift', value: 40, theme: 'cyan' }" />
              <CardMoneyInfo :item="{ label: 'Concert Ticket', value: 110, theme: 'navy' }" />
              <CardMoneyInfo :item="{ label: 'New Laptop', value: 10, theme: 'yellow' }" />
            </div>
          </div>
        </Card>

        <Card class="mt-6">
          <header class="flex justify-between items-end mb-4">
            <Text as="span" size="preset2" class="text-app-grey-900" weight="700">
              Recurring Bills
            </Text>
            <div class="flex items-center gap-2 cursor-pointer">
              <Text as="span" size="preset4" class="block text-app-grey-500">See Details</Text>
              <PhCaretRight />
            </div>
          </header>

          <div class="flex flex-col gap-4">
            <Card class="bg-app-beige-100 detail before:bg-app-green">
              <div class="flex items-center justify-between">
                <Text as="span" size="preset4" class="block text-app-grey-500">Paid Bills</Text>
                <Text as="span" size="preset4" class="text-app-grey-900" weight="700">$190.00</Text>
              </div>
            </Card>

            <Card class="bg-app-beige-100 detail before:bg-app-yellow">
              <div class="flex items-center justify-between">
                <Text as="span" size="preset4" class="block text-app-grey-500">Total Upcoming</Text>
                <Text as="span" size="preset4" class="text-app-grey-900" weight="700">$194.98</Text>
              </div>
            </Card>

            <Card class="bg-app-beige-100 detail before:bg-app-cyan">
              <div class="flex items-center justify-between">
                <Text as="span" size="preset4" class="block text-app-grey-500">Due Soon</Text>
                <Text as="span" size="preset4" class="text-app-grey-900" weight="700">$59.98</Text>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PhCaretRight, PhTipJar } from '@phosphor-icons/vue'
import CardMoneyInfo from '../@components/CardMoneyInfo.vue'
import TransactionCard from './@components/TransactionCard.vue'
import Text from '@/components/ui/text/Text.vue'
import Card from '@/components/ui/card/Card.vue'

import { DonutChart } from '@/components/ui/chart-donut'
import { colors } from '@/theme'

definePageMeta({
  layout: 'default-view-layout',
})

const valueFormatter = (tick: number | Date) =>
  typeof tick === 'number' ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}` : ''

const data = [
  {
    name: 'Savings',
    total: 159,
  },
  {
    name: 'Gift',
    total: 40,
  },

  {
    name: 'Concert Ticket',
    total: 110,
  },

  {
    name: 'New Laptop',
    total: 10,
  },
]
</script>

<style scoped></style>

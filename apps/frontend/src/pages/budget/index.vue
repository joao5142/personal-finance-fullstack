<template>
  <div class="d-flex align-center">
    <header class="flex items-center justify-between">
      <Text as="strong" size="preset1" weight="700">Overview</Text>
      <Button size="lg" @click="handleAddBudget">+ Add New Budget</Button>
    </header>

    <section class="grid grid-cols-12 gap-6 mt-10">
      <div class="col-span-12 lg:col-span-4">
        <Card>
          <header class="flex justify-between items-end mb-4">
            <Text as="span" size="preset2" class="text-app-grey-900" weight="700">Budgets</Text>
          </header>

          <div class="grid grid-cols-1 gap-4">
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
              <CardSpendingInfo
                :item="{ category: 'entertainment', maxSpend: 500, value: 159, theme: 'green' }"
              />
              <Divider />
              <CardSpendingInfo
                :item="{ category: 'bills', maxSpend: 100, value: 50, theme: 'navy' }"
              />
              <Divider />
              <CardSpendingInfo
                :item="{ category: 'dining_out', maxSpend: 300, value: 100, theme: 'purple' }"
              />
              <Divider />
              <CardSpendingInfo
                :item="{ category: 'personal_care', maxSpend: 100, value: 20, theme: 'cyan' }"
              />
            </div>
          </div>
        </Card>
      </div>
      <div class="col-span-12 lg:col-span-8 flex flex-col gap-4">
        <CardBudget
          :item="{ category: 'entertainment', spent: 50, theme: 'cyan', total: 200, transactions }"
          @edit="handleEditBudget"
        />

        <CardBudget
          :item="{ category: 'bills', theme: 'yellow', total: 200, transactions, spent: 100 }"
          @edit="handleEditBudget"
        />
      </div>
    </section>

    <SaveBudgetModal v-model="isModalSaveOpen" :mode="modalMode" />
  </div>
</template>

<script setup lang="ts">
import { PhCaretRight } from '@phosphor-icons/vue'
import CardMoneyInfo from '../@components/CardMoneyInfo.vue'
import CardSpendingInfo from './@components/CardSpendingInfo.vue'
import CardBudget from './@components/CardBudget.vue'
import SaveBudgetModal from './@components/SaveBudgetModal.vue'
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import DonutChart from '@/components/ui/chart-donut/DonutChart.vue'
import Text from '@/components/ui/text/Text.vue'
import { colors } from '@/theme'
import Divider from '@/components/ui/divider/Divider.vue'
import { ITransaction } from '@/types/globals/transaction'

definePageMeta({
  layout: 'default-view-layout',
})

const isModalSaveOpen = ref<boolean>(false)
const modalMode = ref<'add' | 'edit'>('add')

const valueFormatter = (tick: number | Date) =>
  typeof tick === 'number' ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}` : ''

const transactions: ITransaction[] = [
  {
    recipientOrSender: {
      name: 'Emma Richardson',
      avatar: 'emma',
    },
    value: 45,
    type: 'withdraw',
    category: 'general',
    date: '19 Aug 2024',
  },

  {
    recipientOrSender: {
      name: 'Savory Bites Bistro',
      avatar: 'savory',
    },
    value: 45,
    type: 'withdraw',
    category: 'general',
    date: '19 Aug 2024',
  },
]

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

function handleAddBudget() {
  modalMode.value = 'add'
  isModalSaveOpen.value = true
}
function handleEditBudget(item: any) {
  modalMode.value = 'edit'
  isModalSaveOpen.value = true
}
</script>

<style scoped></style>

<template>
  <div class="d-flex align-center">
    <header class="flex items-center justify-between">
      <Text as="strong" size="preset1" weight="700">Challenge 1</Text>
    </header>

    <section class="grid grid-cols-12 gap-6 mt-10">
      <div class="col-span-12 xl:col-span-8 h-full">
        <Card class="h-full">
          <Text as="span" size="preset2" class="text-app-grey-900" weight="700">
            {{ item.type == 'weekly' ? 'Weekly' : 'Monthly' }} Values
          </Text>

          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 xxl:grid-cols-7 flex-wrap gap-5 mt-4"
          >
            <Button
              v-for="(period, index) in challengePeriodValues"
              :key="'period-item' + index"
              class="h-full flex flex-col gap-1 p-0"
              :variant="selectPeriod == period.period ? 'default' : 'outline'"
              :class="{ 'pointer-events-none': period.period === 1 }"
              @click="() => handleSelectPeriod(period)"
            >
              <div
                class="p-1 w-full rounded-t-md"
                :class="{ [`bg-app-${item.theme}`]: true, '!bg-app-green': period.period === 1 }"
              >
                <Text
                  as="span"
                  class="text-app-beige-100 justify-center flex gap-2"
                  size="preset4"
                  weight="700"
                >
                  <span>25 jan</span>

                  <PhCalendarCheck
                    v-if="period.period === 1"
                    weight="fill"
                    class="opacity-60"
                    size="20"
                  />
                </Text>
              </div>

              <div class="p-1 gap-1 flex flex-col px-3 relative">
                <Text as="strong" size="preset2" weight="700">${{ period.value.toFixed(2) }}</Text>
                <Text as="span" size="preset4">Week 3</Text>
              </div>
            </Button>
          </div>
        </Card>
      </div>

      <div class="col-span-12 xl:col-span-4 h-full">
        <Card class="h-full">
          <Text as="span" size="preset2" class="text-app-grey-900" weight="700">Insights</Text>

          <Divider class="my-4" />

          <div class="flex-1 my-6">
            <Progress :model-value="10" class="w-full mb-2" :color="item.theme" />

            <Text as="span" size="preset4" class="block text-app-grey-500">Amount</Text>
            <Text
              as="span"
              size="preset1"
              class="block text-app-grey-900 text-ellipsis max-w-60 w-full overflow-hidden"
              weight="700"
            >
              ${{ item.target }}
            </Text>
          </div>

          <div class="grid grid-cols-2 gap-5 mt-4">
            <CardValueInfo :item="{ label: 'Filled Periods', value: 159, theme: item.theme }" />
            <CardValueInfo :item="{ label: 'Remaining Periods', value: 40, theme: 'red' }" />
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { differenceInMonths, differenceInWeeks } from 'date-fns'
import { PhCalendarCheck, PhCheckCircle, PhChecks } from '@phosphor-icons/vue'
import Card from '@/components/ui/card/Card.vue'
import Text from '@/components/ui/text/Text.vue'
import Button from '@/components/ui/button/Button.vue'
import Divider from '@/components/ui/divider/Divider.vue'
import Progress from '@/components/ui/progress/Progress.vue'
import CardValueInfo from '@/pages/@components/CardValueInfo.vue'

definePageMeta({
  layout: 'default-view-layout',
})

const route = useRoute()

const item = computed(() => {
  return {
    id: '1',
    endsAt: '2024-12-25',
    createdAt: '2025-12-25',
    spent: 50,
    total: 200,
    target: 2350.6,
    type: 'monthly',
    theme: Number(route?.params?.id) === 1 ? 'yellow' : 'cyan',
  } as any
})

const selectPeriod = ref<number>()

function calculatePeriods() {
  const totalPeriod =
    item.value.type === 'weekly'
      ? Math.abs(differenceInWeeks(new Date(item.value.endsAt), new Date(item.value.createdAt)))
      : Math.abs(differenceInMonths(new Date(item.value.endsAt), new Date(item.value.createdAt)))

  const periodRanges =
    item.value.type === 'weekly'
      ? [
          { range: 10, value: 10 },
          { range: 10, value: 50 },
          { range: 10, value: 100 },
          { range: totalPeriod, value: 200 },
        ]
      : [
          { range: 3, value: 100 },
          { range: 3, value: 200 },
          { range: 3, value: 500 },
          { range: totalPeriod, value: 1000 },
        ]

  return { totalPeriod, periodRanges }
}

const challengePeriodValues = computed(() => {
  const { totalPeriod, periodRanges } = calculatePeriods()

  const periods = []
  let remainingTarget = item.value.target
  let currentPeriod = 1

  for (const { range, value } of periodRanges) {
    for (let i = 0; i < range && remainingTarget > 0; i++) {
      const assignedValue = Math.min(value, remainingTarget)
      periods.push({
        period: currentPeriod,
        value: assignedValue,
      })
      remainingTarget -= assignedValue
      currentPeriod++
    }
  }

  return periods
})

function handleSelectPeriod(period: any) {
  selectPeriod.value = period.number
  console.log(`Selected period: ${period.number}, Value: ${period.value}`)
}
</script>

<style scoped></style>

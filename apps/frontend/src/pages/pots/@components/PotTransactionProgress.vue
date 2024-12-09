<template>
  <div>
    <!-- <div>ammount{{ item.amount }}</div>
    <div>target{{ item.target }}</div>
    <div>spent{{ item.current }}</div> -->
    <div class="h-[8px] rounded-sm bg-app-beige-100 flex items-center overflow-hidden">
      <div
        class="h-full bg-app-grey-900 rounded relative"
        :class="{ 'rounded-r-none': mode == 'add' }"
        :style="{
          width: `${currentPercentage * 100}%`,
          minWidth: `${currentPercentage * 100}%`,
        }"
      >
        <template v-if="mode == 'withdraw'">
          <div class=""></div>
          <div
            class="h-full bg-app-red rounded absolute right-0 before:content-[''] before:h-full before:w-[2px] before:bg-app-beige-100 before:left-0 before:absolute"
            :style="{
              width: `${amountPercentage * 100}%`,
            }"
          ></div>
        </template>
      </div>

      <template v-if="mode == 'add'">
        <div class="h-full w-[2px] bg-app-beige-100"></div>

        <div
          class="h-full bg-app-green rounded rounded-l-none"
          :style="{
            width: `${!reachedPercentageLimit ? amountPercentage * 100 : 100}%`,
          }"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  item: {
    current: number
    target: number
    amount: number
  }
  mode: 'add' | 'withdraw'
}

const props = defineProps<IProps>()

const currentPercentage = computed(() => {
  console.log('CURRENT', props.item.current / props.item.target)
  return props.item.current / props.item.target
})

const amountPercentage = computed(() => {
  if (props.mode === 'add') {
    console.log('AMOUNT', props.item.amount / props.item.target)
    // percentage value calculate based on target money

    return props.item.amount / props.item.target
  } else {
    const borderItemPercentage = 0.02
    // percentage value calculate based on current spent money
    console.log('AMOUNT', props.item.amount / props.item.current)
    if (props.item.amount > 1) {
      // has any value to calculate with the withdraw border
      return props.item.amount / props.item.current + borderItemPercentage
    }
    return props.item.amount / props.item.current
  }
})

const reachedPercentageLimit = computed(() => {
  if (props.mode === 'add') {
    console.log('LIMIT +', currentPercentage.value + amountPercentage.value)
    if (currentPercentage.value + amountPercentage.value >= 1) {
      return true
    }
    return false
  } else {
    console.log('LIMIT -', currentPercentage.value - amountPercentage.value)

    if (amountPercentage.value >= 1) {
      return true
    }
    return false
  }
})
</script>

<style scoped></style>

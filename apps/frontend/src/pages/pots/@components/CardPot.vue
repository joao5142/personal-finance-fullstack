<template>
  <Card>
    <header>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="w-3 h-3 rounded-full" :class="classes"></div>
          <Text as="strong" size="preset2" weight="700">
            {{ CATEGORIES[item.category].label }}
          </Text>
        </div>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger><PhDotsThree class="cursor-pointer" size="25" /></MenubarTrigger>
            <MenubarContent>
              <MenubarItem class="cursor-pointer" @click="emit('edit')">Edit</MenubarItem>
              <MenubarSeparator />
              <MenubarItem class="cursor-pointer" @click="isDeleteModalOpen = true">
                <Text as="span" class="text-app-red" size="preset4">Delete Pot</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <Text as="span" class="text-app-grey-500" size="preset4">Total Saved</Text>
        <Text as="span" size="preset1" weight="700">${{ item.spent }}</Text>
      </div>
    </header>

    <div>
      <Progress :model-value="33" class="w-full" :color="item.theme" />
      <div class="flex items-center justify-between mt-2">
        <Text as="span" class="text-app-grey-500" size="preset4" weight="700">7.95%</Text>
        <Text as="span" class="text-app-grey-500" size="preset5">Target of ${{ item.target }}</Text>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
      <Button size="lg" class="bg-app-beige-100 group" @click="handleAddMoney">
        <Text as="strong" class="text-app-grey-900 group-hover:text-app-white" weight="700">
          + Add Money
        </Text>
      </Button>
      <Button size="lg" class="bg-app-beige-100 group" @click="handleWithdrawMoney">
        <Text as="strong" class="text-app-grey-900 group-hover:text-app-white" weight="700">
          + Withdraw
        </Text>
      </Button>
    </div>

    <DeletePotModal v-model="isDeleteModalOpen" />
    <PotTransactionModal
      v-model="isPotTransactionModalOpen"
      :pot="item"
      :mode="potTransactionMode"
    />
  </Card>
</template>

<script setup lang="ts">
import { PhDotsThree } from '@phosphor-icons/vue'
import { MenubarMenu } from 'radix-vue'
import DeletePotModal from './DeletePotModal.vue'
import PotTransactionModal from './PotTransactionModal.vue'
import Text from '@/components/ui/text/Text.vue'
import { CATEGORIES } from '@/constants/categories'

import Card from '@/components/ui/card/Card.vue'
import Progress from '@/components/ui/progress/Progress.vue'

import MenubarTrigger from '@/components/ui/menubar/MenubarTrigger.vue'
import Menubar from '@/components/ui/menubar/Menubar.vue'
import MenubarContent from '@/components/ui/menubar/MenubarContent.vue'
import MenubarItem from '@/components/ui/menubar/MenubarItem.vue'
import MenubarSeparator from '@/components/ui/menubar/MenubarSeparator.vue'
import { IPot } from '@/types/globals/pot'
import Button from '@/components/ui/button/Button.vue'

type EmitTypes = {
  edit: [void]
}

const emit = defineEmits<EmitTypes>()

interface IProps {
  item: IPot
}

const props = defineProps<IProps>()

const isDeleteModalOpen = ref<boolean>(false)
const isPotTransactionModalOpen = ref<boolean>(false)

const potTransactionMode = ref<'add' | 'withdraw'>('add')

const classes = computed(() => {
  return {
    [`bg-app-${props.item.theme}`]: true,
  }
})

function handleWithdrawMoney() {
  isPotTransactionModalOpen.value = true
  potTransactionMode.value = 'withdraw'
}

function handleAddMoney() {
  isPotTransactionModalOpen.value = true
  potTransactionMode.value = 'add'
}

watch(isDeleteModalOpen, () => {
  console.log(isDeleteModalOpen.value)
})
</script>

<style scoped></style>

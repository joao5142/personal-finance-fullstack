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
                <Text as="span" class="text-app-red" size="preset4">Delete Budget</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div class="mt-5">
        <Text as="span" class="text-app-grey-500" size="preset4">Maximum of $50.00</Text>
      </div>
    </header>

    <div>
      <Progress :model-value="33" class="w-full" :color="item.theme" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CardMoneyInfo :item="{ label: 'Spent', value: 15, theme: item.theme }" />
      <CardMoneyInfo :item="{ label: 'Remaining', value: 2, theme: 'beige-100' }" />
    </div>

    <div>
      <Card class="bg-app-beige-100 mt-10">
        <header class="flex justify-between items-end mb-4">
          <Text as="span" size="preset3" class="text-app-grey-900" weight="700">
            Latest Spending
          </Text>
          <div class="flex items-center gap-2 cursor-pointer">
            <Text as="span" size="preset4" class="block text-app-grey-500">See All</Text>
            <PhCaretRight />
          </div>
        </header>

        <div class="gap-5">
          <template
            v-for="(transaction, index) in item.transactions"
            :key="'transaction-budget' + index"
          >
            <TransactionCard
              :person="transaction.recipientOrSender"
              :type="transaction.type"
              :value="transaction.value"
              :created-at="transaction.date"
            />
            <Divider class="bg-app-beige-500 opacity-15" />
          </template>
        </div>
      </Card>
    </div>

    <DeleteBudgetModal v-model="isDeleteModalOpen" />
  </Card>
</template>

<script setup lang="ts">
import { PhCaretRight, PhDotsThree } from '@phosphor-icons/vue'
import { MenubarMenu } from 'radix-vue'
import DeleteBudgetModal from './DeleteBudgetModal.vue'
import Text from '@/components/ui/text/Text.vue'
import { CategoryValueTypes, CATEGORIES } from '@/constants/categories'
import { ColorTypes } from '@/theme'
import Card from '@/components/ui/card/Card.vue'
import Progress from '@/components/ui/progress/Progress.vue'
import CardMoneyInfo from '@/pages/@components/CardMoneyInfo.vue'
import TransactionCard from '@/pages/@components/TransactionCard.vue'
import Divider from '@/components/ui/divider/Divider.vue'
import { ITransaction } from '@/types/globals/transaction'
import MenubarTrigger from '@/components/ui/menubar/MenubarTrigger.vue'
import Menubar from '@/components/ui/menubar/Menubar.vue'
import MenubarContent from '@/components/ui/menubar/MenubarContent.vue'
import MenubarItem from '@/components/ui/menubar/MenubarItem.vue'
import MenubarShortcut from '@/components/ui/menubar/MenubarShortcut.vue'
import MenubarSeparator from '@/components/ui/menubar/MenubarSeparator.vue'

type EmitTypes = {
  edit: [void]
}

const emit = defineEmits<EmitTypes>()

interface IProps {
  item: {
    category: CategoryValueTypes
    spent: number
    total: number
    theme: ColorTypes

    transactions: ITransaction[]
  }
}

const props = defineProps<IProps>()

const isDeleteModalOpen = ref<boolean>(false)

const classes = computed(() => {
  return {
    [`bg-app-${props.item.theme}`]: true,
  }
})

watch(isDeleteModalOpen, () => {
  console.log(isDeleteModalOpen.value)
})
</script>

<style scoped></style>

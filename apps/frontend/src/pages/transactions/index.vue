<template>
  <div class="d-flex align-center">
    <Card>
      <header class="mb-10 flex items-center justify-between gap-4">
        <div class="relative w-full max-w-sm items-center">
          <Input type="text" placeholder="Search transaction" />
          <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
            <PhMagnifyingGlass class="size-6 text-muted-foreground fill-app-beige-500" />
          </span>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-4">
            <span class="whitespace-nowrap">Sort by</span>

            <Select class="max-w-[110px] w-full">
              <SelectTrigger>
                <SelectValue placeholder="Select a  sort value" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="latest">latest</SelectItem>
                  <SelectItem value="oldest">oldest</SelectItem>
                  <SelectItem value="az">A to z</SelectItem>
                  <SelectItem value="za">Z to A</SelectItem>
                  <SelectItem value="hightest">Hightest</SelectItem>
                  <SelectItem value="lowest">Lowest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center gap-4">
            <span>Category</span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="(category, index) in TRANSACTIONS_CATEGORIES"
                    :key="'category' + index"
                    :value="category.value"
                  >
                    {{ category.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Recipient / Sender</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Transaction Date</TableHead>
            <TableHead class="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(transaction, index) in transactions" :key="'transaction' + index">
            <TableCell class="font-medium flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  :src="AVATARS[transaction.recipientOrSender.avatar].src"
                  alt="Avatar"
                />
                <AvatarFallback>
                  {{ transaction.recipientOrSender.name.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              {{ transaction.recipientOrSender.name }}
            </TableCell>
            <TableCell>{{ TRANSACTIONS_CATEGORIES[transaction.category].label }}</TableCell>
            <TableCell>{{ transaction.date }}</TableCell>
            <TableCell class="text-right">
              <Text size="preset4" as="strong" weight="700">
                <span
                  :class="
                    clsx(transaction.type == 'deposit' ? 'text-app-green' : 'text-app-grey-900')
                  "
                >
                  <span v-if="transaction.type == 'deposit'">+</span>
                  <span v-else>-</span>
                  ${{ transaction.value }}
                </span>
              </Text>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <footer class="flex items-center justify-between mt-10">
        <Button variant="outline" @click="handleGetPrevPage">
          <PhCaretLeft class="mr-2" weight="fill" />
          Prev
        </Button>
        <div class="flex items-center gap-1">
          <Button
            v-for="(item, index) in pagination.final_page"
            :key="'pagination-item' + index"
            :variant="pagination.page == item ? 'default' : 'outline'"
            @click="() => handleSelectPage(item)"
          >
            {{ item }}
          </Button>
        </div>
        <Button variant="outline" @click="handleGetNextPage">
          Next
          <PhCaretRight class="ml-2" weight="fill" />
        </Button>
      </footer>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { PhMagnifyingGlass, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
import clsx from 'clsx'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import Card from '@/components/ui/card/Card.vue'
import Input from '@/components/ui/input/Input.vue'
import SelectSeparator from '@/components/ui/select/SelectSeparator.vue'
import TableFooter from '@/components/ui/table/TableFooter.vue'
import { AVATARS, AvatarTypes } from '@/constants/avatars'
import { ITransaction } from '@/types/globals/transaction'
import { TRANSACTIONS_CATEGORIES } from '@/constants/transactions'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import Button from '@/components/ui/button/Button.vue'

definePageMeta({
  layout: 'default-view-layout',
})

const { pagination, paginationNextPage, paginationPrevPage } = usePagination()

const transactions: ITransaction[] = [
  {
    recipientOrSender: {
      name: 'Emma Richardson',
      avatar: 'emma',
    },
    value: 45,
    type: 'deposit',
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

function handleGetNextPage() {
  paginationNextPage()
}
function handleGetPrevPage() {
  paginationPrevPage()
}
function handleSelectPage(item: number) {
  pagination.value.page = item
}
</script>

<style scoped></style>

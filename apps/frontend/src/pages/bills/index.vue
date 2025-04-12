<template>
  <div>
    <Text as="strong" size="preset1" weight="700">Recuring Bills</Text>
    <div class="grid grid-cols-12 gap-6 mt-10">
      <div class="col-span-12 lg:col-span-4">
        <Card class="bg-app-grey-900">
          <PhNewspaperClipping size="35" class="fill-app-white" />
          <Text as="span" size="preset4" class="block text-app-white mt-5 mb-2">Total Bills</Text>
          <Text as="span" size="preset1" class="text-app-white" weight="700">$4,836.00</Text>
        </Card>
        <Card class="mt-4">
          <Text as="span" size="preset4" class="block text-app-grey-500">Summary</Text>
          <div>
            <div class="flex items-center justify-between">
              <Text as="span" size="preset4" class="block text-app-grey-500 mt-5 mb-2">
                Paid Bills
              </Text>
              <Text as="span" size="preset5" class="text-app-grey-900" weight="700">$3,814.25</Text>
            </div>
            <Divider />
          </div>

          <div>
            <div class="flex items-center justify-between">
              <Text as="span" size="preset4" class="block text-app-grey-500 mt-5 mb-2">
                Total Upcoming
              </Text>
              <Text as="span" size="preset5" class="text-app-grey-900" weight="700">$3,814.25</Text>
            </div>
            <Divider />
          </div>

          <div>
            <div class="flex items-center justify-between">
              <Text as="span" size="preset4" class="block text-app-red mt-5 mb-2">Due Soon</Text>
              <Text as="span" size="preset5" class="text-app-red" weight="700">$3,814.25</Text>
            </div>
          </div>
        </Card>
      </div>
      <div class="col-span-12 lg:col-span-8">
        <Card>
          <header class="mb-10 flex items-center justify-between gap-4">
            <div class="relative w-full max-w-sm items-center">
              <Input type="text" placeholder="Search bills" />
              <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                <PhMagnifyingGlass class="size-6 text-muted-foreground fill-app-beige-500" />
              </span>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center gap-4">
                <span class="whitespace-nowrap">Sort by</span>

                <Select class="max-w-[110px] w-full" value="latest">
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
            </div>
          </header>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[400px]">Bill Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead class="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(bill, index) in bills" :key="'bill' + index">
                <TableCell class="font-medium flex items-center gap-4">
                  <Avatar>
                    <AvatarImage :src="AVATARS[bill.company.avatar].src" alt="Avatar" />
                    <AvatarFallback>
                      {{ bill.company.name.charAt(0).toUpperCase() }}
                    </AvatarFallback>
                  </Avatar>
                  {{ bill.company.name }}
                </TableCell>

                <TableCell>
                  <div class="flex items-center gap-4">
                    <Text
                      as="span"
                      :class="
                        cn('text-app-green', {
                          'text-app-red':
                            bill.status === 'pending' &&
                            isBefore(new Date(bill.dueDate), new Date()),
                        })
                      "
                      size="preset5"
                    >
                      {{ format(new Date(bill.dueDate), 'MMMM d') }}
                    </Text>
                    <PhCheckCircle
                      weight="fill"
                      class="fill-app-green"
                      :class="{
                        'fill-app-red':
                          bill.status === 'pending' && isBefore(new Date(bill.dueDate), new Date()),
                      }"
                    />
                  </div>
                </TableCell>

                <TableCell class="text-right">
                  <Text
                    weight="700"
                    :class="{
                      'text-app-red':
                        bill.status === 'pending' && isBefore(new Date(bill.dueDate), new Date()),
                    }"
                  >
                    ${{ bill.amount }}
                  </Text>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Paginator />
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PhCaretLeft,
  PhCaretRight,
  PhCheckCircle,
  PhMagnifyingGlass,
  PhNewspaperClipping,
} from '@phosphor-icons/vue'
import { format, isBefore } from 'date-fns'
import clsx from 'clsx'
import Card from '@/components/ui/card/Card.vue'
import Text from '@/components/ui/text/Text.vue'
import Divider from '@/components/ui/divider/Divider.vue'
import Paginator from '@/pages/@components/Paginator.vue'

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
import { AVATARS } from '@/constants/avatars'
import { IBill } from '@/types/globals/bill'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { cn } from '@/lib/utils'

definePageMeta({
  layout: 'default-view-layout',
})

const bills: IBill[] = [
  {
    company: {
      name: 'Emma Richardson',
      avatar: 'emma',
    },
    dueDate: '2024-12-11',
    amount: 40,
    status: 'paid',
  },

  {
    company: {
      name: 'Serenity Spa & Wellness',
      avatar: 'serenity',
    },
    dueDate: '2024-11-08',
    amount: 100,
    status: 'pending',
  },
]
</script>

<style scoped></style>

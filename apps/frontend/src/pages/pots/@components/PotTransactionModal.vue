<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
    <Dialog v-model:open="model">
      <DialogContent class="sm:max-w-[425px] bg-app-white">
        <DialogHeader>
          <DialogTitle>
            <template v-if="mode == 'add'">Add to ‘Savings’</template>
            <template v-else>Withdraw from ‘Savings’</template>
          </DialogTitle>

          <DialogDescription class="mt-3">
            <template v-if="mode == 'add'">
              <Text as="p" class="text-app-grey-500" size="preset4">
                Create a pot to set savings targets. These can help keep you on track as you save
                for special purchases.
              </Text>
            </template>
            <template v-else>
              <Text as="p" class="text-app-grey-500" size="preset4">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
                Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
              </Text>
            </template>
          </DialogDescription>
        </DialogHeader>

        <div>
          <div>
            <PotTransactionProgress
              :mode="mode"
              :item="{ amount: amountValue, current: pot.spent, target: pot.target }"
            />
            <div class="flex items-center justify-between mt-2">
              <Text
                as="span"
                :class="mode == 'add' ? 'text-app-green' : 'text-app-red'"
                size="preset4"
                weight="700"
              >
                {{ (pot?.spent / pot?.target) * 100 || 0 }}%
              </Text>

              <Text as="span" class="text-app-grey-500" size="preset5">
                Target of ${{ pot.target }}
              </Text>
            </div>
          </div>
        </div>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="amount">
            <FormItem>
              <FormLabel>
                <Text v-if="mode == 'withdraw'" as="span" size="preset4">Amount to Withdraw</Text>
                <Text v-else as="span" size="preset4">Amount to Add</Text>
              </FormLabel>

              <FormControl>
                <Input v-bind="componentField" v-model="amountValue" placeholder="e.g. 2000" />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <Button form="dialogForm" class="w-full" @click.prevent="model = false">
            <Text v-if="mode == 'withdraw'" as="span">Confirm Withdrawal</Text>
            <Text v-else as="span">Confirm Addition</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'
import PotTransactionProgress from './PotTransactionProgress.vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

import Text from '@/components/ui/text/Text.vue'
import { IPot } from '@/types/globals/pot'

interface IProps {
  mode: 'add' | 'withdraw'
  pot: IPot
}

defineProps<IProps>()

const model = defineModel({ default: false })

const amountValue = ref(0)

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  })
)

function onSubmit(values: any) {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
    ),
  })
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
    <Dialog v-model:open="model">
      <DialogContent class="sm:max-w-[425px] bg-app-white">
        <DialogHeader>
          <DialogTitle>
            <template v-if="mode == 'add'">Add New Challenge</template>
            <template v-else>Edit Challenge</template>
          </DialogTitle>

          <DialogDescription>
            <template v-if="mode == 'add'">
              Create a challenge to set savings targets by day. These can help keep you on track as
              you save for special purchases.
            </template>
            <template v-else>
              If your saving targets change, feel free to update your challenge info.
            </template>
          </DialogDescription>
        </DialogHeader>

        <form id="dialogForm" class="flex flex-col gap-2" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Challenge Name</FormLabel>

              <FormControl>
                <Input placeholder="e.g. Rainy Days" v-bind="componentField" />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="max_spend" class="my-5">
            <FormItem>
              <FormLabel>Target</FormLabel>

              <FormControl>
                <Input placeholder="e.g. 2000" v-bind="componentField" />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="theme" class="my-5">
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="(color, index) in COLORS_VALUES"
                      :key="'color' + index"
                      :value="color.key"
                    >
                      <div class="flex items-center gap-4">
                        <div
                          class="w-3 h-3 rounded-full"
                          :class="{ [`bg-app-${color.key}`]: true }"
                        ></div>
                        {{ color.label }}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <!-- <FormField v-slot="{ componentField }" name="max_money_to_add" class="my-5">
            <FormItem>
              <FormLabel>Max Money To Add</FormLabel>

              <FormControl>
                <NumberField
                  v-bind="componentField"
                  :default-value="100"
                  :max="200"
                  :min="50"
                  :step="10"
                >
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField> -->
          <FormField v-slot="{ componentField }" name="type" class="my-5">
            <FormItem>
              <FormLabel class="block">Type</FormLabel>
              <FormControl>
                <Select v-bind="componentField" class="max-w-[110px] w-full" value="latest">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a  type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Montly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="ends_at" class="my-5">
            <FormItem>
              <FormLabel class="block">End's Date</FormLabel>

              <FormControl>
                <Popover>
                  <PopoverTrigger as-child>
                    <Input
                      :value="dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : ''"
                      v-bind="componentField"
                      placeholder="e.g. 2000"
                      class="text-start"
                      @input.prevent
                    />
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <Calendar v-model="dateValue" initial-focus />
                  </PopoverContent>
                </Popover>
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <Button type="submit" form="dialogForm" class="w-full">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { PhCalendar } from '@phosphor-icons/vue'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { Calendar } from '@/components/ui/calendar'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import NumberFieldContent from '@/components/ui/number-field/NumberFieldContent.vue'
import NumberFieldDecrement from '@/components/ui/number-field/NumberFieldDecrement.vue'
import NumberFieldInput from '@/components/ui/number-field/NumberFieldInput.vue'
import NumberFieldIncrement from '@/components/ui/number-field/NumberFieldIncrement.vue'
import NumberField from '@/components/ui/number-field/NumberField.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectGroup from '@/components/ui/select/SelectGroup.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import { COLORS_VALUES } from '@/theme'

interface IProps {
  mode: 'add' | 'edit'
}

defineProps<IProps>()

const model = defineModel({ default: false })

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const dateValue = ref<DateValue>()

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

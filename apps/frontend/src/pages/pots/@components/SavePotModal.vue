<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
    <Dialog v-model:open="model">
      <DialogContent class="sm:max-w-[425px] bg-app-white">
        <DialogHeader>
          <DialogTitle>
            <template v-if="mode == 'add'">Add New Pot</template>
            <template v-else>Edit Pot</template>
          </DialogTitle>

          <DialogDescription>
            <template v-if="mode == 'add'">
              Create a pot to set savings targets. These can help keep you on track as you save for
              special purchases.
            </template>
            <template v-else>
              If your saving targets change, feel free to update your pots.
            </template>
          </DialogDescription>
        </DialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Pot Name</FormLabel>

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

          <FormField v-slot="{ componentField }" name="category">
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
import { CATEGORIES } from '@/constants/categories'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectGroup from '@/components/ui/select/SelectGroup.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import { COLORS_VALUES } from '@/theme'

interface IProps {
  mode: 'add' | 'edit'
}

defineProps<IProps>()

const model = defineModel({ default: false })

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

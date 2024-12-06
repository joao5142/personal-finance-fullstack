<template>
  <div class="p-app-500 flex items-center justify-center w-full max-w-auth mx-auto">
    <Card class="w-full">
      <Text size="preset1" weight="700">Login</Text>

      <form class="mt-10" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel class="mb-1">Email</FormLabel>
            <FormControl class="mt-0">
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
          </FormItem>

          <FormItem class="mt-3">
            <FormLabel class="mb-1">Password</FormLabel>
            <FormControl class="mt-0">
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <Button class="mt-5 w-full" type="submit">Submit</Button>

        <footer>
          <Text as="span" class="block text-center mt-3">
            Need to create an account?
            <Text as="span" weight="700" class="underline">Sign Up</Text>
          </Text>
        </footer>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import Input from '@/components/ui/input/Input.vue'
import Card from '@/components/ui/card/Card.vue'
import Text from '@/components/ui/text/Text.vue'
import Button from '@/components/ui/button/Button.vue'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

definePageMeta({
  layout: 'auth-view-layout',
})

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  })
)

const form = useForm({
  validationSchema: formSchema,
})

function onSubmit(values: any) {
  form.handleSubmit(values)
  console.log('Form submitted!', values)
}
</script>

<style scoped></style>

<template>
  <div class="p-app-500 flex items-center justify-center w-full max-w-auth mx-auto">
    <Card class="w-full">
      <Text size="preset1" weight="700">Sign Up</Text>

      <form class="mt-10 grid gap-2" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl class="mt-0">
              <Input type="text" placeholder="Enter your name" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl class="mt-0">
              <Input type="text" placeholder="Enter your Email" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="mt-3">
            <FormLabel>Password</FormLabel>
            <FormControl class="mt-0 space-y-0">
              <Input
                class="mt-0"
                type="password"
                placeholder="Enter your password"
                v-bind="componentField"
              />
            </FormControl>

            <FormDescription class="text-end">
              Password must be at least 8 characters
            </FormDescription>
          </FormItem>
        </FormField>

        <Button class="mt-8 w-full" size="lg" type="submit">Create Account</Button>

        <footer>
          <Text as="span" class="block text-center mt-5">
            Already have a account?
            <Text as="span" weight="700" class="underline">Login</Text>
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
import Container from '@/components/layout/default/Container.vue'
import FinanceImage from '@/assets/images/logo-large.svg'

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

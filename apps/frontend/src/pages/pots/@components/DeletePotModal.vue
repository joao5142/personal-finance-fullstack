<template>
  <Dialog v-model:open="model">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          <Text as="strong" size="preset2" weight="700">Delete ‘Entertainment’?</Text>
        </DialogTitle>
        <DialogDescription>
          <Text as="p" class="text-app-beige-500 mt-2" size="preset4">
            Are you sure you want to delete this pot? This action cannot be reversed, and all the
            data inside it will be removed forever.
          </Text>
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4"></div>
      <DialogFooter>
        <div class="flex flex-col justify-center items-center gap-2 w-full">
          <Button type="submit" class="bg-app-red w-full">Yes, Confirm Deletion</Button>
          <Button type="submit" variant="ghost" @click="model = false">
            <Text as="span" class="text-app-beige-500" size="preset4">No, Go Back</Text>
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Text from '@/components/ui/text/Text.vue'

const model = defineModel({ default: false })
</script>

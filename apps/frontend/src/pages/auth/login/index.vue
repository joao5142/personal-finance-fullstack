<template>
  <div class="grid grid-cols-2 h-screen">
    <div class="p-4">
      <div class="bg-auth bg-cover rounded-app-xsmall h-full">oi</div>
    </div>
    <div class="p-app-500 flex items-center justify-center">
      <Card class="w-full">
        <Text size="preset1" weight="700">Login</Text>

        <div>
          <Text size="preset5" weight="700" class="text-app-grey-500">Email</Text>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '~/components/ui/card/Card.vue'
import Text from '~/components/ui/text/Text.vue'

definePageMeta({
  layout: 'auth-view-layout',
})
</script>

<style scoped></style>

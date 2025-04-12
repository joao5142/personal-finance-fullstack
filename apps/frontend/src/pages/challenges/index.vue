<template>
  <div class="d-flex align-center">
    <header class="flex items-center justify-between">
      <Text as="strong" size="preset1" weight="700">Challenges</Text>
      <Button size="lg" @click="handleAddChallenge">+ Add New Challenge</Button>
    </header>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <CardChallenge
        :item="{
          id: '1',
          endsAt: '2024-12-25',
          createdAt: '2024-12-14',
          spent: 50,
          total: 200,
          target: 200,
          maxMoneyToAdd: 200,
          type: 'weekly',
          theme: 'yellow',
        }"
        @edit="handleEditChallenge"
      />

      <CardChallenge
        :item="{
          id: '2',
          endsAt: '2025-03-01',
          createdAt: '2024-12-14',
          spent: 50,
          total: 200,
          target: 200,
          maxMoneyToAdd: 100,
          type: 'weekly',
          theme: 'cyan',
        }"
        @edit="handleEditChallenge"
      />
    </section>

    <SavePotModal v-model="isModalSaveOpen" :mode="modalMode" />
  </div>
</template>

<script setup lang="ts">
import CardChallenge from './@components/CardChallenge.vue'
import SavePotModal from './@components/SaveChallengeModal.vue'
import Button from '@/components/ui/button/Button.vue'

import Text from '@/components/ui/text/Text.vue'

import { IPot } from '@/types/globals/pot'

definePageMeta({
  layout: 'default-view-layout',
})

const isModalSaveOpen = ref<boolean>(false)
const modalMode = ref<'add' | 'edit'>('add')

function handleAddChallenge() {
  modalMode.value = 'add'
  isModalSaveOpen.value = true
}
function handleEditChallenge(item: any) {
  modalMode.value = 'edit'
  isModalSaveOpen.value = true
}
</script>

<style scoped></style>

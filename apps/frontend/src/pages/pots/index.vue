<template>
  <div class="d-flex align-center">
    <header class="flex items-center justify-between">
      <Text as="strong" size="preset1" weight="700">Overview</Text>
      <Button size="lg" @click="handleAddPot">+ Add New Pot</Button>
    </header>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <CardPot
        :item="{
          category: 'entertainment',
          spent: 50,
          total: 200,
          target: 200,
          date: 'August 20',
          theme: 'cyan',
        }"
        @edit="handleEditPot"
      />

      <CardPot
        :item="{
          category: 'bills',
          theme: 'yellow',
          total: 200,
          date: 'August 20',
          target: 200,
          spent: 100,
        }"
        @edit="handleEditPot"
      />
    </section>

    <SavePotModal v-model="isModalSaveOpen" :mode="modalMode" />
  </div>
</template>

<script setup lang="ts">
import CardPot from './@components/CardPot.vue'
import SavePotModal from './@components/SavePotModal.vue'
import Button from '@/components/ui/button/Button.vue'

import Text from '@/components/ui/text/Text.vue'

import { IPot } from '@/types/globals/pot'

definePageMeta({
  layout: 'default-view-layout',
})

const isModalSaveOpen = ref<boolean>(false)
const modalMode = ref<'add' | 'edit'>('add')

const pots: IPot[] = [
  {
    spent: 45,
    total: 45,
    target: 200,
    category: 'general',
    date: '19 Aug 2024',
    theme: 'cyan',
  },

  {
    spent: 45,
    total: 45,
    target: 200,
    category: 'general',
    date: '19 Aug 2024',
    theme: 'blue',
  },
]

function handleAddPot() {
  modalMode.value = 'add'
  isModalSaveOpen.value = true
}
function handleEditPot(item: any) {
  modalMode.value = 'edit'
  isModalSaveOpen.value = true
}
</script>

<style scoped></style>

<template>
  <footer class="flex items-center justify-between gap-3 mt-10">
    <Button variant="outline" @click="handleGetPrevPage">
      <PhCaretLeft class="mr-2" weight="fill" />
      Prev
    </Button>
    <div
      ref="paginatorContainer"
      v-dragscroll
      class="flex overflow-auto scrollbar-hidden items-center gap-1"
    >
      <Button
        v-for="(item, index) in pagination.final_page"
        :key="'pagination-item' + index"
        :variant="pagination.page == item ? 'default' : 'outline'"
        @click="() => handleSelectPage(item)"
      >
        {{ item }}
      </Button>
    </div>
    <Button variant="outline" @click="handleGetNextPage">
      Next
      <PhCaretRight class="ml-2" weight="fill" />
    </Button>
  </footer>
</template>

<script setup lang="ts">
import { PhCaretRight, PhCaretLeft } from '@phosphor-icons/vue'
import Button from '@/components/ui/button/Button.vue'

const { pagination, paginationNextPage, paginationPrevPage } = usePagination()

const paginatorContainer = ref()

function scrollLeft() {
  if (paginatorContainer.value) {
    paginatorContainer?.value?.scrollBy({
      left: -50,
      behavior: 'smooth',
    })
  }
}

function scrollRight() {
  if (paginatorContainer.value) {
    paginatorContainer.value?.scrollBy({
      left: 50,
      behavior: 'smooth',
    })
  }
}

function handleSelectPage(item: number) {
  pagination.value.page = item
}

function handleGetNextPage() {
  paginationNextPage()
  scrollRight()
}

function handleGetPrevPage() {
  paginationPrevPage()
  scrollLeft()
}
</script>

<style scoped></style>

<template>
  <div class="flex h-screen">
    <Sidebar />

    <main class="flex-1">
      <Container class="my-9">
        <slot></slot>
      </Container>
    </main>

    <AppLoading></AppLoading>
  </div>
</template>

<script setup lang="ts">
import Container from '@/components/layout/container/Container.vue'
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import AppLoading from '@/components/ui/loading/AppLoading.vue'

const isNavigationExpanded = ref<boolean>(false)

function handleUpdateRail(value: any) {
  isNavigationExpanded.value = value
}
</script>

<style scoped>
.background,
.v-main {
  background: rgb(var(--v-theme-background)) !important;
  min-height: 100vh !important;
}

.nav {
  background: rgb(var(--v-theme-sidebar)) !important;
}
</style>

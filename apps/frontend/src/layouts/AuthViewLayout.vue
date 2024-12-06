<template>
  <div class="h-screen">
    <header class="bg-app-grey-900 p-app-500 block lg:hidden fixed top-0 w-full">
      <img class="mx-auto" :src="FinanceImage" alt="" />
    </header>
    <Container class="h-full">
      <main class="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div class="pt-8 p-5 hidden lg:block">
          <div
            class="p-6 bg-auth bg-cover rounded-app-xsmall h-full relative max-w-auth rounded-app-small"
          >
            <img :src="FinanceImage" alt="" />
            <div class="absolute bottom-0 pb-8">
              <Text
                size="preset1"
                as="h1"
                class="text-app-white mb-3 line-height-app-120"
                weight="700"
              >
                Keep track of your money and save for your future
              </Text>
              <Text as="p" class="text-app-white" size="preset4">
                Personal finance app puts you in control of your spending. Track transactions, set
                budgets, and add to savings pots easily.
              </Text>
            </div>
          </div>
        </div>

        <slot></slot>
      </main>
    </Container>

    <AppLoading></AppLoading>
  </div>
</template>

<script setup>
import AppLoading from '@/components/ui/loading/AppLoading.vue'
import Container from '@/components/layout/default/Container.vue'
import FinanceImage from '@/assets/images/logo-large.svg'
import Text from '@/components/ui/text/Text.vue'
</script>

<style scoped></style>

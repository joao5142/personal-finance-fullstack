<template>
  <Card>
    <header>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <Text as="strong" size="preset2" weight="700">Challenge 1</Text>
        </div>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger><PhDotsThree class="cursor-pointer" size="25" /></MenubarTrigger>
            <MenubarContent>
              <MenubarItem class="cursor-pointer" @click="emit('edit')">Edit</MenubarItem>
              <MenubarSeparator />
              <MenubarItem class="cursor-pointer" @click="isDeleteModalOpen = true">
                <Text as="span" class="text-app-red" size="preset4">Delete Challenge</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <Text as="span" class="text-app-grey-500" size="preset4">Total Saved</Text>
        <Text as="span" size="preset1" weight="700">${{ item.spent }}</Text>
      </div>
    </header>

    <div>
      <Progress :model-value="10" class="w-full" :color="item.theme" />
      <div class="flex items-center justify-between mt-2">
        <Text as="span" class="text-app-grey-500" size="preset4" weight="700">7.95%</Text>
        <Text as="span" class="text-app-grey-500" size="preset5">Target of ${{ item.target }}</Text>
      </div>
    </div>

    <div class="gap-4 mt-10">
      <Button size="lg" class="bg-app-beige-100 group w-full block" @click="handleViewChallenge">
        <Text as="strong" class="text-app-grey-900 group-hover:text-app-white" weight="700">
          View Challenge
        </Text>
      </Button>
    </div>

    <DeleteChallengeModal v-model="isDeleteModalOpen" />
  </Card>
</template>

<script setup lang="ts">
import { PhDotsThree } from '@phosphor-icons/vue'
import { MenubarMenu } from 'radix-vue'
import DeleteChallengeModal from './DeleteChallengeModal.vue'

import Text from '@/components/ui/text/Text.vue'
import { CATEGORIES } from '@/constants/categories'

import Card from '@/components/ui/card/Card.vue'
import Progress from '@/components/ui/progress/Progress.vue'

import MenubarTrigger from '@/components/ui/menubar/MenubarTrigger.vue'
import Menubar from '@/components/ui/menubar/Menubar.vue'
import MenubarContent from '@/components/ui/menubar/MenubarContent.vue'
import MenubarItem from '@/components/ui/menubar/MenubarItem.vue'
import MenubarSeparator from '@/components/ui/menubar/MenubarSeparator.vue'
import { IChallenge } from '@/types/globals/challenge'
import Button from '@/components/ui/button/Button.vue'

const router = useRouter()

type EmitTypes = {
  edit: [void]
}

const emit = defineEmits<EmitTypes>()

interface IProps {
  item: IChallenge
}

const props = defineProps<IProps>()

const isDeleteModalOpen = ref<boolean>(false)

function handleViewChallenge() {
  router.push('/challenges/' + props.item.id)
}

watch(isDeleteModalOpen, () => {
  console.log(isDeleteModalOpen.value)
})
</script>

<style scoped></style>

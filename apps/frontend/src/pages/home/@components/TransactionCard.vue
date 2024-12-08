<template>
  <div class="flex items-center justify-between py-5">
    <div class="flex items-center gap-3">
      <Avatar>
        <AvatarImage :src="avatarImage" alt="Avatar" />
        <AvatarFallback>{{ person.name.charAt(0).toUpperCase() }}</AvatarFallback>
      </Avatar>
      <Text size="preset4" as="strong" weight="700">{{ person.name }}</Text>
    </div>
    <div class="flex flex-col gap-1">
      <Text size="preset4" as="strong" weight="700">
        <span :class="clsx(type == 'deposit' ? 'text-app-green' : 'text-app-grey-900')">
          <span v-if="type == 'deposit'">+</span>
          <span v-else>-</span>
          ${{ value }}
        </span>
      </Text>

      <Text size="preset5" as="strong">{{ createdAt }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import Text from '@/components/ui/text/Text.vue'
import { AvatarTypes, AVATARS } from '@/constants/avatars'

interface IProps {
  person: {
    avatar: AvatarTypes
    name: string
  }
  type: 'deposit' | 'withdraw'
  value: number
  createdAt: string
}

const props = defineProps<IProps>()

const avatarImage = computed(() => {
  return AVATARS?.[props.person.avatar]?.src ?? AVATARS.spark.src
})
</script>

<style scoped></style>

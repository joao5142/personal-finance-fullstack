<template>
  <div :class="cn('h-[1px] w-full bg-app-grey-100', props.class)"></div>
</template>

<script setup lang="ts">
import clsx from 'clsx'
import { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

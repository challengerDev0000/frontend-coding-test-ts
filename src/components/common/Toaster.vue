<script setup lang="ts">

import { inject } from 'vue'
import type { Notification } from '../../types/exercise'
const toasts: Array<Notification> = inject('toasts') || []

</script>

<template>
  <div class="fixed top-15 right-1 z-50 flex flex-col gap-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="bg-green-200 text-gray-800 p-4 rounded shadow-md transition-opacity duration-300 opacity-90"
      :class="{
        'bg-green-200 text-gray-800 border-l-4 border-green-600':
          toast.type === 'success',
        'bg-red-200 text-gray-800 border-l-4 border-red-600':
          toast.type === 'error',
      }"
    >
      {{ toast.message }}
    </div>
  </div>
</template>
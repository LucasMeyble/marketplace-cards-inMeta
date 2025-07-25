<template>
  <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-4 relative">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
          <button @click="close" class="text-gray-500 hover:text-red-500 font-bold text-lg">
            ✕
          </button>
        </div>

        <img v-if="image" :src="image" :alt="title" class="w-full h-auto max-h-80 object-contain rounded" />

        <p class="mt-4 text-gray-700 whitespace-pre-line">
          {{ description }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  show: boolean
  title: string
  image: string
  description: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}
</script>

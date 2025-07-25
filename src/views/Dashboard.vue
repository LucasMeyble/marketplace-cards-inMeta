<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'

const userStore = useUserStore()

const { user, getUserCards, isUserLoading } = storeToRefs(userStore)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">
      Olá, <span class="text-indigo-600">{{ user?.name }}</span> 👋
    </h1>

    <div v-if="isUserLoading" class="text-gray-500">
      Carregando suas cartas...
    </div>

    <div v-else>
      <h2 class="text-lg font-semibold mb-2">Suas cartas:</h2>

      <ul v-if="getUserCards.length > 0" class="space-y-2">
        <li v-for="card in getUserCards" :key="card.id"
          class="p-3 rounded-md shadow bg-white flex items-center gap-4 hover:shadow-md transition">
          <img :src="card.imageUrl" :alt="card.name" class="h-16 w-16 object-contain rounded" />
          <div>
            <p class="font-medium text-gray-800">{{ card.name }}</p>
            <p class="text-sm text-gray-500 line-clamp-2">{{ card.description }}</p>
          </div>
        </li>
      </ul>

      <p v-else class="text-gray-500 italic">
        Você ainda não possui cartas na sua conta.
      </p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold flex items-center gap-2">
      <ArrowRightIcon class="h-6 w-6 text-indigo-500" />
      Cartas disponíveis
    </h1>

    <div class="max-w-7xl mx-auto">
      <div
        class="grid gap-6"
        :class="{
          'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': true
        }"
      >
        <div
          v-for="card in cards"
          :key="card.id"
          @click="onCardClick(card)"
          class="cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition bg-white flex justify-center items-center p-4"
        >
          <img
            :src="card.imageUrl"
            :alt="card.name"
            class="max-h-64 w-auto object-contain"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mt-6 max-w-7xl mx-auto">
      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
        :disabled="page === 1 || loading"
        @click="changePage(page - 1)"
      >
        Página anterior
      </button>

      <span class="text-sm font-medium text-gray-700">Página {{ page }}</span>

      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
        :disabled="!hasMore || loading"
        @click="changePage(page + 1)"
      >
        Próxima página
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { useCardsStore } from '../store/cards'

const toast = useToast()
const cardsStore = useCardsStore()
const { cards, page, hasMore, loading } = storeToRefs(cardsStore)

async function fetchCards() {
  try {
    await cardsStore.fetchCardsList(page.value, cardsStore.rpp)
  } catch (err: any) {
    toast.error('Erro ao buscar cartas: ' + err.message)
  }
}

function changePage(newPage: number) {
  cardsStore.fetchCardsList(newPage, cardsStore.rpp)
}

function onCardClick(card: any) {
  console.log('Carta clicada:', card)
  toast.info(`Carta selecionada: ${card.name}`)
}

onMounted(fetchCards)
</script>


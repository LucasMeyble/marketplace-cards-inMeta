<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold flex items-center gap-2">
      <ArrowRightIcon class="h-6 w-6 text-indigo-500" />
      Home Page
    </h1>
    <p>Bem-vindo ao marketplace!</p>

    <div class="flex items-center gap-4">
      <span class="text-lg font-semibold">Count: {{ counter.count }}</span>
      <button @click="counter.increment" class="px-4 py-2 bg-indigo-600 text-white rounded-lg">Incrementar</button>
    </div>

    <button @click="fetchCards(1, 10)" class="px-4 py-2 bg-green-600 text-white rounded-lg">
      Buscar Cartas (Axios)
    </button>

    <ul class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <li v-for="card in cards" :key="card.id" class="p-4 border rounded-lg shadow hover:shadow-md transition">
        <p class="font-semibold">{{ card.name }}</p>
        <p class="text-sm text-gray-600">{{ card.description }}</p>
        <img :src="card.imageUrl" alt="" class="mt-2 rounded" />
      </li>
    </ul>


    <Disclosure>
      <DisclosureButton class="px-4 py-2 bg-gray-800 text-white rounded-lg">
        Mostrar detalhes
      </DisclosureButton>
      <DisclosurePanel class="p-4 bg-gray-100 rounded-lg mt-2">
        Este é um painel do Headless UI
      </DisclosurePanel>
    </Disclosure>

    <form @submit="onSubmit" class="space-y-4 max-w-sm">
      <div>
        <label class="block text-sm font-medium mb-1">Seu nome:</label>
        <Field name="name" class="border p-2 w-full rounded" />
        <ErrorMessage name="name" class="text-red-500 text-sm" />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Enviar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useCounterStore } from '../store/counter'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useForm, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { ref } from 'vue'

const counter = useCounterStore()
const toast = useToast()

const cards = ref<{ id: string; name: string; description: string; imageUrl: string }[]>([])

async function fetchCards(page = 1, rpp = 10) {
  try {
    console.log(page)
    const res = await axios.get('https://cards-marketplace-api-2fjj.onrender.com/cards', {
      params: {
        rpp,
        page,
      },
    })

    cards.value = res.data.list
    toast.success(`Cartas carregadas! Página ${res.data.page}`)
  } catch (err: any) {
    toast.error(`Erro ao buscar cartas: ${err.message}`)
  }
}


const schema = zod.object({
  name: zod.string().min(3, 'O nome deve ter pelo menos 3 caracteres')
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { name: '' }
})

const onSubmit = handleSubmit(values => {
  toast.success(`Formulário enviado! Nome: ${values.name}`)
})
</script>

<style scoped></style>

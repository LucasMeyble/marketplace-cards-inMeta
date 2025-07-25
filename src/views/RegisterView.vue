<template>
  <div class="p-4 max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <UserPlusIcon class="w-6 h-6" /> Criar conta
    </h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Nome</label>
        <Field name="name" type="text" class="border rounded p-2 w-full" placeholder="Digite seu nome" />
        <ErrorMessage name="name" class="text-red-500 text-sm" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Email</label>
        <Field name="email" type="email" class="border rounded p-2 w-full" placeholder="Digite seu email" />
        <ErrorMessage name="email" class="text-red-500 text-sm" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Senha</label>
        <Field name="password" type="password" class="border rounded p-2 w-full" placeholder="Digite sua senha" />
        <ErrorMessage name="password" class="text-red-500 text-sm" />
      </div>

      <button type="submit"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center disabled:opacity-60"
        :disabled="auth.loading">
        <svg v-if="auth.loading" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-2 text-white"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.356-2a8.001 8.001 0 0015.356 2m0 0H15" />
        </svg>
        Registrar
      </button>
    </form>

    <p class="mt-4 text-sm">
      Já possui conta?
      <RouterLink to="/login" class="text-indigo-600 hover:underline">
        Entrar
      </RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '../store'
import { useToast } from 'vue-toastification'
import { UserPlusIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

interface RegisterFormValues {
  name: string
  email: string
  password: string
}

const router = useRouter()

const schema = toTypedSchema(
  z.object({
    name: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  })
)

const auth = useAuthStore()
const toast = useToast()

const { handleSubmit } = useForm<RegisterFormValues>({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    password: '',
  },
})

const submitForm = handleSubmit(async (values) => {
  try {
    await auth.register(values)
    toast.success('Conta registrada com sucesso! 🎉')
    router.push('/login')
  } catch (err) {
    console.error(err)
    toast.error('Erro ao registrar. Tente novamente.')
  }
})
</script>

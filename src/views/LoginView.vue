<template>
  <div class="p-4 max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">Entrar na sua conta</h1>

    <form @submit.prevent="onSubmit" class="space-y-4">
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
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
        :disabled="loading">
        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-2 text-white" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.356-2a8.001 8.001 0 0015.356 2m0 0H15" />
        </svg>
        Entrar
      </button>
    </form>

    <p class="mt-4 text-sm">
      Não tem conta?
      <RouterLink to="/register" class="text-blue-500 hover:underline">Criar conta</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useAuthStore } from '../store'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

interface LoginFormValues {
  email: string
  password: string
}

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)

const schema = toTypedSchema(
  z.object({
    email: z.string().email('Digite um email válido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  })
)

const { handleSubmit } = useForm<LoginFormValues>({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const response = await authStore.login(values.email, values.password)
    toast.success(`Bem-vindo, ${response.user.name}! 👋`, {
      timeout: 3000,
    })
    router.push('/dashboard')
  } catch (error: any) {
    console.error('Login failed:', error)
    toast.error('Falha ao fazer login. Verifique suas credenciais.', {
      timeout: 4000,
    })
  } finally {
    loading.value = false
  }
})
</script>

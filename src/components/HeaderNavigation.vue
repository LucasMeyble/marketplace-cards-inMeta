<template>
  <header class="bg-gray-300">
    <nav class="p-5 bg-white shadow md:flex md:items-center md:justify-between">
      <div class="flex justify-between items-center ">
        <span class="text-2xl font-bold cursor-pointer" @click="goHome">
          Marketplace
        </span>

        <span class="text-3xl cursor-pointer mx-2 md:hidden block">
          <button v-if="menuIcon === 'menu'" @click="toggleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <button v-else @click="toggleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      </div>

      <ul
        class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-200">
        <template v-if="!authStore.isAuthenticated">
          <li class="mx-4 my-6 md:my-0">
            <RouterLink class="text-xl hover:text-cyan-500 duration-500" to="/login" @click="closeMenu">Entrar
            </RouterLink>
          </li>
          <li class="mx-4 my-6 md:my-0">
            <RouterLink class="text-xl hover:text-cyan-500 duration-500" to="/register" @click="closeMenu">Criar conta
            </RouterLink>
          </li>
        </template>

        <template v-else>
          <li class="mx-4 my-6 md:my-0">
            <RouterLink class="text-xl hover:text-cyan-500 duration-500" to="/me" @click="closeMenu">Minhas cartas
            </RouterLink>
          </li>
          <li class="mx-4 my-6 md:my-0">
            <RouterLink class="text-xl hover:text-cyan-500 duration-500" to="/dashboard" @click="closeMenu">Dashboard
            </RouterLink>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store'

const router = useRouter()
const authStore = useAuthStore()

const menuIcon = ref<'menu' | 'close'>('menu')

const toggleMenu = () => {
  const list = document.querySelector('ul')
  if (!list) return
  if (menuIcon.value === 'menu') {
    menuIcon.value = 'close'
    list.classList.add('top-[80px]', 'opacity-100')
  } else {
    menuIcon.value = 'menu'
    list.classList.remove('top-[80px]', 'opacity-100')
  }
}

const closeMenu = () => {
  const list = document.querySelector('ul')
  if (!list) return
  menuIcon.value = 'menu'
  list.classList.remove('top-[80px]', 'opacity-100')
}

const goHome = () => {
  router.push('/')
  closeMenu()
}
</script>

<style scoped></style>

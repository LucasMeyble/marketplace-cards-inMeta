<template>
  <main class="min-h-screen flex flex-col">
    <section class="z-10">
      <HeaderNavigation />
    </section>
    <section class="z-0 flex-grow">
      <RouterView />
    </section>
    <section>
      <FooterVue />
    </section>
  </main>
</template>

<script setup lang="ts">

import HeaderNavigation from './components/HeaderNavigation.vue'
import FooterVue from './components/Footer.vue'

</script>

<style scoped></style>

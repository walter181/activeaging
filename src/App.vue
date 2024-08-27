<script setup>
import BHeader from './components/NavBar.vue'
import BFooter from './components/Footer.vue'
</script>

<template>
  <header>
    <BHeader />
  </header>

  <main>
    <router-view></router-view>
  </main>

  <footer>
    <BFooter />
  </footer>
</template>

<style scoped></style>

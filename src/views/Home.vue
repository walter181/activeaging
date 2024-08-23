<template>
  <div>
    <NavBar />
    <h1>Welcome to the Home Page</h1>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    NavBar
  }
}
</script>

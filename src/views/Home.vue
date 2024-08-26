<template>
  <div><NavBar /></div>
  <div><Footer /></div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    NavBar,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer
  }
}
</script>

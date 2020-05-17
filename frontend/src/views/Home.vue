<template>
  <div class="home-page">
    <banner />
    <shopping />
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Shopping from '../components/Shopping/Shopping.vue'

export default {
  name: 'Home',
  components: {
    Banner,
    Shopping
  }
}

</script>

<style>

.home-page {
  height: 100vh;
}

</style>
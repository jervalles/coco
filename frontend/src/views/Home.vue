<template>
  <div class="home-page">
    <banner />
    <carousel />
    <shopping />
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Shopping from '../components/Shopping/Shopping.vue'
import Carousel from '../components/Carousel'

export default {
  name: 'Home',
  components: {
    Banner,
    Shopping,
    Carousel
  }
}

</script>

<style>

.home-page {
  height: 100vh;
}

</style>
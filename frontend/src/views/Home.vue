<template>
  <div class="home-page">
    <carousel />
    <shopping />
  </div>
</template>

<script>
import Shopping from '../components/Shopping/Shopping.vue'
import Carousel from '../components/Carousel'

export default {
  name: 'Home',
  components: {
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
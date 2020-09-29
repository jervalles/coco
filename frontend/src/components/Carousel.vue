<template>
  <div id="caroussel-container">
    <v-carousel
      cycle
      height="100%"
      width="100%"
      hide-delimiter-background
      show-arrows-on-hover
      hide-delimiters
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.src">
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import banner1 from '../images/banner1.jpg'
import banner2 from '../images/banner2.jpg'

export default {
  name: 'Carousel',
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [{ src: banner1 }, { src: banner2 }]
    }
  }
}
</script>

<style>
#caroussel-container {
  margin-top: 60px;
  height: 200px;
  width: 100%;
}
</style>

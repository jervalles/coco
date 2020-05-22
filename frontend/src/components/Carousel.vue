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
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              {{ slide }} slide
            </div>
          </v-row>
        </v-sheet>

      </v-carousel-item>
		</v-carousel>
  </div>
</template>

<script>
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
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ]
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
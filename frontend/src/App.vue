<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
    <v-app>
      <div id="main">
        <banner />
        <router-view />
      </div>
      <div id="desktop">
        Cette application est disponible qu'en version mobile :)
      </div>
    </v-app>
  </div>
</template>

<script>
import Banner from './components/Banner'

export default {
  name: "App",
  components: {
    Banner
  }
}

</script>

<style lang="scss">

@media only screen and (min-width: 600px) {
  #main {
    display: none;
  }
}

@media only screen and (max-width: 600px) {

  #desktop {
    display: none;
  }
}

</style>
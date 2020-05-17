<template>
  <div id="app">
    <v-app>
      <div id="main">
        <router-view />
      </div>
      <div id="desktop">
        Cette application est disponible qu'en version mobile :)
      </div>
    </v-app>
  </div>
</template>

<script>

export default {
  name: "App",
}

</script>

<style lang="scss">

@media only screen and (min-width: 600px) {
  #main {
    display: none;
  }
}

@media only screen and (max-width: 600px) {

  body, p {
    margin: 0px;
    padding: 0px
  }

  p {
    background-color: lightBlue;
  }

  #p3 {
    margin: 20px;
  }

  #p6 {
    margin-top: 40px;
    margin-right: 40px;
    margin-bottom: 40px;
    margin-left: 40px;
  }
  
  #desktop {
    display: none;
  }
}

</style>
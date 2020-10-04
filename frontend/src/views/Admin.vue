<template>
  <div class="admin-page">
    <v-btn text small @click="toHome()"> Revenir à la page d'accueil </v-btn>
    <orders-list />
  </div>
</template>

<script>
import OrdersList from '../components/Orders/OrdersList.vue'

export default {
  name: 'Admin',
  components: {
    OrdersList,
  },
  methods: {
    toHome() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style>
.admin-page {
  margin-top: 70px;
  height: 100vh;
}
</style>

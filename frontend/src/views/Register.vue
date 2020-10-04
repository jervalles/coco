<template>
  <div class="account-page">
    <v-container class="account-register">
      <v-btn text small class="caption-btn" @click="backHome()">
        Retour à la page précedente</v-btn
      >
      <v-card class="registerCard">
        <register-form />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'

export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
  methods: {
    backHome() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style lang="scss">
.account-page {
  height: 100vh;
  .caption-btn {
    cursor: pointer;
    padding: 5px;
  }
  .account-register {
    margin-top: 80px;
  }
  .registerCard {
    width: 100%;
    max-width: 600px;
    padding: 30px;
  }
  .v-input {
    max-width: 300px;
    margin: auto;
  }
}
</style>

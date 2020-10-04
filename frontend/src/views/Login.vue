<template>
  <div class="account-page">
    <v-container class="account-login">
      <v-btn text small class="caption-btn" @click="backHome()">
        Retour à la page précedente</v-btn
      >
      <v-card class="loginCard">
        <login-form v-if="!isLoggedin" />
        <div v-else>
          Vous êtes actuellement connecté
          <v-btn color="primary" class="btn-log" @click="submitLogout()">
            Log out
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  data() {
    return {
      isLoggedin: false,
    }
  },

  mounted() {
    if (this.user) {
      this.isLoggedin = true
    } else {
      this.isLoggedin = false
    }
  },
  computed: {
    ...mapGetters(['user']),
  },

  methods: {
    ...mapActions(['logoutUser']),
    backHome() {
      this.$router.push({ name: 'home' })
    },
    async submitLogout() {
      await this.logoutUser()
      this.$router.push({ name: 'register' })
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
  .account-login {
    margin-top: 80px;
  }
  .loginCard {
    width: 100%;
    max-width: 600px;
    padding: 30px;
    .btn-log {
      padding: 10px;
      margin: 20px auto;
      display: block;
    }
  }
  .v-input {
    max-width: 300px;
    margin: auto;
  }
}
</style>

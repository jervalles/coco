<template>
  <div class="account-page">
    <v-container class="account-login">
			<div class="caption-btn" @click="backHome()">	Retour à la page précedente</div>
			<v-card class="loginCard">
				<login-form v-if="!isLoggedin" />
        <div v-else>
          Vous êtes actuellement connecté
          <v-btn
            color="primary" class="btn-log"
            @click="submitLogout()"
          >
            Log out
          </v-btn>
        </div>
			</v-card>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import Router from '../router'
import * as firebase from 'firebase'
import "firebase/auth"

export default {
  name: 'Login',
  components: {
      LoginForm
  },
  data() {
    return {
      isLoggedin: false,
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLoggedin = true
      } else {
        this.isLoggedin = false
      }
    })
  },
	methods: {
		backHome() {
			Router.push({ name: "home" });
    },
    async submitLogout() {
      try {
        await firebase.auth().signOut()
			} catch(err) {
				console.log(err)
			}
    }
	}
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
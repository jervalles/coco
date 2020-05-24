<template>
  <div class="account-page">
    <banner />
    <v-container class="account-login">
			<div class="caption-btn" @click="backHome()">	Retour à la page précedente</div>
			<v-card class="loginCard">
				<login-form />
			</v-card>
    </v-container>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import LoginForm from '../components/LoginForm'
import Router from '../router'

export default {
  name: 'Login',
  components: {
      Banner,
      LoginForm
	},
	methods: {
		backHome() {
			Router.push({ name: "home" });
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
		margin-top: 100px;
	}
  .loginCard {
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
<template>
  <div class="account-page">
    <banner />
    <v-container class="account-register">
			<div class="caption-btn" @click="backPreviousPage()">	Retour à la page précedente</div>
			<v-card class="registerCard">
				<register-form />
			</v-card>
    </v-container>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import RegisterForm from '../components/RegisterForm'
import Router from '../router'

export default {
  name: 'Register',
  components: {
      Banner,
      RegisterForm
	},
	methods: {
		backPreviousPage() {
			Router.push({ name: "login" });
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
	.account-register {
		margin-top: 100px;
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
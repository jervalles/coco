<template>
  <div class="login-form">
		<v-form @submit.prevent>
			<v-text-field
				v-model="email"
				class="input"
				type="email"
				name="login-email"
				label="email"
			/>
			<v-text-field
				v-model="password"
				class="input"
				name="login-password"
				:append-icon="showPwd ? 'visibility' : 'visibility_off'"
				:type="showPwd ? 'text' : 'password'"
				label="password"
				@click:append="showPwd = !showPwd"
			/>
			<v-btn
				color="primary" class="btn-log"
				@click="submitLogin()"
			>
				login
			</v-btn>
			<div
				class="caption-btn"
				@click="register()"
			>
				Créer un compte
			</div>
			<div
				class="caption-btn"
			>
				lost password
			</div>
		</v-form>
  </div>
</template>

<script>
import Router from '../router'
import * as firebase from 'firebase'
import "firebase/auth"

export default {
	name: 'LoginForm',
	data() {
		return {
			showPwd: false,
			email: '',
			password: ''
		}
	},
	methods: {
		register() {
			Router.push({ name: "register" })
		},
		async submitLogin() {
			try {
				const user = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				console.log(user)
				this.$router.replace({ name: "home" })
			} catch(err) {
					console.log(err)
			}
		}
	}
}

</script>

<style lang="scss">
	.login-form {
		form {
			.btn-log {
			padding: 10px;
			margin: 20px auto;
			display: block;
			}
			.caption-btn {
				cursor: pointer;
				padding: 5px;
			}
		}
	}
</style>
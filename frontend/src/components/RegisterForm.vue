<template>
  <div class="register-form">
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
				@click="submitRegister()"
			>
				Créer un compte
			</v-btn>
		</v-form>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import "firebase/auth"

export default {
	name: 'RegisterForm',
	data() {
		return {
			showPwd: false,
			email: '',
			password: ''
		}
	},
	methods: {
		async submitRegister() {
			try {
				const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
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
	.register-form {
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
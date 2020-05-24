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
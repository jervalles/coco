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
				:loading="loginLoading"
			>
				login
			</v-btn>
			<v-btn
				text small 
				class="caption-btn"
				@click="register()"
			>
				Créer un compte
			</v-btn>
			<v-btn
				text small 
				class="caption-btn"
			>
				lost password
			</v-btn>
		</v-form>
  </div>
</template>

<script>
import Router from '../router'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'LoginForm',
	data() {
		return {
			showPwd: false,
			email: '',
			password: '',
			loginLoading: false
		}
	},
	computed: {
		...mapGetters([
			'loginUserStatus'
		])
	},
	methods: {
		...mapActions([
			'loginUser'
		]),
		register() {
			Router.push({ name: "register" })
		},
		async submitLogin() {
			await this.loginUser({
				email: this.email,
				password: this.password
			})
		}
	},
	watch: {
		loginUserStatus: function(status) {
			if (status.pending) {
				console.log("loading")
					this.loginLoading = true
			}	else if (status.success) {
				console.log("pass")
					this.$router.replace({ name: "home" })
			} else if (status.error) {
				console.log("not pass")
					// this.statusMessage = 'Un problème est survenu'
					this.loginLoading = false
			}
		}
	},
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
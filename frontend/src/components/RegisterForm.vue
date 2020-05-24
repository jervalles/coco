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
		<span class="status-message" v-if="statusMessage">{{ statusMessage }}</span>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'RegisterForm',
	data() {
		return {
			showPwd: false,
			email: '',
			password: '',
			statusMessage: ''
		}
	},
	computed: {
		...mapGetters([
			'createUserStatus'
		])
	},
	methods: {
		...mapActions([
			'createUser'
		]),
		async submitRegister() {
			await this.createUser({
				email: this.email,
				password: this.password
			})
		}
	},
	watch: {
    createUserStatus: function(status) {
      if (status.success) {
        this.$router.replace({ name: "home" })
      } else if (status.error) {
					this.statusMessage = 'Un problème est survenu'
			}
    }
  },
}


</script>

<style lang="scss">
	.register-form {
		display: flex;
		flex-direction: column;
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
		.status-message {
			color: red;
			align-self: center;
		}
	}
</style>
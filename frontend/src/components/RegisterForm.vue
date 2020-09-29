<template>
  <div class="register-form">
    <v-form @submit.prevent v-model="isValid">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        error-count="2"
        class="input"
        type="email"
        name="login-email"
        autocomplete="current-email"
        label="email"
      />
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        class="input"
        error-count="5"
        name="login-password"
        autocomplete="new-password"
        :append-icon="showPwd ? 'visibility' : 'visibility_off'"
        :type="showPwd ? 'text' : 'password'"
        label="password"
        @click:append="showPwd = !showPwd"
      />
      <v-btn
        color="primary"
        class="btn-log"
        :loading="creationLoading"
        :disabled="!isValid"
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
      statusMessage: '',
      creationLoading: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must have 5+ characters',
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
      ],
      isValid: false
    }
  },
  computed: {
    ...mapGetters(['createUserStatus'])
  },
  methods: {
    ...mapActions(['createUser']),
    async submitRegister() {
      await this.createUser({
        email: this.email,
        password: this.password
      })
    }
  },
  watch: {
    createUserStatus(status) {
      if (status.pending) {
        this.creationLoading = true
      } else if (status.success) {
        this.$router.replace({ name: 'home' })
      } else if (status.error) {
        this.statusMessage = 'Un problème est survenu'
        this.creationLoading = false
      }
    }
  }
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

import * as firebase from 'firebase'
import "firebase/auth"

// const token = window.localStorage.getItem('authtoken')

const state = {

	user: null,

	// create user
	createUserPending: false,
	createUserSuccess: false,
	createUserError: false,
}

const mutations= {

	// create user

  POST_USER_PENDING(state) {
    state.createUserPending = true
    state.createUserSuccess = false
    state.createUserError = false
  },

  POST_USER_SUCCESS(state, payload) {
    state.createUserPending = false
		state.createUserSuccess = true
		state.user = payload
  },

  POST_USER_ERROR(state) {
    state.createUserPending = false
    state.createUserError = true
  },
}

const actions = {

	createUser({ commit }, payload) {
		commit('POST_USER_PENDING')
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(res => {
					const newUser = {
						id: res.user.uid,
						email: res.user.email
					}
					commit('POST_USER_SUCCESS', newUser)
					// localStorage.setItem('user_datas', JSON.stringify(data.user))
					// localStorage.setItem('authtoken', data.jwt)
				})
				.catch(() => {
					commit('POST_USER_ERROR')
				})
	},
}

const getters = {

	user(state) {
		return state.user
	},

	createUserStatus: state => {
    return {
      pending: state.createUserPending,
      success: state.createUserSuccess,
      error: state.createUserError
    }
  },
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
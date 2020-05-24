import * as firebase from 'firebase'
import "firebase/auth"

const state = {

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

  POST_USER_SUCCESS(state) {
    state.createUserPending = false
    state.createUserSuccess = true
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
				.then(() => {
					commit('POST_USER_SUCCESS')
				})
				.catch(() => {
					commit('POST_USER_ERROR')
				})
	},
}

const getters = {

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
import * as firebase from 'firebase'
import "firebase/auth"
import Router from '@/router'

const state = {

	user: null,
	role: null,
	authed: false,
	// create user
	createUserPending: false,
	createUserSuccess: false,
	createUserError: false,

	// login user
	loginUserPending: false,
	loginUserSuccess: false,
	loginUserError: false,

	// logout user
	logoutUserSuccess: false,
	logoutUserError: false,
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
		state.authed = true
	},

	POST_USER_ERROR(state) {
		state.createUserPending = false
		state.createUserError = true
	},
	
	// login user

	LOGIN_USER_PENDING(state) {
		state.loginUserPending = true
		state.loginUserSuccess = false
		state.loginUserError = false
	},

	LOGIN_USER_SUCCESS(state, payload) {
		console.log(payload)
		state.loginUserPending = false
		state.loginUserError = false
		state.loginUserSuccess = true
		state.user = payload.newUser
		state.role = payload.role
		state.authed = true

	},

	LOGIN_USER_ERROR(state) {
		state.loginUserPending = false
		state.loginUserError = true
	},
	
	// logout user

	LOGOUT_USER_SUCCESS(state) {
		state.user = null
		state.logoutUserError = false
		state.logoutUserSuccess = true
		state.role = null
		state.authed = false
	},

	LOGOUT_USER_ERROR(state) {
		state.logoutUserError = true
		state.logoutUserSuccess = false
	}
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
				})
				.catch(() => {
					commit('POST_USER_ERROR')
				})
	},

	loginUser({ commit }, payload) {
		commit('LOGIN_USER_PENDING')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(res => {
					const newUser = {
						id: res.user.uid,
						email: res.user.email,
					}
					return new Promise((resolve) => {
						firebase.auth().currentUser.getIdTokenResult()
							.then(tokenResult => {
								let role = ''
								console.log(tokenResult.claims.type);
								if (tokenResult.claims.type === 'administrator') {
									role = tokenResult.claims.type
									Router.push({ name: 'admin' })
								} else {
									console.log("not admin")
									role = 'user'
								}
								commit('LOGIN_USER_SUCCESS', {newUser, role})
								resolve(tokenResult)
							})
						})
				})
				.catch(() => {
					commit('LOGIN_USER_ERROR')
				})
	},

	logoutUser({commit}) {
		firebase.auth().signOut()
		.then(
			commit('LOGOUT_USER_SUCCESS', null)
		)
		.catch(() => {
			commit('LOGOUT_USER_ERROR')
		})
	}
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
	
	loginUserStatus: state => {
		return {
		pending: state.loginUserPending,
		success: state.loginUserSuccess,
		error: state.loginUserError
		}
	},
	// role
	isAdmin: state => state.role === "administrator",

	isAuthed: state => state.authed,
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
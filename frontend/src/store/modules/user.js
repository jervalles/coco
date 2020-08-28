import * as firebase from 'firebase'
import "firebase/auth"
import { loginService } from '@/services/LoginService'
// import Router from '@/router'

const userDatas = JSON.parse(window.localStorage.getItem('user_datas'))
const token = window.localStorage.getItem('authtoken')

const state = {
	token: token ? token : null,
	user: userDatas ? userDatas : null,
	// role: null,
	authed: token ? true : false,
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
		console.log("payload")
		console.log(payload)
		const { user, token } = payload
		console.log("user")
		console.log(user)
		console.log("token")
		console.log(token)

		state.loginUserPending = false
		state.loginUserError = false
		state.loginUserSuccess = true
		state.token = token
		state.user = user
		// state.role = payload.role
		state.authed = true

	},

	LOGIN_USER_ERROR(state) {
		state.loginUserPending = false
		state.loginUserError = true
	},
	
	// logout user

	LOGOUT_USER_SUCCESS(state) {
		state.token = null
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
		const { email, password } = payload

		commit('LOGIN_USER_PENDING')
			loginService(email, password)
				.then(res => {
					console.log("resultttt")
					console.log(res)
					commit('LOGIN_USER_SUCCESS', res.data)
					localStorage.setItem('user_datas', JSON.stringify(res.data.user))
					localStorage.setItem('authtoken', res.data.token)
					console.log("1")
					
					console.log("2")

				})
				.catch(() => {
					commit('LOGIN_USER_ERROR')
				})
	},

	// loginUser({ commit }, payload) {
	// 	commit('LOGIN_USER_PENDING')
	// 		firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
	// 			.then(res => {
	// 				const newUser = {
	// 					id: res.user.uid,
	// 					email: res.user.email,
	// 				}
	// 				return new Promise((resolve) => {
	// 					firebase.auth().currentUser.getIdTokenResult()
	// 						.then(tokenResult => {
	// 							let role = ''
	// 							console.log(tokenResult.claims.type);
	// 							if (tokenResult.claims.type === 'administrator') {
	// 								role = tokenResult.claims.type
	// 								Router.push({ name: 'admin' })
	// 							} else {
	// 								console.log("not admin")
	// 								role = 'user'
	// 							}
	// 							commit('LOGIN_USER_SUCCESS', {newUser, role})
	// 							resolve(tokenResult)
	// 						})
	// 					})
	// 			})
	// 			.catch(() => {
	// 				commit('LOGIN_USER_ERROR')
	// 			})
	// },

	logoutUser({commit}) {
		localStorage.removeItem('user_datas')
		localStorage.removeItem('authtoken')
		commit('LOGOUT_USER_SUCCESS', null)
	}
}

const getters = {
	token: state => state.token,
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
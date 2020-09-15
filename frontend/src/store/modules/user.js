import { loginService } from '@/services/LoginService'
import { postUser } from '@/services/UserService'
// import Router from '@/router'

const userDatas = JSON.parse(window.localStorage.getItem('user_datas'))
const token = window.localStorage.getItem('authtoken')

const state = {
	token: token ? token : null,
	user: userDatas ? userDatas : null,
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
		const { user, token } = payload
		state.loginUserPending = false
		state.loginUserError = false
		state.loginUserSuccess = true
		state.token = token
		state.user = user
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
			postUser(payload.email, payload.password)
				.then(res => {
					const newUser = {
						id: res.data.user.id,
						email: res.data.user.email
					}
					commit('POST_USER_SUCCESS', newUser)
				})
				.catch((e) => {
					commit('POST_USER_ERROR')
					console.log(e)
				})
	},

	loginUser({ commit }, payload) {
		const { email, password } = payload

		commit('LOGIN_USER_PENDING')
			loginService(email, password)
				.then(res => {
					commit('LOGIN_USER_SUCCESS', res.data)
					localStorage.setItem('user_datas', JSON.stringify(res.data.user))
					localStorage.setItem('authtoken', res.data.token)
				})
				.catch(() => {
					commit('LOGIN_USER_ERROR')
				})
	},

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
	isAdmin: state => state.user && state.user.role === "administrator",
	isAuthed: state => state.authed,
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
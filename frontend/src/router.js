import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Admin from './views/Admin'
import Register from './views/Register'
import firebase from 'firebase'
import store from './store'

Vue.use(vueRouter)
const router = new vueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{
			path: '/admin',
			name: 'admin',
			component: Admin,
			meta: {
				requiresLogin: true,
				requiresRoles: ['administrator'],
				title: 'adminPage'
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	const { requiresRoles } = to.meta
	firebase.auth().onAuthStateChanged(userAuth => {
		if (userAuth) {
			console.log("userAuth")
			firebase.auth().currentUser.getIdTokenResult()
				.then(function ({
					claims
				}) {
					if (to.meta.requiresRoles) {
						console.log("requires roles")
						if (!requiresRoles.includes(claims.type)) {
							next("/login")
						} else {
							next()
						}
					} else {
						next()
					}
				})
		} else {
			if (to.matched.some(record => record.meta.requiresLogin) && !store.getters.isAuthed) {
				next("/login")
			} else {
				next()
			}
		}
	})
	next()
})
  
export default router
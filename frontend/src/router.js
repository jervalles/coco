import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

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
		}
	]
})

export default router
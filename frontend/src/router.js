import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from './views/Home'
import Account from './views/Account'

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
			path: '/account',
			name: 'account',
			component: Account
		}
	]
})

export default router
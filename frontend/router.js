import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from './views/Home.vue'

Vue.use(vueRouter)

const router = new vueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		}
	]
})

export default router
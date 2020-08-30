import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Admin from './views/Admin'
import Register from './views/Register'
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
	const userData = JSON.parse(window.localStorage.getItem('user_datas'))
	console.log("userData")
	console.log(userData)
	const { requiresRoles } = to.meta
	console.log(requiresRoles)
	
	if (to.matched.some(record => record.meta.requiresLogin) && !store.getters.isAuthed) {
        next("/login")
        
    } else if (to.meta.requiresRoles) {
        if (!requiresRoles.includes(userData.role)) {
            next("/login")
        } else {
            next()
        }

    } else {
        next()
    }

	next()
})
  
export default router
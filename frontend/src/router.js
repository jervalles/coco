import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'
import Register from './views/Register.vue'
import store from './store'

Vue.use(VueRouter)
const router = new VueRouter({
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
  console.log('userData')
  console.log(userData)
  const { requiresRoles } = to.meta

  if (
    to.matched.some(record => record.meta.requiresLogin) &&
    !store.getters.isAuthed
  ) {
    next('/login')
  } else if (to.meta.requiresRoles) {
    if (!requiresRoles.includes(userData.role)) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }

  next()
})

export default router

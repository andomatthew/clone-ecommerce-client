import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Root from '../views/Root.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: Root,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('access_token')) {
        next()
      } else if (localStorage.getItem('access_token')) {
        next({ path: '/home' })
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter (to, from, next) {
      if (from.path !== '/') {
        next({ path: '/home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart/:id',
    name: 'Cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

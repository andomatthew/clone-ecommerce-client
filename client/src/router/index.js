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
      if (localStorage.getItem('access_token')) {
        next(router.push('/home'))
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter (to, from, next) {
      if (localStorage.getItem('access_token')) {
        next(router.push('/home'))
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    beforeEnter (to, from, next) {
      if (localStorage.getItem('access_token')) {
        next(router.push('/home'))
      } else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('access_token')) {
        next(router.push('/'))
      } else {
        next()
      }
    }
  },
  {
    path: '/carts',
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

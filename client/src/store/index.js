import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    customer: {
      id: null,
      email: null
    },
    cart: []
  },
  mutations: {
    setCustomerLogin (state, customer) {
      state.customer = customer
    },
    logoutCustomer (state) {
      state.customer = { id: null, email: null }
    },
    setProducts (state, products) {
      state.products = products
    },
    setCart (state, cart) {
      state.cart = cart
    },
    setNewProduct (state, product) {
      state.cart.push(product)
    }
  },
  actions: {
    registerCustomer (context, newCustomer) {
      axios({
        url: '/users/register',
        method: 'POST',
        data: newCustomer
      })
        .then(_ => {
          router.push({ path: '/' })
        })
        .catch((xhr, status) => {
          console.log(xhr)
        })
    },
    loginCustomer (context, customer) {
      axios({
        url: '/users/login',
        method: 'POST',
        data: customer
      })
        .then(response => {
          const customer = response.data
          localStorage.setItem('access_token', customer.access_token)
          localStorage.setItem('id', customer.id)
          context.commit('setCustomerLogin', { id: customer.id, email: customer.email })
          router.push({ path: '/home' })
        })
        .catch((xhr, status) => {
          console.log(xhr.response)
        })
    },
    logout (context) {
      context.commit('logoutCustomer')
      localStorage.setItem('access_token', '')
      localStorage.setItem('id', '')
      router.push({ path: '/' })
    },
    fetchProducts (context) {
      axios({
        url: '/customers',
        method: 'GET'
      })
        .then(response => {
          const products = response.data
          console.log(products)
          context.commit('setProducts', products)
        })
        .catch((xhr, status) => {
          console.log(xhr)
        })
    },
    showCart (context) {
      console.log('masuk')
      axios({
        url: `/cart/${localStorage.getItem('id')}`,
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(response => {
          console.log(response.data)
          const cart = response.data
          context.commit('setCart', cart)
        })
        .catch((xhr, response) => {
          console.log(response)
        })
    },
    addToCart (context, product) {
      axios({
        url: `/cart/${product.userId}`,
        method: 'POST',
        headers: { access_token: localStorage.getItem('access_token') },
        data: product
      })
        .then(response => {
          const output = response.data
          if (!output.length) {
            context.commit('setNewProduct', output)
          }
        })
        .catch((xhr, status) => {
          console.log(xhr)
        })
    },
    addQuantity (context, data) {

    },
    removeQuantity (context, data) {

    }
  },
  modules: {
  }
})

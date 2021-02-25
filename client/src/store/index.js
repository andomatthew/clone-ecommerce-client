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
    cart: [],
    errorMessage: ''
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
    },
    setQuantity (state, product) {
      const updatedCart = state.cart.filter(el => {
        if (el.id === product.id) {
          el = product
        }
        return el
      })
      state.cart = updatedCart
    },
    resetCart (state, data) {
      const newCart = state.cart.filter(el => {
        if (el.userId !== data.userId && el.productId !== data.productId) return el
      })
      state.cart = newCart
    },
    setErrorMessage (state, message) {
      state.errorMessage = message
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
          const message = xhr.response.data.message
          context.commit('setErrorMessage', message)
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
          context.commit('setCustomerLogin', { id: customer.id, email: customer.email })
          router.push({ path: '/home' })
        })
        .catch((xhr, status) => {
          const message = xhr.response.data.message
          context.commit('setErrorMessage', message)
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
          context.commit('setProducts', products)
        })
        .catch((xhr, status) => {
          console.log(xhr)
        })
    },
    showCart (context) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(response => {
          const cart = response.data
          console.log(cart)
          context.commit('setCart', cart)
        })
        .catch((xhr, response) => {
          console.log(xhr.response)
        })
    },
    addToCart (context, product) {
      axios({
        url: '/carts',
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
          console.log(xhr.response.data)
        })
    },
    setQuantity (context, data) {
      axios({
        url: '/carts',
        method: 'PATCH',
        headers: { access_token: localStorage.getItem('access_token') },
        data
      })
        .then(response => {
          const updatedProduct = response.data[1][0]
          context.commit('setQuantity', updatedProduct)
        })
        .catch((xhr, response) => {
          console.log(xhr.response.data)
        })
    },
    removeCart (context, data) {
      axios({
        url: '/carts',
        method: 'DELETE',
        headers: { access_token: localStorage.getItem('access_token') },
        data
      })
        .then(response => {
          console.log('ok')
          context.commit('resetCart', data)
        })
        .catch((xhr, response) => {
          console.log(xhr)
        })
    }
  },
  getters: {
    test: function (state) {
      return state.cart[0].quantity
    }
  }
})

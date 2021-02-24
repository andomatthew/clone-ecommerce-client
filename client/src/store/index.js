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
      console.log(product)
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
          console.log(xhr.response.data)
        })
    },
    setQuantity (context, data) {
      axios({
        url: `/cart/${localStorage.getItem('id')}`,
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
        url: `/cart/${localStorage.getItem('id')}`,
        method: 'DELETE',
        headers: { access_token: localStorage.getItem('access_token') },
        data
      })
        .then(response => {
          // router.push({ path: `/cart/${localStorage.getItem('id')}` })
          console.log('ok')
          context.commit('resetCart', data)
        })
        .catch((xhr, response) => {
          console.log(xhr)
        })
    }
  },
  modules: {
  }
})

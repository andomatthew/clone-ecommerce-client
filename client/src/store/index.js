import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
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
    }
  },
  modules: {
  }
})

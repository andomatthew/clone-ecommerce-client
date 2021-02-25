<template>
  <div>
    <HomeTabs/>
    <h1>Hello</h1>
    <md-list class="md-triple-line"
      v-for="(product, index) in cart" :key="product.id"
    >
      <CartCard :product="[cart[index].Product, cart[index].quantity]"/>
      <md-divider class="md-inset"></md-divider>
    </md-list>
  </div>
</template>

<script>
import HomeTabs from '../components/HomeTabs'
import CartCard from '../components/CartCard'
export default {
  name: 'Cart',
  components: {
    HomeTabs,
    CartCard
  },
  data () {
    return {
      // id: localStorage.getItem('id')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  beforeMount () {
    this.$store.dispatch('showCart')
  }
}
</script>

<style>

</style>

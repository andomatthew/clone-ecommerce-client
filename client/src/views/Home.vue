<template>
  <div class="home">
    <HomeTabs/>
    <h1>Home Page After Login</h1>
    <md-list class="md-triple-line"
      v-for="product in products" :key="product.id"
    >
      <Card :product="product"/>
      <md-divider class="md-inset"></md-divider>
    </md-list>
  </div>
</template>

<script>
import HomeTabs from '../components/HomeTabs'
import Card from '../components/Card'
export default {
  name: 'Home',
  components: {
    HomeTabs,
    Card
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  watch: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

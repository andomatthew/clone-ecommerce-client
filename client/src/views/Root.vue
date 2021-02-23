<template>
  <div>
    <md-tabs md-alignment="centered">
      <md-tab  md-label="Home" md-icon="home">
        <md-list class="md-triple-line"
          v-for="product in products" :key="product.id"
        >
          <Card :product="product"/>
          <md-divider class="md-inset"></md-divider>
        </md-list>
      </md-tab>
      <md-tab  md-label="Login" md-icon="login"></md-tab>
      <md-tab  md-label="Register" md-icon="app_registration"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
export default {
  name: 'Root',
  components: {
    Card
  },
  data () {
    return {

    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>

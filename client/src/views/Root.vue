<template>
  <div>
    <Tabs />
    <md-list class="md-triple-line"
      v-for="product in products" :key="product.id"
    >
      <Card :product="product"/>
      <md-divider class="md-inset"></md-divider>
    </md-list>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Tabs from '../components/Tabs'
export default {
  name: 'Root',
  components: {
    Card,
    Tabs
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

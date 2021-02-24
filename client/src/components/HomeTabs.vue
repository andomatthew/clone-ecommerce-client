<template>
   <div>
    <md-tabs md-alignment="centered" md-sync-route>
      <md-tab to="/home" md-label="Home" md-icon="home" exact></md-tab>
      <md-tab :to="'/cart/'+this.id" md-label="Cart" md-icon="add_shopping_cart"></md-tab>
      <md-tab @click.prevent="logout" md-label="Logout" md-icon="logout"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeTabs',
  data () {
    return {
      id: localStorage.getItem('id')
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    currentCustomer () {
      return this.$store.state.customer
    }
  }
}
</script>

<style>

</style>

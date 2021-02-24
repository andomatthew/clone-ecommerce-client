<template>
  <div>
    <md-tabs md-alignment="centered" md-sync-route>
      <md-tab to="/" md-label="Home" md-icon="home" exact></md-tab>
      <md-tab to="/login"  md-label="Login" md-icon="login"></md-tab>
      <md-tab to="/register" md-label="Register" md-icon="app_registration"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data () {
    return {
      id: localStorage.getItem('id')
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

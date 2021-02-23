<template>
  <div>
    <md-tabs md-alignment="centered">
      <md-tab  md-label="Home" md-icon="home"></md-tab>
      <md-tab  md-label="Login" md-icon="login"></md-tab>
      <md-tab  md-label="Register" md-icon="app_registration"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>

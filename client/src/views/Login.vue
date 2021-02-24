<template>
  <div>
    <Tabs />
    <div class="md-layout">
      <div class="md-layout-item"></div>
      <div class="md-layout-item item-2">
        <form @submit.stop.prevent="loginCustomer">
          <div class="md-card">
            <div class="md-card-header">
              <div class="md-headline">Login</div>
            </div>
            <div class="md-card-content">
              <md-field>
                <label for="">Email</label>
                <md-input v-model="email" placeholder="Email"></md-input>
              </md-field>
              <md-field>
                <label for="">Password</label>
                <md-input v-model="password" placeholder="Password" type="password"></md-input>
              </md-field>
            </div>
            <md-card-actions>
              <md-button type="submit" class="md-primary">Login</md-button>
                <!-- <md-snackbar :md-position="position" :md-active.sync="showSnackbar" md-persistent>
                <span>{{errorMessage || 'Success'}}</span>
                <md-button v-if="errorMessage" class="md-primary" @click="showSnackbar = false">Retry</md-button>
              </md-snackbar> -->
            </md-card-actions>
          </div>
        </form>
      </div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
import Tabs from '../components/Tabs'
export default {
  name: 'Login',
  components: {
    Tabs
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginCustomer () {
      const customer = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginCustomer', customer)
    }
  }
}
</script>

<style>

</style>

<template>
  <div>
    <Tabs />
    <div class="md-layout">
      <div class="md-layout-item"></div>
      <div class="md-layout-item item-2">
        <form @submit.stop.prevent="registerCustomer">
          <div class="md-card">
            <div class="md-card-header">
              <div class="md-headline">Register</div>
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
              <md-button type="submit" class="md-primary">Register</md-button>
              <md-snackbar v-if="errorMessage" :md-position="position" :md-active.sync="errorMessage" md-persistent :md-duration="isInfinity ? Infinity : duration">
                  <span>{{errorMessage}}</span>
              </md-snackbar>
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
  name: 'Register',
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
    registerCustomer () {
      const newCustomer = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('registerCustomer', newCustomer)
    }
  },
  computed: {
    errorMessage () {
      return this.$store.state.errorMessage
    }
  }
}
</script>

<style>
.md-layout {
  height: 50vh;
  display: flex;
  align-items: center;
}
.item-2 {
  position: relative;
  /* background-color: #4b4b4b; */
  height: 46.5%;
}
</style>

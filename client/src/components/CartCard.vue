<template>
  <div>
    <md-list-item>
      <!--Card-->
      <md-card>
        <md-card-content>
          <img :src="product[0].image_url">
        </md-card-content>
      </md-card>
      <!--card-->
      <div class="md-list-item-text">
        <span> Name: {{product[0].name}}</span>
        <span> Price: Rp.{{product[0].price * this.currentQuantity}}</span>
        <p> Stocks: {{product[0].stocks}}</p>
        <span>Quantity: {{this.currentQuantity}}</span>
      </div>
      <md-button @click.prevent="removeQuantity" class="md-icon-button">
        <md-icon class="md-primary">remove</md-icon>
      </md-button>
      <md-button @click.prevent="addQuantity" class="md-icon-button">
        <md-icon class="md-primary">add</md-icon>
      </md-button>
      <md-button @click.prevent="removeCart" class="md-icon-button">
        <md-icon class="md-primary">delete</md-icon>
      </md-button>
    </md-list-item>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['product'],
  data () {
    return {
      quantity: 1,
      currentQuantity: this.product[1]
    }
  },
  methods: {
    addQuantity () {
      const newQuantity = { quantity: this.product[1] + 1, productId: this.product[0].id }
      this.$store.dispatch('setQuantity', newQuantity)
        .then(_ => {
          this.cart()
        })
    },
    removeQuantity () {
      this.currentQuantity -= 1
      const newQuantity = { quantity: this.product[1] - 1, productId: this.product[0].id }
      this.$store.dispatch('setQuantity', newQuantity)
    },
    removeCart () {
      const cartData = {
        userId: localStorage.getItem('id'),
        productId: this.product[0].id
      }
      this.$store.dispatch('removeCart', cartData)
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    test () {
      return this.$store.getters.test
    }
  }
}
</script>

<style>

</style>

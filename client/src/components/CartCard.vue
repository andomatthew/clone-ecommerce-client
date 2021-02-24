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
        <span> Price: Rp.{{product[0].price}}</span>
        <p> Stocks: {{product[0].stocks}}</p>
        <span>Quantity: {{product[1]}}</span>
      </div>
      <md-button class="md-icon-button">
        <md-icon class="md-primary">remove</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon class="md-primary">add</md-icon>
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
      quantity: 1
    }
  },
  methods: {
    addQuantity () {
      const newQuantity = { quantity: this.product.quantity + 1 }
      this.$store.dispatch('addQuantity', newQuantity)
    },
    removeQuantity () {
      const newQuantity = { quantity: this.product.quantity + 1 }
      this.$store.dispatch('removeQuantity', newQuantity)
    }
  }
}
</script>

<style>

</style>

<template>
  <div>
    <md-list-item>
      <!--Card-->
      <md-card>
        <md-card-content>
          <img :src="product.image_url">
        </md-card-content>
      </md-card>
      <!--card-->
      <div class="md-list-item-text">
        <span> Name: {{product.name}}</span>
        <span> Price: Rp.{{product.price}}</span>
        <p> Stocks: {{product.stocks}}</p>
      </div>
      <md-button v-if="'Home'.includes($route.name)" @click.prevent="addToCart" class="md-icon-button">
        <md-icon class="md-primary">add_shopping_cart</md-icon>
      </md-button>
    </md-list-item>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  data () {
    return {
      quantity: 1
    }
  },
  methods: {
    addToCart () {
      const data = {
        productId: this.product.id,
        quantity: this.quantity
      }
      this.$store.dispatch('addToCart', data)
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>

<style>
img {
  max-height: 196px;
}

</style>

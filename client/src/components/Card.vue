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
        <span>{{product.name}}</span>
        <span>{{product.price}}</span>
        <p>{{product.stocks}}</p>
      </div>
    </md-list-item>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product']
}
</script>

<style>
img {
  max-height: 196px;
}

</style>

<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img 
        :src="item.product.color.gallery[0].file.url" 
        width="120" 
        height="120" 
        :alt="item.product.product.title"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет: 
      <span>
        <i :style="{'background-color': item.product.color.color.code}"></i>
        {{ item.product.color.color.title }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ item.productId }} Размер: {{ item.product.size.title }}
    </span>

    <AppCounter 
      class="product__counter form__counter" 
      :amount.sync="amount"
    />

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" 
      type="button" 
      aria-label="Удалить товар из корзины" 
      @click="deleteProduct(item.basketItemId)"
    >  
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import { mapActions } from 'vuex'
import AppCounter from '@/components/App/AppCounter.vue'

export default {
  name: 'CartItem',
  props: ['item'],
  components: { AppCounter },
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount
      },
      set(value) {
        this.updateAmount({ 
          basketItemId: this.item.basketItemId, 
          amount: value
        })
      }
    }
  },
  methods: {
    ...mapActions("cart", {
      deleteProduct : 'removeCartProduct',
      updateAmount: 'updateCartProductAmount',   
    })
  }
}
</script>
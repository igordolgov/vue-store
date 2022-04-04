<template>
  <router-link class="header__cart" 
    :to="{name: 'cart'}" 
    aria-label="Корзина с товарами"
  >
    <div v-if='cartLoading'>
      <img src='../../../public/img/icons/loader.gif' width='30'/>
    </div>
    <div v-else-if='cartLoadingError'>
      <img src='../../../public/img/icons/error.png' width='30'/>
    </div>
    <div v-else>
      <svg width="19" height="24">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" 
        aria-label="Количество товаров"
      >{{ amount }}</span>
    </div>    
  </router-link>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  name: 'CartIndicator',
  computed: {
    ...mapGetters("cart", { 
      cartLoading: 'getCartLoading', 
      cartLoadingError: 'getCartLoadingError',
      cartProducts: 'getCartProducts' 
    }),
    amount() {
      return this.cartProducts ? this.cartProducts.length : ""
    }                          
  },  
}
</script>
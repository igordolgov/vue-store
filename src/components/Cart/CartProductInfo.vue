<template>
  <li class="cart__order">
    <h3>{{ cartItem.product.product.title }}</h3>
    <b>{{ cartItem.positionCost | numberFormat}} ₽</b>
    <span>Артикул: {{ cartItem.productId }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'CartProductInfo',
  props: ['cartItem'],
  filters: { numberFormat }
}
</script>
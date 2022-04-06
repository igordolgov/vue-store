<template>
  <main class="content container"
    v-if="loading"
  >
    <LoaderInfo title="Получение информации" />
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"
            :to="{name: 'main'}"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"
            :to="{name: 'cart'}"
          >
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title"
        v-if="orderInfo"
      >
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary"
            v-if="orderInfo"
          >
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value" >
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>
        <div class="cart__block">
          <ul class="cart__orders"
            v-if="orderPositionsCount"
          >
            <CartProductInfo
              v-for="item in orderProducts"
              :cartItem="item"
              :key="item.id"
            />
          </ul>
          <div class="cart__total"
            v-if="orderPositionsCount"
          >
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ orderPositionsCount }}</b> {{ infoString }} на сумму <b>{{ orderTotalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartProductInfo from '@/components/Cart/CartProductInfo.vue'
import LoaderInfo from '@/components/Loaders/LoaderInfo.vue'
import numberFormat from '@/helpers/numberFormat'
import getNumEnding from '@/helpers/getNumEnding'

export default {
    name: 'OrderInfoPage',

    data() {
      return {
        loading: false,
      }
    },
    components: { CartProductInfo, LoaderInfo },
    filters: { numberFormat },

    computed: {
        ...mapGetters("order", {
          orderInfo: 'getOrderInfo',
          orderProducts: 'orderProducts'
        }),
        ...mapGetters("cart", ["getUserAccessKey"]),
        orderPositionsCount() {
            return this.orderProducts ? this.orderProducts.length : 0
        },
        infoString() {
            return getNumEnding(this.orderPositionsCount, ['товар', 'товара', 'товаров'])
        },
        orderTotalPrice() {
            return this.orderProducts.reduce((acc, item) => { return acc + item.positionCost}, 0)
        }
    },

    methods: {
      ...mapActions("order", ["loadOrderInfo"]),
      loadOrderDetails() {
        let orderInfo = this.orderInfo
        if (orderInfo && (orderInfo.id === this.$route.params.id)) {
            return;
        }
        this.loading = true
        this.loadOrderInfo({
          orderId: this.$route.params.id,
          userAccessKey: this.getUserAccessKey
        })
          .catch((err) => {
            console.log(err)
            this.$router.replace({name: 'notFound', params: { '0': '/' }})
          })
          .then(() => this.loading = false)
      }
    },

    // watch (слежение) применяется когда есть данные, которые необходимо обновлять при изменении других данных
    watch: {
      '$route.params.id': {
        handler() {
          this.loadOrderDetails()
        },
        immediate: true
      }
    },
}
</script>
<template>
  <main class="content container">
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
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" 
        action="#" 
        method="POST" 
        @submit.prevent='order'
      >
        <div class="cart__field">
          <div class="cart__data">
            <AppFormText 
              v-model="formData.name" 
              title="ФИО" 
              :error="formError.name" 
              placeholder="Иванов Иван Иванович"
            />
            <AppFormText 
              v-model="formData.address"
              title="Адрес доставки" 
              :error="formError.address" 
              placeholder="г. Москва, Ленинский проспект, дом 6, строение 20"
            />
            <AppFormText 
              v-model="formData.phone"
              title="Телефон" type="tel" 
              :error="formError.phone" 
              placeholder="+79876543210"
            />
            <AppFormText 
              v-model="formData.email"
              title="Email" type="email" 
              :error="formError.email" 
              placeholder="user@mail.ru"
            />
            <AppFormTextarea 
              v-model="formData.comment"
              title="Комментарий к заказу" 
              :error="formError.comment" 
              placeholder="Ваши пожелания"
            />
          </div>
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" 
                v-for="delivery in deliveries" 
                :key="delivery.id"
              >
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    :value="delivery.id"
                    v-model.number="formData.deliveryTypeId"
                  />
                  <span class="options__value">
                    {{ delivery.title }} <b>{{ delivery_price(delivery.id) }}</b>
                  </span>
                </label>
              </li>
            </ul>
            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" 
                v-for="payment in currentPayments" 
                :key="payment.id"
              >
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="payment.id"
                    v-model="formData.paymentTypeId"
                  />
                  <span class="options__value"> {{ payment.title }} </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <CartProductInfo 
              v-for="item in cartDetailProducts" 
              :cartItem="item" 
              :key="item.productId"
            />
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ delivery_price(formData.deliveryTypeId) }}</b></p>
            <p>Итого: <b>{{ cartPositionsCount }}</b> {{ infoString }} на сумму <b>{{ cartTotalPrice | numberFormat }} ₽</b></p>
          </div>

          <AppSubmit
            class="cart__button button button--primery"
            title="Оформить заказ"
            :loader="loading"
          />
        </div>
        <div class="cart__error form__error-block" 
          v-if="formErrorMessage"
        >
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import AppFormText from '@/components/App/AppFormText.vue'
import AppSubmit from '@/components/App/AppSubmit.vue'
import AppFormTextarea from '@/components/App/AppFormText.vue'
import CartProductInfo from '@/components/Cart/CartProductInfo.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import getNumEnding from '@/helpers/getNumEnding'
import axios from 'axios'
import { API_BASE } from '@/config'

export default {
    name: 'OrderPage',
    components: { 
      AppFormText, 
      AppFormTextarea, 
      CartProductInfo, 
      AppSubmit 
    },
    filters: { numberFormat },
    data() {
        return {
            formData: {
              deliveryTypeId: null,
              paymentTypeId: null              
            },
            formError: {},
            formErrorMessage: '',
            loading: false,
        }
    },
    computed: {
      ...mapGetters("cart", [
        'cartDetailProducts', 
        'cartTotalPrice', 
        'cartPositionsCount', 
        'getUserAccessKey'
      ]),
      ...mapGetters("order", [
        'getDeliveryData', 
        'getPayments'
      ]),
      infoString() {
        return getNumEnding(this.cartPositionsCount, ['товар', 'товара', 'товаров'])
      },
      deliveries() {
        return this.getDeliveryData || []
      },
      currentPayments() {
        let paymentsData = this.getPayments
        if (!paymentsData) return []
        let currentPaymentsItems = paymentsData.find((payment) => { 
            return payment.deliveryTypeId === this.formData.deliveryTypeId
          })
        return currentPaymentsItems ? currentPaymentsItems.items : []
      },
    },
    methods: {
      ...mapActions("order", [
        "loadDeliveryData", 
        "loadPayments"
      ]),
      ...mapMutations("cart", ["resetCart"]),
      ...mapMutations("order", ["updateOrderInfo"]),
      delivery_price(id) {
        let delivery = this.deliveries.find(del => { return del.id === id }) 
        if (delivery)
          return delivery.price === "0" ? "бесплатно" : delivery.price + " ₽"
      },
      order() {
        this.loading = true
        this.formError = {}
        this.formErrorMessage = ''
        axios.post(API_BASE + 'orders', {
          ...this.formData
        }, {
          params: {
            userAccessKey: this.getUserAccessKey
          }
        })
        .then(response => { 
            this.resetCart()
            this.formData = {}    
            this.formData.deliveryTypeId = 0
            this.formData.paymentTypeId = 0              

            this.updateOrderInfo(response.data)
            this.$router.push({name: 'orderInfo', params: { id: response.data.id }})
        })
        .catch(error => {
            this.formErrorMessage = error.response.data.error.message
            this.formError = error.response.data.error.request || {}})
        .then(() => this.loading = false)  
      },
    },
    watch: {
      currentPayments() {
        if (!this.formData.paymentTypeId && this.currentPayments)
          this.formData.paymentTypeId = this.currentPayments[0].id
      },
      'formData.deliveryTypeId': {
        deep: true,
        handler(value) {
          if (value && this.currentPayments[0]) 
            this.formData.paymentTypeId = this.currentPayments[0].id 
          else   
            this.formData.paymentTypeId = null
        }
      }
    },
    async created() {
      await this.loadDeliveryData()
      await this.loadPayments() 
      this.formData.deliveryTypeId = this.deliveries[0].id
    }
}
</script>
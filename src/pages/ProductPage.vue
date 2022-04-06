<template>
  <main class="content container"
    v-if="productLoading"
  >
    <LoaderInfo title="Загрузка товара." />
  </main>
  <main class="content container"
    v-else-if="!productData"
  >
    <LoaderErrorInfo
      title='Ошибка при загрузке информации...'
      v-on:reload="reload"
    />
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
            :to="{name: 'main'}"
          >
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">{{ product.title }}</a>
        </li>
      </ul>
    </div>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="currentImage"
            alt="product.title"
          >
        </div>
        <ul class="pics__list">
          <li class="pics__item"
            v-for="image in images"
            :key="image"
          >
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                :src="image"
                alt="product.title"
              >
            </a>
          </li>
        </ul>
      </div>
      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }} </span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCart"
          >
            <div class="item__row item__row--center">
              <AppCounter :amount.sync="productAmount"/>
                <b class="item__price">
                  {{ product.price }} ₽
                </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ColorPicker
                  class="colors colors--black"
                  :colors="colors"
                  :currentColor.sync="currentColor"
                />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select"
                    type="text"
                    name="category"
                    v-model="sizeId"
                  >
                    <option
                      :value="size.id"
                      v-for="size in product.sizes"
                      :key="size.id"
                    >{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <AppSubmit
              class="item__button button button--primery"
              title="В корзину"
              :loader="productAddSending"
            />
            <div class="message-info"
              v-if="productAdded && !productAddSendingError"
            >
              Товар добавлен в корзину.
            </div>
            <div class="message-error"
              v-if="!productAdded && productAddSendingError"
            >
              Что-то пошло не так. Попробуйте, повторить.
            </div>
          </form>
        </div>
      </div>
      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>
          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>
          <h3>Уход:</h3>
          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppCounter from '@/components/App/AppCounter.vue'
import ColorPicker from "@/components/App/AppColorPicker.vue";
import LoaderInfo from '@/components/Loaders/LoaderInfo.vue'
import LoaderErrorInfo from '@/components/Loaders/LoaderErrorInfo.vue'
import gotoPage from '@/helpers/gotoPage'
import numberFormat from '@/helpers/numberFormat'
import { mapActions, mapGetters } from 'vuex'
import AppSubmit from "@/components/App/AppSubmit.vue"

export default {
  name: 'ProductPage',
  components: {
    AppSubmit,
    AppCounter,
    ColorPicker,
    LoaderInfo,
    LoaderErrorInfo
  },

  data() {
    return {
      productAmount: 1,
      currentColor: '',
      sizeId: '',
      productAdded: false,
      productAddSending: false,
      productAddSendingError: false,
    }
  },

  filters: {
    numberFormat
  },

  computed: {
    ...mapGetters("product", {
      productData: "getProductData",
      productLoading: "getProductLoading"
    }),
    colors() {
      return this.productData ? this.productData.colors : []
    },
    product() {
      return this.productData
    },
    category() {
      return this.productData.category
    },
    currentColorId() {
      if (this.productData) {
        return this.productData.colors.find(color => { return color.id === this.currentColor})
      }  else { return null; }
    },
    currentImage() {
      let color = this.currentColorId
      if (color) {
        return color.gallery[0].file.url
      } else { return null; }
    },
    images() {
      let images = []
      let color = this.currentColorId
      if (color)
        color.gallery.forEach(item => { images.push(item.file.url) })
      return images
    }
  },

  methods: {
    ...mapActions("cart", ['addProductToCart']),
    ...mapActions("product", ['loadProduct']),
    gotoPage,
    addToCart() {
      this.productAdded = false
      this.productAddSending = true
      this.productAddSendingError = false
      this.addProductToCart({
        productId: this.product.id,
        colorId: this.currentColorId.color.id,
        sizeId: this.sizeId,
        quantity: this.productAmount
      })
        .then(() => {
          this.productAdded = true
          this.productAddSending = false
        })
        .catch((err) => {
          console.log(err)
          this.productAdded = false
          this.productAddSending = false
          this.productAddSendingError = true
        })
    },
    reload() {
      this.loadProduct(this.$route.params.id)
    }
  },

  watch: {
    productData() {
      if (this.productData) {
        this.currentColor = this.productData.colors[0].id
        this.sizeId = this.productData.sizes[0].id
      }
    },
    '$route.params.id': {
      handler() {
        this.reload()
      },
      immediate: true
    },
  },
}
</script>

<style scoped>
.message-error {
  color: red;
  margin-top: 10px;
}
.message-info {
  color: green;
  margin-top: 10px;
}
</style>
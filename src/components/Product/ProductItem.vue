<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="image" 
        :alt="product.title" 
      />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>
    <ColorPicker
      class="colors colors--black"
      :colors="productColors"
      :currentColor.sync="currentColor"
    />
  </li>
</template>

<script>
import ColorPicker from "../App/AppColorPicker.vue"
import gotoPage from "@/helpers/gotoPage"
import numberFormat from "@/helpers/numberFormat"

export default {
  name: 'ProductItem',
  components: { ColorPicker },
  props: ["product"],
  filters: { numberFormat },
  computed: {
    productColors() {
      return this.product.colors;
    },
    image() {
      let colorId = this.product.colors.findIndex((color) => {
        return color.id === this.currentColor;
      });
      return this.product.colors[colorId].gallery
        ? this.product.colors[colorId].gallery[0].file.url
        : "/img/noImage.jpg";
    },
  },
  data() {
    return {
      currentColor: "",
    };
  },
  created() {
    this.currentColor = this.productColors[0].id;
  },
  methods: {
    gotoPage,
  },
}
</script>
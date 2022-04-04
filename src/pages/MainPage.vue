<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProductsString }}
        </span>
      </div>
    </div>
    <div class="content__catalog">
      <ProductFilter 
        :priceFrom="filterPriceFrom" 
        :priceTo="filterPriceTo" 
        :categoryId="filterCategory"
        :seasons="filterSeasons" 
        :materials="filterMaterials" 
        @updateFilter="updateFilter"
      /> 

      <section class="catalog">
        <div v-if="productsLoading">
          Загрузка товаров
        </div>
        <div v-if="productsLoadingFailed">
          <LoaderErrorInfo
            title="Ошибка при загрузке товаров..."
            v-on:reload="reload"
          />
        </div>
        <ProductList :products="products" />
        <AppPagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from "@/components/Product/ProductList.vue";
import AppPagination from "@/components/App/AppPagination.vue";
import ProductFilter from '@/components/Product/ProductFilter.vue'
import LoaderErrorInfo from "@/components/Loaders/LoaderErrorInfo.vue";
import { mapActions, mapGetters } from "vuex";
import getNumEnding from "@/helpers/getNumEnding";

export default {
  name: 'MainPage',
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
    LoaderErrorInfo,
  },
  watch: {
    countProducts() {
      this.page = 1;
    },
    page() {
      this.loadProducts();
    },
  },
  computed: {
    page: {
      get() {
        return this.$store.state.catalog.page;
      },
      set(value) {
        this.$store.commit("catalog/setPage", value);
      },
    },
    filterPriceFrom: {
      get() { return this.$store.getters['catalog/getFilterPriceFrom'] },
      set(value) { this.$store.commit("catalog/setFilterPriceFrom", value);},
    }, 
    filterPriceTo: {
      get() { return this.$store.getters['catalog/getFilterPriceTo'] },
      set(value) { this.$store.commit("catalog/setFilterPriceTo", value);},
    }, 
    filterCategory: {
      get() { return this.$store.getters['catalog/getFilterCategory'] },
      set(value) { this.$store.commit("catalog/setFilterCategory", value);},
    }, 
    filterSeasons: {
      get() { return this.$store.getters['catalog/getFilterSeasons'] },
      set(value) { this.$store.commit("catalog/setFilterSeasons", value);},
    }, 
    filterMaterials: {
      get() { return this.$store.getters['catalog/getFilterMaterials'] },
      set(value) { this.$store.commit("catalog/setFilterMaterials", value);},
    }, 
    ...mapGetters("catalog", {
      productsData: "getProductsData",
      productsLoading: "getProductsLoading",
      productsLoadingFailed: "getProductsLoadingFailed",
      currentPage: "getPage",
      productsPerPage: "getProductsPerPage",
      countProducts: "getCountProducts",
    }),
    countProductsString() {
      return (
        this.countProducts +
        " " +
        getNumEnding(this.countProducts, ["товар", "товара", "товаров"])
      );
    },
    products() {
      return this.productsData ? this.productsData.items : []
    },
  },
  methods: {
    ...mapActions("catalog", ["loadProducts"]),
    reload() {
      this.loadProducts()
    },
    updateFilter(newFilter) {
      this.filterPriceFrom = newFilter.priceFrom
      this.filterPriceTo = newFilter.priceTo
      this.filterCategory = newFilter.categoryId
      this.filterSeasons = newFilter.seasons
      this.filterMaterials = newFilter.materials
      this.loadProducts()
    }
  },
  created() {
    this.loadProducts()
  },
}
</script>
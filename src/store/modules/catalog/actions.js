import { API_BASE } from '@/config.js'
import axios from 'axios'

export default {
  loadProducts(context) {
    context.commit('setProductsLoading', true)
    context.commit('setProductsLoadingFailed', false)

    axios
      .get(API_BASE + "products", {
        params: {
          page: context.state.page,
          limit: context.state.productsPerPage,
          categoryId: context.state.filterCategory,
          minPrice: context.state.filterPriceFrom,
          maxPrice: context.state.filterPriceTo,
          colorIds: [],
          materialIds: context.state.filterMaterials,
          seasonIds: context.state.filterSeasons,
        },
      })
      .then((response) => context.commit('setProductsData', response.data))
      .catch((err) => {
        console.log(err)
        context.commit('setProductsLoadingFailed', true)
      })
      .then(() => context.commit('setProductsLoading', false))
  },
  loadSeasons(context) {
    context.commit('setProductsLoading', true)
    context.commit('setProductsLoadingFailed', false)
    axios
      .get(API_BASE + "seasons", {
    })
    .then((response) => context.commit('setSeasons', response.data))
    .catch((err) => {
      console.log(err)
      context.commit('setProductsLoadingFailed', true)
    })
    .then(() => context.commit('setProductsLoading', false))
  },
  loadProductCategories(context) {
    context.commit('setProductsLoading', true)
    context.commit('setProductsLoadingFailed', false)
    axios
      .get(API_BASE + "productCategories", {
    })
    .then((response) => context.commit('setProductCategories', response.data))
    .catch((err) => {
      console.log(err)
      context.commit('setProductsLoadingFailed', true)
    })
    .then(() => context.commit('setProductsLoading', false))
  },
  loadMaterials(context) {
    context.commit('setProductsLoading', true)
    context.commit('setProductsLoadingFailed', false)
    axios
      .get(API_BASE + "materials", {
    })
    .then((response) => context.commit('setMaterials', response.data))
    .catch((err) => {
      console.log(err)
      context.commit('setProductsLoadingFailed', true)
    })
    .then(() => context.commit('setProductsLoading', false))
  },
}
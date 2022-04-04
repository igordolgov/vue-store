export default {
  getProductsLoading(state) {
    return state.productsLoading;
  },
  getProductsLoadingFailed(state) {
    return state.productsLoadingFailed;
  },
  getFilterPriceFrom(state) {
    return state.filterPriceFrom;
  },
  getFilterPriceTo(state) {
    return state.filterPriceTo;
  },
  getFilterCategory(state) {
    return state.filterCategory;
  },
  getFilterSeasons(state) {
    return state.filterSeasons;
  },
  getFilterMaterials(state) {
    return state.filterMaterials;
  },
  getPage(state) {
    return state.page;
  },
  getProductsPerPage(state) {
    return state.productsPerPage;
  },
  getProductsData(state) {
    return state.productsData;
  },
  getCountProducts(state) {
    return state.productsData ? state.productsData.pagination.total : 0
  },
  getSeasons(state) {
    return state.seasons ? state.seasons.items : [];
  },
  getProductCategories(state) {
    return state.productCategories ? state.productCategories.items : []
  },
  getMaterials(state) {
    return state.materials ? state.materials.items : []
  }
}
export default {
  setProductsLoading(state, value) {
    state.productsLoading = value;
  },
  setProductsLoadingFailed(state, value) {
    state.productsLoadingFailed = value;
  },
  setFilterPriceFrom(state, value) {
    state.filterPriceFrom = value;
  },
  setFilterPriceTo(state, value) {
    state.filterPriceTo = value;
  },
  setFilterCategory(state, value) {
    state.filterCategory = value;
  },
  setFilterSeasons(state, value) {
    state.filterSeasons = value;
  },
  setFilterMaterials(state, value) {
    state.filterMaterials = value;
  },
  setPage(state, value) {
    state.page = value;
  },
  setProductsData(state, value) {
    state.productsData = value;
  },
  setSeasons(state, value) {
    state.seasons = value;
  },
  setProductCategories(state, value) {
    state.productCategories = value
  },
  setMaterials(state, value) {
    state.materials = value
  },
}
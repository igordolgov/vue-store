import Vue from "vue"
import Vuex from "vuex"
import catalog from "./modules/catalog/index"
import cart from "./modules/cart/index"
import product from "./modules/product/index"
import order from "./modules/order/index"

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        catalog,
        cart,
        order,
        product
    },
})

export default store
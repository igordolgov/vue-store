// Централизованное Хранилище данных

import Vue from "vue"
import Vuex from "vuex"
// Импортируем модули (Хранилище разбитое на части для удобства)
import catalog from "./modules/catalog/index"
import cart from "./modules/cart/index"
import product from "./modules/product/index"
import order from "./modules/order/index"

Vue.use(Vuex)
// Создаём Хранилище для приложения и присваиваем его переменной store
const store = new Vuex.Store({
    // указываем, из каких модулей оно состоит
    modules: {
        cart,
        catalog,
        order,
        product
    },
})

// Экспортируем Хранилище под именем store (для использования его в других компонентах)
export default store
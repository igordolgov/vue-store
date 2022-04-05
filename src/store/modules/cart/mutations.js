// В МУТАЦИЯХ хранятся методы для изменения состояния.

export default {
    // Очистить "Корзину товаров"
    resetCart(state) {
        state.cartProducts = []
        state.cartProductsData = []
    },
    // Обновить количество товаров в Корзине
    updateCartProductAmount(state, {basketItemId, amount}) {
        let item = state.cartProducts.find(item => item.basketItemId === basketItemId)
        if (item) {
            item.amount = amount
        }
    },
    // Удалить товар из Корзины
    deleteCartProduct(state, basketItemId) {
        state.cartProducts = state.cartProducts.filter(item => item.basketItemId !== basketItemId)
    },
    // Обновить пользовательский ключ доступа
    updateUserAccessKey(state, accessKey) {
        state.userAccessKey = accessKey
    },
    // Обновить данные в Корзине
    updateCartProductsData(state, items) {
        state.cartProductsData = items
    },
    // Синхронизировать продукты в Корзине
    syncCartProducts(state) {
        state.cartProducts = state.cartProductsData.map( item => {
            return {
                productId: item.product.id,
                amount: item.quantity,
                basketItemId: item.id
            }
        })
    },
    // Обновить статус загрузки
    updateLoadingStatus(state, {loading, error}) {
        state.cartLoading = loading
        state.cartLoadingError = error
    },
}
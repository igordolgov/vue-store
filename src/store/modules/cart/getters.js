export default {
    // Проверить состояние загрузки Корзины
    getCartLoading(state) {
        return state.cartLoading
    },
    // Проверить наличие ошибки при загрузке Корзины
    getCartLoadingError(state) {
        return state.cartLoadingError
    },
    // Получить товары в Корзине
    getCartProducts(state) {
        return state.cartProducts
    },
    // Детали товаров в Корзине
    cartDetailProducts(state) {
        return state.cartProducts.map(item => {
            const product =  state.cartProductsData.find(p => p.id === item.basketItemId)
            return {
                ...item,
                product: {
                    ...product,
               },
                positionCost: product.product.price * item.amount,
            }
        })
    },
    // Общая стоимость товаров в Корзине
    cartTotalPrice(state, getters) {
        return getters.cartDetailProducts.reduce((acc, item) => acc+= item.amount * item.product.price, 0)
    },
    // Количество товаров в Корзине
    cartPositionsCount(state) {
        return state.cartProducts.length
    },
    // Получить клиентский Ключ доступа
    getUserAccessKey(state) {
        return state.userAccessKey || localStorage.getItem('userAccessKey')
    },
}
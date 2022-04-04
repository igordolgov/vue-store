export default {
    resetCart(state) {
        state.cartProducts = []
        state.cartProductsData = []
    },
    updateCartProductAmount(state, {basketItemId, amount}) {
        let item = state.cartProducts.find(item => item.basketItemId === basketItemId)
        if (item) {
            item.amount = amount
        }   
    },
    deleteCartProduct(state, basketItemId) {
        state.cartProducts = state.cartProducts.filter(item => item.basketItemId !== basketItemId)
    },
    updateUserAccessKey(state, accessKey) {
        state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items) {
        state.cartProductsData = items
    },
    syncCartProducts(state) {
        state.cartProducts = state.cartProductsData.map( item => {
            return {
                productId: item.product.id,
                amount: item.quantity,
                basketItemId: item.id
            }
        })
    },
    updateLoadingStatus(state, {loading, error}) {
        state.cartLoading = loading
        state.cartLoadingError = error
    },
}
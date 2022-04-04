export default {
    getCartLoading(state) {
        return state.cartLoading
    },
    getCartLoadingError(state) {
        return state.cartLoadingError
    },
    getCartProducts(state) {
        return state.cartProducts
    },
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
    cartTotalPrice(state, getters) {
        return getters.cartDetailProducts.reduce((acc, item) => acc+= item.amount * item.product.price, 0)
    },
    cartPositionsCount(state) {
        return state.cartProducts.length
    },
    getUserAccessKey(state) {
        return state.userAccessKey || localStorage.getItem('userAccessKey')
    },
}
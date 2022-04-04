export default {
    getDeliveryData(state) {
        return state.deliveryData
    },
    getOrderInfo(state) {
        return state.orderInfo
    },
    getPayments(state) {
        return state.payments
    },
    orderProducts(state) {
        if (state.orderInfo) {
            return state.orderInfo.basket.items.map(item => {
                return {
                    product: item,
                    positionCost: item.price * item.quantity,
                    productId: item.product.id
                }
            })
        } 
        return []     
    },
}
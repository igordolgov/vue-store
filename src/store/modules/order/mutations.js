export default {
    updateOrderInfo(state, orderInfo) {
        state.orderInfo = orderInfo
    },
    setDeliveryData(state, value) {
        state.deliveryData = value
    },
    setPayments(state, value) {
        state.payments = value
    },
}
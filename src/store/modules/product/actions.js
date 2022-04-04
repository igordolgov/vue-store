import axios from 'axios'
import { API_BASE } from '@/config'

export default {
    loadProduct(context, productId) {
        context.commit('setProductLoading',  true)
        context.commit('setProductLoadingFailed',  false)

        axios.get(API_BASE + 'products/' + productId)
            .then(response => context.commit('setProductData', response.data))
            .catch((err) => {
                console.log(err) 
                context.commit('setProductLoadingFailed',  true)
                if (err.request.status === "404") {
                   this.$router.replace({name: 'notFound', params: { '0': '/' }}) 
                }
            })
            .finally(() => context.commit('setProductLoading', false))
    },
}
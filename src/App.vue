<template>
  <div class="app">
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppFooter from '@/components/App/AppFooter.vue'
import AppHeader from '@/components/App/AppHeader.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: { AppHeader, AppFooter },
  created() {
    let userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }
    this.loadCart()
  },
  methods: {
    ...mapActions("cart", ['loadCart']),
    ...mapMutations("cart", ['updateUserAccessKey'])
  }
}
</script>
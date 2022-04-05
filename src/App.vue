<template>
  <div class="app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/App/AppFooter.vue'
import AppHeader from '@/components/App/AppHeader.vue'
// Vuex - это инструмент управления состоянием для Vue.
// Мутации (название сеттеров* во Vuex) - единственный способ изменения состояния хранилища во Vuex (https://v3.vuex.vuejs.org/ru/guide/mutations.html). Вызвать мутацию можно с помощью commit
// *Геттеры возвращают данные из хранилища компонентам.
// *Сеттеры записывают данные в хранилище.
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: { AppHeader, AppFooter },

  created() {
    // Получаем значение ключа пользователя: создаём переменную и записываем в неё данные из localStorage,
    let userAccessKey = localStorage.getItem('userAccessKey')
    // и, если это значение ключа есть,
    if (userAccessKey) {
      // запишем это значение в Хранилище (см. файл mutations.js)
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
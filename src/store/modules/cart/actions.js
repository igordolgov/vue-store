// ACTIONS - методы, которые вызывают какие-либо изменения в хранилище.

import axios from 'axios'
import { API_BASE } from '@/config'

export default {
    // Загрузка Корзины
    loadCart(context) {
        // Изменить статус загрузки на "Загружается", "Ошибок нет"
        context.commit('updateLoadingStatus', {loading: true, error: false})
        // Получить данные Корзины из API
        axios.get(API_BASE + 'baskets', {
            // Получить клиентский Ключ пользователя
            params: { userAccessKey: context.state.userAccessKey }
        })
        // При положительном ответе от сервера
        .then(response => {
            if (!context.state.userAccessKey) {
                // Сохранить клиентский Ключ пользователя в память компьютера
                localStorage.setItem('userAccessKey', response.data.user.accessKey)
                // Сохранить клиентский Ключ пользователя в переменную
                context.commit('updateUserAccessKey', response.data.user.accessKey)
            }
            // Обновить данные в Корзине товаров
            context.commit('updateCartProductsData', response.data.items)
                context.commit('syncCartProducts')
                // Изменить статус загрузки на "Не загружается", "Ошибок нет"
                context.commit('updateLoadingStatus', {loading: false, error: false})
        })
        // Если от сервера пришла ошибка
        .catch((err) => {
            // Вывести ошибку в консоль
            console.log(err)
            // Изменить статус загрузки на "Не загружается", "Ошибка"
            context.commit('updateLoadingStatus', {loading: false, error: true})
        })
    },

    // Добавить продукт в Корзину
    addProductToCart(context, { productId, colorId, sizeId, quantity }) {
        // Получить данные о продуктах в Корзине из API
        return axios.post(API_BASE + 'baskets/products',
        { productId, colorId, sizeId, quantity },
        { params: { userAccessKey: context.state.userAccessKey } }
        )
        // При положительном ответе от сервера
        .then((response) => {
            // Обновить данные о продуктах в Корзине в API
            context.commit('updateCartProductsData', response.data.items)
            // Синхронизировать данные о продуктах в Корзине
            context.commit('syncCartProducts')
        })
    },

    // Загрузить информацию о заказе
    loadOrderInfo(context, orderId) {
        // Promise - это объект, представляющий результат успешного или неудачного завершения асинхронной операции
        return new Promise((resolve, reject) => {
            // Получить данные о заказе из API (по id заказа)
            axios.get(API_BASE + 'orders/'+orderId,  {
                // используя клиентский ключ доступа
                params: { userAccessKey: context.state.userAccessKey }
            })
            // Ответ от сервера использовать для обновления информации о заказе
            .then(response => { context.commit('updateOrderInfo', response.data)
                // Перевести Promise в состояние "выполнено"
                resolve()
            })
            // Если от сервера пришла ошибка
            .catch((err) => {
                // Вывести ошибку в консоль
                console.log(err)
                // Перевести Promise в состояние "ошибка"
                reject()
            })
        })
    },

    // Обновить количество товаров в Корзине
    updateCartProductAmount(context, { basketItemId, amount }) {
        if (amount < 1) return;
        context.commit('updateCartProductAmount', { basketItemId, amount })
        return new Promise((resolve, reject) => {
            // Отправить данные о продуктах в Корзине в API
            axios.put(API_BASE + 'baskets/products',
            { basketItemId: basketItemId, quantity: amount },
            {
                params: { userAccessKey: context.state.userAccessKey }
            })
            // При положительном ответе от сервера
            .then((response) => {
                context.commit('updateCartProductsData', response.data.items)
                // Перевести Promise в состояние "выполнено"
                resolve()
            })
            // Если от сервера пришла ошибка
            .catch((err) => {
                // Вывести ошибку в консоль
                console.log(err)
                context.commit('syncCartProducts')
                // Перевести Promise в состояние "ошибка"
                reject()
            })
        })
    },

    // Удалить товар из Корзины
    removeCartProduct(context, basketItemId) {
        // Передать id товара, который нужно удалить
        context.commit('deleteCartProduct', basketItemId)
        return new Promise((resolve, reject) => {
            // Отправить в API запрос на удаление товаров из Корзины
            axios.delete(API_BASE + 'baskets/products', {
                params: {
                    userAccessKey: context.state.userAccessKey
                },
                data: {
                    basketItemId: basketItemId
                }
            })
            // При положительном ответе от сервера
            .then((response) => {
                context.commit('updateCartProductsData', response.data.items)
                resolve()
            })
            // Если от сервера пришла ошибка
            .catch((err) => {
                // Вывести ошибку в консоль
                console.log(err)
                context.commit('syncCartProducts')
                // Перевести Promise в состояние "ошибка"
                reject()
            })
        })
    },
}
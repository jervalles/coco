import * as firebase from 'firebase'

const state = {

    // create order
	createOrderPending: false,
	createOrderSuccess: false,
	createOrderError: false,
}

const mutations= {

    // create order
    POST_ORDER_SUCCESS(state) {
        state.createOrderSuccess = true
        state.createOrderPending = false
        state.createOrderError = false
    },
    POST_ORDER_PENDING(state) {
        state.createOrderSuccess = false
        state.createOrderPending = true
        state.createOrderError = false
    },
    POST_ORDER_ERROR(state) {
        state.createOrderSuccess = false
        state.createOrderPending = false
        state.createOrderError = true
    },

}

const actions = {

	createOrder({ commit }, payload) {
        const user = "test"

        commit('POST_ORDER_PENDING')
        firebase.database().ref('orders').push({
            user,
            items: payload
        })
        .then(() => {
            commit('POST_ORDER_SUCCESS')
        })
        .catch((err) => {
            commit('POST_ORDER_ERROR')
            console.log(err)
        })
    }
}

const getters = {
    // To use if wanna add errors/success messages in view
}

const orderModule = {
    state,
    mutations,
    actions,
    getters
}

export default orderModule
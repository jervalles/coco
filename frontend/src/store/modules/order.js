
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

	// createOrder({ commit }, payload) {
    //     let user = ''
    //     if (payload.user == null) {
    //         user = "nouser"
    //     } else {
    //         user = payload.user
    //     }
    //     commit('POST_ORDER_PENDING')
        
    //     return new Promise((resolve) => {
    //         firebase.database().ref('orders').push({
    //             user,
    //             items: payload.order
    //         })
    //             .then(() => {
    //                 commit('POST_ORDER_SUCCESS')
    //                 resolve()
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //                 commit('POST_ORDER_ERROR')
    //             })
    //     })
    // }
}

const getters = {

    createOrderError: state => {
		return {
            pending: state.createOrderPending,
            success: state.createOrderSuccess,
            error: state.createOrderError
        }
    },
}

const orderModule = {
    state,
    mutations,
    actions,
    getters
}

export default orderModule
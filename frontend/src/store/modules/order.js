import { fetchOrders } from '@/services/OrderService'

const state = {
    orders: null,

    // GET ORDERS STATUS
    ordersFetchSuccess: false,
    ordersFetchError: false,
    ordersFetching: false,

    // create order
	createOrderPending: false,
	createOrderSuccess: false,
	createOrderError: false,
}

const mutations= {

    // fetch orders
    FETCH_ORDERS_SUCCESS(state, payload) {
        state.orders = payload
        state.ordersFetchSuccess = true
        state.ordersFetchError = false
        state.ordersFetching = false
    },
    FETCH_ORDERS_ERROR(state) {
        state.ordersFetchSuccess = false
        state.ordersFetchError = true
        state.ordersFetching = false
    },
    FETCH_ORDERS_PENDING(state) {
        state.ordersFetching = true
        state.ordersFetchSuccess = false
        state.ordersFetchError = true
    },

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

    fetchOrders({ commit }) {
        commit('FETCH_ORDERS_PENDING')
        fetchOrders()
        .then(res => {
            // const items = []
            const obj = res.data
            console.log("obj")
            console.log(obj)
            commit('FETCH_ORDERS_SUCCESS', obj)
        }).catch(err => {
            console.log(err)
            commit('FETCH_ORDERS_ERROR')
        })
    }

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
    orders(state) {
		return state.orders
    },
    ordersFetching: state => {
        return {
          pending: state.ordersFetching,
          success: state.ordersFetchSuccess,
          error: state.ordersFetchError
        }
    },
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
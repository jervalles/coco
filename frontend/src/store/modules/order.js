import { fetchOrders } from '@/services/OrderService'
import { postOrder } from '@/services/OrderService'

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
            const items = res.data
            commit('FETCH_ORDERS_SUCCESS', items)
        }).catch(err => {
            console.log(err)
            commit('FETCH_ORDERS_ERROR')
        })
    },

	createOrder({ commit }, payload) {
        let user = ''
        if (payload.user == null) {
            user = "noUser"
        } else {
            user = payload.user
        }
        console.log("payload.order")
        console.log(payload.order)
        commit('POST_ORDER_PENDING')
            const order = {
                user,
                items: payload.order
            }
            console.log("order")
            console.log(order)
            postOrder(order)
                .then(() => {

                    commit('POST_ORDER_SUCCESS')
                })
                .catch((err) => {
                    console.log(err)
                    commit('POST_ORDER_ERROR')
                })
    }
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
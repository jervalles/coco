/* eslint-disable */
import {
  fetchOrders,
  postOrder,
  toArchiveOrder
} from '../../services/OrderService'

const state = {
  orders: null,

  // GET ORDERS STATUS
  ordersFetchSuccess: false,
  ordersFetchError: false,
  ordersFetching: false,

  // GET ORDERS STATUS
  categoriesFetchSuccess: false,
  categoriesFetchError: false,
  categoriesFetching: false,

  // CREATE ORDERS STATUS
  createOrderPending: false,
  createOrderSuccess: false,
  createOrderError: false,

  // DELETE ORDERS STATUS
  archiveOrderPending: false,
  archiveOrderSuccess: false,
  archiveOrderError: false
}

const mutations = {
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

  // delete order
  ARCHIVE_ORDER_SUCCESS(state) {
    state.archiveOrderSuccess = true
    state.archiveOrderPending = false
    state.archiveOrderError = false
  },
  ARCHIVE_ORDER_PENDING(state) {
    state.archiveOrderSuccess = false
    state.archiveOrderPending = true
    state.archiveOrderError = false
  },
  ARCHIVE_ORDER_ERROR(state) {
    state.archiveOrderSuccess = false
    state.archiveOrderPending = false
    state.archiveOrderError = true
  }
}

const actions = {
  fetchOrders({ commit }) {
    commit('FETCH_ORDERS_PENDING')
    fetchOrders()
      .then(res => {
        const items = res.data
        commit('FETCH_ORDERS_SUCCESS', items)
      })
      .catch(err => {
        console.log(err)
        commit('FETCH_ORDERS_ERROR')
      })
  },

  createOrder({ commit }, payload) {
    let user = ''
    if (payload.user == null) {
      user = 'noUser'
    } else {
      user = payload.user
    }
    commit('POST_ORDER_PENDING')
    const order = {
      user,
      items: payload.order
    }
    postOrder(order)
      .then(() => {
        commit('POST_ORDER_SUCCESS')
      })
      .catch(err => {
        console.log(err)
        commit('POST_ORDER_ERROR')
      })
  },

  archiveOrder({ commit }, payload) {
    commit('ARCHIVE_ORDER_PENDING')
    setTimeout(() => toArchiveOrder(payload).then(() => {
      commit('ARCHIVE_ORDER_SUCCESS')
    })
    .catch(err => {
      console.log(err)
      commit('ARCHIVE_ORDER_ERROR')
    }), 2000)
    
      
  }
}

const getters = {
  orders(state) {
    return state.orders
  },
  ordersFetching(state) {
    return {
      pending: state.ordersFetching,
      success: state.ordersFetchSuccess,
      error: state.ordersFetchError
    }
  },
  createOrderStatus(state) {
    return {
      pending: state.createOrderPending,
      success: state.createOrderSuccess,
      error: state.createOrderError
    }
  },
  archiveOrderStatus(state) {
    return {
      pending: state.archiveOrderPending,
      success: state.archiveOrderSuccess,
      error: state.archiveOrderError
    }
  }
}

const orderModule = {
  state,
  mutations,
  actions,
  getters
}

export default orderModule

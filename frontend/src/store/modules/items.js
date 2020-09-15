import { fetchItems } from '@/services/ItemService'

// TO REMOVE IN PRODUCTION - SIMULATING A NO LOCAL DB SERVER
function timeout(ms) {
    return value => new Promise(resolve => setTimeout(() => resolve(value), ms))
}

const state = {
    items: null,

    // GET ITEMS STATUS
    itemsFetchSuccess: false,
    itemsFetchError: false,
    itemsFetching: false
}

const mutations= {
    FETCH_ITEMS_SUCCESS(state, payload) {
        state.items = payload
        state.itemsFetchSuccess = true
        state.itemsFetchError = false
        state.itemsFetching = false
    },
    FETCH_ITEMS_ERROR(state) {
        state.itemsFetchSuccess = false
        state.itemsFetchError = true
        state.itemsFetching = false
    },
    FETCH_ITEMS_PENDING(state) {
        state.items = []
        state.itemsFetching = true
        state.itemsFetchSuccess = false
        state.itemsFetchError = true
    }
}



const actions = {

    fetchItems({ commit }) {
        return new Promise((resolve) => {
            commit('FETCH_ITEMS_PENDING')
            fetchItems()
                .then(timeout(2000)).then(res => {
                    const items = res.data
                    for (let key in items) {
                        items[key]['added'] = 0
                    }
                    commit('FETCH_ITEMS_SUCCESS', items)
                    resolve(res)

                }).catch(err => {
                    console.log(err)
                    commit('FETCH_ITEMS_ERROR')
                    resolve(null)
                })
        })
    }
}

const getters = {
	items(state) {
		return state.items
    },
    itemsFetching: state => {
        return {
          pending: state.itemsFetching,
          success: state.itemsFetchSuccess,
          error: state.itemsFetchError
        }
    },
}

const itemsModule = {
  state,
  mutations,
  actions,
  getters
}

export default itemsModule
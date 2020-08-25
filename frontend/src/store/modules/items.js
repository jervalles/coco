import * as firebase from 'firebase'

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
        state.itemsFetching = true
        state.itemsFetchSuccess = false
        state.itemsFetchError = true
    }
}

const actions = {
    fetchItems({ commit }) {
        commit('FETCH_ITEMS_PENDING')
        firebase.database().ref('items').once('value')
        .then(res => {
            const items = []
            const obj = res.val()
            for (let key in obj) {
                items.push({
                    id: key,
                    name: obj[key].name,
                    category: obj[key].category,
                    description: obj[key].description,
                    image: obj[key].image,
                    price: obj[key].price,
                    added: 0
                })
            }
            
            commit('FETCH_ITEMS_SUCCESS', items)
        }).catch(err => {
            console.log(err)
            commit('FETCH_ITEMS_ERROR')
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
import * as firebase from 'firebase'
import "firebase/auth"

const state = {
    
    items: null,

}

const mutations= {
    FETCH_ITEMS_SUCCESS(state, payload) {
        state.items = payload
    }
}

const actions = {
    fetchItems({ commit }) {
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
                    added: obj[key].added
                })
            }
            console.log(items)
            
            commit('FETCH_ITEMS_SUCCESS', items)
        }).catch(err => {
            console.log(err)
        })
    }
}

const getters = {

	items(state) {
		return state.items
	},
}

const itemsModule = {
  state,
  mutations,
  actions,
  getters
}

export default itemsModule
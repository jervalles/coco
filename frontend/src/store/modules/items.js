import * as firebase from 'firebase'
import "firebase/auth"

const state = {

    items: null,


}

const mutations= {
    TEST(state, payload) {
        state.items = payload
        console.log(state.items)
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
                    age: obj[key].age
                })
                console.log(key)
            }
            console.log(items)
            
            commit('TEST'), res.data()
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
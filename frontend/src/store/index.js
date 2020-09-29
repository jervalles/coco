import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import items from './modules/items'
import order from './modules/order'
import itemCategories from './modules/item-categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    items,
    order,
    itemCategories
  },
  plugins: [createPersistedState()]
})

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import items from './modules/items'
import order from './modules/order'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        items,
        order
    },
    plugins: [createPersistedState()],
})
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import items from './modules/items'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        items
    },
    plugins: [createPersistedState()],
})
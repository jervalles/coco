import { fetchCategories } from '@/services/ItemCategoriesService'

const state = {
    categories: null,

    // GET ITEM CATEGORIES STATUS
    categoriesFetchSuccess: false,
    categoriesFetchError: false,
    categoriesFetching: false
}

const mutations= {

  // fetch categories
  FETCH_CATEGORIES_SUCCESS(state, payload) {
    state.categories = payload
    state.categoriesFetchSuccess = true
    state.categoriesFetchError = false
    state.categoriesFetching = false
  },
  FETCH_CATEGORIES_ERROR(state) {
      state.categoriesFetchSuccess = false
      state.categoriesFetchError = true
      state.categoriesFetching = false
  },
  FETCH_CATEGORIES_PENDING(state) {
      state.categoriesFetching = true
      state.categoriesFetchSuccess = false
      state.categoriesFetchError = true
  },
}

const actions = {

  fetchItemCategories({ commit }) {
    commit('FETCH_CATEGORIES_PENDING')
    fetchCategories()
      .then(res => {
          const categories = res.data
          commit('FETCH_CATEGORIES_SUCCESS', categories)
      }).catch((err) => {
          console.log(err)
          commit('FETCH_CATEGORIES_ERROR')
      })
  }

}

const getters = {
    categories(state) {
      return state.categories
    },
    categoriesFetching: state => {
      return {
        pending: state.categoriesFetching,
        success: state.categoriesFetchSuccess,
        error: state.categoriesFetchError
      }
    },

}

const itemCategoriesModule = {
    state,
    mutations,
    actions,
    getters
}

export default itemCategoriesModule
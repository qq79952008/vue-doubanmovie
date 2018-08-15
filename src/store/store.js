import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    isHome: true,
    showSearchResult: false
  },
  mutations: {
    setisHome: function (state, isHome) {
      state.isHome = isHome
    },
    setshowSearchResult: function (state, showSearchResult) {
      state.showSearchResult = showSearchResult
    }
  }
})

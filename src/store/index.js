import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    active_index: {
      parent:'' ,
      child: ''
    }
  },
  mutations: {
    parent_index(state,payload) {
      state.active_index.parent = payload;
    } ,
    child_index(state,payload) {
      state.active_index.child = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mutations = {
  INCREMENT_COUNT: 'increment count',
}

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT)
    },
    async fetchOffer(store, id) {
      const offerRequest = await axios.get(`/api/offers/${id}`)
      return offerRequest.data
    },
    async fetchOffers() {
      const offersRequest = await axios.get('/api/offers')
      return offersRequest.data
    },
    async fetchUser(store, id) {
      const userRequest = await axios.get(`/api/users/${id}`)
      return userRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users')
      return usersRequest.data
    },
    async fetchComment(store, id) {
      const commentRequest = await axios.get(`/api/comments/${id}`)
      return commentRequest.data
    },
  },
  modules: {},
})

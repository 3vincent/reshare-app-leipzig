import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async fetchOffer(store, id) {
      const offerRequest = await axios.get(`/api/offers/${id}`)
      return offerRequest.data
    },
    async fetchOffers() {
      const offersRequest = await axios.get('/api/offers')
      return offersRequest.data
    },
  },
  modules: {},
})

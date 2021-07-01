import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(Vuex)

const socket = io()

// socket.on('hello world!', () => {
//   console.log('we received message from the websocket server!')
// })

// setInterval(() => {
//   socket.emit('new message!', res => {
//     console.log('this is a response', res)
//   })
// }, 3000)

const mutations = {
  INCREMENT_COUNT: 'increment count',
  SET_USER: 'set user',
}

const store = new Vuex.Store({
  state: {
    count: 0,
    user: null,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_USER](state, user) {
      state.user = user
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
    async likeOffer(store, id) {
      try {
        await axios.post(`/api/offers/${id}/like`)
        // const user = await axios.post(`/api/offers/${id}/like`)
        // commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
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
    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session')
      commit(mutations.SET_USER, user.data || null)
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post('/api/account/session', credentials)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },
    async register(store, user) {
      return axios.post('/api/account', user)
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_USER, null)
    },
  },
  modules: {},
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}

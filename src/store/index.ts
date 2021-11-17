import { createStore } from 'vuex'
import { ISessionData } from '@/services/models/ISessionData'

export type State = {
  sessions: ISessionData[];
  isModalOpened: boolean,
  currentSession: string | undefined,
}

const state: State = { sessions: [], isModalOpened: false, currentSession: '' }

export default createStore({
  state,
  mutations: {
    toggleIsModalOpened (state, sessionId) {
      state.isModalOpened = !state.isModalOpened
      state.currentSession = sessionId
    },

    addSessionStub (state, payload) {
      state.sessions.push(payload)
    },

    deleteProductItem (state, payload) {
      for (let i = 0; i < state.sessions.length; i++) {
        if (state.sessions[i].sessionId !== payload.sid) {
          continue
        }
        for (let j = 0; j < state.sessions[i].products.length; j++) {
          if (state.sessions[i].products[j].productName === payload.productName) {
            state.sessions[i].products.splice(j, 1)
          }
        }
      }
    },

    increaseProductItem (state, payload) {
      for (let i = 0; i < state.sessions.length; i++) {
        if (state.sessions[i].sessionId !== payload.sid) {
          continue
        }
        for (let j = 0; j < state.sessions[i].products.length; j++) {
          if (state.sessions[i].products[j].productName === payload.productName &&
            state.sessions[i].products[j].productCount < 100) {
            state.sessions[i].products[j].productCount++
          }
        }
      }
    },

    decreaseProductItem (state, payload) {
      for (let i = 0; i < state.sessions.length; i++) {
        if (state.sessions[i].sessionId !== payload.sid) {
          continue
        }
        for (let j = 0; j < state.sessions[i].products.length; j++) {
          if (state.sessions[i].products[j].productName === payload.productName &&
            state.sessions[i].products[j].productCount !== 1) {
            state.sessions[i].products[j].productCount--
          }
        }
      }
    },

    addProduct (state, productName) {
      for (let i = 0; i < state.sessions.length; i++) {
        if (state.sessions[i].sessionId !== state.currentSession) {
          continue
        }
        for (let j = 0; j < state.sessions[i].products.length; j++) {
          if (state.sessions[i].products[j].productName === productName) {
            state.sessions[i].products[j].productCount++
            return
          }
        }
        state.sessions[i].products.push({ productName, productCount: 1 })
      }
    },

    submitShoppingCart (state, sessionId) {
      for (let i = 0; i < state.sessions.length; i++) {
        if (state.sessions[i].sessionId === sessionId) {
          state.sessions[i].isSubmitted = true
        }
      }
    }
  },
  actions: {
    toggleIsModalOpened ({ commit }) {
      commit('toggleIsModalOpened')
    },

    addSessionStub ({ commit }) {
      commit('addSessionStub')
    },

    deleteProductItem ({ commit }) {
      commit('deleteProductItem')
    },

    increaseProductItem ({ commit }) {
      commit('increaseProductItem')
    },

    decreaseProductItem ({ commit }) {
      commit('decreaseProductItem')
    },

    addProduct ({ commit }) {
      commit('addProduct')
    },

    submitShoppingCart ({ commit }) {
      commit('submitShoppingCart')
    }
  },
  getters: {
    sessions (state) {
      return state.sessions
    }
  }
})

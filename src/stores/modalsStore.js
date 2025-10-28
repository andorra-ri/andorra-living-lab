import { defineStore } from 'pinia'

export const useModalStore = defineStore('store', {
  state: () => ({
    openModals: {
      test: {
        payload: {
          name: 'Carles Serra',
          age: 56
        }
      }
    }
  }),

  getters: {
    isOpen: (state) => (modalName) => {
      return state.openModals[modalName] ? true : false
    },
    getPayload: (state) => (modalName) => {
      return state.openModals[modalName] && state.openModals[modalName].payload 
    }
  },

  actions: {
    open(modalName, payload = undefined) {
      this.openModals[modalName]
        ? this.openModals[modalName].payload = payload
        : this.openModals[modalName] = {payload}
    },
    close(modalName) {
      delete this.openModals[modalName]
    },
    closeAll() {
      this.openModals = {}
    }
  }
})
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      console.log(this.count)
      this.count++
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})

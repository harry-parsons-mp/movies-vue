import { defineStore } from 'pinia'
import router from '@/router'
import type { User } from '@/models/User'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: undefined as User | undefined,
    isAuthed: false as boolean
  }),
  actions: {
    login(user) {
      this.isAuthed = true
      this.user = user
    },
    logout() {
      this.isAuthed = false
      this.user = {}
      router.push('/')
    }
  }
})

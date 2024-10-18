import { defineStore } from 'pinia'
import type { User } from '@/models/User'
import { useRouter } from 'vue-router'

const router = useRouter()

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

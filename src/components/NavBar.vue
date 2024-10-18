<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import router from '@/router'

const authStore = useAuthStore()

const logout = async () => {
  authStore.logout()
  await router.push('/')
  toast.success('Logout successful')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <div class="navbar-brand text-secondary">Vue Movies</div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'MovieList' }">Movie List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'AddMovie' }">Add Movie</router-link>
          </li>
        </ul>
        <span class="navbar-text" v-if="authStore.isAuthed">
          <span class="navbar-text m-3">@{{ authStore.user.username }}</span>
          <button class="btn btn-light" @click="logout()">Logout</button>
        </span>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>

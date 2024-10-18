<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'

import type { User } from '@/models/User'
import { Create } from '@/services/crudService'
import { userSchema } from '@/schemas/schemas'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref<User>({
  id: null,
  username: '',
  name: ''
})

const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    authStore.login(await Create('auth', user.value))
    await router.push('/movies')
    toast.success('Login successful!')
  } catch (e) {
    console.error('Error trying to login', e)

    toast.error('Login failed', {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 800
    })
  }
}
</script>

<template>
  <h2>Home!</h2>
  <div v-if="!authStore.isAuthed">
    <Form @submit="handleLogin" :validation-schema="userSchema">
      <div class="mb-3">
        <label for="username" class="form-label">
          Username<Field
            v-model="user.username"
            class="form-control"
            type="text"
            name="username"
            id="username"
        /></label>
        <ErrorMessage name="username" class="text-danger" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">
          Password<Field class="form-control" type="password" name="password" id="password" />
          <ErrorMessage name="password" class="text-danger"
        /></label>
      </div>
      <div class="mb-3">
        <button class="btn btn-light">Login</button>
      </div>
    </Form>
  </div>
</template>

<style scoped></style>

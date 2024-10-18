<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Reviews from '@/components/Reviews.vue'
import WriteReview from '@/components/WriteReview.vue'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from '@/router'
import { Delete, Get } from '@/services/crudService'

const route = useRoute()
const movieID = route.params.id
const movie = ref([])
const authStore = useAuthStore()

const getMovieData = async () => {
  try {
    movie.value = await Get('movies', movieID)
  } catch (error) {
    console.error('Error fetching movie', error)
  }
}

const deleteMovie = async (id) => {
  try {
    await Delete('movies', id)
    await router.push('/movies')
    toast.success('Movie deleted', {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 800
    })
  } catch (e) {
    console.error('Failed to delete movie' + e)
    toast.error('Failed to delete movie', {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 800
    })
  }
}

onMounted(() => {
  getMovieData()
})
</script>

<template>
  <div id="movie-info">
    <h2 class="text-decoration-underline">{{ movie.name }}</h2>
    <div class="image-container">
      <img v-if="movie.image_url !== ''" :src="`http://localhost:1234/${movie.image_url}`" />
    </div>

    <div>{{ movie.description }}</div>
    <div>{{ movie.genre }}</div>
    <button class="btn btn-danger" @click="deleteMovie(movie.id)">Delete</button>
    <router-link :to="{ name: 'editMovie', params: { id: movie.id } }" class="btn btn-light"
      >Edit</router-link
    >
    <div>
      <div id="movie-reviews">
        <h4 class="text-decoration-underline">Reviews</h4>
        <div v-for="review in movie.reviews" :key="review.ID">
          <Reviews
            :review="review"
            :user="review.user"
            class="border rounded"
            @customEvent="getMovieData"
          />
        </div>
        <div v-if="authStore.isAuthed">
          <WriteReview
            :movieID="parseInt(movieID)"
            :userID="authStore.user.ID"
            @customEvent="getMovieData"
          />
        </div>
        <div v-else>Need to login to write a review</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  max-height: 50vh !important;
  overflow: hidden;
}

.image-container img {
  max-height: inherit;
  object-fit: contain;
}
</style>

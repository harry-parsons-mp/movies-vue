<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Reviews from '@/components/Reviews.vue'
import WriteReview from '@/components/WriteReview.vue'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { Delete, Get } from '@/services/crudService'

const route = useRoute()
const router = useRouter()

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
const confirmation = (id: number) => {
  if (window.confirm('Are you sure?')) {
    deleteMovie(id)
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
    <div class="d-inline-flex flex-row align-items-center">
      <h2 class="text-decoration-underline px-3">{{ movie.name }}</h2>
      <div class="border rounded-4 ps-3 px-3 text fs-5 h-25">{{ movie.genre }}</div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="image-container">
            <img
              v-if="movie.image_url !== ''"
              :src="`http://localhost:1234/${movie.image_url}`"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 border">
          <div>Description:</div>
          <div>{{ movie.description }}</div>
        </div>
      </div>

      <router-link :to="{ name: 'editMovie', params: { id: movie.id } }" class="btn btn-light">
        Edit
      </router-link>
      <button class="btn btn-danger m-3" @click="confirmation(movie.id)">Delete</button>

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
  </div>
</template>

<style scoped>
.image-container {
  overflow: hidden;
  //height: 50%;
  position: relative;
}

.image-container img {
  object-fit: contain;
  max-height: 60vh;
  width: 100%;
}
</style>

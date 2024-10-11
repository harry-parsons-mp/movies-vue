<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Reviews from '@/components/Reviews.vue'

const route = useRoute()
const movieID = route.params.id
const movie = ref([])




async function getMovieData() {
  try {
    const response = await axios.get(`http://localhost:1234/movies/${movieID}`)
    movie.value = response.data
  }
  catch(error) {
    console.error('Error fetching movie', error)
  }
}
onMounted(() => {
  getMovieData()
})






</script>

<template>
  <div id="movie-info">

  <h2 class="text-decoration-underline">{{movie.name}}</h2>
  <img v-if="movie.image_url !== ''" class="img-fluid mx-auto d-block" :src="`http://localhost:1234/${movie.image_url}`" >

  <div>{{movie.description}}</div>
  <div>{{movie.genre}}</div>
  <div>
    <div id="movie-reviews">
      <h4 class="text-decoration-underline">Reviews</h4>
      <div v-for="review in movie.reviews" :key="review.ID">
        <Reviews :review="review" class="border rounded"/>
      </div>
    </div>
  </div>
  </div>
</template>
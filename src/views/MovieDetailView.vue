<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const movieID = route.params.id
const movie = ref([])




async function getMovieData() {
  try {
    const response = await axios.get(`http://localhost:1234/movies/${movieID}`)
    movie.value = response.data
    console.log(movie.value)
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
  <h2 class="text-decoration-underline">{{movie.name}}</h2>
  <div>{{movie.description}}</div>
  <div>{{movie.genre}}</div>
  <div>
    <h4>Reviews</h4>
    <div v-for="review in movie.Reviews" :key="reivew.ID">
      <div>{{review.title}}</div>
      <div>{{review.content}}</div>
      <div>{{review.User.Name}}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'

const movies = ref([])


function limitString(str: string, charLimit: number){
  if(str.length <= charLimit){
    return str
  }
  else {
    return str.slice(0, charLimit) + '...'
  }
}

async function getMovieData() {
  try {
    const response = await axios.get('http://localhost:1234/movies')
    movies.value = response.data
    console.log(movies.value)
  }
  catch(error) {
    console.error('Error fetching movies', error)
  }
}


onMounted(() => {
  getMovieData()

})


</script>

<template>
  <h1 class="text-center">Movies</h1>
  <div class="container">
    <div class="row row-cols-md-2 g-5">
      <div v-for="movie in movies" :key="movie.id" class="col">
        <div class="border p-3">
          <div>Title: {{movie.name}}</div>
          <div>{{limitString(movie.description, 40)}}</div>
          <div>{{movie.genre}}</div>
          <router-link :to="{name: 'MovieDetail', params: {id: movie.id} }" >View Details</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
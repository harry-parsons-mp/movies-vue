<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import Image_carousel from '@/components/Image_carousel.vue'

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
  <Image_carousel :movies="movies"/>


</template>


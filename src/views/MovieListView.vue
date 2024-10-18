<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Image_carousel from '@/components/Image_carousel.vue'
import { List } from '@/services/crudService'

const movies = ref([])

const getMovieData = async () => {
  try {
    movies.value = await List('movies')
  } catch (error) {
    console.error('Error fetching movies', error)
  }
}

onMounted(() => {
  getMovieData()
})
</script>

<template>
  <h1 class="text-center">Movies</h1>
  <Image_carousel :movies="movies" data-bs-theme="light" />
</template>

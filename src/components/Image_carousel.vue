<script setup lang="ts">
import { type PropType } from 'vue'
import type { Movie } from '@/models/Movie'

defineProps({
  movies: {
    type: Array as PropType<Movie[]>,
    required: true
  }
})
</script>

<template>
  <div id="carousel" class="carousel slide">
    <div class="carousel-inner">
      <div
        v-for="(movie, index) in movies"
        :key="index"
        class="carousel-item"
        :class="{ active: index === 0 }"
      >
        <div v-if="movie.image_url != ''">
          <div class="text-center">{{ movie.name }}</div>
          <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
            <img
              :src="`http://localhost:1234/${movie.image_url}`"
              class="carousel-image d-block w-100 rounded"
              alt="..."
            />
          </router-link>
        </div>
        <div v-else>No image</div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.carousel-image {
  max-height: 80vh;
  width: auto;
  object-fit: contain;
}
.carousel-control-prev-icon {
  color: white !important;
}
</style>

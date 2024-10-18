<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import type { Movie } from '@/models/Movie'
import { movieSchema } from '@/schemas/schemas'

interface Props {
  movie: Movie
  fileFunc: void
}
const emit = defineEmits<{
  (e: 'movie', movie: Movie): void
  (e: 'submit'): void
}>()
const emitMovies = () => {
  emit('movie', movie)
  emit('submit')
}

const props = defineProps<Props>()

const movie = ref(props.movie)
const handleFileChange = props.fileFN
</script>
<template>
  <Form @submit="emitMovies" :validation-schema="movieSchema">
    <div>
      <label for="MovieTitle">
        Title
        <Field
          class="form-control"
          id="MovieTitle"
          name="name"
          type="text"
          v-model="movie.name"
          placeholder="eg. Star Wars"
        />
        <ErrorMessage name="name" class="text-danger" />
      </label>
    </div>

    <div class="form-group">
      <label for="MovieDesc"
        >Description
        <Field
          type="text"
          class="form-control"
          name="description"
          id="MovieDesc"
          v-model="movie.description"
        />
        <ErrorMessage name="description" />
      </label>
    </div>
    <div>
      <label>Genre</label>
      <select class="form-select" name="genre" id="MovieGenre" v-model="movie.genre" required>
        <option selected value="">Pick a genre</option>
        <option value="Action">Action</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Thriller">Thriller</option>
        <option value="Comedy">Comedy</option>
      </select>
    </div>
    <ErrorMessage name="genre" />

    <div class="mb-3">
      <label for="MovieImage" class="form-label"
        >Upload an image
        <Field
          type="file"
          class="form-control"
          id="MovieImage"
          name="image"
          ref="imageFile"
          @change="handleFileChange"
      /></label>
      <ErrorMessage name="image" />
    </div>
    <button class="btn btn-light">Submit</button>
  </Form>
</template>

<style scoped></style>

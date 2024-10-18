<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import type { Movie } from '@/models/Movie'
import { onMounted, ref } from 'vue'
import { Get, Update } from '@/services/crudService'
import { UploadImage } from '@/services/imageService'
import router from '@/router'
import { movieSchema } from '@/schemas/schemas'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'

const api = import.meta.env.VITE_API_URL

const route = useRoute()

const movieID = route.params.id

const movie = ref<Movie>({
  id: 0,
  name: '',
  description: '',
  genre: '',
  image_url: ''
})
const image = ref(null)

const getMovieData = async () => {
  try {
    movie.value = await Get('movies', movieID)
  } catch (e) {
    console.error(e)
  }
}

const updateMovieData = async () => {
  try {
    await Update('movies', {
      id: movie.value.id,
      name: movie.value.name,
      description: movie.value.description,
      genre: movie.value.genre
    })
    if (image.value !== null) {
      await UploadImage(movie.value.id, image.value)
    }
    await router.push(`/movies/${movie.value.id}`)
    toast.success('Movie updated!')
  } catch (e) {
    console.error(e)
  }
}
const handleFileChange = (event) => {
  image.value = event.target.files[0]
  console.log(event.target.files[0])
}

const clearImage = () => {
  movie.value.image_url = ''
}

onMounted(() => {
  getMovieData()
})
</script>

<template>
  <h2>Edit Movie</h2>
  <div class="d-flex justify-content-center flex-column">
    <!--    <MovieForm :movie="movie" :file-func="handleFileChange" @submit="addMovie" />-->
    <Form @submit="updateMovieData" :validation-schema="movieSchema">
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
          <ErrorMessage name="description" class="text-danger" />
        </label>
      </div>
      <div>
        <label>Genre</label>
        <select class="form-select" name="genre" id="MovieGenre" v-model="movie.genre">
          <option value="Action">Action</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>
      <ErrorMessage name="genre" class="text-danger" />
      <div v-if="movie.image_url != ''">
        <img :src="`${api}/${movie.image_url}`" class="img-thumbnail img-fluid w-25" />
        <button class="btn btn-danger" @click="clearImage">Clear</button>
      </div>
      <div v-else class="mb-3">
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
        <ErrorMessage name="image" class="text-danger" />
      </div>
      <button class="btn btn-light">Submit</button>
    </Form>
  </div>
</template>

<style scoped></style>

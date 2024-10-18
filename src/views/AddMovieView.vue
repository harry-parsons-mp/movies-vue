<script setup lang="ts">
import { ref } from 'vue'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'
import type { Movie } from '@/models/Movie'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { UploadImage } from '@/services/imageService'
import { Create } from '@/services/crudService'
import router from '@/router'

const movie = ref<Movie>({
  name: '',
  description: '',
  genre: ''
})
let image = null

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  genre: yup.string(),
  image: yup.mixed().required('Image is required')
})

const handleFileChange = (event) => {
  image = event.target.files[0]
  console.log(event.target.files[0])
}

const addMovie = async () => {
  try {
    const data = await Create('movies', movie.value)
    await UploadImage(data.id, image)

    await router.push(`/movies/${data.id}`)
    toast.success('Movie added')
  } catch (e) {
    console.error(e)
    toast.error('Failed to add movie')
  }
}
</script>

<template>
  <h2>Add a movie</h2>
  <div>
    <!--    <MovieForm :movie="movie" :file-func="handleFileChange" @submit="addMovie" />-->
    <Form @submit="addMovie" :validation-schema="schema">
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
        <select
          class="form-select w-auto"
          name="genre"
          id="MovieGenre"
          v-model="movie.genre"
          required
        >
          <option disabled selected value="">Pick a genre</option>
          <option value="Action">Action</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>
      <ErrorMessage name="genre" class="text-danger" />

      <div class="mb-3">
        <label for="MovieImage" class="form-label"
          >Upload an image
          <Field
            type="file"
            class="form-control btn-danger"
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

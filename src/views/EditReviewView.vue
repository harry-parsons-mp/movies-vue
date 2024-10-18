<script setup lang="ts">
import { Field, Form } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import type { Review } from '@/models/Review'
import { Get, Update } from '@/services/crudService'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const review = ref<Review>({
  id: id,
  title: '',
  score: null,
  content: '',
  userID: null,
  movieID: null,
  movie: []
})

const updateReview = async () => {
  try {
    const response = await Update('reviews', {
      id: review.value.id,
      title: review.value.title,
      score: parseInt(review.value.score),
      content: review.value.content,
      userID: review.value.userID,
      movieID: review.value.movieID
    })
    // await router.push(`/movies/${response.movie.id}`)
    toast.success('Review Updated')
  } catch (e) {
    console.error('Error updating review', e)
    toast.error('Failed to update review')
  }
}

const getReview = async () => {
  try {
    console.log(id)
    review.value = await Get('reviews', id)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  getReview()
})
</script>

<template>
  <div>Update review</div>
  <router-link :to="{ name: 'MovieDetail', params: { id: review.movie.id } }" class="fs-5"
    >Back</router-link
  >
  <Form @submit="updateReview">
    <div class="mb-3">
      <label for="title"
        >Title
        <Field
          class="form-control"
          type="text"
          name="title"
          id="title"
          v-model="review.title"
        ></Field
      ></label>
    </div>
    <div class="mb-3">
      <label for="score"
        >Score / 10<Field
          class="form-control"
          name="score"
          type="text"
          id="score"
          v-model="review.score"
        ></Field
      ></label>
    </div>
    <div class="mb-3">
      <label for="content"
        >Review body
        <Field
          class="form-control"
          as="textarea"
          name="content"
          id="content"
          v-model="review.content"
          cols="70"
          rows="4"
        ></Field
      ></label>
      <div class="mb-3">
        <button class="btn btn-dark">Save</button>
      </div>
    </div>
  </Form>
</template>

<style scoped></style>

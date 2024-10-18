<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import type { Review } from '@/models/Review'
import { reviewSchema } from '@/schemas/schemas'
import { Create } from '@/services/crudService'

const props = defineProps<{
  movieID: number
  userID: number
}>()

const emit = defineEmits<{
  (event: 'customEvent'): void
}>()
const reloadReview = () => {
  emit('customEvent')
}

const review = ref<Review>({
  title: '',
  score: null,
  content: '',
  userID: props.userID,
  movieID: props.movieID
})

const addReview = async () => {
  try {
    await Create('reviews', {
      title: review.value.title,
      score: parseInt(review.value.score),
      content: review.value.content,
      userID: review.value.userID,
      movieID: review.value.movieID
    })
    toast.success('Successfully added review!')
    reloadReview()
  } catch (e) {
    console.error('Error adding review', e)
    toast.error('Failed to add review', {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 800
    })
  }
}
</script>

<template>
  <div>Write review</div>

  <Form @submit="addReview" :validation-schema="reviewSchema">
    <div class="mb-3">
      <label for="title"
        >Title
        <Field
          class="form-control"
          type="text"
          name="title"
          id="title"
          v-model="review.title"
        ></Field> </label
      ><br />
      <ErrorMessage name="title" class="text-danger" />
    </div>
    <div class="mb-3">
      <label for="score"
        >Score / 10<Field
          class="form-control"
          name="score"
          type="text"
          id="score"
          v-model="review.score"
        ></Field></label
      ><br />
      <ErrorMessage name="score" class="text-danger" />
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
        ></Field></label
      ><br />
      <ErrorMessage name="content" class="text-danger" />
      <div class="mb-3">
        <button class="btn btn-light">Submit</button>
      </div>
    </div>
  </Form>
</template>

<style scoped></style>

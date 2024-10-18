<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { RouterLink } from 'vue-router'
import type { Review } from '@/models/Review'
import type { User } from '@/models/User'
import { Delete } from '@/services/crudService'

interface Props {
  review: Review
  user: User
}

const emit = defineEmits<{
  (event: 'customEvent'): void
}>()
const reloadReview = () => {
  emit('customEvent')
}

const props = defineProps<Props>()

const deleteReview = async () => {
  try {
    await Delete('reviews', props.review.id)
    toast.success('Review deleted', {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 800
    })
    reloadReview()
  } catch (e) {
    console.error('Failed to delete review' + e)
    toast.error('Failed to delete review', {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 800
    })
  }
}
</script>

<template>
  <div class="p-3">
    <div>{{ user.name }} - @{{ user.username }}</div>
    <div>{{ review.title }}</div>
    <div>{{ review.score }} / 10</div>
    <div>{{ review.content }}</div>
    <router-link :to="{ name: 'editReview', params: { id: review.id } }" class="btn btn-light"
      >Edit</router-link
    >
    <button class="btn btn-danger" @click="deleteReview">Delete</button>
  </div>
</template>

<style scoped></style>

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

const confirmation = () => {
  if (window.confirm('Are you sure?')) {
    deleteReview()
  }
}

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
  <div class="container p-3">
    <div class="row">
      <div class="col-11">
        <div>{{ user.name }} - @{{ user.username }}</div>
        <div>{{ review.title }}</div>
        <div>{{ review.score }} / 10</div>
        <div>{{ review.content }}</div>
      </div>

      <div class="col-1">
        <div class="row">
          <router-link
            :to="{ name: 'editReview', params: { id: review.id } }"
            class="btn btn-light w-50 mb-2"
            ><v-icon name="fa-edit" scale="1" />
          </router-link>
        </div>
        <div class="row">
          <button class="btn btn-danger w-50" @click="confirmation">
            <v-icon name="md-deleteforever-outlined" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

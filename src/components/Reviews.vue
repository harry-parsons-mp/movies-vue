<script setup lang="ts">

interface Props{
  review: {
    id: number,
    title: string,
    content: string,
    score: number,
    user: {
      name: string,
      username: string,
    }
  }
}

const Review = defineProps<Props>()

console.log(Review)
</script>

<template>
  <div class="p-3">
    <div>{{review.user.name}} - @{{review.user.username}}</div>
    <div>{{review.title}}</div>
    <div>{{review.score}} / 10</div>
    <div>{{review.content}}</div>

  </div>
</template>

<style scoped></style>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/Nav-bar.vue'
</script>

<template>
  <div class="p-3">
  <h1 class="text-center">Movie App</h1>
  <NavBar/>
  <router-view/>
  </div>
</template>
<style scoped>

</style>

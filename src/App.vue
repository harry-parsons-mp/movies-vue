<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
// TODO: make toast service? - Allow to be present even if route changes?
</script>

<template>
  <div id="app" class="container text-white">
    <div class="row border-bottom">
      <NavBar class="col-sm-10" />
    </div>
    <router-view />
  </div>
</template>
<style scoped>
#app {
  color: white;
}
</style>

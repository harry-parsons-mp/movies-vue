<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
// TODO: improve navbar closing - ability to click anywhere else to close it?
</script>

<template>
  <div id="app" class="container" data-bs-theme="dark">
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

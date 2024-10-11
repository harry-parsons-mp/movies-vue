<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import NavBar from '@/components/Nav-bar.vue'
</script>

<template>
  <div id="app" class="container text-white">
    <div class="row border-bottom border-">
      <div class="col-sm-2 d-flex align-items-center text-secondary fw-bold">Vue Movies</div>
      <NavBar class="col-sm-10"/>
    </div>
  <router-view/>

  </div>
</template>
<style scoped>

#app{
color: white;
}


</style>

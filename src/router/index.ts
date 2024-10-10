import { createRouter, createWebHistory } from 'vue-router'
import MovieDetail from '@/views/MovieDetailView.vue'
import MovieList from '@/views/MovieListView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'MovieList',
      component: MovieList
    },
    {
      path: '/movies/:id',
      name: 'MovieDetail',
      component: MovieDetail
    }
  ]
})

export default router

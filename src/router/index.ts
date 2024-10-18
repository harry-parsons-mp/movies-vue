import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/movies',
      name: 'MovieList',
      component: () => import('@/views/MovieListView.vue')
    },
    {
      path: '/movies/:id',
      name: 'MovieDetail',
      component: () => import('@/views/MovieDetailView.vue')
    },
    {
      path: '/movies/add',
      name: 'AddMovie',
      component: () => import('@/views/AddMovieView.vue')
    },
    {
      path: '/movies/edit/:id',
      name: 'editMovie',
      component: () => import('@/views/EditMovieView.vue')
    },
    {
      path: '/reviews/edit/:id',
      name: 'editReview',
      component: () => import('@/views/EditReviewView.vue')
    }
  ]
})

// Checks if 'authenticated' before allowing user to other routes
// router.beforeEach(async (to, from) => {
//   const authStore = useAuthStore()
//   if (!authStore.isAuthed && to.name !== 'home') {
//     return { name: 'home' }
//   }
// })
export default router

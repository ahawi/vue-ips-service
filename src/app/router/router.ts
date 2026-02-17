import { createRouter, createWebHistory } from 'vue-router'
import { CenteredLayout } from '../layout'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      children: [],
      component: CenteredLayout,
    },
  ],
})

export default router

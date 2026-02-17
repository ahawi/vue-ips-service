import { createRouter, createWebHistory } from 'vue-router'
import { CenteredLayout } from '../layout'
import { AUTH_SECTION_ROUTE } from '@/pages/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      component: CenteredLayout,
    },
  ],
})

export default router

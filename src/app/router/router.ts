import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import { CenteredLayout, SidebarLayout } from '../layout'
import { MAIN_ROUTE } from '@/pages/main'
import { MAIN_LINK } from '@/shared/config'
import { SUBSCRIBES_ROUTE } from '@/pages/subscribes'
import { INVOICES_ROUTE } from '@/pages/invoices'
import { PROFILE_ROUTE } from '@/pages/profile/config'
import { adminRouteGuard } from '../bootstrap'
import { AUTH_SECTION_ROUTE } from '@/pages/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      component: CenteredLayout
    },
    {
      path: MAIN_ROUTE.path,
      redirect: MAIN_LINK,
      children: [
        {
          path: '',
          name: MAIN_ROUTE.name,
          component: MAIN_ROUTE.component
        },
        SUBSCRIBES_ROUTE,
        { ...INVOICES_ROUTE, beforeEnter: (to, from, next) => adminRouteGuard(next) },
        PROFILE_ROUTE
      ],
      component: SidebarLayout
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: MAIN_LINK.name, params: {} }
    }
  ]
})

export default router

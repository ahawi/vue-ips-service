import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import { CenteredLayout, SidebarLayout } from '../layout'
import { AUTH_SECTION_ROUTE } from '@/pages/auth'
import { MAIN_ROUTE } from '@/pages/main'
import { MAIN_LINK } from '@/shared/config'
import { useUserStore } from '@/entities/user'
import { SUBSCRIBES_ROUTE } from '@/pages/subscribes'
import { INVOICES_ROUTE } from '@/pages/invoices'
import { PROFILE_ROUTE } from '@/pages/profile/config'

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
      redirect: MAIN_LINK
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isUserAuth } = useUserStore()

  if (isUserAuth) {
    if (to.path.startsWith(AUTH_SECTION_ROUTE.path)) {
      return next({ name: MAIN_LINK.name })
    }

    return next()
  }

  if (to.path.startsWith(AUTH_SECTION_ROUTE.path)) {
    return next()
  }

  return next({ name: 'login' })
})

const adminRouteGuard = (next: NavigationGuardNext) => {
  const { isAdmin } = useUserStore()

  if (isAdmin) next()
  else next({ name: MAIN_LINK.name })
}

export default router

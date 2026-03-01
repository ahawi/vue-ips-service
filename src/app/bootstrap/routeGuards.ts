import { useUserStore } from '@/entities/user'
import { AUTH_SECTION_ROUTE, AUTH_SECTION_LINKS } from '@/pages/auth'
import { MAIN_LINK } from '@/shared/config'
import type { NavigationGuardNext, Router } from 'vue-router'

export const useRouteGuards = (router: Router): void => {
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

    return next({ name: AUTH_SECTION_LINKS.LOGIN.name })
  })
}

export const adminRouteGuard = (next: NavigationGuardNext) => {
  const { isAdmin } = useUserStore()

  if (isAdmin) next()
  else next({ name: MAIN_LINK.name })
}

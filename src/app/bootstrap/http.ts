import { useUserStore } from '@/entities/user'
import { http } from '@/shared/api'
import { LOGIN_LINK } from '@/shared/config'
import type { Router } from 'vue-router'

export const setupHttp = (router: Router) => {
  const { isUserAuth, getToken, resetUser } = useUserStore()

  if (isUserAuth) http.setToken(getToken())

  http.onUnAuthorized(() => {
    resetUser()
    router.push(LOGIN_LINK.name)
  })
}

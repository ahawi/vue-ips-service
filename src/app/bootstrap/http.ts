import { useUserStore } from '@/entities/user'
import { useLogout } from '@/features/logout'
import { http } from '@/shared/api'

export const setupHttp = () => {
  const { isUserAuth, getToken } = useUserStore()
  const { logout } = useLogout()

  if (isUserAuth) http.setToken(getToken())

  http.onUnAuthorized(logout)
}

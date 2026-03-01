import { useUserStore } from '@/entities/user'
import { LOGIN_LINK } from '@/shared/config'
import { useRouter } from 'vue-router'

interface UseLogout {
  logout: () => void
}

export const useLogout = (): UseLogout => {
  const router = useRouter()
  const { resetUser } = useUserStore()

  const logout: UseLogout['logout'] = () => {
    router.push({ name: LOGIN_LINK.name })
    resetUser()
  }

  return { logout }
}

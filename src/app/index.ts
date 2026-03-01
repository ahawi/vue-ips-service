import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { http } from '@/shared/api'

import App from './App.vue'
import { router } from './router'
import './styles/main.css'
import { useUserStore } from '@/entities/user'
import { AUTH_SECTION_LINKS } from '@/pages/auth'

const unAuthorizedHandler = (): void => {
  router.push({ name: AUTH_SECTION_LINKS.LOGIN.name })
  const { resetUser } = useUserStore()

  resetUser()
}

http.onUnAuthorized(unAuthorizedHandler)

const app = createApp(App)

app.use(createPinia())
app.use(router)

export { app }

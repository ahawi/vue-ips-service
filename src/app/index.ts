import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { http } from '@/shared/api'

import App from './App.vue'
import { router } from './router'
import './styles/main.css'
import { useUserStore } from '@/entities/user'

const unAuthorizedHandler = (): void => {
  const { resetUser } = useUserStore()

  resetUser()
}

http.onUnAuthorized(unAuthorizedHandler)

const app = createApp(App)

app.use(createPinia())
app.use(router)

export { app }

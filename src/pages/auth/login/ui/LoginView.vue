<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { REGISTER_LINK } from '../../register'
import { login } from '../api'
import { useRouter } from 'vue-router'
import { MAIN_LINK } from '@/shared/config'

interface LoginForm {
  email: string | null
  password: string | null
}

const form: Ref<LoginForm> = ref({
  email: null,
  password: null
})

const router = useRouter()

const loginHandler = async (): Promise<void> => {
  if (!isFormValid(form.value)) return

  const user = await login(form.value)

  if (user === null) {
    alert('Пользователь не найден')
    return
  }

  router.push(MAIN_LINK)
}

const isFormValid = (form: LoginForm): form is { email: string; password: string } =>
  Object.values(form).every(Boolean)
</script>

<template>
  <div class="inner">
    <h1>Вход</h1>
    <div class="vstack">
      <div>
        <label class="label">Email</label>
        <input
          class="input"
          v-model="form.email" />
      </div>
      <div>
        <label class="label">Пароль</label>
        <input
          type="password"
          class="input"
          v-model="form.password" />
      </div>
      <div class="hstack">
        <RouterLink
          :to="REGISTER_LINK"
          class="btn btn-ghost"
          >Регистрация</RouterLink
        >
        <button
          class="btn btn-primary"
          type="button"
          @click="loginHandler">
          Войти
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hstack {
  justify-content: space-between;
}
</style>

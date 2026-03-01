<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { registration } from '../api'

interface RegisterForm {
  email: string | null
  password: string | null
  name: string | null
  address: string | null
}

const form: Ref<RegisterForm> = ref({
  email: '',
  password: '',
  name: '',
  address: ''
})

const registerHandler = (): void => {
  if (isFormValid(form.value)) registration(form.value)
}

const isFormValid = (
  form: RegisterForm
): form is {
  email: string
  password: string
  name: string | null
  address: string | null
} => {
  return !!form.email && !!form.password
}
</script>

<template>
  <div class="inner">
    <h1>Регистрация</h1>
    <div class="vstack">
      <input
        placeholder="Email"
        class="input"
        v-model="form.email" />
      <input
        placeholder="Password"
        type="password"
        class="input"
        v-model="form.password" />
      <input
        placeholder="Name"
        class="input"
        v-model="form.name" />
      <input
        placeholder="Address"
        class="input"
        v-model="form.address" />
    </div>
    <div class="hstack">
      <RouterLink
        to="/login"
        class="btn btn-ghost">
        Авторизоваться
      </RouterLink>
      <button
        type="button"
        @click="registerHandler"
        class="btn btn-primary">
        Зарегистрироваться
      </button>
    </div>
  </div>
</template>

<style scoped>
.inner {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.hstack {
  justify-content: space-between;
}
</style>

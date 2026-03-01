<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { registration } from '../api'
import { LOGIN_LINK } from '../../login'

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

const isSubmitted: Ref<boolean> = ref(false)
const isLoading: Ref<boolean> = ref(false)

const registerHandler = async (): Promise<void> => {
  isSubmitted.value = true

  if (!isFormValid(form.value)) return
  isSubmitted.value = false

  isLoading.value = true
  await registration(form.value)
  isLoading.value = false
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

const hasError = (field: string | null): boolean => isSubmitted.value && !field
</script>

<template>
  <div class="inner">
    <h1>Регистрация</h1>
    <div class="vstack">
      <input
        placeholder="Email"
        class="input"
        v-model="form.email"
        :class="{ error: hasError(form.email) }" />
      <input
        placeholder="Password"
        type="password"
        class="input"
        v-model="form.password"
        :class="{ error: hasError(form.password) }"
        :disabled="isLoading" />
      <input
        placeholder="Name"
        class="input"
        v-model="form.name"
        :disabled="isLoading" />
      <input
        placeholder="Address"
        class="input"
        v-model="form.address"
        :disabled="isLoading" />
    </div>
    <div class="hstack">
      <RouterLink
        :to="LOGIN_LINK"
        :disabled="isLoading"
        class="btn btn-ghost">
        Авторизоваться
      </RouterLink>
      <button
        type="button"
        :disabled="isLoading"
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

.error {
  border: 1px solid red;
}

.btn:disabled {
  opacity: 0.3;
}

.input:disabled {
  background: gainsboro;
}
</style>

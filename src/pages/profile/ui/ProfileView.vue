<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile } from '../api'
import type { Profile } from '../model'
import type { Ref } from 'vue'
import { VButton } from '@/shared/ui/button'
import { getMyInvoices } from '../api/invoice'
import type { Invoice } from '../model'
import { currencyFormatter, useDateFormat } from '@/shared/lib/formats'
import { useUserStore } from '@/entities/user'

const profile: Ref<Profile | null> = ref(null)
const { updateUserInfo } = useUserStore()

const fetchProfile = async (): Promise<void> => {
  profile.value = await getProfile()
}

async function saveHandler(): Promise<void> {
  if (profile.value === null) throw new Error('Logic Exception. Profile not initiated')

  const { name, address } = profile.value

  const payload = { name, address }

  if (isUpdatePayloadValid(payload) === false) {
    alert('Введены некорректные данные')
    return
  }

  const isUpdate = await updateProfile(payload)

  if (!isUpdate) {
    alert('Не удалось обновить данные')
    return
  }

  updateUserInfo(payload)
  fetchProfile()
}

const isUpdatePayloadValid = (payload: {
  name: string | null
  address: string | null
}): payload is { name: string; address: string } =>
  Boolean(payload.name) && Boolean(payload.address)

const invoices: Ref<Array<Invoice>> = ref([])

const fetchInvoices = async (): Promise<void> => {
  invoices.value = await getMyInvoices()
}

const FETCH_HANDLES = [fetchProfile, fetchInvoices] as const

const fetchUserData = async (handles: ReadonlyArray<() => Promise<void>>): Promise<void> => {
  handles.forEach((handle) => handle())
}

onMounted(() => fetchUserData(FETCH_HANDLES))
</script>

<template>
  <div class="container">
    <h1>Профиль</h1>
    <div class="card">
      <div
        v-if="profile"
        class="vstack">
        <div>
          <label class="label">Email</label>
          <input
            v-model="profile.email"
            type="text"
            class="input p-muted"
            readonly />
        </div>
        <div>
          <label class="label">Имя</label>
          <input
            v-model="profile.name"
            type="text"
            class="input" />
        </div>
        <div>
          <label class="label">Адрес</label>
          <input
            v-model="profile.address"
            type="text"
            class="input" />
        </div>
        <div class="hstack">
          <VButton @click="saveHandler">Сохранить</VButton>
        </div>
      </div>

      <div
        v-else
        class="error">
        <VButton @click="fetchProfile"> Получить профиль </VButton>
      </div>
    </div>
    <h2 class="invoice">Мои счета</h2>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>Сумма</th>
            <th>Дата выставления</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ id, amount, createdAt } in invoices"
            :key="id">
            <td>{{ currencyFormatter.format(amount) }}</td>
            <td>{{ useDateFormat(createdAt, 'DD-MM-YYYY') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.invoice {
  padding-top: 2rem;
}

.hstack {
  justify-content: flex-end;
}

.input.p-muted {
  background-color: #d9d9d9;
}

.error {
  display: flex;
  justify-content: center;
}
</style>

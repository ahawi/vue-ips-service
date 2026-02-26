<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createInvoice, getInvoiceList, getUsersForInvoice } from '../api'
import { VButton } from '@/shared/ui/button'
import type { Invoice, InvoiceUser } from '../model'
import type { Ref } from 'vue'
import { currencyFormatter } from '@/shared/lib/formats'

const invoices: Ref<Array<Invoice>> = ref([])
const isInvoicesLoading: Ref<boolean> = ref(false)

const fetchInvoices = async (): Promise<void> => {
  isInvoicesLoading.value = true
  invoices.value = await getInvoiceList()
  isInvoicesLoading.value = false
}

const isInvoiceListNotEmpty = (invoiceList: Array<Invoice>): boolean => invoiceList.length !== 0

onMounted(fetchInvoices)

const selectedUser: Ref<string | null> = ref(null)
const users: Ref<Array<InvoiceUser>> = ref([])
const isUserLoading: Ref<boolean> = ref(false)

const fetchUsers = async (): Promise<void> => {
  if (users.value.length) return

  isUserLoading.value = true
  users.value = await getUsersForInvoice()
  isUserLoading.value = false
}

const resetSelected = (): void => {
  selectedUser.value = null
}

const submitInvoice = async (userId: null | string): Promise<void> => {
  if (userId === null) {
    alert('Нужно выбрать пользователя')
    return
  }

  const isCreated = await createInvoice(userId)

  if (isCreated === false) {
    alert('Не удалось выставить счет')
    return
  }

  resetSelected()
  fetchInvoices()
}
</script>

<template>
  <div class="container">
    <h1>Список счетов</h1>
    <p class="p-muted">Создание и просмотр счетов пользователей</p>
    <div
      v-if="isInvoicesLoading"
      class="card skeleton"></div>
    <div
      v-else
      class="card">
      <h2>Счета</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Пользователь</th>
            <th>Сумма</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isInvoiceListNotEmpty(invoices)">
            <tr
              v-for="{ id, email, amount, status } in invoices"
              :key="id">
              <td>{{ id }}</td>
              <td>{{ email }}</td>
              <td>{{ currencyFormatter.format(amount) }}</td>
              <td>{{ status }}</td>
            </tr></template
          >
          <tr v-else>
            <td class="muted">Счетов нет</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="invoice-creation">
      <select
        v-model="selectedUser"
        @mousedown="fetchUsers"
        :class="{ skeleton: isUserLoading }"
        class="users">
        <option
          v-for="{ id, email } in users"
          :key="id"
          :value="id">
          {{ email }}
        </option>
      </select>
      <VButton
        :disabled="!selectedUser"
        @click="submitInvoice(selectedUser)"
        >Создать счет</VButton
      >
    </div>
  </div>
</template>

<style scoped>
.invoice-creation {
  margin-top: 2.4rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
}

.users {
  max-width: 15rem;
  width: 100%;
}

.card.skeleton {
  height: 25.8rem;
}
</style>

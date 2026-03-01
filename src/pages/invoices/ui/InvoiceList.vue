<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createInvoice, getInvoiceList } from '../api'
import { VButton } from '@/shared/ui/button'
import { Invoice } from '../model'
import type { Ref } from 'vue'
import { currencyFormatter } from '@/shared/lib/formats'

const invoices: Ref<Array<Invoice>> = ref([])

const isInvoiceListNotEmpty = (invoiceList: Array<Invoice>): boolean => invoiceList.length !== 0

onMounted(async () => {
  invoices.value = await getInvoiceList()
})
</script>

<template>
  <div class="container">
    <h1>Список счетов</h1>
    <p class="p-muted">Создание и просмотр счетов пользователей</p>
    <div class="card">
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
      <VButton @click="createInvoice">Создать счет</VButton>
    </div>
  </div>
</template>

<style scoped>
.invoice-creation {
  margin-top: 2.4rem;
}
</style>

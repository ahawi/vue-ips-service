<script lang="ts" setup>
import type { Ref } from 'vue'
import type { Subscribe } from '../model'
import { onMounted, ref } from 'vue'
import { getSubscribeList } from '../api'
import { useDateFormat } from '@/shared/lib/formats'
import { currencyFormatter } from '@/shared/lib/formats'

const subscribes: Ref<Array<Subscribe>> = ref([])

onMounted(async () => {
  subscribes.value = await getSubscribeList()
})
</script>

<template>
  <div class="container">
    <h1>Мои подписки</h1>
    <div class="p-muted">Список подписок текущего пользователя</div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>Тариф</th>
            <th>Дата подписки</th>
            <th>Цена</th>
            <th>Скорость</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ id, name, subscribeAt, price, speed } in subscribes"
            :key="id">
            <td>{{ name }}</td>
            <td>{{ useDateFormat(subscribeAt, 'DD-MM-YYYY') }}</td>
            <td>{{ currencyFormatter.format(price) }}</td>
            <td>{{ speed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import { getTariffList, subscribeToTariff, type Tariff } from '../api'
import TariffCard from './TariffCard.vue'
import TariffSkeleton from './TariffSkeleton.vue'

const tariffs: Ref<Array<Tariff>> = ref([])
const isLoading: Ref<boolean> = ref(false)

const fetchTariffs = async (): Promise<void> => {
  isLoading.value = true
  tariffs.value = await getTariffList()
  isLoading.value = false
}

onMounted(fetchTariffs)
</script>

<template>
  <div class="container">
    <h1>Тарифы</h1>
    <div class="tariffs">
      <template v-if="isLoading">
        <TariffSkeleton
          v-for="item in 3"
          :key="item" />
      </template>

      <template v-else>
        <template v-if="tariffs.length">
          <TariffCard
            v-for="tariff in tariffs"
            :key="tariff.id"
            v-bind="tariff"
            @subscribe="subscribeToTariff" />
        </template>

        <template v-else> На данный момент список тарифов пуст. Обратитесь к провайдеру. </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.tariffs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
}
</style>

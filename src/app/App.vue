<script lang="ts" setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/entities/user'
import { http } from '@/shared/api'

onMounted(() => {
  const { isUserAuth, getToken } = useUserStore()

  if (isUserAuth) http.setToken(getToken())
})
</script>

<template>
  <RouterView />
</template>

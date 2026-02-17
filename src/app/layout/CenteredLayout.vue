<script lang="ts" setup></script>

<template>
  <div class="center">
    <div class="card">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
.center {
  min-width: 100dvh;
  padding: 4em;
  background: #f4f6f8;
}

.card {
  width: 48rem;
}
</style>

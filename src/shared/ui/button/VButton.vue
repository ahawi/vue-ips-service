<script lang="ts" setup>
export interface ButtonProps {
  disabled?: boolean
}

defineProps<ButtonProps>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    type="button"
    class="btn btn-primary"
    :disabled
    @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn:disabled {
  opacity: 0.5;
}
</style>

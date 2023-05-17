<script setup>
import { computed, ref } from 'vue'
const { adaptive } = defineProps({ adaptive: Boolean })

const modelValue = defineModel()

const style = computed(() => {
  return adaptive ? { width: `calc(${modelValue.value}ch + 2.5em)` } : {}
})
const input = ref(null)
defineExpose({ input })
</script>
<template>
  <input v-model="modelValue" :style="style" ref="input" />
</template>

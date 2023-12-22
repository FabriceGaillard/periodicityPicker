<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  adaptive: {
    validator(v) {
      if (typeof v === 'boolean') return true
      if (v.maxChar && (typeof v.maxChar !== 'number' || v.maxChar <= 0)) {
        return false
      }
      if (v.minChar && (typeof v.minChar !== 'number' || v.minChar <= 0)) {
        return false
      }
    }
  },
  value: [String, Number]
})

const getWidthStyle = (charLength) => `calc(${charLength}ch + 2.5em)`

const style = computed(() => {
  const style = {}
  if (props.adaptive) {
    style.width = getWidthStyle(String(props.value || '1').length)
    style.maxWidth = props.adaptive?.maxChar && getWidthStyle(props.adaptive?.maxChar)
    style.minWidth = getWidthStyle(props.adaptive?.minChar)
  }
  return style
})

const input = ref(null)
defineExpose({ input })
</script>

<template>
  <input :value="value" :style="style" ref="input" />
</template>

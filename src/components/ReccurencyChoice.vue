<script setup>
import { ref, computed } from 'vue'
import Select from '@/components/Inputs/Select.vue'
import InputNumber from '@/components/Inputs/InputNumber.vue'
const reccurence = ref(1)
const periods = [
  { singulier: 'Weekly', pluriel: 'Weeklies' },
  { singulier: 'Daily', pluriel: 'Dailies' },
  { singulier: 'Monthly', pluriel: 'Monthlies' }
]
const items = computed(() => {
  const grammaticalLink = reccurence.value > 1 ? 'pluriel' : 'singulier'
  return [
    { value: 0, label: periods[0][grammaticalLink] },
    { value: 1, label: periods[1][grammaticalLink] },
    { value: 2, label: periods[2][grammaticalLink] }
  ]
})
</script>

<template>
  <div class="d-flex align-items-center">
    <span class="me-2 no-wrap"> Repeat every </span>
    <InputNumber
      :min="1"
      :max="99"
      :adaptive="{ minChar: 2, maxChar: 2 }"
      type="number"
      v-model="reccurence"
      name="reccurencyValue"
      autocomplete="off"
      class="me-2"
    />
    <Select :items="items" id="period" />
  </div>
</template>

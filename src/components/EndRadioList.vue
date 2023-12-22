<script setup>
import { inject, ref } from 'vue'
import InputNumber from '@/components/Inputs/InputNumber.vue'
import DatePicker from '@/components/Inputs/DatePicker/DatePicker.vue'
const pick = ref('Never')

const locale = inject('locale')
</script>

<template>
  <div class="layout">
    <input type="radio" name="ends" id="endsNever" value="Never" checked v-model="pick" />
    <label for="endsNever"> Never </label>

    <input type="radio" name="ends" id="endsOn" value="On" v-model="pick" />
    <label for="endsOn"> On </label>
    <DatePicker :locale="locale" name="endsOnValue" :disabled="pick !== 'On'" />

    <input type="radio" name="ends" id="endsAfter" value="After" v-model="pick" />
    <label for="endsAfter"> After </label>
    <InputNumber
      name="endsAfterValue"
      :modelValue="1"
      :max="99"
      :min="1"
      :adaptive="{ minChar: 2 }"
      :suffix="{ singulier: 'Reccurency', pluriel: 'Reccurencies' }"
      :disabled="pick !== 'After'"
    />
  </div>
</template>
<style lang="scss" scoped>
@use 'sass:map';
@import '@/assets/scss/variables';

.layout {
  display: grid;
  grid-template-columns: min-content min-content auto;
  grid-template-rows: 30px;
  grid-gap: map.get($spacings, '2');
  align-items: center;
  margin-bottom: map.get($spacings, '2');
  #endsOn {
    grid-column: 1;
  }
}

input[type='radio'] {
  margin: 0;
}
</style>

<script setup>
import { ref } from 'vue'
import InputNumber from '@/components/Inputs/InputNumber.vue'

const pick = ref('Never')
</script>

<template>
  <div class="layout">
    <input type="radio" name="ends" id="endsNever" value="Never" checked v-model="pick" />
    <label for="endsNever"> Never </label>

    <input
      type="radio"
      name="ends"
      id="endsOn"
      value="On"
      ref="endsOn"
      v-model="pick"
      @click="
        () => {
          $refs.endsOnValue.disabled = false
          $refs.endsOnValue.focus()
        }
      "
    />
    <label for="endsOn"> On </label>
    <input
      type="text"
      name="endsOnValue"
      ref="endsOnValue"
      @click="$refs.endsOn.click()"
      @focusin="$refs.endsOn.click()"
      :disabled="pick != 'On'"
    />

    <input
      type="radio"
      name="ends"
      id="endsAfter"
      value="After"
      ref="endsAfter"
      v-model="pick"
      @click="
        () => {
          $refs.endsAfterValue.disabled = false
          console.log($refs.endsAfterValue.input)
          $refs.endsAfterValue.input.focus()
        }
      "
    />
    <label for="endsAfter"> After </label>
    <InputNumber
      name="endsAfterValue"
      ref="endsAfterValue"
      @click="$refs.endsAfter.click()"
      @focusin="$refs.endsAfter.click()"
      :disabled="pick != 'After'"
    />
  </div>
</template>
<style lang="scss" scoped>
@use 'sass:map';
@import '@/assets/scss/variables';

.layout {
  display: grid;
  grid-template-columns: min-content min-content minmax(10px, 100px);
  grid-template-rows: 30px;
  grid-gap: map.get($spacings, '2');
  align-items: center;
  margin-bottom: map.get($spacings, '2');
}

input[type='radio'] {
  margin: 0;
}
:nth-child(3) {
  grid-column: 1;
}
</style>

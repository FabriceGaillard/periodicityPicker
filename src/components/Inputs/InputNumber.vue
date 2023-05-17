<script setup>
import { computed, ref } from 'vue'
import Arrow from '../Icons/Arrow.vue'
import AdaptiveInput from '@/components/Inputs/AdaptiveInput.vue'
const { modelValue, min, max } = defineProps({
  min: Number,
  max: Number,
  suffix: String,
  prefix: String,
  modelValue: [String, Number],
  class: [String, Object]
})

const emit = defineEmits(['update:modelValue'])

const handleValue = function (v) {
  let newValue = v
  if (min !== undefined && v < min) newValue = min
  else if (max !== undefined && v > max) newValue = max
  value.value = newValue
  emit('update:modelValue', newValue)
}

const value = ref(modelValue)

const input = ref(null)
const e = computed(() => input.value.input)
defineExpose({ input: e })
</script>
<template>
  <div class="d-flex">
    <div class="input me-2">
      <span v-if="prefix" class="me-2">{{ prefix }}</span>
      <AdaptiveInput
        ref="input"
        type="number"
        adaptive
        v-bind="$sttr"
        :value="value"
        :modelValue="value"
        :min="min"
        :max="max"
        @change="(e) => handleValue(e.target.valueAsNumber)"
        @input="emit('update:modelValue', $event.target.valueAsNumber)"
      />
      <span v-if="prefix" class="ms-2">{{ suffix }}</span>
    </div>
    <div class="d-flex flex-column justify-content-between">
      <button direction="down" @click="handleValue(value + 1)">
        <Arrow width="14" height="14" direction="down" />
      </button>
      <button direction="up" @click="handleValue(value - 1)">
        <Arrow width="14" height="14" direction="up" />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  max-width: 100%;
  appearance: textfield;
  -moz-appearance: textfield;
}

button {
  width: 14px;
  height: 14px;
  border-radius: 100%;
  padding: 0;
  display: block;
  text-align: center;
  background: none;
  background: var(--bg-color-secondary);

  svg {
    margin: auto;
  }

  &:hover {
    background-color: red;
  }
}
</style>
